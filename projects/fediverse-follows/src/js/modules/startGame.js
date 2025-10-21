import randomFromArray from "/js/modules/randomFromArray.min.js";
import initAwesomplete from "/js/modules/initAwesomplete.min.js";
import showResults from "./showResults.min.js";

const loadingScreen = document.getElementById("loading");
const profileImage = document.getElementsByClassName("profile-image");
const accountNameEl = document.getElementById("account-name");
const gameInterface = document.getElementById("viz-user");
const answerForm = document.getElementById("answer-form");
const currentAnswerEl = document.getElementById("current-answer");
const roundCounterEl = document.getElementById("round-counter");
const maxRoundCounterEl = document.getElementById("max-round-counter");
const followBio = document.getElementById("follow-bio");
const resultsSection = document.getElementById("results-section");
const restartGameBtns = document.getElementsByClassName("restart-game");
const skipRoundBtn = document.getElementById("skip-round");

let fullUserData;
let follows;
let resumeGame = false;
const gameStateInit = {
  currentRound: 1,
  maxRounds: 10,
  currentRoundAccountIndex: 0,
  points: 0,
  rounds: [],
};

let gameState = gameStateInit;

const savedGameState = localStorage.getItem("fediverseFollowsGameState");

if (savedGameState) {
  try {
    gameState = JSON.parse(savedGameState);
    resumeGame = true;
  } catch (err) {
    /* noop */
  }
}

const playRound = (follows) => {
  if (gameState.currentRound > gameState.maxRounds) {
    answerForm.classList.add("d-none");
    resultsSection.classList.remove("d-none");
    showResults(gameStateInit, gameState, fullUserData);
    return;
  }

  currentAnswerEl.value = null;
  roundCounterEl.innerText = gameState.currentRound;

  if (!resumeGame) {
    const usedAnswers = gameState.rounds
      .slice(1)
      .map((round) => round?.accountIndex);

    const availableIndices = follows
      .map((_, index) => index)
      .filter((index) => !usedAnswers.includes(index));

    gameState.currentRoundAccountIndex = randomFromArray(availableIndices);

    gameState.rounds[gameState.currentRound] = {
      accountIndex: gameState.currentRoundAccountIndex,
    };
  } else {
    gameState.currentRoundAccountIndex =
      gameState.rounds[gameState.currentRound]?.accountIndex;
  }

  const randomAccount = follows[gameState.currentRoundAccountIndex];
  followBio.innerHTML = randomAccount.note;

  localStorage.setItem("fediverseFollowsGameState", JSON.stringify(gameState));
  resumeGame = false;
};

const checkAnswer = () => {
  const userAnswer = currentAnswerEl.value.trim();
  const currentAnswer = `${
    follows[gameState.currentRoundAccountIndex].username
  } (${follows[gameState.currentRoundAccountIndex].acct})`;

  gameState.rounds[gameState.currentRound].userAnswer = userAnswer;

  const roundResult = currentAnswer === userAnswer;
  if (roundResult) {
    gameState.points++;
  }

  gameState.currentRound++;

  localStorage.setItem("fediverseFollowsGameState", JSON.stringify(gameState));
  playRound(follows);
};

answerForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  checkAnswer();
});

skipRoundBtn.addEventListener("click", (ev) => {
  ev.preventDefault();
  gameState.rounds[gameState.currentRound].userAnswer = "(skipped)";
  gameState.currentRound++;
  localStorage.setItem("fediverseFollowsGameState", JSON.stringify(gameState));
  playRound(follows);
});

[...restartGameBtns].forEach((restartGameBtn) => {
  restartGameBtn.addEventListener("click", (ev) => {
    ev.preventDefault();
    localStorage.removeItem("fediverseFollowsGameState");
    window.location.reload();
  });
});

export default async (userData) => {
  fullUserData = userData;
  follows = userData.follows;

  loadingScreen.classList.add("d-none");
  gameInterface.classList.remove("d-none");
  gameInterface.scrollIntoView({
    behavior: "smooth",
  });

  accountNameEl.innerHTML = userData.name;

  if (userData.profileImageURL) {
    profileImage[1].src = userData.profileImageURL;
  }

  initAwesomplete("#current-answer", {
    list: follows.map((account) => `${account.username} (${account.acct})`),
    minChars: 0,
  });

  if (fullUserData?.follows?.length < 10) {
    gameState.maxRounds = fullUserData?.follows?.length || 0;
  }

  maxRoundCounterEl.innerText = gameState.maxRounds;
  playRound(follows);
};

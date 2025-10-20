import randomFromArray from "/js/modules/randomFromArray.min.js";
import initAwesomplete from "/js/modules/initAwesomplete.min.js";

const loadingScreen = document.getElementById("loading");
const profileImage = document.getElementsByClassName("profile-image");
const accountNameEl = document.getElementById("account-name");
const gameInterface = document.getElementById("viz-user");
const answerForm = document.getElementById("answer-form");
const currentAnswerEl = document.getElementById("current-answer");
const roundCounterEl = document.getElementById("round-counter");
const followBio = document.getElementById("follow-bio");
const pointsTotalEl = document.getElementById("points-total");
const resultsSection = document.getElementById("results-section");
const resultsTable = document.getElementById("results-table");
const restartGameBtns = document.getElementsByClassName("restart-game");

let fullUserData;
let follows;
let resumeGame = false;
const gameStateInit = {
  currentRound: 1,
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
  if (gameState.currentRound > 10) {
    answerForm.classList.add("d-none");
    resultsSection.classList.remove("d-none");
    showResults();
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

const showResults = () => {
  let resultsHtml = /* html */ `
    <thead>
      <tr>
        <th>Account</th>
        <th>Your answer</th>
        <th>Result</th>
      </tr>
    </thead>
    <tbody>
  `;

  gameState.rounds.forEach((round, index) => {
    if (gameState.rounds[index]?.userAnswer) {
      const userAnswer = gameState.rounds[index].userAnswer;

      const correctAnswer = `${
        fullUserData.follows[round.accountIndex].username
      } (${fullUserData.follows[round.accountIndex].acct})`;

      const roundResult = correctAnswer === userAnswer;

      resultsHtml += /* html */ `
      <tr>
        <td data-label="Account" class="text-start">
          <div class="d-flex text-start">
            <div class="flex-shrink-0">
              <img width="32" height="32" src="${
                fullUserData.follows[round.accountIndex].avatar
              }" alt="">
            </div>
            <div class="flex-grow-1 ms-0 ms-md-3">
            <strong>${
              fullUserData.follows[round.accountIndex].username
            }</strong><br/>
              ${fullUserData.follows[round.accountIndex].note}
            </div>
          </div>
        </td>
        <td data-label="Your answer" class="text-start">${round.userAnswer}</td>
        <td data-label="Result" class="text-start">${
          roundResult ? `✅ Correct!` : `❌ Incorrect`
        }</td>
      </tr>
    `;
    }
  });

  resultsHtml += `</tbody>`;
  resultsTable.innerHTML = resultsHtml;
  pointsTotalEl.innerText = gameState.points;
};

answerForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  checkAnswer();
});

[...restartGameBtns].forEach((restartGameBtn) => {
  restartGameBtn.addEventListener("click", (ev) => {
    ev.preventDefault();
    localStorage.removeItem("fediverseFollowsData");
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

  setTimeout(() => {
    initAwesomplete("#current-answer", {
      list: follows.map((account) => `${account.username} (${account.acct})`),
      minChars: 0,
    });
  }, 1000);
  playRound(follows);
};

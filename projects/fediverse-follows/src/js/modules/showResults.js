export default (gameStateInit, gameState, fullUserData) => {
  const pointsTotalMaxEl = document.getElementById("points-max");
  const resultsTable = document.getElementById("results-table");
  const pointsTotalEl = document.getElementById("points-total");

  pointsTotalMaxEl.innerText = gameState.maxRounds;

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
      const followAccountURL = `https://${fullUserData.instance}/@${
        fullUserData.follows[round.accountIndex].acct
      }`;

      const imgHTML = fullUserData.instance
        ? /* html */ `
        <a href="${followAccountURL}">
          <img width="32" height="32" src="${
            fullUserData.follows[round.accountIndex].avatar
          }" alt="">
        </a>   
      `
        : /* html */ `
        <img width="32" height="32" src="${
          fullUserData.follows[round.accountIndex].avatar
        }" alt="">      
      `;

      const nameHTML = fullUserData.instance
        ? /* html */ `
        <a href="${followAccountURL}">
          <strong>${
            fullUserData.follows[round.accountIndex].username
          }</strong>        
        </a>   
      `
        : /* html */ `
        <strong>${
          fullUserData.follows[round.accountIndex].username
        }</strong>          
      `;

      resultsHtml += /* html */ `
      <tr>
        <td data-label="Account" class="text-start">
          <div class="d-flex text-start">
            <div class="flex-shrink-0">
              ${imgHTML}
            </div>
            <div class="flex-grow-1 ms-0 ms-md-3">
              ${nameHTML}
            <br/>
              ${fullUserData.follows[round.accountIndex].note}
            </div>
          </div>
        </td>
        <td data-label="Your answer" class="text-start">${round.userAnswer}</td>
        <td data-label="Result" class="text-start">${
          roundResult
            ? `✅ Correct!`
            : userAnswer === "(skipped)"
            ? `⛔ Skipped`
            : `❌ Incorrect`
        }</td>
      </tr>
    `;
    }
  });

  resultsHtml += `</tbody>`;
  resultsTable.innerHTML = resultsHtml;
  pointsTotalEl.innerText = gameState.points;
};

document.addEventListener('DOMContentLoaded', () => {
  const player1Row = document.getElementById('player1-race');
  const player2Row = document.getElementById('player2-race');
  const restartBtn = document.getElementById('restart-btn');
  const progress1 = document.getElementById('progress-player1');
  const progress2 = document.getElementById('progress-player2');
  const winnerMessage = document.getElementById('winner-message');
  const tableWrapper = document.querySelector('.table-wrapper');

  const finishIndex = player1Row.children.length - 1;
  let gameOver = false;
  let positions = { player1: 0, player2: 0 };

  function declareWinner(player) {
    winnerMessage.textContent = player + ' wins! 🏁';
    gameOver = true;
    const winSound = document.getElementById('win-sound');
    if (winSound) {
      winSound.play();
    }
  }


  function updateProgress() {
    progress1.value = positions.player1;
    progress2.value = positions.player2;
  }

  function scrollToLeadPlayer() {
    const leadIndex = Math.max(positions.player1, positions.player2);
    const cellWidth = 40;
    const offset = leadIndex * cellWidth - window.innerWidth / 2 + cellWidth;
    tableWrapper.scrollTo({
      left: offset,
      behavior: 'smooth'
    });
  }

  function movePlayer(row, playerKey) {
    if (gameOver) return;
    let currentPos = positions[playerKey];
    if (currentPos >= finishIndex) return;

    let nextPos = currentPos + 1;
    row.children[currentPos].classList.remove('active');
    row.children[nextPos].classList.add('active');
    positions[playerKey] = nextPos;

    updateProgress();
    scrollToLeadPlayer();

    if (nextPos === finishIndex) {
      declareWinner(playerKey === 'player1' ? 'Player 1' : 'Player 2');
    }
  }

  function turboPlayer(row, playerKey) {
    if (gameOver) return;
    let currentPos = positions[playerKey];
    let turboPos = finishIndex - 1;
    if (currentPos >= turboPos) return;

    row.children[currentPos].classList.remove('active');
    row.children[turboPos].classList.add('active');
    positions[playerKey] = turboPos;

    updateProgress();
    scrollToLeadPlayer();
  }

  function restartGame() {
    gameOver = false;
    winnerMessage.textContent = '';
    positions = { player1: 0, player2: 0 };

    for (let i = 0; i < player1Row.children.length; i++) {
      player1Row.children[i].classList.remove('active');
      player2Row.children[i].classList.remove('active');
    }
    player1Row.children[0].classList.add('active');
    player2Row.children[0].classList.add('active');

    updateProgress();
    scrollToLeadPlayer();
  }

  restartBtn.addEventListener('click', restartGame);

  document.addEventListener('keyup', (e) => {
    if (gameOver) return;
    const key = e.key.toLowerCase();
    if (key === 'q') movePlayer(player1Row, 'player1');
    if (key === 'p') movePlayer(player2Row, 'player2');
    if (key === 'z') turboPlayer(player1Row, 'player1');
    if (key === 'm') turboPlayer(player2Row, 'player2');
  });

  restartGame();
});

// ===== GATOR CHOMP - Game Logic =====

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

// Game state
let targetWord = '';
let currentRow = 0;
let currentTile = 0;
let gameOver = false;
let hardMode = false;
let revealedHints = []; // For hard mode: [{letter, status, position}]

// Stats
let stats = loadStats();

// ===== INITIALIZATION =====

function init() {
  createBoard();
  pickNewWord();
  setupKeyboard();
  setupModals();
  loadHardMode();
  updateStatsDisplay();

  // Physical keyboard
  document.addEventListener('keydown', handleKeyPress);
}

function createBoard() {
  const board = document.getElementById('board');
  board.innerHTML = '';
  for (let r = 0; r < MAX_GUESSES; r++) {
    const row = document.createElement('div');
    row.classList.add('row');
    row.id = `row-${r}`;
    for (let t = 0; t < WORD_LENGTH; t++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.id = `tile-${r}-${t}`;
      row.appendChild(tile);
    }
    board.appendChild(row);
  }
}

function pickNewWord() {
  // Shuffle and pick from answer words
  const idx = Math.floor(Math.random() * ANSWER_WORDS.length);
  targetWord = ANSWER_WORDS[idx].toLowerCase();
}

// ===== INPUT HANDLING =====

function handleKeyPress(e) {
  if (gameOver) return;
  if (e.ctrlKey || e.metaKey || e.altKey) return;

  const key = e.key;
  if (key === 'Enter') {
    submitGuess();
  } else if (key === 'Backspace') {
    deleteLetter();
  } else if (/^[a-zA-Z]$/.test(key)) {
    addLetter(key.toLowerCase());
  }
}

function addLetter(letter) {
  if (currentTile >= WORD_LENGTH) return;
  const tile = document.getElementById(`tile-${currentRow}-${currentTile}`);
  tile.textContent = letter;
  tile.classList.add('filled');
  currentTile++;
}

function deleteLetter() {
  if (currentTile <= 0) return;
  currentTile--;
  const tile = document.getElementById(`tile-${currentRow}-${currentTile}`);
  tile.textContent = '';
  tile.classList.remove('filled');
}

function submitGuess() {
  if (currentTile < WORD_LENGTH) {
    shakeRow(currentRow);
    showToast('Not enough letters');
    return;
  }

  const guess = getGuessWord();

  // Validate word
  if (!isValidWord(guess)) {
    shakeRow(currentRow);
    showToast('Not in word list');
    return;
  }

  // Hard mode check
  if (hardMode && currentRow > 0) {
    const hardModeError = checkHardMode(guess);
    if (hardModeError) {
      shakeRow(currentRow);
      showToast(hardModeError);
      return;
    }
  }

  // Evaluate guess
  const result = evaluateGuess(guess);

  // Store hints for hard mode
  result.forEach((r, i) => {
    if (r.status === 'correct' || r.status === 'present') {
      revealedHints.push({ letter: r.letter, status: r.status, position: i });
    }
  });

  // Animate tiles
  revealTiles(currentRow, result, () => {
    // Update keyboard colors
    updateKeyboard(result);

    const won = guess === targetWord;
    const lost = currentRow >= MAX_GUESSES - 1 && !won;

    if (won) {
      gameOver = true;
      bounceRow(currentRow);
      setTimeout(() => {
        playChompAnimation();
        launchConfetti();
      }, 400);
      setTimeout(() => {
        recordWin(currentRow + 1);
        showStatsModal();
      }, 2400);
    } else if (lost) {
      gameOver = true;
      setTimeout(() => {
        showToast(targetWord.toUpperCase(), 3000);
        recordLoss();
        setTimeout(() => showStatsModal(), 1500);
      }, 500);
    }

    currentRow++;
    currentTile = 0;
  });
}

function getGuessWord() {
  let word = '';
  for (let i = 0; i < WORD_LENGTH; i++) {
    word += document.getElementById(`tile-${currentRow}-${i}`).textContent.toLowerCase();
  }
  return word;
}

function isValidWord(word) {
  return VALID_GUESSES.has(word);
}

// ===== EVALUATION =====

function evaluateGuess(guess) {
  const result = [];
  const targetArr = targetWord.split('');
  const guessArr = guess.split('');
  const targetCount = {};

  // Count letters in target
  targetArr.forEach(l => {
    targetCount[l] = (targetCount[l] || 0) + 1;
  });

  // First pass: mark correct
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessArr[i] === targetArr[i]) {
      result[i] = { letter: guessArr[i], status: 'correct' };
      targetCount[guessArr[i]]--;
    } else {
      result[i] = { letter: guessArr[i], status: 'pending' };
    }
  }

  // Second pass: mark present/absent
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i].status !== 'pending') continue;
    if (targetCount[guessArr[i]] > 0) {
      result[i].status = 'present';
      targetCount[guessArr[i]]--;
    } else {
      result[i].status = 'absent';
    }
  }

  return result;
}

// ===== HARD MODE =====

function checkHardMode(guess) {
  const guessArr = guess.split('');

  // Check correct letters are in the same position
  for (const hint of revealedHints) {
    if (hint.status === 'correct') {
      if (guessArr[hint.position] !== hint.letter) {
        return `${hint.letter.toUpperCase()} must be in position ${hint.position + 1}`;
      }
    }
  }

  // Check present letters are used somewhere
  const presentLetters = {};
  for (const hint of revealedHints) {
    if (hint.status === 'present') {
      presentLetters[hint.letter] = (presentLetters[hint.letter] || 0) + 1;
    }
  }

  for (const [letter, count] of Object.entries(presentLetters)) {
    const guessCount = guessArr.filter(l => l === letter).length;
    if (guessCount < count) {
      return `Guess must contain ${letter.toUpperCase()}`;
    }
  }

  return null;
}

// ===== ANIMATIONS =====

function revealTiles(row, result, callback) {
  const tiles = [];
  for (let i = 0; i < WORD_LENGTH; i++) {
    tiles.push(document.getElementById(`tile-${row}-${i}`));
  }

  tiles.forEach((tile, i) => {
    setTimeout(() => {
      tile.classList.add('flip');

      setTimeout(() => {
        tile.classList.add(result[i].status);
      }, 250);

      if (i === WORD_LENGTH - 1) {
        setTimeout(callback, 300);
      }
    }, i * 300);
  });
}

function shakeRow(row) {
  const rowEl = document.getElementById(`row-${row}`);
  rowEl.classList.add('shake');
  setTimeout(() => rowEl.classList.remove('shake'), 500);
}

function bounceRow(row) {
  for (let i = 0; i < WORD_LENGTH; i++) {
    const tile = document.getElementById(`tile-${row}-${i}`);
    setTimeout(() => {
      tile.classList.add('bounce');
    }, i * 100);
  }
}

function showToast(msg, duration = 1500) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

// ===== GATOR CHOMP ANIMATION =====

function playChompAnimation() {
  const overlay = document.getElementById('chomp-overlay');
  overlay.classList.remove('hidden');

  // Reset animations
  const topJaw = overlay.querySelector('.top-jaw');
  const bottomJaw = overlay.querySelector('.bottom-jaw');
  const text = overlay.querySelector('.chomp-text');

  topJaw.style.animation = 'none';
  bottomJaw.style.animation = 'none';
  text.style.animation = 'none';

  // Trigger reflow
  void topJaw.offsetHeight;

  topJaw.style.animation = 'jaw-top-chomp 1.8s ease-in-out forwards';
  bottomJaw.style.animation = 'jaw-bottom-chomp 1.8s ease-in-out forwards';
  text.style.animation = 'chomp-text-show 1.8s ease forwards';

  setTimeout(() => {
    overlay.classList.add('hidden');
  }, 2200);
}

// ===== CONFETTI =====

function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#FA4616', '#0021A5', '#FF8C42', '#3366FF', '#FFFFFF', '#FFD700'];
  const particles = [];
  const particleCount = 120;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: Math.random() * 10 + 5,
      h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      opacity: 1,
    });
  }

  let frame = 0;
  const maxFrames = 180;

  function animate() {
    if (frame > maxFrames) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.rotation += p.rotationSpeed;

      if (frame > maxFrames - 40) {
        p.opacity = Math.max(0, p.opacity - 0.03);
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    frame++;
    requestAnimationFrame(animate);
  }

  animate();
}

// ===== KEYBOARD =====

function setupKeyboard() {
  const buttons = document.querySelectorAll('#keyboard button');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-key');
      if (!key) return;
      if (gameOver) return;

      if (key === 'Enter') {
        submitGuess();
      } else if (key === 'Backspace') {
        deleteLetter();
      } else {
        addLetter(key);
      }
    });

    // Prevent focus stealing from keyboard
    btn.addEventListener('mousedown', e => e.preventDefault());
  });
}

function updateKeyboard(result) {
  result.forEach(r => {
    const btn = document.querySelector(`#keyboard button[data-key="${r.letter}"]`);
    if (!btn) return;

    const current = btn.classList.contains('correct') ? 'correct'
      : btn.classList.contains('present') ? 'present'
      : btn.classList.contains('absent') ? 'absent'
      : 'none';

    const priority = { none: 0, absent: 1, present: 2, correct: 3 };
    if (priority[r.status] > priority[current]) {
      btn.classList.remove('correct', 'present', 'absent');
      btn.classList.add(r.status);
    }
  });
}

// ===== MODALS =====

function setupModals() {
  // Help modal
  document.getElementById('help-btn').addEventListener('click', () => {
    document.getElementById('help-modal').classList.remove('hidden');
  });

  // Stats modal
  document.getElementById('stats-btn').addEventListener('click', () => {
    updateStatsDisplay();
    showStatsModal();
  });

  // Close modals
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal-overlay').classList.add('hidden');
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.classList.add('hidden');
    });
  });

  // Hard mode toggle
  document.getElementById('hard-mode-btn').addEventListener('click', () => {
    if (currentRow > 0 && !hardMode) {
      showToast('Hard mode can only be enabled at the start');
      return;
    }
    hardMode = !hardMode;
    document.getElementById('hard-mode-btn').classList.toggle('active', hardMode);
    localStorage.setItem('gatorChomp_hardMode', hardMode);
    showToast(hardMode ? 'Hard Mode ON' : 'Hard Mode OFF');
  });

  // Share button
  document.getElementById('share-btn').addEventListener('click', shareResults);

  // New Game button
  document.getElementById('new-game-btn').addEventListener('click', () => {
    document.getElementById('stats-modal').classList.add('hidden');
    startNewGame();
  });
}

function showStatsModal() {
  updateStatsDisplay();
  document.getElementById('post-game-actions').classList.toggle('hidden', !gameOver);
  document.getElementById('stats-modal').classList.remove('hidden');
}

// ===== STATS =====

function loadStats() {
  const saved = localStorage.getItem('gatorChomp_stats');
  if (saved) return JSON.parse(saved);
  return {
    played: 0,
    wins: 0,
    currentStreak: 0,
    maxStreak: 0,
    distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
    lastGuessCount: 0,
  };
}

function saveStats() {
  localStorage.setItem('gatorChomp_stats', JSON.stringify(stats));
}

function recordWin(guessCount) {
  stats.played++;
  stats.wins++;
  stats.currentStreak++;
  stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
  stats.distribution[guessCount]++;
  stats.lastGuessCount = guessCount;
  saveStats();
}

function recordLoss() {
  stats.played++;
  stats.currentStreak = 0;
  stats.lastGuessCount = 0;
  saveStats();
}

function updateStatsDisplay() {
  document.getElementById('stat-played').textContent = stats.played;
  document.getElementById('stat-win-pct').textContent = stats.played > 0
    ? Math.round((stats.wins / stats.played) * 100)
    : 0;
  document.getElementById('stat-streak').textContent = stats.currentStreak;
  document.getElementById('stat-max-streak').textContent = stats.maxStreak;

  // Distribution bars
  const distEl = document.getElementById('guess-distribution');
  distEl.innerHTML = '';
  const maxVal = Math.max(1, ...Object.values(stats.distribution));

  for (let i = 1; i <= 6; i++) {
    const count = stats.distribution[i];
    const pct = (count / maxVal) * 100;
    const isHighlight = stats.lastGuessCount === i && gameOver;

    const row = document.createElement('div');
    row.classList.add('dist-row');
    row.innerHTML = `
      <span class="dist-label">${i}</span>
      <div class="dist-bar ${isHighlight ? 'highlight' : ''}"
           style="width: ${Math.max(8, pct)}%">${count}</div>
    `;
    distEl.appendChild(row);
  }
}

// ===== SHARE =====

function shareResults() {
  const won = stats.lastGuessCount > 0;
  const guessCount = won ? stats.lastGuessCount : 'X';
  let text = `Gator Chomp ${guessCount}/${MAX_GUESSES}${hardMode ? '*' : ''}\n\n`;

  // Build emoji grid
  for (let r = 0; r < (won ? stats.lastGuessCount : MAX_GUESSES); r++) {
    let line = '';
    for (let t = 0; t < WORD_LENGTH; t++) {
      const tile = document.getElementById(`tile-${r}-${t}`);
      if (tile.classList.contains('correct')) line += '\ud83d\udfe7'; // orange square
      else if (tile.classList.contains('present')) line += '\ud83d\udfe6'; // blue square
      else line += '\u2b1b'; // black square
    }
    text += line + '\n';
  }

  text += '\nPlay at: Gator Chomp!';

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied to clipboard!');
    }).catch(() => {
      showToast('Could not copy');
    });
  } else {
    showToast('Could not copy');
  }
}

// ===== NEW GAME =====

function startNewGame() {
  gameOver = false;
  currentRow = 0;
  currentTile = 0;
  revealedHints = [];

  // Reset board
  createBoard();

  // Reset keyboard colors
  document.querySelectorAll('#keyboard button').forEach(btn => {
    btn.classList.remove('correct', 'present', 'absent');
  });

  // Pick new word
  pickNewWord();
}

// ===== HARD MODE PERSISTENCE =====

function loadHardMode() {
  const saved = localStorage.getItem('gatorChomp_hardMode');
  if (saved === 'true') {
    hardMode = true;
    document.getElementById('hard-mode-btn').classList.add('active');
  }
}

// ===== START =====
document.addEventListener('DOMContentLoaded', init);

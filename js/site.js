// =====================================================
// Move Through It — interactive bits
// =====================================================

// ---------- 10-minute routine timer ----------
const ROUTINE = [
  { name: 'Marching in place + arm swings',  seconds: 60, note: 'warm-up' },
  { name: 'Bodyweight squats',                seconds: 45, note: 'strength' },
  { name: 'Standing side leg lifts (alt)',    seconds: 45, note: 'balance' },
  { name: 'Wall or counter push-ups',         seconds: 45, note: 'strength' },
  { name: 'Hip hinges (good-mornings)',       seconds: 45, note: 'strength' },
  { name: 'Heel-to-toe walk, 10 steps each',  seconds: 45, note: 'balance' },
  { name: 'Cat-cow + thoracic rotations',     seconds: 60, note: 'mobility' },
  { name: 'Glute bridges',                    seconds: 45, note: 'core' },
  { name: 'Standing calf raises',             seconds: 45, note: 'bone' },
  { name: 'Slow box-breathing cooldown',      seconds: 75, note: 'reset' },
];

const listEl    = document.getElementById('routine-list');
const labelEl   = document.getElementById('timer-label');
const timeEl    = document.getElementById('timer-time');
const currentEl = document.getElementById('timer-current');
const totalEl   = document.getElementById('timer-total');
const startBtn  = document.getElementById('timer-start');
const pauseBtn  = document.getElementById('timer-pause');
const resetBtn  = document.getElementById('timer-reset');

function fmt(s) {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const r = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${r}`;
}

function renderList() {
  listEl.innerHTML = '';
  ROUTINE.forEach((m, i) => {
    const li = document.createElement('li');
    li.dataset.idx = i;
    li.innerHTML = `<span></span><span>${m.name}</span><span class="move-time">${fmt(m.seconds)}</span>`;
    listEl.appendChild(li);
  });
  totalEl.textContent = ROUTINE.length;
}

let stepIdx = 0;
let remaining = ROUTINE[0].seconds;
let timerId = null;
let running = false;

function paintActive() {
  [...listEl.children].forEach((li, i) => {
    li.classList.toggle('active', i === stepIdx && running);
    li.classList.toggle('done', i < stepIdx);
  });
}

function tick() {
  remaining -= 1;
  if (remaining <= 0) {
    stepIdx += 1;
    if (stepIdx >= ROUTINE.length) {
      finish();
      return;
    }
    remaining = ROUTINE[stepIdx].seconds;
    beep();
  }
  render();
}

function render() {
  timeEl.textContent = fmt(remaining);
  currentEl.textContent = Math.min(stepIdx + 1, ROUTINE.length);
  labelEl.textContent = running ? ROUTINE[stepIdx].note.toUpperCase() : (stepIdx === 0 ? 'Ready?' : 'Paused');
  paintActive();
}

function start() {
  if (running) return;
  if (stepIdx >= ROUTINE.length) reset();
  running = true;
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  timerId = setInterval(tick, 1000);
  render();
}

function pause() {
  if (!running) return;
  running = false;
  clearInterval(timerId);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  startBtn.textContent = 'Resume';
  render();
}

function reset() {
  running = false;
  clearInterval(timerId);
  stepIdx = 0;
  remaining = ROUTINE[0].seconds;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  startBtn.textContent = 'Start';
  render();
}

function finish() {
  running = false;
  clearInterval(timerId);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  startBtn.textContent = 'Start again';
  labelEl.textContent = 'Done! 🎉';
  timeEl.textContent = '00:00';
  [...listEl.children].forEach(li => li.classList.add('done'));
  bigBeep();
}

let audioCtx;
function beep(freq = 660, ms = 120) {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.frequency.value = freq;
    o.type = 'sine';
    o.connect(g); g.connect(audioCtx.destination);
    g.gain.setValueAtTime(0.15, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + ms / 1000);
    o.start();
    o.stop(audioCtx.currentTime + ms / 1000);
  } catch (e) { /* audio unavailable */ }
}
function bigBeep() { beep(523, 200); setTimeout(() => beep(659, 200), 220); setTimeout(() => beep(784, 320), 440); }

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);

renderList();
render();

// ---------- Find My Move picker ----------
const RECS = {
  tired: {
    emoji: '🌿',
    title: 'Restorative reset (5 min)',
    body: 'Low-stim, parasympathetic, hormone-friendly. Perfect for crashing-energy days.',
    steps: [
      'Legs up the wall — 2 minutes',
      'Slow box breathing (4-4-4-4) — 1 minute',
      'Gentle cat-cow on hands and knees — 1 minute',
      'Supported child\'s pose — 1 minute',
    ],
  },
  anxious: {
    emoji: '🚶‍♀️',
    title: 'Walk + breathe (5 min)',
    body: 'Rhythmic cardio + nasal breathing drops cortisol fast.',
    steps: [
      'Brisk walk outside if possible',
      'Inhale 4 steps, exhale 6 steps',
      'Notice 3 things you can see, 2 you can hear, 1 you can smell',
      'Finish with shoulder rolls and a long exhale',
    ],
  },
  stiff: {
    emoji: '🧘‍♀️',
    title: 'Mobility flow (5 min)',
    body: 'Wake up the joints estrogen used to coddle.',
    steps: [
      'Cat-cow × 8 slow rounds',
      'Hip circles — 30 seconds each direction',
      'Thoracic open-the-book — 8 per side',
      'World\'s greatest stretch — 4 per side',
    ],
  },
  hot: {
    emoji: '💧',
    title: 'Cool-down flow (5 min)',
    body: 'Lower core temp without stopping moving.',
    steps: [
      'Seated forward fold — 1 minute',
      'Slow nasal breathing, exhale longer than inhale',
      'Cool wrists with water if available',
      'Gentle neck stretches and shoulder openers',
    ],
  },
  strong: {
    emoji: '💪',
    title: 'Mini strength circuit (5 min)',
    body: 'Channel that energy into bone-building work.',
    steps: [
      'Goblet squats — 12 reps',
      'Push-ups (wall, knee, or full) — 10 reps',
      'Romanian deadlifts — 12 reps',
      'Repeat the circuit twice if you have time',
    ],
  },
  foggy: {
    emoji: '🧠',
    title: 'Brain-on intervals (5 min)',
    body: 'Short bursts spike BDNF and clear the fog.',
    steps: [
      'March or jog in place — 30 seconds hard',
      'Walk and recover — 60 seconds',
      'Repeat 3 more rounds',
      'Finish with 30 seconds of jumping jacks (optional)',
    ],
  },
};

const chips        = document.getElementById('mood-chips');
const question     = document.querySelector('.picker-question');
const result       = document.getElementById('picker-result');
const resultEmoji  = document.getElementById('result-emoji');
const resultTitle  = document.getElementById('result-title');
const resultBody   = document.getElementById('result-body');
const resultSteps  = document.getElementById('result-steps');
const pickerAgain  = document.getElementById('picker-again');

chips.addEventListener('click', e => {
  const btn = e.target.closest('.chip');
  if (!btn) return;
  const rec = RECS[btn.dataset.mood];
  if (!rec) return;
  resultEmoji.textContent = rec.emoji;
  resultTitle.textContent = rec.title;
  resultBody.textContent  = rec.body;
  resultSteps.innerHTML   = rec.steps.map(s => `<li>${s}</li>`).join('');
  question.hidden = true;
  result.hidden = false;
});

pickerAgain.addEventListener('click', () => {
  result.hidden = true;
  question.hidden = false;
});

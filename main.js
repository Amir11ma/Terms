import { Player } from './player.js';
import { isCollide } from './collision.js';

const gc = document.getElementById('gameContainer');
const scoreBoard = document.getElementById('scoreBoard');
const healthFill = document.getElementById('healthFill');
const pauseBtn = document.getElementById('pauseBtn');
const restartBtn = document.getElementById('restartBtn');

let W = gc.clientWidth, H = gc.clientHeight;
let player = new Player(W, H);
player.addTo(gc);

let objects = []; // placeholder for coins/obstacles
let running = true;
let lastTime = performance.now();

function updateUI(){
  scoreBoard.innerText = `سکه‌ها: ${player.score} | جان: ${player.lives} | کل: ${player.storedCoins}`;
  healthFill.style.width = (player.lives / player.maxLives * 100) + '%';
}

function loop(now){
  if(!running){ lastTime = now; requestAnimationFrame(loop); return; }
  const dt = now - lastTime;
  lastTime = now;

  // update objects (placeholder: nothing yet)

  // ensure player stays in bounds
  player.clamp(6, W - player.width - 6);

  updateUI();
  requestAnimationFrame(loop);
}

pauseBtn.addEventListener('click', ()=>{
  running = !running;
  pauseBtn.textContent = running ? '⏸' : '▶';
});

restartBtn.addEventListener('click', ()=>{
  // simple restart: reset player and remove objects
  objects.forEach(o=> o.el && o.el.remove());
  objects = [];
  player.reset();
  running = true;
  lastTime = performance.now();
});

window.addEventListener('resize', ()=>{
  W = gc.clientWidth; H = gc.clientHeight;
  player.onResize(W,H);
});

requestAnimationFrame(loop);
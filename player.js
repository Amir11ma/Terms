export class Player {
  constructor(stageW, stageH){
    this.width = 46; this.height = 46;
    this.x = (stageW - this.width)/2;
    this.y = stageH - this.height - 28;
    this.score = 0;
    this.storedCoins = parseInt(localStorage.getItem('coins')) || 0;
    this.lives = parseInt(localStorage.getItem('currentLives')) || 3;
    this.maxLives = parseInt(localStorage.getItem('maxLives')) || 3;
    this.el = null;
    this.stageW = stageW; this.stageH = stageH;
  }

  addTo(container){
    if(this.el) return;
    const div = document.createElement('div');
    div.className = 'player';
    div.style.left = this.x + 'px';
    div.style.bottom = '28px';
    div.innerHTML = '<div class="eye"></div>';
    container.appendChild(div);
    this.el = div;
    this.initControls();
  }

  initControls(){
    // simple keyboard
    window.addEventListener('keydown', e=>{
      if(e.key === 'ArrowLeft') this.x -= 18;
      if(e.key === 'ArrowRight') this.x += 18;
      this.updateEl();
    });
    // touch drag
    let touching=false, lastX=0;
    this.el.addEventListener('touchstart', e=>{ touching=true; lastX=e.touches[0].clientX; });
    window.addEventListener('touchmove', e=>{
      if(!touching) return;
      const dx = e.touches[0].clientX - lastX;
      this.x += dx;
      lastX = e.touches[0].clientX;
      this.updateEl();
    });
    window.addEventListener('touchend', ()=>{ touching=false; });
  }

  updateEl(){
    if(!this.el) return;
    this.el.style.left = this.x + 'px';
  }

  clamp(minX, maxX){
    if(this.x < minX) this.x = minX;
    if(this.x > maxX) this.x = maxX;
    this.updateEl();
  }

  reset(){
    this.score = 0;
    this.lives = this.maxLives;
    this.updateEl();
  }

  onResize(W,H){
    this.stageW = W; this.stageH = H;
    this.x = Math.min(this.x, W - this.width - 6);
    this.updateEl();
  }
}
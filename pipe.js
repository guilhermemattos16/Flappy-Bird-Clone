var vez = true;
function Pipe(){
  this.top = random(150, (height)/2);
  this.bottom = random(150, (height)/2);
  this.x = width;
  this.w = 50;
  this.speed = 2;

  this.highlight = false;

  this.hits = function(bird){
    if (this.top > 300 && this.bottom > 300){
      if(vez) {
        this.top -= 70;
        vez = false;
      }
      else {
        this.bottom -= 70;
        vez = true;
      }
    }
    if (bird.y < this.top || bird.y > height - this.bottom){
      if (bird.x > this.x && bird.x < this.x+this.w){
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  }

  this.show = function(){
    fill(34,139,34);
    if (this.highlight){
      fill(255,0,0);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height-this.bottom, this.w, this.bottom);
  }

  this.update = function(){
    this.x -= this.speed;
  }
}

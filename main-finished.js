
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var span = document.querySelector('span');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

//define Shape constructor
function Shape(x, y, exists){
  this.x = x;
  this.y = y;
  this.exists = exists
}

// define Ball constructor

function Ball(x,y,velX,velY,exists,color, size) {
  Shape.call(this,x,y,exists);
  this.color = color;
  this.size = size;
  this.velX = velX;
  this.velY = velY;
}

//define EvilCircle constructor恶魔圈
function EvilCircle(x,y,exists){
  Shape.call(this,x,y,exists);
  this.color='white';
  this.size=10;
  this.velX=20;
  this.velY=20;
}

EvilCircle.prototype.draw=function(){
  ctx.beginPath();
  ctx.strokeStyle=this.color;
  ctx.lineWidth = 3;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
}

EvilCircle.prototype.checkBounds= function(){
  if((this.x + this.size) >= width) {
      this.x = width-this.size;
    }

    if((this.x - this.size) <= 0) {
      this.x = this.size;
    }

    if((this.y + this.size) >= height) {
      this.y = height-this.size;
    }

    if((this.y - this.size) <= 0) {
      this.y = this.size;
    }

}

EvilCircle.prototype.setControls = function(){
  var that = this;  
  window.onkeydown = function(e){
    if(e.keyCode ===65){
      that.x-=that.velX;
    }else if(e.keyCode ===68){
      that.x+=that.velX;
    }else if(e.keyCode ===87){
      that.y-=that.velX;
    }else if(e.keyCode ===83){
      that.y+=that.velX;
    }
  }
}

// define ball draw method

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

// define ball update method

Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

//吃小球
EvilCircle.prototype.collisionDetect = function(){
  for(var j = 0; j < balls.length; j++) {  
    if(balls[j].exists==true){//检验是否存在
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);//这个小球和别的间距

      if (distance < this.size + balls[j].size) {
        // balls[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
        //吃小球
        balls[j].exists=false;
      }  
    }
  }
}


// define ball collision detection

Ball.prototype.collisionDetect = function() {
  for(var j = 0; j < balls.length; j++) {
    if(!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
      }
    }
  }
};

// define array to store balls

var balls = [];
var evilCircle = new EvilCircle(20,20,true);
evilCircle.setControls();
// define loop that keeps drawing the scene constantly

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);

  while(balls.length < 25) {
    var ball = new Ball(
      random(0,width),
      random(0,height),
      random(-7,7),
      random(-7,7),
      true,
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      random(10,20)
    );
    balls.push(ball);
  }
var ballnum=0;
  for(var i = 0; i < balls.length; i++) {
    if(balls[i].exists==true){
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
      ballnum++;
    }
  }
  
  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();
  
  span.innerHTML='Ball count: '+ballnum;
  

  requestAnimationFrame(loop);
}



loop();

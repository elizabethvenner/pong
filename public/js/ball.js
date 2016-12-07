var Ball = function(){
  this.x = 300
  this.y = 20
  this.xSpeed = 3
  this.ySpeed = 2
};

Ball.prototype.draw = function(){
  context.beginPath();
  context.arc(this.x,this.y,7,0,Math.PI*2,true)
  context.fillStyle = "white";
  context.closePath();
  context.fill();
};


Ball.prototype.bouncePaddle = function(){
  this.xSpeed = -this.xSpeed;
};

Ball.prototype.bounceWall = function(){
  this.ySpeed = -this.ySpeed;
};

Ball.prototype.update = function(){
  this.x += this.xSpeed;
  this.y += this.ySpeed;
};

Ball.prototype.reset = function(){
  this.x = 300;
  this.y = 20;
  this.xSpeed = 3;
  this.ySpeed = 2;
};
module.exports = Ball;

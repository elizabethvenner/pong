var animate = window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
function (callback) {window.setTimeout(callback, 10000 / 60)};

(function init(){
  var canvas = document.getElementById("canvas");
  context = canvas.getContext('2d');
  game = new GameBox();
  ball = new Ball();
  paddle1 = new Paddle(context, 550, 150);
  animate(play);
})();

function play(){
  draw();
  update();
  animate(play);
}

var draw = function(){
  game.draw();
  ball.draw();
  paddle1.draw();
}

var update = function(){
  ball.update();
  updatePaddle(paddle1)
}


function updatePaddle(paddle) {
  if (keydown.up) {
    paddle.update(-5);
  }
  if (keydown.down) {
    paddle.update(5);
  }
}

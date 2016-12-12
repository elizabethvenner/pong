/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

<<<<<<< HEAD
	var socket;
	var localPlayer;
	var opponent;
	var localBall;
	var context;
	var canvas;
	var gameBox;
	var gameController;
=======
>>>>>>> 695eba5ab3867bc3906fe25dee70a35e1f9c940d
	var GameController = __webpack_require__(1);
	var GameBox = __webpack_require__(2);
	var Ball = __webpack_require__(3);
	var Player = __webpack_require__(4);
	var Paddle = __webpack_require__(5);
	var keydown = __webpack_require__(6);
<<<<<<< HEAD
	__webpack_require__(7);

	var animate = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	function (callback) {window.setTimeout(callback, 10000 / 60)};

	function init(){
	  canvas = document.getElementById("canvas");
	  context = canvas.getContext('2d');
	  gameBox = new GameBox(context);
	  console.log(gameBox);
	  // localBall = new Ball(context);
	  socket = io.connect('http://localhost:3000');
	  setEventHandlers();
	};
=======
	var animate = __webpack_require__(7);
	__webpack_require__(8);

	var socket;
	var localPlayer;
	var opponent;
	var localBall;
	var context;
	var canvas;
	var gameBox;
	var gameController;
>>>>>>> 695eba5ab3867bc3906fe25dee70a35e1f9c940d

	var signDiv = document.getElementById('signDiv');
	var play = document.getElementById('signIn');
	var newUsername = document.getElementById('username');

	play.onclick = function(){
	  signDiv.style.display = 'none';
	  socket.emit('user sign in', {username: newUsername.value});
	}

	function onSocketConnected() {
	  console.log("Connected to socket server");
	}

	function onSocketDisconnect() {
		console.log("Disconnected from socket server");
	}

	function onServerMovePlayer(data) {
	  if (data.id === opponent.id) {
	    opponent.paddle.setY(data.y);
	  }
	}

	function onServerMovesBall(data) {
	  localBall.setCoordinates(data);
<<<<<<< HEAD
	  console.log(data);
=======
	}

	function onServerUpdatesScores(data) {
	  gameController.setScores(data);
>>>>>>> 695eba5ab3867bc3906fe25dee70a35e1f9c940d
	}

	function setEventHandlers() {
		// Socket connection successful
		socket.on("connect", onSocketConnected);
		// Socket disconnection
		socket.on("disconnect", onSocketDisconnect);
		// Player move message received
<<<<<<< HEAD
		socket.on("server moves player", onMovePlayer);
	  socket.on("draw game", onServerMovesBall);
=======
		socket.on("server moves player", onServerMovePlayer);
	  socket.on("server moves ball", onServerMovesBall);
	  socket.on("server updates scores", onServerUpdatesScores);
>>>>>>> 695eba5ab3867bc3906fe25dee70a35e1f9c940d
	  socket.on("start game", startGame);
	};

	function myId() {
	  return socket.io.engine.id;
	}

	function startGame(gameData){
	  console.log("Starting game:");
	  for(var i = 0; i < gameData.players.length; i++) {
	    var player = gameData.players[i];
	    var paddle = new Paddle(player.x, player.y, context);
	    if (player.id === myId()) {
	      localPlayer = new Player(paddle, context, player.name);
	      localPlayer.id = myId();
	    } else {
	      opponent = new Player(paddle, context, player.name);
	      opponent.id = player.id;
	    }
	  }
<<<<<<< HEAD
	  createBall(context, gameData.ballCoordinates, createGameController);
	    console.log(gameBox);
	    console.log(localBall);
	    console.log(localPlayer);
	  // // localBall.setCoordinates(gameData.ballCoordinates);
	  // console.log(1);
	  // console.log(gameData.ballCoordinates);
	  // console.log(localBall);
	  // gameController = new GameController(localBall, gameBox, localPlayer, opponent);
	  // console.log(2);

	}

	function createBall(context, ballCoordinates, callback) {
	  localBall = new Ball(context, ballCoordinates);
	  callback(localBall, gameBox, localPlayer, opponent);
	}
=======
	  localBall = new Ball(context);
	  console.log(localBall);
	  localBall.setCoordinates(gameData.ballCoordinates);
	  gameController = new GameController(localBall, gameBox, localPlayer, opponent);
>>>>>>> 695eba5ab3867bc3906fe25dee70a35e1f9c940d

	function createGameController(a, b, c, d) {
	  gameController = new GameController(a, b, c, d);
	  animate(gameLoop);
	}

	function gameLoop(){
	  checkForPaddleMove();
	  draw();
	  animate(gameLoop);
	}

	var draw = function(){
	  gameController.drawGame();
	};

<<<<<<< HEAD
	var update = function(){
	  socket.emit("update game controller");
	  if (keydown.down) {
	    localPlayer.paddle.moveDown();
	    socket.emit("client moves player", {y: localPlayer.paddle.getY()});
	  }
	  if (keydown.up) {
	    localPlayer.paddle.moveUp();
	    socket.emit("client moves player", {y: localPlayer.paddle.getY()});
	  }
	};

	init();
=======
	var lastPaddleMove = 0;
	var checkForPaddleMove = function(){
	  var timeNow = new Date();
	  var timeSinceLastMove = timeNow - lastPaddleMove;

	  if (timeSinceLastMove < 15) {
	    return;
	  }

	  var paddleMoved = false;
	  if (keydown.down) {
	    localPlayer.paddle.moveDown();
	    paddleMoved = true;
	  } else if (keydown.up) {
	    localPlayer.paddle.moveUp();
	    paddleMoved = true;
	  }

	  if (paddleMoved) {
	    socket.emit("client moves player", {y: localPlayer.paddle.getY()});
	    lastPaddleMove = timeNow;
	  }
	};

	(function init(){
	  canvas = document.getElementById("canvas");
	  context = canvas.getContext('2d');
	  gameBox = new GameBox(context);
	  socket = io.connect('http://localhost:3000');
	  setEventHandlers();
	})();
>>>>>>> 695eba5ab3867bc3906fe25dee70a35e1f9c940d


/***/ },
/* 1 */
/***/ function(module, exports) {

	var GameController = function(ball, gameBox, player1, player2){
	  this.ball = ball;
	  this.gameBox = gameBox;
	  this.player1 = player1;
	  this.player2 = player2;
	};

<<<<<<< HEAD
	  // GameController.prototype.ballHitsPaddle = function(){
	  //   if(this.ball.x > this.player1.paddle.x && this.ball.x < (this.player1.paddle.x + this.player1.paddle.width) && (this.ball.y >= this.player1.paddle.y && this.ball.y <= (this.player1.paddle.y + this.player1.paddle.height))) {
	  //     this.ball.bouncePaddle();
	  //   }
	  //   if(this.ball.x > this.player2.paddle.x && this.ball.x < (this.player2.paddle.x + this.player2.paddle.width) && (this.ball.y >= this.player2.paddle.y && this.ball.y <= (this.player2.paddle.y + this.player2.paddle.height))) {
	  //     this.ball.bouncePaddle();
	  //   }
	  // };
	  //
	  // GameController.prototype.ballHitsWall = function(){
	  //   if(this.ball.y <= this.gameBox.y || this.ball.y > this.gameBox.height) {
	  //     this.ball.bounceWall();
	  //   }
	  // };
	  //
	  // GameController.prototype.ballGoesOutOfPlay = function(){
	  //   if (this.ball.x >= this.gameBox.width) {
	  //     this.player2.increaseScore();
	  //     this.ball.reset();
	  //   } else if (this.ball.x <= this.gameBox.x) {
	  //     this.player1.increaseScore();
	  //     this.ball.reset();
	  //   }
	  // };
	  //
	  // GameController.prototype.update = function(){
	  //   this.ball.update();
	  //   this.ballHitsWall();
	  //   this.ballHitsPaddle();
	  //   this.ballGoesOutOfPlay();
	  // };

=======
>>>>>>> 695eba5ab3867bc3906fe25dee70a35e1f9c940d
	  GameController.prototype.drawGame = function(){
	    this.gameBox.draw();
	    console.log('ball in gameController')
	    console.log(this.ball);
	    this.ball.draw();
	    this.player1.draw();
	    this.player2.draw();
	  };

	  GameController.prototype.setScores = function(scores) {
	    var player1Score = scores.player1Score;
	    var player2Score = scores.player2Score;
	    this.player1.setScore(player1Score);
	    this.player2.setScore(player2Score);
	  };

	  module.exports = GameController;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function GameBox(context){
	  this.context = context;
	  this.height = 400;
	  this.width= 600;
	  this.x = 0;
	  this.y = 0;
	};

	GameBox.prototype.draw = function(){
	  this.context.beginPath();
	  this.context.rect(this.x, this.y, this.width, this.height)
	  this.context.fillStyle = "black";
	  this.context.fill();
	  this.context.closePath();
	};

	module.exports = GameBox;


/***/ },
/* 3 */
/***/ function(module, exports) {

<<<<<<< HEAD
	var Ball = function(context, ballCoordinates){
	  console.log('hello from ball.js');
	  //console.log(ballCoordinates); - this logs
	  //console.log(ballCoordinates.x); - this also logs
	  this.x = ballCoordinates.x;
	  console.log(this.x);
	  this.y = ballCoordinates.y;
=======
	var Ball = function(context){
>>>>>>> 695eba5ab3867bc3906fe25dee70a35e1f9c940d
	  this.context = context;
	};

	Ball.prototype.draw = function(){
	  console.log('ball is being drawn');
	  this.context.beginPath();
	  this.context.arc(this.x, this.y, 7, 0, Math.PI*2, true)
	  this.context.fillStyle = "white";
	  this.context.closePath();
	  this.context.fill();
	  console.log('ball is still being drawn');
	};

	Ball.prototype.setCoordinates = function (ballCoordinates) {
	  this.x = ballCoordinates.x;
	  this.y = ballCoordinates.y;
<<<<<<< HEAD
	  console.log('hello from ball.js');
	  console.log(ballCoordinates);
	};
	// Ball.prototype.bouncePaddle = function(){
	//   this.xSpeed = -this.xSpeed;
	// };
	//
	// Ball.prototype.bounceWall = function(){
	//   this.ySpeed = -this.ySpeed;
	// };
	//
	// Ball.prototype.update = function(){
	//   this.x += this.xSpeed;
	//   this.y += this.ySpeed;
	// };
	//
	// Ball.prototype.reset = function(){
	//   this.x = 300;
	//   this.y = 20;
	//   this.xSpeed = 3;
	//   this.ySpeed = 2;
	// };
=======
	};

>>>>>>> 695eba5ab3867bc3906fe25dee70a35e1f9c940d
	module.exports = Ball;


/***/ },
/* 4 */
/***/ function(module, exports) {

	function Player (paddle, context, name) {
	  this.score = 0;
	  this.id
	  this.paddle = paddle;
	  this.context = context;
	  this.name = name
	}

	Player.prototype.draw = function() {
	  this.paddle.draw();
	  this.paddle.draw();
	  this.context.fillText("vs", 300, 10);
	  this.context.fillText(this.name, this.paddle.x - 10, 10);
	  this.context.fillText(this.score, this.paddle.x, 20);
	};

	Player.prototype.setName = function(name){
	  this.name = name;
	};

	Player.prototype.setScore = function(score){
	  this.score = score;
	};

	module.exports = Player;


/***/ },
/* 5 */
/***/ function(module, exports) {

	function Paddle(x, y, context) {
	  this.color = "white";
	  this.width = 15;
	  this.height = 70;
	  this.x = x;
	  this.y = y;
	  this.ySpeed = 5;
	  this.context = context;
	}

	Paddle.prototype.draw = function() {
	  this.context.fillStyle = this.color;
	  this.context.fillRect(this.x, this.y, this.width, this.height);
	};

	Paddle.prototype.moveDown = function() {
	   if (this.y < 330) {
	     this.y += this.ySpeed;
	   }
	};

	Paddle.prototype.moveUp = function(value) {
	  if (this.y > 0) {
	    this.y -= this.ySpeed;
	  }
	};

	Paddle.prototype.setY = function(y) {
	  this.y = y;
	};

	Paddle.prototype.setX = function(x) {
	  this.x = x;
	};

	Paddle.prototype.getY = function() {
	  return this.y;
	};

	Paddle.prototype.getX = function() {
	  return this.x;
	};

	module.exports = Paddle;


/***/ },
/* 6 */
/***/ function(module, exports) {

	 window.keydown = {};

	 function keyName(event) {
	   return jQuery.hotkeys.specialKeys[event.which] ||
	     String.fromCharCode(event.which).toLowerCase();
	 }

	 $(document).bind("keydown", function(event) {
	   keydown[keyName(event)] = true;
	 });

	 $(document).bind("keyup", function(event) {
	   keydown[keyName(event)] = false;
	 });

	 module.exports = keydown;


/***/ },
/* 7 */
/***/ function(module, exports) {

	var animate = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	function (callback) {window.setTimeout(callback, 10000 / 60)};

	module.exports = animate;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/*
	* jQuery Hotkeys Plugin
	* Copyright 2010, John Resig
	* Dual licensed under the MIT or GPL Version 2 licenses.
	*
	* Based upon the plugin by Tzury Bar Yochay:
	* http://github.com/tzuryby/hotkeys
	*
	* Original idea by:
	* Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
	*/


	module.exports = (function(jQuery){

		jQuery.hotkeys = {
			version: "0.8",

			specialKeys: {
				8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
				20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
				37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del",
				96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
				104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/",
				112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8",
				120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
			},

			shiftNums: {
				"`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&",
				"8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<",
				".": ">",  "/": "?",  "\\": "|"
			}
		};

		function keyHandler( handleObj ) {
			// Only care when a possible input has been specified
			if ( typeof handleObj.data !== "string" ) {
				return;
			}

			var origHandler = handleObj.handler,
			keys = handleObj.data.toLowerCase().split(" ");

			handleObj.handler = function( event ) {
				// Don't fire in text-accepting inputs that we didn't directly bind to
				if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||
				event.target.type === "text") ) {
					return;
				}

				// Keypress represents characters, not special keys
				var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
				character = String.fromCharCode( event.which ).toLowerCase(),
				key, modif = "", possible = {};

				// check combinations (alt|ctrl|shift+anything)
				if ( event.altKey && special !== "alt" ) {
					modif += "alt+";
				}

				if ( event.ctrlKey && special !== "ctrl" ) {
					modif += "ctrl+";
				}

				// TODO: Need to make sure this works consistently across platforms
				if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
					modif += "meta+";
				}

				if ( event.shiftKey && special !== "shift" ) {
					modif += "shift+";
				}

				if ( special ) {
					possible[ modif + special ] = true;

				} else {
					possible[ modif + character ] = true;
					possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true;

					// "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
					if ( modif === "shift+" ) {
						possible[ jQuery.hotkeys.shiftNums[ character ] ] = true;
					}
				}

				for ( var i = 0, l = keys.length; i < l; i++ ) {
					if ( possible[ keys[i] ] ) {
						return origHandler.apply( this, arguments );
					}
				}
			};
		}

		jQuery.each([ "keydown", "keyup", "keypress" ], function() {
			jQuery.event.special[ this ] = { add: keyHandler };
		});

	})( jQuery );


/***/ }
/******/ ]);
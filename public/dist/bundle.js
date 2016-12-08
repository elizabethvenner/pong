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

	var GameController = __webpack_require__(1);
	var GameBox = __webpack_require__(2);
	var Ball = __webpack_require__(3);
	var Player = __webpack_require__(4);
	var Paddle = __webpack_require__(5);
	var keydown = __webpack_require__(6);
	__webpack_require__(7);

	var animate = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	function (callback) {window.setTimeout(callback, 10000 / 60)};

	(function init(){
	  var canvas = document.getElementById("canvas");
	  context = canvas.getContext('2d');
	  game = new GameBox();
	  ball = new Ball();
	  paddle1 = new Paddle(570, 150);
	  paddle2 = new Paddle(15, 150);
	  player1 = new Player(paddle1);
	  player2 = new Player(paddle2);
	  gameController = new GameController(ball, game, player1, player2);
	  animate(play);
	})();

	function play(){
	  draw();
	  update();
	  animate(play);
	}

	var draw = function(){
	  gameController.drawGame();
	};

	var update = function(){
	  gameController.update();
	  gameController.movePaddle();
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	var GameController = function(ball, gamebox, player1, player2){
	  this.ball = ball;
	  this.gameBox = gamebox;
	  this.player1 = player1;
	  this.player2 = player2;
	};

	  GameController.prototype.ballHitsPaddle = function(){
	    if(this.ball.x > this.player1.paddle.x && this.ball.x < (this.player1.paddle.x + this.player1.paddle.width) && (this.ball.y >= this.player1.paddle.y && this.ball.y <= (this.player1.paddle.y + this.player1.paddle.height))) {
	      ball.bouncePaddle();
	    }
	    if(this.ball.x > this.player2.paddle.x && this.ball.x < (this.player2.paddle.x + this.player2.paddle.width) && (this.ball.y >= this.player2.paddle.y && this.ball.y <= (this.player2.paddle.y + this.player2.paddle.height))) {
	      ball.bouncePaddle();
	    }
	  };

	  GameController.prototype.ballHitsWall = function(){
	    if(this.ball.y <= this.gameBox.y || this.ball.y > this.gameBox.height) {
	      ball.bounceWall();
	    }
	  };

	  GameController.prototype.ballGoesOutOfPlay = function(){
	    if (this.ball.x >= this.gameBox.width) {
	      this.player2.increaseScore();
	      this.ball.reset();
	    } else if (this.ball.x <= this.gameBox.x) {
	      this.player1.increaseScore();
	      this.ball.reset();
	    }
	  };

	  GameController.prototype.update = function(){
	    this.ballHitsWall();
	    this.ballHitsPaddle();
	    this.ballGoesOutOfPlay()
	    this.ball.update();
	  };

	  GameController.prototype.drawGame = function(){
	    this.gameBox.draw();
	    this.ball.draw();
	    this.player1.paddle.draw();
	    this.player2.paddle.draw();
	    this.player1.draw();
	    this.player2.draw();
	  };

	  GameController.prototype.movePaddle = function(){
	    updatePaddle1();
	    updatePaddle2();
	  };

	  var updatePaddle1 = function() {
	    if (keydown.down) {
	      this.player1.paddle.moveDown();
	    }
	    if (keydown.up) {
	      this.player1.paddle.moveUp();
	    }
	  };

	  var updatePaddle2 = function() {
	    if (keydown.ctrl) {
	      this.player2.paddle.moveDown();
	    }
	    if (keydown.shift) {
	      this.player2.paddle.moveUp();
	    }
	  };

	  module.exports = GameController;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function GameBox(){
	  this.height = 400;
	  this.width= 600;
	  this.x = 0;
	  this.y = 0;
	};

	GameBox.prototype.draw = function(){
	  context.beginPath();
	  context.rect(this.x, this.y, this.width, this.height)
	  context.fillStyle = "black";
	  context.fill();
	  context.closePath();
	};

	module.exports = GameBox;


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ },
/* 4 */
/***/ function(module, exports) {

	function Player (paddle) {
	  this.score = 0;
	  this.paddle = paddle;
	};

	Player.prototype.increaseScore = function() {
	  this.score++;
	};

	Player.prototype.draw = function() {
	  context.fillText(this.score, this.paddle.x, 15);
	};

	module.exports = Player;


/***/ },
/* 5 */
/***/ function(module, exports) {

	function Paddle(x, y) {
	  this.color = "white";
	  this.width = 15;
	  this.height = 70;
	  this.x = x;
	  this.y = y;
	  this.ySpeed = 5;
	}

	Paddle.prototype.draw = function() {
	  context.fillStyle = this.color;
	  context.fillRect(this.x, this.y, this.width, this.height);
	};

	Paddle.prototype.moveDown = function() {
	   if (this.y < 330) {this.y += this.ySpeed}
	};

	Paddle.prototype.moveUp = function(value) {
	  if (this.y > 0) {this.y -= this.ySpeed}
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
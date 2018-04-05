'use strict'

var gameScreen;

//Game constructor
function Game (parentElement) {  // the local variable parentElement
  var self = this;
  
  self.container = parentElement;
  self.canvasElement = null;
  self.gameScreen = null;
  
  self.player = new Player();
  self.moon = null;
  self.aliens = [];
  self.isFinished = false;
  
  self.keyDownHandle = false;
  self.keyUpHandler = false;
  
  // creates the moon 30 seconds after the game starts
  // @todo hold on to the self.createMoonTimeoutId so that we can clear that one too in case of collus
  window.setTimeout(function () {  //
    self.moon = new Moon();
  }, 10000);
}

// this is clled by main.js immediately adter the game ia created
// the purpose is for the game to store the callback function
// the game will later call that callback, when it ends
Game.prototype.onEnded = function (callbackFunction) {
  var self = this; 

  self.callbackFunction = callbackFunction;
};


Game.prototype.build = function () {
  var self = this;  //game html
  self.gameScreen = createHtml(`  
    <div class="game-screen">
      <canvas width="500" height="500">
    </div>
  `);
 
  self.canvasElement = self.gameScreen.querySelector('canvas');  //connects canvas to game 
  self.ctx = self.canvasElement.getContext('2d');
  
  self.container.appendChild(self.gameScreen); 
};

Game.prototype.start = function(){
  var self = this;
  self.createAliensIntervalId = window.setInterval(function () {  //every second calls new alien
    self.aliens.push(new Alien()); //push new alien to alien array
  }, 1000);
  self.frame();
};

 

Game.prototype.frame = function() {
  var self = this;
   
  for(var x = 0; x < self.aliens.length; x++) {   //call all aliens, update 
    self.aliens[x].update();
  }
  self.player.update(); //update player
  
  if(self.moon){
    self.moon.update();
  }

  self.purgeAliens();  //delete aliens outside of screen
  self.detectCollisions(); //detect collision  btween player and aliens
  self.detectMoonLanding(); //detect landing of player and moon

  self.ctx.clearRect(0,0,500,500);  //delete all aliens and player  
  //draw moon
  
  for (var i = 0; i < self.aliens.length; i++) {  //draw aliens
    self.aliens[i].draw(self.ctx);
  }
  if (self.moon) {
    self.moon.draw(self.ctx);
  }
  self.player.draw(self.ctx); //draw player

  window.requestAnimationFrame(function () { //makes it animated ?  
    if (!self.isFinished) {
      self.frame() ;//calls frame function
    }
  });
};


Game.prototype.purgeAliens = function(){  //delete aliens that are not visible in screen 
  var self = this;
  self.aliens = self.aliens.filter(function(alien){ 
    if (alien.position.y < 500){ 
      return true;
    }
  });
}

Game.prototype.detectCollisions = function(){
  var self = this;
  self.aliens.forEach = function(alien){ 
    var player = {
      leftEdge: self.player.position.x,
      rightEdge: self.player.position.x + self.player.size.x,
      topEdge: self.player.position.y,
      bottomEdge: self.player.position.y + self.player.size.y
    }
    var alien = {
      leftEdge: aliens.position.x,
      rightEdge: aliens.position.x + aliens.size.x,
      topEdge: aliens.position.y,
      bottomEdge: aliens.position.y + aliens.size.y
    }
    if(alien.leftEdge < player.leftEdge && player.leftEdge < alien.rightEdge){
      if(alien.topEdge < player.topEdge && player.topEdge < alien.bottomEdge ){
        console.log('buiggh');
      }
      if (alien.topEdge < player.bottomEdge && player.bottomEdge < alien.bottomEdge) {
        console.log("gyi;g;");
      }
    }
    if(alien.leftEdge < player.rightEdge && player.rightEdge < alien.rightEdge){
      if (alien.topEdge < player.topEdge && player.topEdge < alien.bottomEdge){
        console.log("jiohioha");
      }
      if(alien.topEdge < player.bottomEdge && player.bottomEdge < alien.bottomEdge){
        console.log('huoikl');
      }
    }
  };
};

Game.prototype.detectMoonLanding = function() {
  var self = this;

  if (self.moon && self.moon.position.y === -26){
    self.isFinished = true;
  }
};

Game.prototype.destroy = function(didWin){ 
  var self = this;
  window.clearInterval(self.createAliensIntervalId);
  self.isFinished = true;
  (self.didWin);
};

Game.prototype.destroy = function(){ //destroy game page
  var self = this;
  
  self.gameScreen.remove();    
};

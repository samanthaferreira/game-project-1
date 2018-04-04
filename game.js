'use strict'

var gameScreen;

//Game constructor
function Game (parentElement) {  // the local variable parentElement
  var self = this;
  
  self.container = parentElement;
  self.gameScreen = null;
  self.player = new Player;
  self.aliens = [];
  self.canvasElement = null;
  self.keyDownHandle = false;
  self.keyUpHandler = false;
  
}

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
  window.setInterval (function() {  //every second calls new alien
  self.aliens.push(new Alien())  //push new alien to alien array
}, 1000);

self.frame();
};

 

Game.prototype.frame = function() {
  var self = this;
   
  for(var x = 0; x < self.aliens.length; x++) {   //call all aliens, update 
    self.aliens[x].update();
  }
  self.player.update(); //update player

  self.purgeAliens();
  self.detectCollisions();

  self.ctx.clearRect(0,0,500,500);  //delete all aliens and player  

  
  for(var i = 0; i < self.aliens.length; i++) {  //draw aliens
    self.aliens[i].draw(self.ctx);
  }
  self.player.draw(self.ctx); //draw player

  window.requestAnimationFrame(function () { //makes it animated ?  
    self.frame();//calls frame function
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

Game.prototype.detectCollisions = function(){  //delete aliens that are not visible in screen 
  var self = this;
  self.aliens.forEach(function(alien){ 
    // alien.x > self.player.x + self.player.width
  });
}

Game.prototype.destroy = function(){ //destroy game page
  var self = this;
  
  self.gameScreen.remove();    
};

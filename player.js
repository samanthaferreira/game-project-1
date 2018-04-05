'use strict'

function Player () {
  var self = this;

  self.position = { //set position
      x: 0,
      y: 450,  
     

  }
   
  self.rightPressed = false;  //right and left button will start at false 
  self.leftPressed = false;
  
  self.keyDownHandler = function (event){ // when user is holding down the button
    if(event.keyCode ===39){
      self.rightPressed = true;  // true because user is holding button
    }else if (event.keyCode === 37){
      self.leftPressed = true;
    }
  }
  self.keyUpHandler = function(event){ //when user let go of button
    if(event.keyCode === 39){
      self.rightPressed = false;  //false bc user is not holding button
    } else if (event.keyCode === 37){
      self.leftPressed = false;
    }
  }

  document.addEventListener('keydown',self.keyDownHandler, false); //eventlistener waits for the user to click
  document.addEventListener('keyup', self.keyUpHandler, false);
}  //close player

Player.prototype.update = function(){  //updates player position
  var self = this;
  if(self.rightPressed === true){ //updates position when pressed right 
     if (self.position.x < 450){
      return self.position.x++; 
      } else return self.position.x--;
  
    } else if (self.leftPressed === true){  //updates position when pressed left 
      if (self.position.x >= 0){
      return self.position.x--;
    } else return self.position.x++;
  }
  
}


Player.prototype.draw = function(ctx){  //draws player
  var self = this;
  ctx.fillStyle = 'red';
  ctx.fillRect(self.position.x, self.position.y, 50, 50);
}

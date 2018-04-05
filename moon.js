'use strict'

function Moon () {
    var self = this;
  
    self.position = { //set position
        x: 0,
        y: -500 
    }
}
  

Moon.prototype.update = function(){
    var self = this;
    self.position.y ++; 
  
}


Moon.prototype.draw = function(ctx){  //draws player
    var self = this;
    ctx.fillStyle = 'black';
    ctx.fillRect(self.position.x ,self.position.y, 500, 500);

  }

'use strict'

function Moon () {
    var self = this;
  
    self.position = { //set position
        x: 0,
        y: -500 
    }
    self.size = {
        x:600,
        y:600
       
      };
      self.image = document.getElementById('moon-img');
}
  

Moon.prototype.update = function(){
    var self = this;
    self.position.y ++; 
  
}


Moon.prototype.draw = function(ctx){  //draws player
    var self = this;
    ctx.drawImage(self.image, self.position.x ,self.position.y, self.size.x, self.size.y);
    //ctx.fillStyle = 'black';
    //ctx.fillRect(self.position.x ,self.position.y, 500, 500);

  }

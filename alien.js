'use strict'
function Alien() {
  var self = this;

  self.position = {
    x: Math.random()*500,  //chooses random position in x until 500
    y: 0
  };

}



Alien.prototype.update = function () { //updates alien
  var self = this;

 self.position.y++;  //+1 in y position


}


Alien.prototype.draw = function (ctx) {  //  draws the alien on its current position
  var self = this;
  ctx.fillStyle = 'blue';
  ctx.fillRect(self.position.x, self.position.y, 50, 50);

}




'use strict'
function Alien() {
  var self = this;


  self.position = {
    x: Math.random()*500,  //chooses random position in x until 500
    y: 0
  };
  self.width = 90;
  self.height = 90;
  self.size = {
    x:90,
    y:90
  };
  self.image = document.getElementById('alien-img');
 
  // @todo self.size = ...
  // @todo alien image

}


Alien.prototype.update = function () { //updates alien
  var self = this;

 self.position.y++;  //+1 in y position


}


Alien.prototype.draw = function (ctx) {  //  draws the alien on its current position
  var self = this;
  ctx.drawImage(self.image, self.position.x ,self.position.y, self.size.x, self.size.y);
 
  //ctx.fillStyle = 'blue';
  //ctx.fillRect(self.position.x, self.position.y, 50, 50);

  // @todo alien image

}




'use strict'


function createHtml(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}
  
  
function main() {
  // finds the div in the html (div with id main-content) and stores it in a variable
  var mainContentElement = document.getElementById('main-content');

  //TITLE SCREEN

  var titleScreen;
  var startButton;

  function handleStartClick() {
     destroyStartPage();
     createGameScreen();
  }

  function createTitleScreen(){
    titleScreen = createHtml(`
      <div class="title-screen">
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
      <p>Mission To The Moon!</p>
      <button type="button" class="btn btn-default btn-lg btn-block">START MISSION</button>
      </div>
    `);

    mainContentElement.appendChild(titleScreen);
    startButton = titleScreen.querySelector('button');
    startButton.addEventListener('click', handleStartClick);//goes to handlestartclick function, that function destroys start page when click and creates game page
  }
    // add event listener when click run a functionb -> console.log(!!)

  function destroyStartPage(){
    titleScreen.remove(); // removes titleScreen html
    startButton.removeEventListener('click', handleStartClick);// removes button from screen
  }
   




  //GAME SCREEN

   var game;

  function gameEnded(didWin) {
    destroyGamePage();
    createGameOver(didWin);
  } 

  function createGameScreen(){
    // gameScreen = createHtml(``);
    game = new Game(mainContentElement); // send the mainContentElement variable to the Game
    
    game.build();
    game.start();
    game.onEnded(function (didWin) {
      console.log('did user win?', didWin);
      gameEnded(didWin);
    }); // this tells THE game to call a function when it's over
  }

  function destroyGamePage(){
    game.destroy();
  }




  //GAME OVER SCREEN
   
  var gameOverScreen;
  var restartButton;


  function handleRestartClick(){
    destroyGameOverScreen();
    createGameScreen();
  }



  function createGameOver(didWin) {
    console.log('creating the game over screen', didWin);

    if (didWin) {
      gameOverScreen = createHtml(
        `<div class = "game-over">
          <p>You win!</p>
          <button type="button" class="btn btn-default btn-lg btn-block">RESTART</button>
        </div>`
      );

    }
    else {
      gameOverScreen = createHtml(
      `<div class = "game-over">
        <p>Game Over!</p>
        <button type="button" class="btn btn-default btn-lg btn-block">RESTART</button>
      </div>`
    );

    }

   /* gameOverScreen = createHtml(
      `<div class = "game-over">
        <p>Game Over!</p>
        <button type="button" class="btn btn-default btn-lg btn-block">RESTART</button>
      </div>`
    );*/
    
    mainContentElement.appendChild(gameOverScreen);
    restartButton = gameOverScreen.querySelector('button');
    restartButton.addEventListener('click', handleRestartClick);
  }
  
  function destroyGameOverScreen(didWin){
    gameOverScreen.remove();
    restartButton.removeEventListener('click', handleRestartClick);

  }
  
 
  // -- START!

  createTitleScreen();
}




window.addEventListener('load', main); //?



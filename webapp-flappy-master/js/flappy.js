var stateActions = { preload: preload, create: create, update: update };
var score =-1;
var labelScore;
var player;
var pipes = [];
var gameSpeed = 200;
var gameGravity = 200;
var jumpPower = 200;
var balloons = [];
var weights = [];
var width = 790;
var height = 400;
var start;
var splashDisplay;
var isStartTrue = true;



// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

/*
* Loads all resources for the game and gives them names.
*/

function preload() {
  game.load.image("backgroundImg", "../assets/background.png");
  game.load.image("Image", "../assets/download.png");
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("pipeBlock","../assets/brick.png");
  game.load.image("balloons","../assets/balloons.png");
  game.load.image("weight","../assets/weight.png");



}

/*
* Initialises the game. This function is only called once.
*/
function create() {
  // set the background colour of the scene
  var background = game.add.image(0,0, "backgroundImg");
  background.width = 790;
  background.height = 400;
  game.stage.setBackgroundColor("#FFFFFF");
  game.input
  .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  .onDown.add(spaceHandler);
  labelScore = game.add.text(20, 20, "0");
  //changeScore();
  //changeScore();
  //alert(score);
  player = game.add.sprite(150, 100, "Image");
  player.anchor.setTo(0.5, 0.5);
  // game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
  // .onDown.add(moveRight);
  // game.input.keyboard.addKey(Phaser.Keyboard.UP)
  // .onDown.add(moveUp);
  // game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
  // .onDown.add(moveDown);
  // game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
  // .onDown.add(moveLeft);
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);
  player.body.velocity.x = 0;

game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
  .onDown.add(start);

  splashDisplay = game.add.text(200,50, "Press enter to start, space to fly", {font: "30px Lato", fill: "#FFFFFF"});








}



/*
* This function updates the scene. It is called for every new frame.
*/
function update() {
  game.physics.arcade.overlap(
    player,
    pipes,
    gameOver);


    if (player.body.y < 0) {
      gameOver();

    }

    if(player.body.y > 400){
      gameOver();
    }

    player.rotation = Math.atan(player.body.velocity.y /200);

    checkBonus(balloons, -25);
    checkBonus(weights, 75);

  }



  function gameOver(){
    jQuery=("#scorebtn");
    location.reload();
    gameGravity = 200;
  }






  function spaceHandler() { game.sound.play("score");
  game.input
  .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  .onDown.add(spaceHandler);

}

function changeScore() {
  score = score + 1;
  labelScore.setText(score.toString());





}

function moveRight() {
  player.x = player.x + 10;

}

function moveUp() {
  player.y = player.y - 20;
}


function moveDown() {
  player.y = player.y +20;
}


function moveLeft() {
  player.x = player.x -10;
}



function generatePipe() {
  var gap = game.rnd.integerInRange(1, 5);
  for(var count=0; count<8; count ++){
    if(count != gap && count != gap +1){
      addPipeBlock(750, count*50);


    }



  }
  changeScore();

}

function addPipeBlock(x, y) {
  var pipeBlock = game.add.sprite(x,y,"pipeBlock");
  pipes.push(pipeBlock);
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = -200;


}


function playerJump() {
  player.body.velocity.y = -jumpPower;

}

function changeGravity(g) {
  gameGravity += g;
  player.body.gravity.y = gameGravity;
}

function generateBalloons(){
  var bonus = game.add.sprite(width, height, "balloons");
  balloons.push(bonus);
  game.physics.arcade.enable(bonus);
  bonus.body.velocity.x = -200;
  bonus.body.velocity.y = -game.rnd.integerInRange(60, 100);

}

function generateWeights(){
  var bonus = game.add.sprite(width, height, "weight");
  weights.push(bonus);
  game.physics.arcade.enable(bonus);
  bonus.body.velocity.x = -200;
  bonus.body.velocity.y = - game.rnd.integerInRange(60, 100);

}

function generate() {
  var diceRoll = game.rnd.integerInRange(1, 10);
  if (diceRoll == 1) {
    generateBalloons();
  }else if(diceRoll == 2) {
    generateWeights();
  }  else {
    generatePipe();
  }
}
function checkBonus(bonusArray, bonusEffect) {
  for(var i = bonusArray.length -1; i >= 0; i--){
    game.physics.arcade.overlap(player, bonusArray[i], function() {
      changeGravity(bonusEffect);
      bonusArray[i].destroy();
      bonusArray.splice(i,1);


    });
  }
}

function start() {
  if (isStartTrue) {
    player.body.velocity.y = +50;
    player.body.gravity.y = 400;
    game.input.keyboard
    .addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(function (){
      player.body.velocity.y = -jumpPower;
    }
  );
  var pipeInterval = 1.75 * Phaser.Timer.SECOND;
  game.time.events.loop(
    pipeInterval,
    generate
  );
  splashDisplay.destroy();
  isStartTrue = false;
}
}

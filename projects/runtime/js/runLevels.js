var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE

    function createObstacles(x, y, hitSize, damage, image, rotation, xScale, yScale){
      var hitZoneSize = hitSize; //define the size of the hitzone and assign to a variable
      var damageFromObstacle = damage; //defines the amount of damage obstacle causes and assigns to variable
      var obstacleHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //creates the obstacle hitzone using the size and damage as parameters and assigns it to a variable
      obstacleHitZone.x = x; // sets the x coordinate of the obstacle
      obstacleHitZone.y = y; //sets the y coordinate of the obstacle
      game.addGameItem(obstacleHitZone); //adds the obstacle hitzone to the game
      var obstacleImage = draw.bitmap(image); //draw the image bitmap and store it in obstacleImage
      obstacleHitZone.addChild(obstacleImage); //attaches the image to the obstacle hitzone
      obstacleImage.x = -25; // position the image on the hitzone's x value by moving it left 25 pixels
      obstacleImage.y = -25; // position the image on the hitzone's y value by moving it up 25 pixels
      obstacleHitZone.rotationalVelocity = rotation;
      obstacleImage.scaleX = xScale;
      obstacleImage.scaleY = yScale;
    }

    function createEnemy(x, y, speed, health){
      var enemy = game.createGameItem("enemy", 25); // creates enemy game item and adds it to game
      var redSquare = draw.rect(50, 50, "red"); //creates a red square and stores it in the var redSquare
      redSquare.x = -25; // offsets the image from the hitzone by -25 pixels
      redSquare.y = -25; // offsets the image from the hitzone by -25 pixels
      enemy.addChild(redSquare); //add the red square as a child to our enemy variable
      enemy.x = x; // x pos of enemy
      enemy.y = y; // y pos of enemy
      game.addGameItem(enemy); //add enemy to the game
      enemy.velocityX -= speed; // controlling how fast the enemy moves on the x axis
      enemy.rotationalVelocity = 10; // sets the rotational velocity of the enemy
      enemy.onPlayerCollision = function () {
        game.changeIntegrity(health) // subtracts 10 health from halleBot's HUD
      };
      enemy.onProjectileCollision = function (){
        game.increaseScore(100); //increases your score when Halle shoots the enemy
        enemy.fadeOut(); // enemy fades out when halle shoots enemy
        //enemy.shrink()
        //enemy.flyTo(0,0)
      };
    }

    function createReward(x, y, speed, health){
      var reward = game.createGameItem("reward", 25); // creates reward game item and adds it to game
      var blueSquare = draw.rect(50, 50, "blue"); //creates a blue square and stores it in the var blueSquare
      blueSquare.x = -25; // offsets the image from the hitzone by -25 pixels
      blueSquare.y = -25; // offsets the image from the hitzone by -25 pixels
      reward.addChild(blueSquare); //add the blue square as a child to our reward variable
      reward.x = x; // x pos of reward
      reward.y = y; // y pos of reward
      game.addGameItem(reward); //add reward to the game
      reward.velocityX -= speed; // controlling how fast the reward moves on the x axis
      reward.rotationalVelocity = 10; // sets the rotational velocity of the reward
      reward.onPlayerCollision = function () {
        game.increaseScore(50); 
        game.changeIntegrity(health) // subtracts 10 health from halleBot's HUD
        reward.shrink()
      };     
    }
    
    
    
    function createLevel(x, y, speed){
      var level = game.createGameItem("level", 25); // creates level game item and adds it to game
      var yellowSquare = draw.rect(50, 50, "yellow"); //creates a yellow square and stores it in the var yellowSquare
      yellowSquare.x = -25; // offsets the image from the hitzone by -25 pixels
      yellowSquare.y = -25; // offsets the image from the hitzone by -25 pixels
      level.addChild(yellowSquare); //add the yellow square as a child to our level variable
      level.x = x; // x pos of level
      level.y = y; // y pos of level
      game.addGameItem(level); //add level to the game
      level.velocityX -= speed; // controlling how fast the level moves on the x axis
      level.rotationalVelocity = 10; // sets the rotational velocity of the level
      level.onPlayerCollision = function () {
        level.shrink()
        startLevel();
      };     
    }

  


    function startLevel() {
      // TODO 13 goes below here

      var level = levelData[currentLevel]; // fetches the currentLevel from the levelData array and stores it in var level
      var levelObjects = level.gameItems //retrive the array of gameItems and stores it in levelObjects

      for(var i =0; i < levelObjects.length; i++){
        var element = levelObjects[i];

        if(element.type === "sawblade"){ // checks the type key:value of the gameItems objects to determine which object to manifest
          createObstacles(element.x, element.y, element.hitSize, element.damage, element.image, element.rotation, element.xScale, element.yScale); // if the condition is true it will call the relevant function
        }

        if(element.type === "spikes"){ // checks the type key:value of the gameItems objects to determine which object to manifest
          createObstacles(element.x, element.y, element.hitSize, element.damage, element.image, element.rotation, element.xScale, element.yScale); // if the condition is true it will call the relevant function
        }

        if(element.type === "enemy"){ // checks the type key:value of the gameItems objects to determine which object to manifest
          createEnemy(element.x, element.y, element.speed, element.health); // if the condition is true it will call the relevant function
        }

        if(element.type === "reward"){ // checks the type key:value of the gameItems objects to determine which object to manifest
          createReward(element.x, element.y, element.speed, element.health); // if the condition is true it will call the relevant function
        }

        if(element.type === "level"){ // checks the type key:value of the gameItems objects to determine which object to manifest
          createLevel(element.x, element.y, element.speed); // if the condition is true it will call the relevant function
        }

      }


      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}

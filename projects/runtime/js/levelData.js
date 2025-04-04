var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Robot Romp",
        number: 1,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY - 50, hitSize: 25, damage: 10, image: "img/sawblade.png", rotation: 10, xScale: 1, yScale: 1},
          { type: "sawblade", x: 800, y: groundY - 50, hitSize: 25, damage: 20, image: "img/sawblade.png", rotation: 10, xScale: 1, yScale: 1},
          { type: "sawblade", x: 1000, y: groundY - 50, hitSize: 25, damage: 30, image: "img/sawblade.png", rotation: 10, xScale: 1, yScale: 1},

          { type: "spikes", x: 500, y: groundY - 25, hitSize: 20, damage: 30, image: "img/spikes.png", rotation: 0, xScale: 0.15, yScale: 0.15},


          { type: "enemy", x: 400, y: groundY - 50, speed: 3, health: -10},
          { type: "enemy", x: 800, y: groundY - 50, speed: 10, health: -20},
          { type: "enemy", x: 1200, y: groundY - 50, speed: 50, health: -30},

          { type: "reward", x: 500, y: groundY - 100, speed: 3, health: 10},
          
          { type: "level", x: 1500, y: groundY - 50, speed: 3},
        ],
      },
      {
        name: "Robot Rampage",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY - 50, hitSize: 25, damage: 10, image: "img/sawblade.png", rotation: 10, xScale: 1, yScale: 1},
          { type: "sawblade", x: 800, y: groundY - 50, hitSize: 25, damage: 20, image: "img/sawblade.png", rotation: 10, xScale: 1, yScale: 1},
          { type: "sawblade", x: 1000, y: groundY - 50, hitSize: 25, damage: 30, image: "img/sawblade.png", rotation: 10, xScale: 1, yScale: 1},
        ],
      },
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}

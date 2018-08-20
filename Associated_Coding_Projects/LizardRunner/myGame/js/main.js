
  //Sets up game states.
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');
  game.state.add('start', startState);
  game.state.add('play', playState);
  game.state.add('game_over', endState);
  game.state.start('start');

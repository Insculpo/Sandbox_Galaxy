
var startState= {
  preload: function() {
    var score = 0;
    game.load.image('sky', 'assets/img/DesertBG.png', 800, 600);
    game.load.image('ground', 'assets/img/platform.png');
    game.load.image('menu', 'assets/img/menu.png');
    game.load.image('under', 'assets/img/under.png');
    //Similar to image, but with the addition of 32,48 as a means of coordinating the sprite reading mechanism.
    //Here the dimenb nmvsions are x: 32 y: 48, so it will read in 32x48 pixel tiles for this animated sprite.
    game.load.atlas('lizard','assets/img/spritesheet.png','assets/img/sprites.json');
        game.load.atlas('fly','assets/img/SkySprites.png','assets/img/SkySprites.json');
  },
  create: function() {
    //Main menu GUI
    var mainMenu = game.add.sprite(0, 0, 'menu');

    /*var name = game.add.text(220, 220, 'The Lizard Runner', {font: '48px Cambria', fill: '#ffffff'});
    var subName = game.add.text(280, 280, 'Press X to start!', {font: '36px Cambria', fill: '#ffffff'});
    var subName = game.add.text(100, 340, 'Instructions: ', {font: '24px Cambria', fill: '#ffffff'});
    var subName = game.add.text(100, 380, 'Press X to shoot spit', {font: '24px Cambria', fill: '#ffffff'});
    var subName = game.add.text(100, 420, 'Press SPACE to jump!', {font: '24px Cambria', fill: '#ffffff'});
    var subName = game.add.text(100, 460, 'Tip: Spitting only hurts organics!', {font: '24px Cambria', fill: '#ffffff'});*/
    //Overall System Start
  	game.physics.startSystem(Phaser.Physics.ARCADE);
  	//Gets the input key for input
  	this.xKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


  },
  update: function()
  {
    if(this.xKey.justPressed())
    {
      game.state.start('play');
    }
  }
};

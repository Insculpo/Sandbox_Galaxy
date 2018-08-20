var endState = {
	create: function() {
		game.add.text(270, 180, 'Final Score: ' + score, {font: '36px Impact', fill: '#ffffff'});
		game.add.text(270, 260, 'Press X to try again', {font: '24px Impact', fill: '#ffffff'});
		game.add.text(270, 300, 'Press SPACE for main menu', {font: '24px Impact', fill: '#ffffff'});

		this.xKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	update: function()
  {
    if(this.xKey.justPressed())
    {
				console.log("Play!");
      game.state.start('play');
    }
		if(this.spaceKey.justPressed())
		{
			game.state.start('start');
		}
  }
}

//Boolean declarations
var jumping = false;
var pit = false;
var isDead = false;
var delay = false;
var pitTimer = false;
//Scoring system
var Scoring;
//This is the control variable for the heights are
var pitTime = 0;
var altitude = 30;
//sounds
var honk, death, jump, spit, squish;
//Global variable declarations
var spitTime, full, SpittingCharge, score, worldTime, starOne,starTwo,jumpTime,spitting,lizark,lizzie,spits,lizards,tentacled,rocks,flyers,spit,platforms,clouds;
//Sets the default states for every variable
spitTime = 1;
worldTime = 1;
jumpTime = 0;
score = 0;
delayTimer = 0;
SpittingCharge = 0;
spitting = false;
full = false;

	// A global variable for the platforms group.
  var playState = {
    preload: function() {
      //Loads audio and assigns keys
	  	this.xKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
      this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      game.load.audio('sand','assets/audio/sandserpents.mp3');
      game.load.audio('death','assets/audio/death.mp3');
      game.load.audio('honk','assets/audio/honk.mp3');
      game.load.audio('jump','assets/audio/jump.mp3');
      game.load.audio('spit','assets/audio/spit.mp3');
      game.load.audio('squish','assets/audio/squish.mp3');


    },
//Create initializes the game itself, setting the level up before the actual play begins.
  create: function() {
    //Resets global variables for replays
    score = 0;
    altitude = 30;
    isDead = false;
    spitTime = 1;
    worldTime = 1;
    jumpTime = 0;
    score = 0;
    delayTimer = 0;
    spitting = false;
    full = false;
    var Background = this.game.add.sprite(0,0,'sky');
    this.stars = game.add.group();
  	this.flyers = game.add.group();
    this.underground = game.add.group();
  	this.platforms = game.add.group();
    this.tentacled = game.add.group();
    this.rocks = game.add.group();
  	this.lizzie = game.add.group();
    this.spits = game.add.group();

    //bodies enabled
    this.tentacled.enableBody = true;
    this.rocks.enableBody = true;
    this.flyers.enableBody = true;
    this.spits.enableBody = true;
    this.platforms.enableBody = true;
    this.lizzie.enableBody = true;
    this.underground = true;
    //sprites added
    this.lizark = this.game.add.sprite(40, this.game.height - 180, 'lizard');
    starOne = this.game.add.sprite(570, this.game.height - 520, 'lizard');
    this.stars.add(starOne);
    starTwo = this.game.add.sprite(640, this.game.height - 480, 'lizard');
    this.stars.add(starTwo);

    this.spitting = this.game.add.sprite(1000,1000,'lizard');
    this.rocker = this.game.add.sprite(1000,1000,'lizard');
    this.tendril = this.game.add.sprite(1000,1000,'lizard');
    this.flappy = this.game.add.sprite(1000,1000,'lizard');

    //Lizard Animations are added here.
    this.lizark.animations.add('Run', Phaser.Animation.generateFrameNames('LizardRun', 1, 4), 5, true);
    this.lizark.animations.add('Spit1', Phaser.Animation.generateFrameNames('LizardSpit', 1, 4), 5, true);
    this.lizark.animations.add('Spit2', ['LizardSpit2', 'LizardSpit3', 'LizardSpit4', 'LizardSpit1'], 5, true);
    this.lizark.animations.add('Spit3', ['LizardSpit3', 'LizardSpit4', 'LizardSpit1', 'LizardSpit2'], 5, true);
    this.lizark.animations.add('Spit4', ['LizardSpit4', 'LizardSpit1', 'LizardSpit2', 'LizardSpit3'], 5, true);
    this.lizark.animations.add('Jump', ['LizardJump', 'LizardJump'], 5, true);
    this.lizark.animations.add('JumpSpit', ['JumpSpit', 'JumpSpit'], 5, true);
    //Star animations are added here.
    starOne.animations.add('BigStar',['GClass','GClass'],5,true);
    starTwo.animations.add('SmallStar',['KClass','KClass'],5,true);
    //Lizard properties assembled
    this.game.physics.enable(this.lizark, Phaser.Physics.ARCADE);
    this.lizark.enableBody = true;
    this.lizark.body.setSize(310,250,100,0);
    this.lizark.body.gravity.y = 250;
    this.lizark.scale.setTo(0.2, 0.2);
    this.lizzie.add(this.lizark);

    //Stars rescaled
    starOne.scale.setTo(0.2, 0.2);
    starTwo.scale.setTo(0.2, 0.2);

    //Adds the sounds.
    music = game.add.audio('sand');
    honk = game.add.audio('honk');
    death = game.add.audio('death');
    jump = game.add.audio('jump');
    spit = game.add.audio('spit');
    squish = game.add.audio('squish');
    //Start music
    music.loop = true;
    music.play();
  //Sets up the UI (very basic UI)
   Scoring = this.game.add.text(25, 50, 'Score: 0', {font: '18px Cambria', fill: '#ffffff'});
   SpittingCharge = this.game.add.text(25, 100, 'Spitting: 0', {font: '18px Cambria', fill: '#ffffff'});

  //Makes a starting platform set always.
  this.ground = game.add.sprite(0, game.world.height - altitude - 30, 'ground');
  this.game.physics.enable(this.ground, Phaser.Physics.ARCADE);
  this.ground.enableBody = true;
  this.ground.scale.setTo(2, 1);
  this.ground.body.immovable = true;
  this.ground.body.velocity.x = -100;
  this.platforms.add(this.ground);
  //The "Under" is basically a means of making the platofrms appear taller or shorter as needed
  this.under = game.add.sprite(0, game.world.height - altitude, 'under');
  this.game.physics.enable(this.under, Phaser.Physics.ARCADE);
  this.under.enableBody = true;
  this.under.scale.setTo(2, 1);
  this.under.body.immovable = true;
  this.under.body.velocity.x = -100;
  this.platforms.add(this.under);

},
  update: function () {
    //This game uses a set of non-object timers (just iterates via update) to carry out multiple tasks.
    //worldTime -> Global timer, continues until Death
    //spitTime -> Timer used in calculating spitting attack delays

    //Cloud spawner, always will spawn a couple random clouds at the start with 3 cloud types in the random roller
    if(worldTime%1000 == 0 || worldTime == 1 || worldTime == 2)
    {
      var cloud;
      var cloudRoll = Math.floor(Math.random() * 2);
      var cy = 200 + Math.random() * game.world.height;
      var cx = Math.random() * game.world.height;
      if(worldTime == 1 || worldTime == 2)
      {
        cloud = this.game.add.sprite(cx, cy, 'fly');
      }else {
        cloud = this.game.add.sprite(800, cy, 'fly');
      }
      if(cloudRoll == 0)
      {
        cloud.animations.add('cloud1',['Cloud1', 'Cloud1'],5,true);
        cloud.animations.play('cloud1');
      }
      if(cloudRoll == 1)
      {
        cloud.animations.add('cloud2',['Cloud2', 'Cloud2'],5,true);
        cloud.animations.play('cloud2');
      }
      if(cloudRoll == 2)
      {
        cloud.animations.add('cloud3',['Cloud3', 'Cloud3'],5,true);
        cloud.animations.play('cloud3');
      }
      //Clouds I didn't group because the engine won't cooperate with me on it.
      //Other groups work fine though.
      game.physics.enable(cloud, Phaser.Physics.ARCADE);
      cloud.body.velocity.x = -20;
      cloud.enableBody = true;
      cloud.scale.setTo(0.2,0.2);
      cloud.body.immovable = true;
    }
    //Brute force layering since the cloud group decided it wouldn't work and I ran out of time.
    //Won't be able to get away with this next time.
    game.world.bringToTop(this.flyers);
    game.world.bringToTop(this.underground);
    game.world.bringToTop(this.platforms);
    game.world.bringToTop(this.tentacled);
    game.world.bringToTop(this.rocks);
    game.world.bringToTop(this.lizzie);
    game.world.bringToTop(this.spits);


    worldTime++;
    spitTime++;
    //Pit timer is used to make sure pits don't get too big.
    if(pitTimer == true)
    {
      pitTime++;
    }
    //The delaying is a means of trying to keep unwanted objects from appearing on the edges of platforms
    //It didn't work.
    if(delay == true)
    {
      delayTimer++;
    }
    if(delayTimer%50 == 0)
    {
      delay = false;
      delayTimer = 0;
    }
    //You get points just for existing!
    if(worldTime%10 == 0)
    {
      score++;
    }
    //If you are declared dead, you fall off the map and die.
    if(isDead == true)
    {
      this.lizark.body.velocity.y = 400;
    }else {
      this.lizark.body.x = 50;
    }
    //These variables are meant to make the game get harder as you advance further.
    //Mainly by using world time and increasing difficulty the higher world time gets.
    var worlder = worldTime/2500;
    var worldDifficulty = 3 + worldTime/500;
    var Dscale = worldTime/100;
    //Always garunteed at least one tentacle!
    var randTent = 1 + Math.random()*(1 + worlder);
    //A cap on tentacle amounts to keep the clusters from getting impossible to jump.
    if(randTent > 4)
    {
      randTent = 3;
    }
    //This variable is used to determine the spacing between tentacles
    var z = 0;
    //To make a terrain, I make use of the altitude variable to place objects in the world repsective to terrain elevation
    //Will make pits.
    //Admittedly, it's not as good as I want it to be, but does avoid weird graphical errors for the most part
    //For the most part.
    //It also makes terrain that is do-able.  Though random gen means impossible situations may well arise.
    if(worldTime%85 == 0)
    {
      console.log(altitude);
      //Rolls to see if the altitude should increase or decrease
      var UpOrDown = Math.random() * 10;
      //Sets up local booleans.  Valid is used to force the terrain generator to place terrain correctly (no overlap w/ other surfaces)
      //Delay is also set to true here
        var valid = false;
        var isPit = false;
        var upper, lower;
        delay = true;
        //Altemps is used to keep the game from freezing, if it is impossible to find a good spot for terrain, it will generate a pit instead.
        var altempts = 0;
        while(valid == false)
        {
            var altitudeDiff = Math.random()*30 + 22;
            //There is a stepped terrain for whatever reason.  Altitude changes are relative to what the previous altitude always
            //This keeps the terrain smooth.
            if(UpOrDown < 5)
            {
              altitude = altitude + altitudeDiff;
            }else {
              altitude = altitude - altitudeDiff * 1.5;
            }

              if(altitude < 20){
                altitude = 20 + Math.random() * 30;
              }
              if(altitude > 250)
              {
                //Long falls are made possible by this!
                altitude = Math.random()* 300 - 100;
              }
              //I can squish or stretch terrain too as a difficulty changer using worldDifficulty.
              //Unclear if it works.
              //Has a cap as well.
              var stretch = 1.0 - worldDifficulty/10;
              if(stretch < 0.4)
              {
                stretch = 0.4;
              }
              upper = make_ground(altitude,stretch);
        //Will keep testing altitudes unless 10 attempts fail.
        if(this.game.physics.arcade.overlap(upper, this.platforms)){
          upper.kill();
          altempts++;
          if(altempts > 10)
          {
            altitude = -400;
            break;
          }
        }else {
          //If successful, will add the terrain to the group and render the lower parts.
          this.platforms.add(upper);
          lower = make_under(altitude,stretch);
          this.platforms.add(lower);
          valid = true;
          }
          }
        }

    //Enemy spawners work via attempts.  At fixed intervals they will attempt to spawn
    //and become more likely to spawn the longer you play.
    var spawner =  Math.random() * 300;
    if(worldTime%400 - worldDifficulty*2 == 0)
    {
      if(spawner <= 100)
      {
          for(y = 0; y < randTent; y++)
          {
             var tentacle = make_tentacle(800 + z,game.world.height - altitude - 120,this.game);
             //An attempt to cull errored tentacles (didn't work)
             if(game.physics.arcade.overlap(tentacle, this.platforms))
             {
               //do nothing
             }else {
               tentacle.kill();
             }
             if(game.physics.arcade.overlap(tentacle, this.underground))
             {
               tentacle.kill();
             }
             this.tentacled.add(tentacle);
             z-=50;
           }
         }
       }
      //Flyers (the spaghetti whistles) aren't accountable to delays.
      if(spawner <= 200 && spawner > 100)
      {
          var randomFly = Math.random()*100;
         var flight = make_flyer(800,game.world.height - 200 - randomFly - altitude,this.game);
         this.flyers.add(flight);
      }
      //Spawns rocks immune to your spit!
      if(spawner > 200)
      {
           var rockies = make_rock(800,game.world.height - altitude - 75,this.game);
           this.rocks.add(rockies);
      }
    }
    //Ends the spit loop when it refills.
    if(spitTime > 40)
    {
      spitting = false;
      spitTime = 0;
    }
    //If you are living, you don't fall through the ground.
    if(isDead == false)
    {
      this.game.physics.arcade.collide(this.lizark, this.platforms);
    }

    //Tests to see if the lizard is touching the ground properly and if so, jumping is false.
    //If you are in the air, you get the jump animation.
    if(this.lizark.body.touching.down)
    {
      jumping = false;
    }else {
      this.lizark.animations.play('Jump');
      jumping = true;
    }
    //If you are jumping and spitting, you get the jump+spit animation
    if(spitting == true && jumping == true){
      this.lizark.animations.play('JumpSpit');
    }
    //Otherwise you just run.
    if(spitting == false && jumping == false)
    {
      this.lizark.animations.play('Run');
    }

  //Calls a jump command on the lizard if jumping is false- can't mid-air jump!
  if(this.spaceKey.justPressed() && jumping == false)
  {
    Jump(this.lizark);
    jump.play();
  }
  //Calls a spit command on the lizard- can't spit rapid fire!
  if(this.xKey.justPressed() && spitting == false)
  {
      full = false;
      calcSpit(this.lizark);
      var saliva = make_spit(this.lizark);
      this.spits.add(saliva);
      spit.play();

  }

  //Death States
  if (game.physics.arcade.collide(this.lizark, this.tentacled) ||
   game.physics.arcade.collide(this.lizark, this.flyers) ||
  game.physics.arcade.collide(this.lizark, this.rocks))
  {
    death.play();
    isDead = true;
  }
  //You get points for murdering things, yay!
  if(game.physics.arcade.overlap(this.spits, this.tentacled,hurt,null,this))
  {
    squish.play();
    score+=5;
  }
  if(game.physics.arcade.overlap(this.spits, this.flyers,hurt,null,this))
  {
    honk.play();
    score+=5;
  }
  game.physics.arcade.overlap(this.spits, this.rocks,erase,null,this);
  game.physics.arcade.overlap(this.spits, this.platforms,erase,null,this);

  //If you fall out of world bounds, the game ends.
  //Your death animation forces you out of world bounds for this exact reason.
  if(this.lizark.y > 620 || this.lizark.x < -30)
  {
    death.play();
    music.stop();
    //Resets world conditions
    this.game.state.start('game_over');
  }
    //The binary star system looming above!
    starOne.animations.play('BigStar');
    starTwo.animations.play('SmallStar');
    Scoring.setText('Score: ' + score);
    //The UI will explictly say if your spit is full
    if(spitTime < 40 && full == false)
    {
      SpittingCharge.setText('Spit status: Gurgling...');
      if(spitTime >= 39)
      {
        full = true;
      }
    }else {
      SpittingCharge.setText('Spit status: Primed!');
    }

  }
};

//I initially wanted to have multiple hits to kill, but I went against that idea.
//Game would be way too hard if it took multiple hits!
function hurt(spit,tentacle)
{
  spit.kill();
  tentacle.health -= 1000;
  if(tentacle.health < 0){
    tentacle.kill()
  }
}

//Your spit is too impotent to kill a rock.
function erase(spit,rock)
{
  spit.kill();

}
//Killed entities get a death animation.
function hurt(spit,flyer)
{
  spit.kill();
  flyer.health -= 1000;
  if(flyer.health < 0){
    animatedDeath(flyer);
  }
}

//Jump applies an upward velocity to the target.
function Jump(lizzip)
{
  lizzip.body.velocity.y = -300;
  lizzip.animations.play('Jump');
}

//The spit calculator!
//Checks multiple global conditions to see which animation to play.
//The idea with this is to make the running seemless while spitting,
//Not sure if I succeeded though.
function calcSpit(lizzip)
{
  if(jumping == true)
  {
    lizzip.animations.play('JumpSpit');
    spitTime = 0;
    spitting = true;
  }
  if(spitTime > 0 && spitTime < 10)
  {
    lizzip.animations.play('Spit1');
    spitTime = 0;
    spitting = true;
  }
  if(spitTime >= 10 && spitTime < 20)
  {
    lizzip.animations.play('Spit2');
    spitTime = 0;
    spitting = true;
  }
  if(spitTime >= 20 && spitTime < 30)
  {
    lizzip.animations.play('Spit3');
    spitTime = 0;
    spitting = true;
  }
  if(spitTime >= 30 && spitTime < 40)
  {
    lizzip.animations.play('Spit4');
    spitting = true;
    spitTime = 0;
  }
}

//Gneerates a spit object from the player's mouth.
function make_spit(lizzip) {
    var spat = this.game.add.sprite(lizzip.x + 65, lizzip.y + 7, 'lizard');
    spat.animations.add('spew', Phaser.Animation.generateFrameNames('Spit', 1, 4), 5, true);
    this.game.physics.enable(spat, Phaser.Physics.ARCADE);
    spat.animations.play('spew');
    spat.body.enable = true;
    spat.body.velocity.x = 200;
    spat.mass = 0;
    spat.scale.setTo(0.2,0.2);
    return spat;
    //game.debug.body(spat);
}

//Generates a rock.
//I basically have it assemble it through static animations (using two of the same frame)
//Since it was what I found worked with texture atlases.
//The velocity is pre-set into all these objects, making them technically projectiles.
//All of them.
function make_rock(x,y,gam) {
    var rocker = gam.add.sprite(x, y, 'lizard');
    this.game.physics.enable(rocker, Phaser.Physics.ARCADE);
    rocker.animations.add('Rock', ['Rock', 'Rock'], 5, true);
    rocker.animations.play('Rock');
    rocker.body.enable = true;
    rocker.body.velocity.x = -100;
    rocker.immovable = true;
    rocker.scale.setTo(0.2,0.2);
    return rocker;
}

//Makes the tentacles
function make_tentacle(x,y,gam)
{
  var tentacle;
  tentacle = gam.add.sprite(x, y, 'lizard');
  tentacle.animations.add('Wiggle', Phaser.Animation.generateFrameNames('Tentacle', 1, 3), 5, true);
  tentacle.animations.play('Wiggle');
  this.game.physics.enable(tentacle, Phaser.Physics.ARCADE);
  tentacle.body.enable = true;
  tentacle.body.velocity.x = -100;
  tentacle.scale.setTo(0.15,0.2);
  tentacle.health = 12;
  tentacle.immovable = true;

  return tentacle;
}

//Makes the flyers
function make_flyer(x,y,gam)
{
  var flyer;
  flyer = gam.add.sprite(x, y, 'fly');
  flyer.animations.add('Flutter',['Flyer1', 'Flyer2','Flyer3','Flyer2'],5,true);
  flyer.animations.play('Flutter');
  this.game.physics.enable(flyer, Phaser.Physics.ARCADE);
  flyer.body.enable = true;
  flyer.body.velocity.x = -150;
  flyer.health = 2;
  flyer.immovable = true;

  flyer.scale.setTo(0.1,0.1);
  return flyer;
}

//Flips over the victim sprite and launches them away from the player.
function animatedDeath(victim)
{
  victim.angle = 180;
  victim.body.velocity.y = 400;
  victim.body.velocity.x = 200;
}


//Makes the ground based on altitude and stretch factor.
//Only length is stretched however.
function make_ground(altitude,factor)
{
  var ground;
  ground = game.add.sprite(800, game.world.height - altitude - 30, 'ground');
  game.physics.enable(ground, Phaser.Physics.ARCADE);
  ground.enableBody = true;
  ground.scale.setTo(2 * factor, 1);
  ground.body.immovable = true;
  ground.body.velocity.x = -100;
  return ground;
}

//Same as above, but for the under component.
function make_under(altitude,factor){
  var under;
  under = game.add.sprite(800, game.world.height - altitude, 'under');
  game.physics.enable(under, Phaser.Physics.ARCADE);
  under.enableBody = true;
  under.scale.setTo(2 * factor, 8);
  under.body.immovable = true;
  under.body.velocity.x = -100;
  return under;
}

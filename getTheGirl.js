demo.getTheGirl = function(){}
demo.getTheGirl.prototype = {

  preload: function() {
      game.load.spritesheet('baddie', 'lintAssets/level1/bad_pants.png',81,102);
      game.load.image('heart1', 'lintAssets/heart.png');
      game.load.image('arrow', 'lintAssets/arrow.png');
      game.load.image('pause_button1', 'pause_lvl1.png');
      // Lvl1Additions
      game.load.image('fence', 'lintAssets/level1/fence.png');
      game.load.image('house1', 'lintAssets/level1/house1.png');
      game.load.image('house2', 'lintAssets/level1/house2.png');
      game.load.image('lvl_bg_long', 'lintAssets/level1/lvl_bg_long.png');
      game.load.image('lvl_bg', 'lintAssets/level1/lvl_bg.png');
      game.load.image('lvl_ground', 'lintAssets/level1/lvl_ground.png');
      game.load.image('mailbox', 'lintAssets/level1/mailbox.png');
      game.load.image('pants1', 'lintAssets/level1/pants1.png');
      game.load.image('pants2', 'lintAssets/level1/pants2.png');
      game.load.image('pants3', 'lintAssets/level1/pants3.png');
      //Tutorial
      game.load.image('linen_dialog1', 'lintAssets/endscene/linen_dialog1.png');
      game.load.image('linen_dialog3', 'lintAssets/endscene/linen_dialog3.png');
      game.load.image('linen_dialog5', 'lintAssets/endscene/linen_dialog5.png');
      game.load.image('linen_dialog6', 'lintAssets/endscene/linen_dialog6.png');
      game.load.image('lint_dialog2', 'lintAssets/endscene/lint_dialog2.png');
      game.load.image('lint_dialog4', 'lintAssets/endscene/lint_dialog4.png');
      //Etc.
      game.load.spritesheet('dude', 'lintAssets/endscene/lint_walk_end.png', 75, 147);
      game.load.spritesheet('linen', 'lintAssets/endscene/linen.png');
      game.load.spritesheet('lives', 'lintAssets/lives_spritesheet.png', 275, 75);
      game.load.spritesheet('meter', 'lintAssets/level1/meter_sheet_lvl1.png', 400, 100);
      game.load.audio('kyle','lintAssets/kyleDev.mp3');
      game.load.audio('blaster', 'lintAssets/blaster.mp3');
      game.load.audio('explosion', 'lintAssets/explosion.mp3');

  },

  create: function() {

      // Game setup
      game.stage.backgroundColor = '#ffffff';
      game.world.setBounds(0,0, 1200, 800);
      //game.scale.scaleMode= Phaser.ScaleManager.RESIZE;
      game.physics.startSystem(Phaser.Physics.ARCADE);
      current_lvl = 1;
      enemyNumber = 3;
      //meter_frame = 4;

      popup = 0;

      // Set PlayerDirection
      playerDirection = 1;

      //Tiles/squares
      backgroundEffects = game.add.group();
      //Ground
      platforms = game.add.group();
      platforms.enableBody = true;
      // Houses
      housing = game.add.group();
      housing.enableBody = true;
      // Fences
      fences = game.add.group();
      fences.enableBody = true;
      // Mailboxes
      mailboxes = game.add.group();
      mailboxes.enableBody = true;

      //Pants
      pantsRed = game.add.group();
      pantsRed.enableBody = true;
      pantsBrown = game.add.group();
      pantsBrown.enableBody = true;
      pantsWhite = game.add.group();
      pantsWhite.enableBody = true;

      //Hearts
      heart = game.add.group();
      heart.enableBody = true;

      // Real Background
      var lvlBgLong = backgroundEffects.create(0, -16, 'lvl_bg_long');
      lvlBgLong.scale.setTo(1,1);

      //Ground
      var ground = platforms.create(0, game.world.height - 100, 'lvl_ground');
      ground.body.immovable = true;

      var houseShort = housing.create(650, game.world.height - 555, 'house1');
      houseShort.body.immovable = true;

      //arrow
      arrow = game.add.sprite(200, game.height - 190, 'arrow');

      //Tutorial
      msg1 = game.add.sprite(500, 400, 'linen_dialog1');
      msg1.visible = false;
      msg1.scale.setTo(.5,.5);
      msg1.fixedToCamera = true;
      msg2 = game.add.sprite(500, 400, 'linen_dialog3');
      msg2.visible = false;
      msg2.scale.setTo(.5,.5);
      msg2.fixedToCamera = true;
      msg3 = game.add.sprite(500, 400, 'linen_dialog5');
      msg3.visible = false;
      msg3.scale.setTo(.5,.5);
      msg3.fixedToCamera = true;
      msg4 = game.add.sprite(500, 400, 'linen_dialog6');
      msg4.visible = false;
      msg4.scale.setTo(.5,.5);
      msg4.fixedToCamera = true;
      msg7 = game.add.sprite(100, 400, 'lint_dialog2');
      msg7.visible = false;
      msg7.scale.setTo(.5,.5);
      msg7.fixedToCamera = true;
      msg8 = game.add.sprite(100, 400, 'lint_dialog4');
      msg8.visible = false;
      msg8.scale.setTo(.5,.5);
      msg8.fixedToCamera = true;

      // Health
      health1 = game.add.sprite(900, 16, 'lives');
      health1.frame = 0; // begins at full health
      health1.fixedToCamera = true; //follows with camera

      // Attractiveness Meter
      meter = game.add.sprite(25, 16, 'meter');
      meter.frame = 0; //begins at empty meter
      meter.fixedToCamera = true; //follows with camera

      // Player
      player = game.add.sprite(50, game.world.height - 600, 'dude');
      game.physics.arcade.enable(player);
      //player.body.bounce.y = 0.2;
      player.body.gravity.y = 1000;
      player.body.collideWorldBounds = true;
      player.animations.add('right', [1, 2, 3, 4], 8, true);
      player.animations.add('left', [7, 6, 5], 8, true);
      //player.animations.add('space',0,0,true);
      game.camera.follow(player);

      girly = game.add.sprite(550, game.world.height - 250, 'linen');

      //add group for bullets1
      bullets1 = game.add.group()
      bullets1.enableBody = true;
      bullets1.physicsBodyType = Phaser.Physics.ARCADE;
      bullets1.createMultiple(50, 'pants1');
      bullets1.setAll('checkWorldBounds', true);
      bullets1.setAll('outOfBoundsKill', true);
      bullets1.setAll('anchor.y', 0.5);
      bullets1.setAll('scale.x', 0.85);
      bullets1.setAll('scale.y', 0.85);

      //add group for bullets2
      bullets2 = game.add.group()
      bullets2.enableBody = true;
      bullets2.physicsBodyType = Phaser.Physics.ARCADE;
      bullets2.createMultiple(50, 'pants2');
      bullets2.setAll('checkWorldBounds', true);
      bullets2.setAll('outOfBoundsKill', true);
      bullets2.setAll('anchor.y', 0.5);
      bullets2.setAll('scale.x', 0.85);
      bullets2.setAll('scale.y', 0.85);

      //add group for bullets3
      bullets3 = game.add.group()
      bullets3.enableBody = true;
      bullets3.physicsBodyType = Phaser.Physics.ARCADE;
      bullets3.createMultiple(50, 'pants3');
      bullets3.setAll('checkWorldBounds', true);
      bullets3.setAll('outOfBoundsKill', true);
      bullets3.setAll('anchor.y', 0.5);
      bullets3.setAll('scale.x', 0.85);
      bullets3.setAll('scale.y', 0.85);


      cursors = game.input.keyboard.createCursorKeys();


      // Pause button
      pausy = game.add.sprite(0, 0, 'pause_button1');
      pausy.visible = false;
      pausy.fixedToCamera = true;
  },

  update: function (){
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    var hithousing = game.physics.arcade.collide(player, housing);

    health1.frame = health_frame;

    meter.frame = meter_frame;
    // console.log(player.body.x);
    // console.log(player.body.x);
    if (popup == 0 && player.x >= 400){
        console.log('tut');
        popup++;
        player.body.velocity.x = 0;
        msg1.visible = true;
        game.time.events.add(Phaser.Timer.SECOND*4, function(){
            msg1.visible = false;
            msg7.visible = true;
        })
        game.time.events.add(Phaser.Timer.SECOND*8, function(){
            msg7.visible = false;
            msg2.visible = true;
        })
        game.time.events.add(Phaser.Timer.SECOND*12, function(){
            msg2.visible = false;
            msg8.visible = true;
        })
        game.time.events.add(Phaser.Timer.SECOND*16, function(){
            msg8.visible = false;
            msg3.visible = true;
        })
        game.time.events.add(Phaser.Timer.SECOND*20, function(){
            msg3.visible = false;
            msg4.visible = true;
        })
        game.time.events.add(Phaser.Timer.SECOND*24, function(){
            msg4.visible = false;
            game.state.start('end');
        })

    }

    player.body.velocity.x = 0;
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -275;
        player.animations.play('left');
        playerDirection = -1;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 275;
        player.animations.play('right');
        playerDirection = 1;
    }
    else
    {
        player.animations.stop();
        if (playerDirection == -1){
            player.frame = 9;
        }
        else{
            player.frame = 0;
        }
    }

    if(player.body.x >= 400){
      player.body.velocity.x = 0;
      player.body.velocity.y = 0;
      player.animations.stop();
    }
    // console.log(player.body.x);

    // Platform Hit Reaction
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -700;
    }

    // cue death scene when all lives are lost
    if(health_frame == 6){
      // console.log("hello")
      game.state.start('outro');
      health_frame = 0;
      meter_frame = 0;
    }

    if(meter_frame == 3){
      if(player.x >= 2300){
      game.state.start('lvl1_2');
      }
    }

    window.onkeydown = function(event) {
        if (event.keyCode == 27){
            game.paused = !game.paused;
            pausy.visible = !pausy.visible;
        }
        if (event.keyCode == "0".charCodeAt(0)){
            game.state.start('lvl1_2');
        }
        if (event.keyCode == "1".charCodeAt(0)){
            game.state.start('lvl1Boss');
        }
        if (event.keyCode == "2".charCodeAt(0)){
            game.state.start('lvl2');
        }
        if (event.keyCode == "3".charCodeAt(0)){
            game.state.start('lvl3');
        }
        if (event.keyCode == "4".charCodeAt(0)){
            game.state.start('lvl4');
        }
        if (event.keyCode == "9".charCodeAt(0)){
            game.state.start('lvl1Boss');
        }
    }

  },


  hit: function(s, e){
      s.kill();
      e.kill();
  },

  changeBulletsRed: function(player,item){
    changeBullets = 1;
    // console.log('Red Pants Collected');
  },

  changeBulletsBrown: function(player,item){
    changeBullets = 2;
    // console.log('Brown Pants Collected');
  },

  changeBulletsWhite: function(player,item){
    changeBullets = 3;
    // console.log('White Pants Collected');
  },

  collectAttractiveness: function(player, item){
  // pants is gone
      item.kill();

      // update meter
      if(meter_frame < 3){
        meter_frame += 1;
      }
  },
  loseHealth: function(player,item){
      if(health_frame < 6){
        health_frame += 1;
        // console.log('Ay');
      }
  },
  collectHealth: function(player, item){
  // pants is gone
      item.kill();

      // update meter
      if(health_frame > 0){
        health_frame -= 1;
        // console.log(':)');
      }
  },
}

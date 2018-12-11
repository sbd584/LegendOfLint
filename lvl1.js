

demo.lvl1 = function(){}
demo.lvl1 = {

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
      game.load.image('msg1', 'lintAssets/level1/tut_message1.png');
      game.load.image('msg2', 'lintAssets/level1/tut_message2.png');
      //Etc.
      game.load.spritesheet('dude', 'lintAssets/lint_spritesheet.png', 75, 147);
      game.load.spritesheet('lives', 'lintAssets/lives_spritesheet.png', 275, 75);
      game.load.spritesheet('meter', 'lintAssets/level1/meter_sheet_lvl1.png', 400, 100);
      game.load.audio('kyle','lintAssets/kyleDev.mp3');
      game.load.audio('jump', 'Audio/Jump_00.mp3');
      game.load.audio('pickup', 'Audio/Collect_Point_00.mp3');
      game.load.audio('lvl1_music', 'Audio/Turbonugget.mp3');
      game.load.audio('explosion', 'lintAssets/explosion.mp3');

  },

  create: function() {

      console.log('Level 1');

      // Game setup
      game.stage.backgroundColor = '#ffffff';
      game.world.setBounds(0,0, 2400, 800);
      //game.scale.scaleMode= Phaser.ScaleManager.RESIZE;
      game.physics.startSystem(Phaser.Physics.ARCADE);
      lvl_music = game.sound.play('lvl1_music');
      current_lvl = 1;
      enemyNumber = 3;

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
      var ground2 = platforms.create(1200, game.world.height - 100, 'lvl_ground');
      ground2.body.immovable = true;
      
      var fence = fences.create(700, game.world.height - 270, 'fence')
      fence.body.immovable = true;
      
      var mail = mailboxes.create(1270, game.world.height - 285, 'mailbox')
      mail.body.immovable = true;
      
      var houseShort = housing.create(1400, game.world.height - 555, 'house1');
      houseShort.body.immovable = true;

      var houseTall = housing.create(1900, game.world.height - 650, 'house2');
      houseTall.body.immovable = true;
      
      //Tutorial
      msg1 = game.add.sprite(100, 200, 'msg1');
      msg1.visible = false;
      msg1.fixedToCamera = true;
      msg2 = game.add.sprite(200, 300, 'msg2');
      msg2.visible = false;
      msg2.fixedToCamera = true;

      //  Pants
      var pants1 = pantsRed.create(900, 0, 'pants1');
      var pants2 = pantsBrown.create(1500, 0, 'pants2');
      var pants3 = pantsWhite.create(2000, 0, 'pants3');

      //  Gravity
      pants1.body.gravity.y = 300;
      pants2.body.gravity.y = 300;
      pants3.body.gravity.y = 300;

      //  Bounce
      pants1.body.bounce.y = 0.7 + Math.random() * 0.2;
      pants2.body.bounce.y = 0
      pants3.body.bounce.y = 0.7 + Math.random() * 0.2;


      // Health
      health1 = game.add.sprite(900, 16, 'lives');
      health1.frame = 0; // begins at full health
      health1.fixedToCamera = true; //follows with camera

      // Attractiveness Meter
      meter = game.add.sprite(25, 16, 'meter');
      meter.frame = 0; //begins at empty meter
      meter.fixedToCamera = true; //follows with camera
      // 7 meter length

      // Player
      player = game.add.sprite(200, game.world.height - 600, 'dude');
      game.physics.arcade.enable(player);
      //player.body.bounce.y = 0.2;
      player.body.gravity.y = 1000;
      player.body.collideWorldBounds = true;
      player.animations.add('right', [1, 2, 3, 4], 8, true);
      player.animations.add('left', [7, 6, 5], 8, true);
      player.animations.add('jump_right', [3], 8, true);
      player.animations.add('jump_left', [6], 8, true);
      //player.animations.add('space',0,0,true);
      game.camera.follow(player);

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
      
      //arrow
      arrow = game.add.sprite(2280, game.height - 190, 'arrow');


      // Pause button
      pausy = game.add.sprite(0, 0, 'pause_button1');
      pausy.visible = false;
      pausy.fixedToCamera = true;
  },

  update: function (){
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    var hithousing = game.physics.arcade.collide(player, housing);
    var hitFence = game.physics.arcade.collide(player, fences);
    var hitMail = game.physics.arcade.collide(player, mailboxes);
    game.physics.arcade.collide(pantsRed, platforms);
    game.physics.arcade.collide(pantsBrown, platforms);
    game.physics.arcade.collide(pantsWhite, platforms);
    game.physics.arcade.collide(pantsRed, housing);
    game.physics.arcade.collide(pantsBrown, housing);
    game.physics.arcade.collide(pantsWhite, housing);
    game.physics.arcade.collide(pantsRed, fences);
    game.physics.arcade.collide(pantsBrown, fences);
    game.physics.arcade.collide(pantsWhite, fences);
    game.physics.arcade.collide(pantsRed, mailboxes);
    game.physics.arcade.collide(pantsBrown, mailboxes);
    game.physics.arcade.collide(pantsWhite, mailboxes);
    game.physics.arcade.collide(heart, platforms);
    game.physics.arcade.collide(heart, housing);
    game.physics.arcade.collide(heart, fences);
    game.physics.arcade.collide(heart, mailboxes);

    health1.frame = health_frame;

    meter.frame = meter_frame;

    if (popup == 0 && player.x == 200){
        console.log('tut');
        popup++;
        player.body.velocity.x = 0;
        msg1.visible = true;
        game.time.events.add(Phaser.Timer.SECOND*4, function(){
            msg1.visible = false;
            msg2.visible = true;
        })
        game.time.events.add(Phaser.Timer.SECOND*8, function(){
            msg2.visible = false;
        })
    }
      
    player.body.velocity.x = 0;
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -350;
        player.animations.play('left');
        playerDirection = -1;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 350;
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
      
    // Platform Hit Reaction
    if(player.body.velocity.y !== 0 && playerDirection == 1)
    {
        player.animations.play('jump_right');
    }
      if(player.body.velocity.y !== 0 && playerDirection == -1)
    {
        player.animations.play('jump_left');
    }
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -700;
        music = game.sound.play('jump');
    }
      
    // Fence Hit Reaction
    if (cursors.up.isDown && player.body.touching.down && hitFence)
    {
        player.body.velocity.y = -700;
        music = game.sound.play('jump');
    }
    
    // Mailbox Hit Reaction
    if (cursors.up.isDown && player.body.touching.down && hitMail)
    {
        player.body.velocity.y = -800;
        music = game.sound.play('jump');
    }

    // housing Hit Reaction
    if (cursors.up.isDown && player.body.touching.down && hithousing) //  && housing.body.touching.up)
    {
        player.body.velocity.y = -700;
        music = game.sound.play('jump');
    }
    else if (cursors.down.isDown) //drop faster
    {
        player.body.velocity.y = 300;
    }

    // Change pantss for Firing
    game.physics.arcade.overlap(player, pantsRed, this.changeBulletsRed);
    game.physics.arcade.overlap(player, pantsBrown, this.changeBulletsBrown);
    game.physics.arcade.overlap(player, pantsWhite, this.changeBulletsWhite);

    game.physics.arcade.overlap(player, pantsRed, this.collectAttractiveness);
    game.physics.arcade.overlap(player, pantsBrown, this.collectAttractiveness);
    game.physics.arcade.overlap(player, pantsWhite, this.collectAttractiveness);
    if (health_frame < 6 && health_frame > 0){
            game.physics.arcade.overlap(player, heart, this.collectHealth);
        }

    // cue death scene when all lives are lost
    if(health_frame == 6){
      console.log("hello")
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
    console.log('Red Pants Collected');
  },

  changeBulletsBrown: function(player,item){
    changeBullets = 2;
    console.log('Brown Pants Collected');
  },

  changeBulletsWhite: function(player,item){
    changeBullets = 3;
    console.log('White Pants Collected');
  },

  collectAttractiveness: function(player, item){
  // pants is gone
      music = game.sound.play('pickup');
      item.kill();

      // update meter
      if(meter_frame < 3){
        meter_frame += 1;
      }
  },
  loseHealth: function(player,item){
      if(health_frame < 6){
        health_frame += 1;
        console.log('Ay');
      }
  },
  collectHealth: function(player, item){
  // pants is gone
      item.kill();

      // update meter
      if(health_frame > 0){
        health_frame -= 1;
        console.log(':)');
      }
  },

}

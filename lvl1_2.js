

demo.lvl1_2 = function(){}
demo.lvl1_2 = {

  preload: function() {
      game.load.spritesheet('baddie', 'lintAssets/level1/bad_pants.png', 81, 102);
      game.load.image('heart1', 'lintAssets/heart.png');
      game.load.image('arrow', 'lintAssets/arrow.png');
      game.load.image('warning', 'lintAssets/warning1.png');
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
      game.load.image('msg3', 'lintAssets/level1/tut_message3.png');
      game.load.image('msg4', 'lintAssets/level1/tut_message4.png');
      game.load.image('msg5', 'lintAssets/level1/tut_message5.png');
      //Etc.
      game.load.spritesheet('dude', 'lintAssets/lint_spritesheet.png', 75, 147);
      game.load.spritesheet('lives', 'lintAssets/lives_spritesheet.png', 275, 75);
      game.load.spritesheet('meter', 'lintAssets/level1/meter_sheet_lvl1.png', 400, 100);
      game.load.audio('kyle','lintAssets/kyleDev.mp3');
      game.load.audio('jump', 'Audio/Jump_00.mp3');
      game.load.audio('throw', 'Audio/Shoot_01.mp3');
      game.load.audio('pickup', 'Audio/Collect_Point_00.mp3');
      game.load.audio('hit', 'Audio/Explosion__003.wav');
      game.load.audio('ded', 'Audio/Jingle_Lose_00.mp3');
      game.load.audio('explosion', 'lintAssets/explosion.mp3');

  },

  create: function() {
      //Music
      //music = game.sound.play('kyle');

      // console.log('Level 1_2');

      // Game setup
      game.stage.backgroundColor = '#ffffff';
      game.world.setBounds(0,0, 2400, 800);
      //game.scale.scaleMode= Phaser.ScaleManager.RESIZE;
      game.physics.startSystem(Phaser.Physics.ARCADE);
      current_lvl = 1;
      enemyNumber = 7;

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
      // Background Housing
      housing2 = game.add.group();
      housing2.enableBody = true;
      housing2.alpha = .2;

      var houseTallBackground = housing2.create(960, game.world.height - 475, 'house2');
      houseTallBackground.scale.setTo(.7, .7);
      houseTallBackground.alpha = .6;
      houseTallBackground.body.immovable = true;
      houseTallBackground = housing2.create(400, game.world.height - 650, 'house2');
      houseTallBackground.scale.setTo(1, 1);
      houseTallBackground.body.immovable = true;
      houseTallBackground = housing2.create(1200, game.world.height - 650, 'house2');
      houseTallBackground.scale.setTo(1, 1);
      houseTallBackground.body.immovable = true;
      houseTallBackground = housing2.create(1800, game.world.height - 650, 'house2');
      houseTallBackground.scale.setTo(1, 1);
      houseTallBackground.body.immovable = true;

      //Pants
      pantsRed = game.add.group();
      pantsRed.enableBody = true;
      pantsBrown = game.add.group();
      pantsBrown.enableBody = true;
      pantsWhite = game.add.group();
      pantsWhite.enableBody = true;

      //Tutorial
      msg3 = game.add.sprite(100, 200, 'msg3');
      msg3.visible = false;
      msg3.fixedToCamera = true;
      msg4 = game.add.sprite(200, 300, 'msg4');
      msg4.visible = false;
      msg4.fixedToCamera = true;
      msg5 = game.add.sprite(300, 400, 'msg5');
      msg5.visible = false;
      msg5.fixedToCamera = true;

      //not attractive pop-up
      warning = game.add.sprite(1800, 100, 'warning');
      warning.visible = false;

      //Hearts
      heart = game.add.group();
      heart.enableBody = true;

      // Real Background
      var lvlBgLong = backgroundEffects.create(0, -16, 'lvl_bg_long');

      //Ground
      var ground = platforms.create(0, game.world.height - 100, 'lvl_ground');
      ground.body.immovable = true;
      var ground2 = platforms.create(1200, game.world.height - 100, 'lvl_ground');
      ground2.body.immovable = true;

      // Hearts
      var heart1 = heart.create(700, 0, 'heart1');
      var heart2 = heart.create(1700, 0, 'heart1');
      //  Gravity
      heart1.body.gravity.y = 300;
      heart2.body.gravity.y = 300;
      //  Bounce
      heart1.body.bounce.y = 0.5 + Math.random() * 0.1;
      heart2.body.bounce.y = 0.5 + Math.random() * 0.1;

      // Health
      health1 = game.add.sprite(900, 16, 'lives');
      health1.frame = 0; // begins at full health
      health1.fixedToCamera = true; //follows with camera

      // Attractiveness Meter
      meter = game.add.sprite(25, 16, 'meter');
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

      //Enemies
      enemyGroup = game.add.group();
      enemyGroup.enableBody = true;
      enemyGroup.physicsBodyType = Phaser.ARCADE;
      for (var i = 0; i < enemyNumber; i++){
          this.createEnemy();
      }
      enemyGroup.setAll('scale.x', 1);
      enemyGroup.setAll('scale.y', 1);
      enemyGroup.callAll('animations.add', 'animations', 'walk', [0, 1, 2, 3], 6, true);
      enemyGroup.callAll('play', null, 'walk');

      cursors = game.input.keyboard.createCursorKeys();

      game.time.events.loop(Phaser.Timer.SECOND, function(){
        for (var i = 0, len = enemyGroup.children.length; i < len; i++){
          mover = game.rnd.integerInRange(1, 3);
          if (mover == 1){
            enemyGroup.children[i].body.velocity.x = 100;
          }
          else if (mover == 2){
            enemyGroup.children[i].body.velocity.x = -100;
          }
          else{
            enemyGroup.children[i].body.velocity.x = 0;
          }
        }
      }, this);

      //arrow
      arrow = game.add.sprite(2200, game.height - 190, 'arrow');

      // Pause button
      pausy = game.add.sprite(0, 0, 'pause_button1');
      pausy.visible = false;
      pausy.fixedToCamera = true;
  },

  update: function (){
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    var hithousing = game.physics.arcade.collide(player, housing);
    game.physics.arcade.collide(pantsRed, platforms);
    game.physics.arcade.collide(pantsBrown, platforms);
    game.physics.arcade.collide(pantsWhite, platforms);
    game.physics.arcade.collide(pantsRed, housing);
    game.physics.arcade.collide(pantsBrown, housing);
    game.physics.arcade.collide(pantsWhite, housing);
    game.physics.arcade.collide(heart, platforms);
    game.physics.arcade.collide(heart, housing);
    game.physics.arcade.collide(enemyGroup, platforms);
    game.physics.arcade.collide(enemyGroup, housing);

    // handling collision between enemyGroup and player
    for (var i = 0; i < enemyNumber; i++){
      game.physics.arcade.collide(player, enemyGroup.children[i], function(player1, enemy1){
        // console.log('It Works!!');
        if(enemy1.body.touching.up && player1.body.touching.down){
          player1.body.velocity.y = -500;
          enemy1.body.velocity.y = 500;
          // console.log('Player Up');
          // console.log("Health Loss");
          this.loseHealth();
        }
        else if(enemy1.body.touching.down && player1.body.touching.up){
          player1.body.velocity.y = 500;
          enemy1.body.velocity.y = -500;
          // console.log('Player Down');
          // console.log("Health Loss");
          this.loseHealth();
        }
        else if(enemy1.body.touching.right && player1.body.touching.left){
          player1.body.velocity.x = 2000;
          enemy1.body.velocity.x = -1000;
          // console.log('Player Left');
          // console.log("Health Loss");
          this.loseHealth();
        }
        else if(enemy1.body.touching.left && player1.body.touching.right){
          player1.body.velocity.x = -2000;
          enemy1.body.velocity.x = 1000;
          // console.log('Player Right');
          // console.log("Health Loss");
          this.loseHealth();
        }

        else{
          // console.log("Nothing");
        }
      }, null, this);
    }

    game.physics.arcade.collide(player, enemyGroup);

    health1.frame = health_frame;

    meter.frame = meter_frame;

    if (popup == 0 && player.x == 200){
        // console.log('tut');
        popup++;
        player.body.velocity.x = 0;
        msg3.visible = true;
        game.time.events.add(Phaser.Timer.SECOND*3, function(){
            msg3.visible = false;
            msg4.visible = true;
        })
        game.time.events.add(Phaser.Timer.SECOND*5, function(){
            msg4.visible = false;
            msg5.visible = true;
        })
        game.time.events.add(Phaser.Timer.SECOND*7, function(){
            msg5.visible = false;
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

    // set fire button input
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
      this.fire(changeBullets);
    }

    //overlap of bullet and enemy
    game.physics.arcade.overlap(bullets1, enemyGroup, this.hitEnemy, 0, this);
    game.physics.arcade.overlap(bullets2, enemyGroup, this.hitEnemy, 0, this);
    game.physics.arcade.overlap(bullets3, enemyGroup, this.hitEnemy, 0, this);
    game.physics.arcade.overlap(player, pantsRed, this.collectAttractiveness);
    game.physics.arcade.overlap(player, pantsBrown, this.collectAttractiveness);
    game.physics.arcade.overlap(player, pantsWhite, this.collectAttractiveness);
    if (health_frame < 6 && health_frame > 0){
            game.physics.arcade.overlap(player, heart, this.collectHealth);
        }

    // allow player to progress to boss stage when meter is full
    if(meter_frame == 3){
        if(player.x >= 2200){
            health_frame = 0;
            game.input.enabled = false;
            player.body.velocity.x = 0;
            game.state.start('lvl1Boss');
        }
    }
    else{ //if player is not attractive enough
        if(player.x >= 2200){
            // console.log('still ugly')
            warning.visible = true;
        }
        else if(player.x <= 1800){
            warning.visible = false;
        }
    }

    // cue death scene when all lives are lost
    if(health_frame == 6){
      // console.log("hello")
      lvl_music.pause();
      music = game.sound.play('ded');
      game.state.start('outro');
      health_frame = 0;
      meter_frame = 0;
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
  createEnemy: function() {
      enemy = enemyGroup.create(360 + Math.random() * 2000, -800 + Math.random() * 200,'baddie');
      //enemy.body.velocity.setTo(this.game.rnd.integerInRange(-50, -150), this.game.rnd.integerInRange(50, 150));//randomly move left
      game.physics.arcade.enable(enemy);
      enemy.body.bounce.y = 0.2;
      enemy.body.gravity.y = 300;
      enemy.body.collideWorldBounds = true;
  },

  fire: function(changeBullets){
      if(game.time.now > nextFire){
          nextFire = game.time.now + fireRate;
          //sets rate of fire, change fireRate to set speed
          // console.log('firing');
          //music = game.sound.play('blaster');
          if(changeBullets == 1){
            var star1 = bullets1.getFirstDead();
            star1.lifespan = 750; //how long bullet lasts
            if (playerDirection == -1){
                star1.reset(player.x-20, player.y+50);
                music = game.sound.play('throw');
                star1.body.velocity.x = -600; //left bullet speed
            }
            if (playerDirection == 1){
                star1.reset(player.x+60, player.y+50);
                music = game.sound.play('throw');
                star1.body.velocity.x = 600; //left bullet speed
            }
            // console.log("Red Pants");
          }
          else if(changeBullets == 2){
            var star2 = bullets2.getFirstDead();
            star2.lifespan = 750; //how long bullet lasts
            if (playerDirection == -1){
                star2.reset(player.x-20, player.y+50);
                music = game.sound.play('throw');
                star2.body.velocity.x = -600; //left bullet speed
            }
            if (playerDirection == 1){
                star2.reset(player.x+60, player.y+50);
                music = game.sound.play('throw');
                star2.body.velocity.x = 600; //left bullet speed
            }
            // console.log("Brown Pants");
          }
          else if(changeBullets == 3){
            var star3 = bullets3.getFirstDead();
            star3.lifespan = 750; //how long bullet lasts
            if (playerDirection == -1){
                star3.reset(player.x-20, player.y+50);
                music = game.sound.play('throw');
                star3.body.velocity.x = -600; //left bullet speed
            }
            if (playerDirection == 1){
                star3.reset(player.x+60, player.y+50);
                music = game.sound.play('throw');
                star3.body.velocity.x = 600; //left bullet speed
            }
            // console.log("White Pants");
          }

      }
  },

  hitEnemy: function(bullets, enemy){
      if(enemy.body.x >= bullets.body.x + 40 || enemy.body.x <= bullets.body.x - 40){
        // console.log('hit');
        music = game.sound.play('hit');
        enemy.kill();
        enemy.destroy();
        bullets.kill();
        //music = game.sound.play('explosion');
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
        // console.log('Ay');
      }
  },
  collectHealth: function(player, item){
  // pants is gone
      music = game.sound.play('pickup');
      item.kill();

      // update meter
      if(health_frame > 0){
        health_frame -= 1;
        // console.log(':)');
      }
  },

}

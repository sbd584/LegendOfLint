

demo.lvl1Boss = function(){}
demo.lvl1Boss = {

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
      game.load.image('shorts', 'lintAssets/level1/gymshorts_pup.png');
      //Tutorial
      game.load.image('msg6', 'lintAssets/level1/tut_message6.png');
      game.load.image('msg7', 'lintAssets/level1/tut_message7.png');
      //Etc.
      game.load.spritesheet('dude', 'lintAssets/lint_spritesheet.png', 75, 147);
      game.load.spritesheet('lives', 'lintAssets/lives_spritesheet.png', 275, 75);
      game.load.spritesheet('meter', 'lintAssets/level1/meter_sheet_lvl1.png', 400, 100);
      game.load.spritesheet('bossstand', 'lintAssets/level1/boss_pants_stand.png', 235, 355);
      game.load.spritesheet('boss', 'lintAssets/level1/boss_pants_left.png', 283, 355);
      game.load.audio('kyle','lintAssets/kyleDev.mp3');
      game.load.audio('blaster', 'lintAssets/blaster.mp3');
      game.load.audio('explosion', 'lintAssets/explosion.mp3');

  },

  create: function() {

      console.log('Level 1 Boss');

      // Game setup
      game.stage.backgroundColor = '#ffffff';
      game.world.setBounds(0,0, 1200, 800);
      //game.scale.scaleMode= Phaser.ScaleManager.RESIZE;
      game.physics.startSystem(Phaser.Physics.ARCADE);
      current_lvl = 1;
      enemyNumber = 3;

      bossPantsHealth = 100;
      popup = 0;
      fight = false;

      // Set PlayerDirection
      playerDirection = 1;

      //Tiles/squares
      backgroundEffects = game.add.group();
      //Ground
      platforms = game.add.group();
      platforms.enableBody = true;
      // Background Housing
      housing2 = game.add.group();
      housing2.enableBody = true;
      housing2.alpha = .2;
      //Fences
      fences = game.add.group();
      fences.enableBody = true;
      // Houses
      housing = game.add.group();
      housing.enableBody = true;
      //Boss
      BossPants = game.add.group();
      BossPants.enableBody = true;

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

      shorts = game.add.group();
      shorts.enableBody = true;

      // Real Background
      var lvlBgLong = backgroundEffects.create(0, -16, 'lvl_bg_long');
      lvlBgLong.scale.setTo(1,1);

      //Ground
      var ground = platforms.create(0, game.world.height - 100, 'lvl_ground');
      // Edit distance of ground via x-value
      ground.scale.setTo(1, 1);
      ground.body.immovable = true;

      var houseTallBackground = housing2.create(960, game.world.height - 475, 'house2');
      houseTallBackground.scale.setTo(.7, .7);
      houseTallBackground.alpha = .6;
      houseTallBackground.body.immovable = true;
      houseTallBackground = housing2.create(400, game.world.height - 650, 'house2');
      houseTallBackground.scale.setTo(1, 1);
      houseTallBackground.body.immovable = true;

      var fence = fences.create(80, game.world.height - 215, 'fence')
      fence.scale.setTo(.7,.7);
      fence.body.immovable = true;

      var houseShort = housing.create(50, game.world.height - 370, 'house1');
      houseShort.scale.setTo(.6, .6);
      houseShort.body.immovable = true;

      //Boss Pants
      var bossStand = BossPants.create(900, game.world.height - 500, 'bossstand')
      bossStand.body.gravity.y = 1000;
      bossStand.collideWorldBounds = true;
      bossStand.animations.add('stand', [0, 1], 2, true);
      bossStand.animations.play('stand');


      //Tutorial
      msg6 = game.add.sprite(300, 200, 'msg6');
      msg6.visible = false;
      msg7 = game.add.sprite(300, 300, 'msg7');
      msg7.visible = false;

      // Health
      health1 = game.add.sprite(900, 16, 'lives');
      health1.frame = 3; // begins at full health
      health1.fixedToCamera = true; //follows with camera

      // Attractiveness Meter
      meter = game.add.sprite(25, 16, 'meter');
      meter.frame = 0; //begins at empty meter
      meter.fixedToCamera = true; //follows with camera

      bossPantsText = game.add.text(550, 16, 'Boss Pants: 100', { fontSize: '32px', fill: '#000' });
      bossPantsText.fixedToCamera = true;
      bossPantsText.visible = false;

      // Player
      player = game.add.sprite(200, game.world.height - 600, 'dude');
      game.physics.arcade.enable(player);
      //player.body.bounce.y = 0.2;
      player.body.gravity.y = 1000;
      player.body.collideWorldBounds = true;
      player.animations.add('right', [1, 2, 3, 4], 8, true);
      player.animations.add('left', [7, 6, 5], 8, true);
      //player.animations.add('space',0,0,true);
      game.camera.follow(player);
      player.body.velocity.x = 0;

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
      enemyGroup.callAll('animations.add', 'animations', 'walk', [0,1], 5, true);
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

      // Pause button
      pausy = game.add.sprite(0, 0, 'pause_button1');
      pausy.visible = false;
      pausy.fixedToCamera = true;
  },

  update: function (){
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    var hithousing = game.physics.arcade.collide(player, housing);
    var hitFence = game.physics.arcade.collide(player, fences);
    game.physics.arcade.collide(player, fences);
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
    game.physics.arcade.collide(enemyGroup, fences);
    game.physics.arcade.collide(BossPants, platforms);
    game.physics.arcade.collide(BossPants, housing);
    game.physics.arcade.collide(BossPants, fences);
    game.physics.arcade.collide(shorts, platforms);

    if (popup == 0 && player.x == 200){
        console.log('boss');
        popup++;
        msg6.visible = true;
        game.input.enabled = false;
        player.x = 200;
        game.time.events.add(Phaser.Timer.SECOND*4, function(){
            msg6.visible = false;
            msg7.visible = true;
            game.input.enabled = false;
            player.x = 200;
        })
        game.time.events.add(Phaser.Timer.SECOND*8, function(){
            msg7.visible = false;
            BossPants.children[0].kill();
            fight = true;
            game.input.enabled = true;
        })
    }

    if (fight){
        this.BossCreate();
        fight = false;
    }

      //Boss and Player collision
    var hitBoss = game.physics.arcade.collide(player, BossPants);

    if (hitBoss){
        if (BossPants.children[1].body.touching.up && player.body.touching.down){
              player.body.velocity.y = -500;
              BossPants.children[1].body.velocity.y = 1000;
              console.log('Player Up');
              console.log("Health Loss");
              this.loseHealth();
              this.MovePants();
        }
        else if(BossPants.children[1].body.touching.down && player.body.touching.up){
              player.body.velocity.y = 500;
              BossPants.children[1].body.velocity.y = -1000;
              console.log('Player Down');
              console.log("Health Loss");
              this.loseHealth();
              this.MovePants();
        }
        else if(BossPants.children[1].body.touching.right && player.body.touching.left){
              player.x = player.x + 200
              BossPants.children[1].body.velocity.x = -200;
              console.log('Player Left');
              console.log("Health Loss");
              this.loseHealth();
              this.MovePants();
        }
        else if(BossPants.children[1].body.touching.left && player.body.touching.right){
              player.x = player.x - 200
              BossPants.children[1].body.velocity.x = 200;
              console.log('Player Right');
              console.log("Health Loss");
              this.loseHealth();
              this.MovePants();
        }
        else{
              console.log("Nothing");
              this.MovePants();
        }
    }

    // handling collision between enemyGroup and player
    for (var i = 0; i < enemyNumber; i++){
      game.physics.arcade.collide(player, enemyGroup.children[i], function(player1, enemy1){
        console.log('It Works!!');
        if(enemy1.body.touching.up && player1.body.touching.down){
          player1.body.velocity.y = -500;
          enemy1.body.velocity.y = 500;
          console.log('Player Up');
          console.log("Health Loss");
          this.loseHealth();
        }
        else if(enemy1.body.touching.down && player1.body.touching.up){
          player1.body.velocity.y = 500;
          enemy1.body.velocity.y = -500;
          console.log('Player Down');
          console.log("Health Loss");
          this.loseHealth();
        }
        else if(enemy1.body.touching.right && player1.body.touching.left){
          player1.body.velocity.x = 2000;
          enemy1.body.velocity.x = -1000;
          console.log('Player Left');
          console.log("Health Loss");
          this.loseHealth();
        }
        else if(enemy1.body.touching.left && player1.body.touching.right){
          player1.body.velocity.x = -2000;
          enemy1.body.velocity.x = 1000;
          console.log('Player Right');
          console.log("Health Loss");
          this.loseHealth();
        }

        else{
          console.log("Nothing");
        }
      }, null, this);
    }

    game.physics.arcade.collide(player, enemyGroup);

    health1.frame = health_frame;

    meter.frame = meter_frame;

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

    // Platform Hit Reaction
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -700;
    }

    // housing Hit Reaction
    if (cursors.up.isDown && player.body.touching.down && hithousing) //  && housing.body.touching.up)
    {
        player.body.velocity.y = -700;
    }
    // Fence Hit Reaction
    if (cursors.up.isDown && player.body.touching.down && hitFence)
    {
        player.body.velocity.y = -700;
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
    game.physics.arcade.overlap(bullets1, BossPants, this.hitPantsBoss);
    game.physics.arcade.overlap(bullets2, enemyGroup, this.hitEnemy, 0, this);
    game.physics.arcade.overlap(bullets2, BossPants, this.hitPantsBoss);
    game.physics.arcade.overlap(bullets3, enemyGroup, this.hitEnemy, 0, this);
    game.physics.arcade.overlap(bullets3, BossPants, this.hitPantsBoss);
    game.physics.arcade.overlap(player, pantsRed, this.collectAttractiveness);
    game.physics.arcade.overlap(player, pantsBrown, this.collectAttractiveness);
    game.physics.arcade.overlap(player, pantsWhite, this.collectAttractiveness);
    if (health_frame < 6 && health_frame > 0){
            game.physics.arcade.overlap(player, heart, this.collectHealth);
        }
    game.physics.arcade.overlap(player, shorts, this.hitShorts);


    // cue death scene when all lives are lost
    if(health_frame == 3){
      console.log("hello")
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
    }

  },
  createEnemy: function() {
      enemy = enemyGroup.create(500 + Math.random() * 1000, -800 + Math.random() * 200,'baddie');
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
          console.log('firing');
          //music = game.sound.play('blaster');
          if(changeBullets == 1){
            var star1 = bullets1.getFirstDead();
            star1.lifespan = 750; //how long bullet lasts
            if (playerDirection == -1){
                star1.reset(player.x-20, player.y+50);
                star1.body.velocity.x = -600; //left bullet speed
            }
            if (playerDirection == 1){
                star1.reset(player.x+60, player.y+50);
                star1.body.velocity.x = 600; //left bullet speed
            }
            console.log("Red Pants");
          }
          else if(changeBullets == 2){
            var star2 = bullets2.getFirstDead();
            star2.lifespan = 750; //how long bullet lasts
            if (playerDirection == -1){
                star2.reset(player.x-20, player.y+50);
                star2.body.velocity.x = -600; //left bullet speed
            }
            if (playerDirection == 1){
                star2.reset(player.x+60, player.y+50);
                star2.body.velocity.x = 600; //left bullet speed
            }
            console.log("Brown Pants");
          }
          else if(changeBullets == 3){
            var star3 = bullets3.getFirstDead();
            star3.lifespan = 750; //how long bullet lasts
            if (playerDirection == -1){
                star3.reset(player.x-20, player.y+50);
                star3.body.velocity.x = -600; //left bullet speed
            }
            if (playerDirection == 1){
                star3.reset(player.x+60, player.y+50);
                star3.body.velocity.x = 600; //left bullet speed
            }
            console.log("White Pants");
          }

      }
  },

  hitEnemy: function(bullets, enemy){
      if(enemy.body.x >= bullets.body.x + 40 || enemy.body.x <= bullets.body.x - 40){
        console.log('hit');
        enemy.kill();
        enemy.destroy();
        bullets.kill();
        //music = game.sound.play('explosion');
      }

  },

  hitPantsBoss: function(bullet, boss){
      console.log('hit');
      bossPantsHealth -= 20;
      bossPantsText.text = 'Boss Pants:' + bossPantsHealth;
      bullet.kill();
      if(bossPantsHealth <= 0){
          BossPants.children[1].kill();
          bossPantsText.kill();
          var crouchers = shorts.create(1100, 0, 'shorts');
          crouchers.body.gravity.y = 300;
          crouchers.body.bounce.y = .5;
          console.log('SHORTS')
      }
    },

    hitShorts: function(player, shorts){
        shorts.kill();
        game.state.start('pantsPower');
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

  BossCreate: function(){
    var boss = BossPants.create(900, game.world.height - 470, 'boss')
    boss.body.gravity.y = 1000;
    boss.body.collideWorldBounds = true;
    boss.animations.add('walk', [0, 1, 2, 3], 5, true);
    bossPantsText.visible = true;
    boss.body.velocity.x = -50;
    boss.animations.play('walk');
  },

  MovePants: function(){
    BossPants.children[1].body.velocity.x = -50;
  },

}

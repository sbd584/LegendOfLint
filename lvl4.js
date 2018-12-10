demo.lvl4 = function(){}
demo.lvl4 = {

  preload: function() {
      game.load.image('hat1', 'lintAssets/level4/hat1.png');
      game.load.image('hat2', 'lintAssets/level4/hat2.png');
      game.load.image('heart1', 'lintAssets/heart.png');
      game.load.image('lvl4BigLong', 'lintAssets/level4/lvl4_bg_long.png');
      game.load.image('arrow', 'lintAssets/arrow.png');
      game.load.image('warning', 'lintAssets/warning1.png');
      game.load.image('pause_button1', 'pause_lvl3.png');
      game.load.image('longRoid', 'lintAssets/level4/asteroid_long.png');
      game.load.image('medRoid', 'lintAssets/level4/asteroid_med.png');
      game.load.image('smallRoid', 'lintAssets/level4/asteroid_small.png');
      game.load.spritesheet('dude', 'lintAssets/Sprites/lint_walk_lvl4.png', 75, 147);
      game.load.spritesheet('crouch', 'lintAssets/Sprites/lint_crouch_lvl4.png', 93, 109);
      game.load.spritesheet('lives', 'lintAssets/level4/health_lvl4.png', 388, 60);
      game.load.spritesheet('meter', 'lintAssets/level4/meter_lvl4.png', 400, 100);
      game.load.spritesheet('badHat', 'lintAssets/level4/mini_hat.png', 108, 113);
      game.load.audio('kyle','lintAssets/kyleDev.mp3');
      game.load.audio('blaster', 'lintAssets/blaster.mp3');
      game.load.audio('explosion', 'lintAssets/explosion.mp3');
  },

  create: function() {

      // Game setup
      game.stage.backgroundColor = '#ffffff';
      game.world.setBounds(0,0, 9000, 800);
      //game.scale.scaleMode= Phaser.ScaleManager.RESIZE;
      game.physics.startSystem(Phaser.Physics.ARCADE);
      current_lvl = 4;
      meter_frame = 0;
      health_frame = 0;
      enemyNumber = 20;
      crouching = false;
      right = true;

      // Set PlayerDirection
      playerDirection = 1;

      //Tiles/squares
      backgroundEffects = game.add.group();
      //Ground
      platforms = game.add.group();
      platforms.enableBody = true;
      //Asteroids
      roids = game.add.group();
      roids.enableBody = true;
      rightRoids = game.add.group();
      rightRoids.enableBody = true;
      leftRoids = game.add.group();
      leftRoids.enableBody = true;
      //hats
      topHat = game.add.group();
      topHat.enableBody = true;
      bCap = game.add.group();
      bCap.enableBody = true;

      //Hearts
      heart = game.add.group();
      heart.enableBody = true;



      // Real Background
      var lvl4BigLong = backgroundEffects.create(0, 0, 'lvl4BigLong');
      lvl4BigLong.scale.setTo(1,1);

      // //Ground
      // for (var i = 0; i < 6; i++){
      //     var ground = platforms.create(i * 1200, game.world.height - 100, 'lvl3Ground');
      //     // Edit distance of ground via x-value
      //     ground.scale.setTo(2, 1);
      //     ground.body.immovable = true;
      // }

      //asteroids
      //Long
      roidLong = roids.create(400, game.world.height - 400, 'longRoid');
      roidLong.body.immovable = true;
      roidLong = roids.create(2700, 200, 'longRoid');
      roidLong.body.immovable = true;
      roidLong = roids.create(5500, 550, 'longRoid');
      roidLong.body.immovable = true;
      roidLong = roids.create(8700, game.world.height - 100, 'longRoid');
      roidLong.body.immovable = true;
      roidLong = roids.create(7400, game.world.height - 50, 'longRoid');
      roidLong.body.immovable = true;
      //Med
      moveRMed = rightRoids.create(900, game.world.height - 300, 'medRoid');
      moveRMed.body.immovable = true;
      roidMed = roids.create(2300, game.world.height - 200, 'medRoid');
      roidMed.body.immovable = true;
      roidMed = roids.create(5200, 200, 'medRoid');
      roidMed.body.immovable = true;
      roidMed = roids.create(6200, 300, 'medRoid');
      roidMed.body.immovable = true;
      moveRMed = rightRoids.create(6600, game.world.height - 300, 'medRoid');
      moveRMed.body.immovable = true;
      roidMed = roids.create(8100, 300, 'medRoid');
      roidMed.body.immovable = true;
      //Small
      roidSmall = roids.create(150, game.world.height - 100, 'smallRoid');
      roidSmall.body.immovable = true;
      roidSmall = roids.create(1500, game.world.height - 50, 'smallRoid');
      roidSmall.body.immovable = true;
      moveRSmall = rightRoids.create(2800, game.world.height - 150, 'smallRoid');
      moveRSmall.body.immovable = true;
      moveLSmall = leftRoids.create(5000, game.world.height - 200, 'smallRoid');
      moveLSmall.body.immovable = true;
      moveLSmall = leftRoids.create(7500, 200, 'smallRoid');
      moveLSmall.body.immovable = true;
      // jump through bottom of asteroids
      for (var i = 0; i < roids.length; i++){
          roids.children[i].body.checkCollision.up = true;
          roids.children[i].body.checkCollision.down = false;
          roids.children[i].body.checkCollision.right = false;
          roids.children[i].body.checkCollision.left = false;
      }
      for (var i = 0; i < rightRoids.length; i++){
          rightRoids.children[i].body.checkCollision.up = true;
          rightRoids.children[i].body.checkCollision.down = false;
          rightRoids.children[i].body.checkCollision.right = false;
          rightRoids.children[i].body.checkCollision.left = false;
      }
      for (var i = 0; i < leftRoids.length; i++){
          leftRoids.children[i].body.checkCollision.up = true;
          leftRoids.children[i].body.checkCollision.down = false;
          leftRoids.children[i].body.checkCollision.right = false;
          leftRoids.children[i].body.checkCollision.left = false;
      }

      //not attractive pop-up
      warning = game.add.sprite(8300, 100, 'warning');
      warning.visible = false;

      //  hats
      var hat1 = topHat.create(500, 0, 'hat1');
      var hat2 = bCap.create(980, 0, 'hat2');
      var hat3 = topHat.create(2800, 0, 'hat1');
      var hat4 = bCap.create(1500, 0, 'hat2');
      var hat5 = topHat.create(2300, 0, 'hat1');
      var hat6 = bCap.create(2800, 500, 'hat2');
      var hat7 = topHat.create(5000, 0, 'hat1');
      var hat8 = bCap.create(6600, 0, 'hat2');
      var hat9 = topHat.create(7500, 0, 'hat2');
      var hat10 = bCap.create(5200, 0, 'hat2');
      var hat11 = topHat.create(5500, 0, 'hat1');
      var hat12 = bCap.create(6200, 0, 'hat2');
      var hat13 = topHat.create(7400, game.world.height - 250, 'hat1');
      var hat14 = bCap.create(7550, game.world.height - 250, 'hat2');
      var hat15 = topHat.create(8200, 0, 'hat1');
      // Gravity
      hat1.body.gravity.y = 100;
      hat2.body.gravity.y = 100;
      hat3.body.gravity.y = 100;
      hat4.body.gravity.y = 100;
      hat5.body.gravity.y = 100;
      hat6.body.gravity.y = 100;
      hat7.body.gravity.y = 100;
      hat8.body.gravity.y = 100;
      hat9.body.gravity.y = 100;
      hat10.body.gravity.y = 100;
      hat11.body.gravity.y = 100;
      hat12.body.gravity.y = 100;
      hat13.body.gravity.y = 100;
      hat14.body.gravity.y = 100;
      hat15.body.gravity.y = 100;
      // Bounce
      hat1.body.bounce.y = 0
      hat2.body.bounce.y = 0
      hat3.body.bounce.y = 0
      hat4.body.bounce.y = 0
      hat5.body.bounce.y = 0
      hat6.body.bounce.y = 0
      hat7.body.bounce.y = 0
      hat8.body.bounce.y = 0
      hat9.body.bounce.y = 0
      hat10.body.bounce.y = 0
      hat11.body.bounce.y = 0
      hat12.body.bounce.y = 0
      hat13.body.bounce.y = 0
      hat14.body.bounce.y = 0
      hat15.body.bounce.y = 0

      // Hearts
      var heart1 = heart.create(2400, 0, 'heart1');
      var heart2 = heart.create(5300, 0, 'heart1');
      var heart3 = heart.create(1600, 0, 'heart1');
      //  Gravity
      heart1.body.gravity.y = 300;
      heart2.body.gravity.y = 300;
      heart3.body.gravity.y = 300;
      //  Bounce
      heart1.body.bounce.y = 0
      heart2.body.bounce.y = 0
      heart3.body.bounce.y = 0

      // Health
      health1 = game.add.sprite(800, 16, 'lives');
      health1.frame = 0; // begins at full health
      health1.fixedToCamera = true; //follows with camera

      // Attractiveness Meter
      meter = game.add.sprite(25, 16, 'meter');
      meter.frame = 0; //begins at empty meter
      meter.fixedToCamera = true; //follows with camera
      // 15 meter length

      // Player Group
      player = game.add.group();
      player.enableBody = true;

      player1 = player.create(200, game.world.height - 250, 'dude');
      game.physics.arcade.enable(player1);
      player1.body.gravity.y = 1000;
      player1.body.collideWorldBounds = true;
      player1.animations.add('right', [1, 2, 3, 4], 7, true);
      player1.animations.add('left', [8, 7, 6, 5], 7, true);
      player1.animations.add('jump_right', [3], 8, true);
      player1.animations.add('jump_left', [6], 8, true);

      playerCrouch = player.create(player.children[0].x, player.children[0].y-50, 'crouch');
      game.physics.arcade.enable(playerCrouch);
      playerCrouch.body.gravity.y = 1000;
      playerCrouch.body.collideWorldBounds = true;
      playerCrouch.animations.add('right', [0, 1], 5, true);
      playerCrouch.animations.add('left', [2, 3], 5, true);
      playerCrouch.exists = false;
      game.camera.follow(player.children[0]);

      for (var p = 0; p < player.length; p++){
          player.checkWorldBounds = true;
          player.outOfBoundsKill = true;
      }

      game.physics.arcade.checkCollision.down = false;

      //add group for bullets1
      bullets1 = game.add.group()
      bullets1.enableBody = true;
      bullets1.physicsBodyType = Phaser.Physics.ARCADE;
      bullets1.createMultiple(50, 'hat1');
      bullets1.setAll('checkWorldBounds', true);
      bullets1.setAll('outOfBoundsKill', true);
      bullets1.setAll('anchor.y', 0.5);
      bullets1.setAll('scale.x', 0.85);
      bullets1.setAll('scale.y', 0.85);

      //add group for bullets2
      bullets2 = game.add.group()
      bullets2.enableBody = true;
      bullets2.physicsBodyType = Phaser.Physics.ARCADE;
      bullets2.createMultiple(50, 'hat2');
      bullets2.setAll('checkWorldBounds', true);
      bullets2.setAll('outOfBoundsKill', true);
      bullets2.setAll('anchor.y', 0.5);
      bullets2.setAll('scale.x', 0.85);
      bullets2.setAll('scale.y', 0.85);


      //Enemies
      enemyGroup = game.add.group();
      enemyGroup.enableBody = true;
      enemyGroup.physicsBodyType = Phaser.ARCADE;
      for (var i = 0; i < enemyNumber; i++){
          this.createEnemy();
      }
      enemyGroup.setAll('scale.x', 1);
      enemyGroup.setAll('scale.y', 1);
      enemyGroup.callAll('animations.add', 'animations', 'walk', [0,1,2], 5, true);
      enemyGroup.callAll('play', null, 'walk');


      cursors = game.input.keyboard.createCursorKeys();

//       game.time.events.loop(Phaser.Timer.SECOND, function(){
//         for (var i = 0, len = enemyGroup.children.length; i < len; i++){
//           mover = game.rnd.integerInRange(1, 5);
//           mover2 = game.rnd.integerInRange(1, 5);
//           if (mover == 1){
//             enemyGroup.children[i].body.velocity.x = 100;
//           }
//           else if (mover == 2){
//             enemyGroup.children[i].body.velocity.x = -100;
//           }
//           else if (mover == 3){
//             enemyGroup.children[i].body.velocity.x = 300;
//           }
//           else if (mover == 4){
//             enemyGroup.children[i].body.velocity.x = -300;
//           }
//           else{
//             enemyGroup.children[i].body.velocity.x = 0;
//           }
//           if(mover2 == 1){
//             enemyGroup.children[i].body.velocity.y = -500;
//           }
//         }
//       }, this);

      //Moving Platforms
      game.time.events.loop(Phaser.Timer.SECOND * 5, function(){
          if (right){
              rightRoids.children[0].body.velocity.x = 200;
              rightRoids.children[1].body.velocity.x = 200;
              rightRoids.children[2].body.velocity.x = 200;
              leftRoids.children[0].body.velocity.x = -200;
              leftRoids.children[1].body.velocity.x = -200;
              right = false;
              console.log('right');
          }
      })
      game.time.events.loop(Phaser.Timer.SECOND * 10, function(){
          if (!right){
              rightRoids.children[0].body.velocity.x = -200;
              rightRoids.children[1].body.velocity.x = -200;
              rightRoids.children[2].body.velocity.x = -200;
              leftRoids.children[0].body.velocity.x = 200;
              leftRoids.children[1].body.velocity.x = 200;
              right = true;
              console.log('left');
          }
      })
      
      //arrow
      arrow = game.add.sprite(10720, game.height - 190, 'arrow');

      // Pause button
      pausy = game.add.sprite(0, 0, 'pause_button1');
      pausy.visible = false;
      pausy.fixedToCamera = true;
  },

  update: function() {
      var hitPlatform = game.physics.arcade.collide(player, platforms);
      game.physics.arcade.collide(player, roids);
      game.physics.arcade.collide(player, rightRoids);
      game.physics.arcade.collide(player, leftRoids);
      game.physics.arcade.collide(topHat, platforms);
      game.physics.arcade.collide(topHat, roids);
      game.physics.arcade.collide(topHat, rightRoids);
      game.physics.arcade.collide(topHat, leftRoids);
      game.physics.arcade.collide(bCap, platforms);
      game.physics.arcade.collide(bCap, roids);
      game.physics.arcade.collide(bCap, rightRoids);
      game.physics.arcade.collide(bCap, leftRoids);
      game.physics.arcade.collide(heart, platforms);
      game.physics.arcade.collide(heart, roids);
      game.physics.arcade.collide(heart, rightRoids);
      game.physics.arcade.collide(heart, leftRoids);
      game.physics.arcade.collide(enemyGroup, platforms);
      game.physics.arcade.collide(enemyGroup, roids);
      game.physics.arcade.collide(enemyGroup, rightRoids);
      game.physics.arcade.collide(enemyGroup, leftRoids);

      // handling collision between enemyGroup and player
      for (var i = 0; i < enemyNumber; i++){
        game.physics.arcade.collide(player, enemyGroup.children[i], function(player1, enemy1){
          console.log('It Works!!');
          if(enemy1.body.touching.up && player1.body.touching.down){
            player1.body.velocity.y = -500;
            enemy1.body.y += 100;
            console.log('Player Up');
            console.log("Health Loss");
            this.loseHealth();
          }
          else if(enemy1.body.touching.down && player1.body.touching.up){
            player1.body.velocity.y = 500;
            enemy1.body.y += -100;
            console.log('Player Down');
            console.log("Health Loss");
            this.loseHealth();
          }
          else if(enemy1.body.touching.right && player1.body.touching.left){
            player1.body.velocity.x = 2000;
            enemy1.body.x += -100;
            console.log('Player Left');
            console.log("Health Loss");
            this.loseHealth();
          }
          else if(enemy1.body.touching.left && player1.body.touching.right){
            player1.body.velocity.x = -2000;
            enemy1.body.x += 100;
            console.log('Player Right');
            console.log("Health Loss");
            this.loseHealth();
          }
          else{
            console.log("Nothing");
          }
        }, null, this);
      }

      health1.frame = health_frame;

      meter.frame = meter_frame;

        for (var i = 0; i < player.length; i++){
            player.children[i].body.velocity.x = 0;
        }
        if (cursors.left.isDown)
        {
            for (var i = 0; i < player.length; i++){
                player.children[i].body.velocity.x = -350;
            }
            player.children[0].animations.play('left');
            player.children[1].animations.play('left');
            playerDirection = -1;
        }
        else if (cursors.right.isDown)
        {
            for (var i = 0; i < player.length; i++){
                player.children[i].body.velocity.x = 350;
            }
            player.children[0].animations.play('right');
            player.children[1].animations.play('right');
            playerDirection = 1;
        }
        else
        {
            player.children[0].animations.stop();
            if (playerDirection == -1){
                player.children[0].frame = 9;
                player.children[1].frame = 2;
            }
            else{
                player.children[0].frame = 0;
                player.children[1].frame = 1;
            }
        }

        // Jump
        if(player1.body.velocity.y !== 0 && playerDirection == 1)
        {
            player1.animations.play('jump_right');
        }
        if(player1.body.velocity.y !== 0 && playerDirection == -1)
        {
            player1.animations.play('jump_left');
        }
        if (cursors.up.isDown && player.children[0].body.touching.down && !crouching)
        {
            player.children[0].body.velocity.y = -700;
        }
        else if (cursors.down.isDown && !player.children[0].body.touching.down) //drop faster
        {
            player.children[0].body.velocity.y = 500;
        }
        else if (cursors.down.isDown && player.children[0].body.touching.down && !crouching){ //crouch
            crouching = true;
            this.crouchSprite();
        }
        else{ //stand
            if (cursors.up.isDown && crouching){
                this.normalSprite();
                crouching = false;
            }
        }

        // If the player is touching the ground, let him have 2 jumps
        if (player.children[0].body.touching.down) {
            this.jumps = 2;
            this.jumping = false;
        }
        // Jump!
        if (this.jumps > 0 && this.upInputIsActive(5)){
            player.children[0].body.velocity.y = -720;
            this.jumping = true;
        }
        // Reduce the number of available jumps if the jump input is released
        if (this.jumping && this.upInputReleased()) {
            this.jumps--;
            this.jumping = false;
        }
        if (cursors.down.isDown && !player.children[0].body.touching.down) //drop faster
        {
            player.children[0].body.velocity.y = 500;
        }

      // Change Socks for Firing
      game.physics.arcade.overlap(player, topHat, this.changeBulletsTopHat);
      game.physics.arcade.overlap(player, bCap, this.changeBulletsCap);

      // set fire button input
      if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
          this.fire(changeBullets);
      }

      //overlap of bullet and enemy
      game.physics.arcade.overlap(bullets1, enemyGroup, this.hitEnemy, 0, this);
      game.physics.arcade.overlap(bullets2, enemyGroup, this.hitEnemy, 0, this);
      game.physics.arcade.overlap(player, topHat, this.collectAttractiveness);
      game.physics.arcade.overlap(player, bCap, this.collectAttractiveness);
      if (health_frame < 10 && health_frame > 0){
            game.physics.arcade.overlap(player, heart, this.collectHealth);
        }

      //player loses if fall off asteroids into space
      for (var p = 0; p < player.length; p++){
          if (player.children[p].y > 900){
              this.loseHealth();
          }
      }

      // allow player to progress to boss stage when meter is full
      if(meter_frame == 15){
          if(player.children[1].x >= 8800 || player.children[0].x >= 8800){
            game.state.start('lvl4Boss');
          }
      }
      else{ //if player is not attractive enough
          if(player.children[1].x >= 8800 || player.children[0].x >= 8800 ){
              console.log('still ugly')
              warning.visible = true;
          }
          else if(player.children[1].x <= 8400|| player.children[0].x <= 8400){
              warning.visible = false;
          }
      }

      // cue death scene when all lives are lost
      if(health_frame == 10){
        console.log("hello")
        game.state.start('outro');
        health_frame = 0;
        meter_frame = 0;
      }

      window.onkeydown = function(event) {
          // Press P
          if (event.keyCode == 27){
              game.paused = !game.paused;
              pausy.visible = !pausy.visible;
          }
      }

      for (var i = 0, len = enemyGroup.children.length; i < len; i++){
          game.physics.arcade.moveToObject(enemyGroup.children[i], player.children[0]);
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
                game.state.start('lvl4Boss');
            }
        }
  },

  createEnemy: function() {
      enemy = enemyGroup.create(500 + Math.random() * 6000, 0 + Math.random() * 200,'badHat');
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
                  if (crouching){
                      star1.reset(player.children[1].x-20, player.children[1].y+50);
                  }
                  else{
                     star1.reset(player.children[0].x-20, player.children[0].y+50);
                  }
                  star1.body.velocity.x = -600; //left bullet speed
              }
            if (playerDirection == 1){
                  if (crouching){
                      star1.reset(player.children[1].x+60, player.children[1].y+50);
                  }
                  else{
                     star1.reset(player.children[0].x+60, player.children[0].y+50);
                  }
                  star1.body.velocity.x = 600; //left bullet speed
              }
              console.log("TopHat");
          }
          else if(changeBullets == 2){
              var star2 = bullets2.getFirstDead();
              star2.lifespan = 750; //how long bullet lasts
              if (playerDirection == -1){
                  if (crouching){
                      star2.reset(player.children[1].x-20, player.children[1].y+50);
                  }
                  else{
                      star2.reset(player.children[0].x-20, player.children[0].y+50);
                  }
                  star2.body.velocity.x = -600; //left bullet speed
              }
            if (playerDirection == 1){
                  if (crouching){
                      star2.reset(player.children[1].x+60, player.children[1].y+50);
                  }
                  else{
                      star2.reset(player.children[0].x+60, player.children[0].y+50);
                  }
                  star2.body.velocity.x = 600; //left bullet speed
              }
              console.log("B Cap");
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

  hit: function(s, e){
      s.kill();
      e.kill();
  },

  changeBulletsTopHat: function(player,item){
    changeBullets = 1;
    console.log('Top Hat Collected');
  },

  changeBulletsCap: function(player,item){
    changeBullets = 2;
    console.log('Cap Collected');
  },

  collectAttractiveness: function(player, item){
  // shirt is gone
      item.kill();

      // update meter
      if(meter_frame < 15){
        meter_frame += 1;
      }
  },

  loseHealth: function(player,item){
      if(health_frame < 10){
        health_frame += 1;
        console.log('Ay');
      }
  },

  collectHealth: function(player, item){
  // Sock is gone
      item.kill();

      // update meter
      if(health_frame > 0){
        health_frame -= 1;
        console.log(':)');
      }
  },

  upInputIsActive: function(duration){
  var isActive = false;

  isActive = this.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);

  return isActive;
  },

  upInputReleased: function(){
      var released = false;
      released = this.input.keyboard.upDuration(Phaser.Keyboard.UP);
      return released;
  },

  crouchSprite: function(){
      player.children[1].exists = true;
      player.children[1].x = player.children[0].x;
      player.children[1].y = player.children[0].y + 35;
      player.children[0].exists = false;
      game.camera.follow(player.children[1]);
  },

  normalSprite: function(){
      player.children[0].exists = true;
      player.children[0].x = player.children[1].x;
      player.children[0].y = player.children[1].y - 45;
      player.children[1].exists = false;
      game.camera.follow(player.children[0]);
  },

}

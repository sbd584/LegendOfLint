demo.lvl3Boss = function(){}
demo.lvl3Boss.prototype = {

    preload: function() {
        game.load.image('background', 'lintAssets/lvl3_bg.png');
        game.load.image('lvl3Ground', 'lintAssets/lvl3_ground.png');
        game.load.image('shirt1', 'lintAssets/shirt_1.png');
        game.load.image('shirt2', 'lintAssets/shirt_2.png');
        game.load.image('shirt3', 'lintAssets/shirt_3.png');
        game.load.image('shirt4', 'lintAssets/bad_shirt.png');
        game.load.image('shirt5', 'lintAssets/bad_shirt2.png');
        game.load.image('heart1', 'lintAssets/heart.png');
        game.load.image('clinetall3','lintAssets/Level3Platforms/clothesline_tall3.png');
        game.load.image('clinemed3','lintAssets/Level3Platforms/clothesline_med3.png');
        game.load.image('clinetiny3','lintAssets/Level3Platforms/clothesline_tiny3.png');
        game.load.image('special_shirt', 'lintAssets/turtleneck_pup.png');
        game.load.image('pause_button1', 'pause_lvl3.png');
        game.load.spritesheet('dude', 'lintAssets/Sprites/lint_walk_lvl3.png', 75, 147);
        game.load.spritesheet('crouch', 'lintAssets/Sprites/lint_crouch_lvl3.png', 93, 109);
        game.load.spritesheet('machine_boss3', 'lintAssets/machine_boss3.png', 230, 240);
        game.load.spritesheet('lives', 'lintAssets/lives_spritesheet.png', 275, 75);
        game.load.spritesheet('meter', 'lintAssets/meter_sheet.png', 400, 100);
        game.load.audio('lvl3_music','Audio/TheArtichokeKing.mp3');
        game.load.audio('jump', 'Audio/Jump_00.mp3');
        game.load.audio('throw', 'Audio/Shoot_01.mp3');
        game.load.audio('pickup', 'Audio/Collect_Point_00.mp3')
        game.load.audio('whoop', 'Audio/round_end.wav');
        game.load.audio('hit', 'Audio/Explosion__003.wav');
        game.load.audio('ded', 'Audio/Jingle_Lose_00.mp3');
    },

       create: function() {

        console.log('lvl3Boss');
        //Game setup
        game.stage.backgroundColor = '#ffffff';
        game.world.setBounds(0, 0, 1200, 800);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        current_lvl = 3;
        enemyNumber = 12;


        washerHealth = 400;

        // Set PlayerDirection
        playerDirection = 1;

        // Real Background
        var background = game.add.sprite(0, 0, 'background');

        //Ground
        platforms = game.add.group();
        platforms.enableBody = true;

        //Ground
        var ground = platforms.create(0, game.world.height - 100, 'lvl3Ground');
        ground.body.immovable = true;

        pole2 = game.add.group();
        pole2.enableBody = true;

        var  clinetall3 = pole2.create(0, game.world.height - 650, 'clinetall3');
        clinetall3.body.immovable = true;

        var clinemed3 = pole2.create(200, game.world.height - 510, 'clinemed3');
        clinemed3.body.immovable = true;

        var  clinetiny3 = pole2.create(400, game.world.height - 265, 'clinetiny3');
        clinetiny3.body.immovable = true;

        for (var i = 0; i < pole2.length; i++){
            pole2.children[i].body.checkCollision.up = true;
            pole2.children[i].body.checkCollision.down = false;
            pole2.children[i].body.checkCollision.right = false;
            pole2.children[i].body.checkCollision.left = false;
        }

        machine_boss = game.add.group();
        machine_boss.enableBody = true;

        var evilWasher = machine_boss.create(1050, 375, 'machine_boss3');
        //evilWasher.body.gravity.y = 1000;
        evilWasher.body.collideWorldBounds = true;
        evilWasher.scale.setTo(0.7, 0.7);
        evilWasher.animations.add('leftyuh', [0, 0, 0, 1, 2, 2, 3], 4, true);
        evilWasher.animations.play('leftyuh');
        evilWasher.animations.add('rightyuh', [7, 7, 7, 6, 5, 5, 4], 4, true);
        //evilWasher.animations.play('rightyuh');

        //Shirts
        shirt1 = game.add.group();
        shirt1.enableBody = true;
        shirt2 = game.add.group();
        shirt2.enableBody = true;
        shirt3 = game.add.group();
        shirt3.enableBody = true;
        //Hearts
        heart = game.add.group();
        heart.enableBody = true;

        special_shirt = game.add.group();
        special_shirt.enableBody = true;

        // Hearts
        var heart1 = heart.create(800, 0, 'heart1');
        var heart2 = heart.create(300, 0, 'heart1');
        //  Gravity
        heart1.body.gravity.y = 300;
        heart2.body.gravity.y = 300;
        //  Bounce
        heart1.body.bounce.y = 0.5 + Math.random() * 0.1;
        heart2.body.bounce.y = 0.5 + Math.random() * 0.1;

        special_shirt = game.add.group();
        special_shirt.enableBody = true;

        // Health
        health1 = game.add.sprite(900, 16, 'lives');
        health1.frame = 0; // begins at full health
        health1.fixedToCamera = true; //follows with camera

        // Attractiveness Meter
        meter = game.add.sprite(25, 16, 'meter');
        meter.frame = 5; //begins at empty meter
        meter.fixedToCamera = true; //follows with camera
        // 7 meter length

        // Attractiveness
        washerText = game.add.text(550, 16, 'Evil Washer: 400', { fontSize: '32px', fill: '#000' });
        washerText.fixedToCamera = true;

        // Player Group
        player = game.add.group();
        player.enableBody = true;
        player1 = player.create(200, game.world.height - 250, 'dude');
        game.physics.arcade.enable(player1);
        player1.body.gravity.y = 1000;
        player1.body.collideWorldBounds = true;
        player1.animations.add('right', [1, 3, 4], 5, true);
        player1.animations.add('left', [8, 6, 5], 5, true);
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

        //add group for bullets1
        bullets1 = game.add.group()
        bullets1.enableBody = true;
        bullets1.physicsBodyType = Phaser.Physics.ARCADE;
        bullets1.createMultiple(50, 'shirt1');
        bullets1.setAll('checkWorldBounds', true);
        bullets1.setAll('outOfBoundsKill', true);
        bullets1.setAll('anchor.y', 0.5);
        bullets1.setAll('scale.x', 0.85);
        bullets1.setAll('scale.y', 0.85);

        //add group for bullets2
        bullets2 = game.add.group()
        bullets2.enableBody = true;
        bullets2.physicsBodyType = Phaser.Physics.ARCADE;
        bullets2.createMultiple(50, 'shirt2');
        bullets2.setAll('checkWorldBounds', true);
        bullets2.setAll('outOfBoundsKill', true);
        bullets2.setAll('anchor.y', 0.5);
        bullets2.setAll('scale.x', 0.85);
        bullets2.setAll('scale.y', 0.85);

        //add group for bullets1
        bullets3 = game.add.group()
        bullets3.enableBody = true;
        bullets3.physicsBodyType = Phaser.Physics.ARCADE;
        bullets3.createMultiple(50, 'shirt3');
        bullets3.setAll('checkWorldBounds', true);
        bullets3.setAll('outOfBoundsKill', true);
        bullets3.setAll('anchor.y', 0.5);
        bullets3.setAll('scale.x', 0.85);
        bullets3.setAll('scale.y', 0.85);

        //add group for bullets1
        bullets4 = game.add.group()
        bullets4.enableBody = true;
        bullets4.physicsBodyType = Phaser.Physics.ARCADE;
        bullets4.createMultiple(50, 'shirt4');
        bullets4.setAll('checkWorldBounds', true);
        bullets4.setAll('outOfBoundsKill', true);
        bullets4.setAll('anchor.y', 0.5);
        bullets4.setAll('scale.x', 1.2);
        bullets4.setAll('scale.y', 1.2);

        //add group for bullets2
        bullets5 = game.add.group()
        bullets5.enableBody = true;
        bullets5.physicsBodyType = Phaser.Physics.ARCADE;
        bullets5.createMultiple(50, 'shirt5');
        bullets5.setAll('checkWorldBounds', true);
        bullets5.setAll('outOfBoundsKill', true);
        bullets5.setAll('anchor.y', 0.5);
        bullets5.setAll('scale.x', 1.2);
        bullets5.setAll('scale.y', 1.2);

        //add group for bullets1
        bullets6 = game.add.group()
        bullets6.enableBody = true;
        bullets6.physicsBodyType = Phaser.Physics.ARCADE;
        bullets6.createMultiple(50, 'shirt4');
        bullets6.setAll('checkWorldBounds', true);
        bullets6.setAll('outOfBoundsKill', true);
        bullets6.setAll('anchor.y', 0.5);
        bullets6.setAll('scale.x', 1.2);
        bullets6.setAll('scale.y', 1.2);

        cursors = game.input.keyboard.createCursorKeys();

        game.time.events.loop(Phaser.Timer.HALF, function(){
        mover = game.rnd.integerInRange(1, 5);
        mover2 = game.rnd.integerInRange(1, 5);
        machineBullets = game.rnd.integerInRange(1, 3);
        machineFire = game.rnd.integerInRange(1, 5);

        // y-value
        if(machine_boss.children[0].body.y > 150  && machine_boss.children[0].body.y < 550){
          if (mover == 1){
            machine_boss.children[0].body.velocity.y = -200;
          }
          else if (mover == 2){
            machine_boss.children[0].body.velocity.y = -200;
          }
          else if (mover == 3){
            machine_boss.children[0].body.velocity.y = 200;
          }
          else if (mover == 4){
            machine_boss.children[0].body.velocity.y = 200;
          }
          else{
            machine_boss.children[0].body.velocity.y = 0;
          }
        }
        else if(machine_boss.children[0].body.y < 250){
          machine_boss.children[0].body.velocity.y = 200;
        }
        else{
          machine_boss.children[0].body.velocity.y = -200;
        }

        // x-value
        if(machine_boss.children[0].body.x > 700  && machine_boss.children[0].body.x < 1100){
          if(mover2 == 1){
            machine_boss.children[0].body.velocity.x = +50;
          }
          else if(mover2 == 2){
            machine_boss.children[0].body.velocity.x = -50;
          }
          else if(mover2 == 3){
            machine_boss.children[0].body.velocity.x = -50;
          }
        }
        else if(machine_boss.children[0].body.x < 700){
          machine_boss.children[0].body.velocity.x = +50;
        }
        else{
          machine_boss.children[0].body.velocity.x = -50;
        }

        // Change Enemy Bullets
        if(machineBullets == 1){
          machineChangeBullets = 1;
        }
        else if(machineBullets == 2){
          machineChangeBullets = 2;
        }
        else{
          machineChangeBullets = 3;
        }

        // Shoot Enemy Bullets
        if (machineFire == 1){
          this.fireBoss(machineChangeBullets, -300, 900);
        }
        else if (machineFire == 2){
          this.fireBoss(machineChangeBullets, -400, 900);
        }
        else if (machineFire == 3){
          this.fireBoss(machineChangeBullets, -500, 900);
        }
        else if (machineFire == 4){
          this.fireBoss(machineChangeBullets, -600, 900);
        }
        }, this);

        for (var i = 0; i < machine_boss.length; i++){
          game.physics.arcade.collide(player.children[i], machine_boss.children[i], function(playerChild,bigFootChild){
            console.log('It Works!!');
            if(bigFootChild.body.touching.up && playerChild.body.touching.down){
              if (crouching){
                  player.children[1].body.velocity.y = -500;
              }
              else{
                  player.children[0].body.velocity.y = -500;
              }
              machine_boss.children[0].body.velocity.y = 2000;
              //machine_boss.children[1].body.velocity.y = 1000;
              console.log('Player Up');
              console.log("Health Loss");
              this.loseHealth();
            }
            else if(bigFootChild.body.touching.down && playerChild.body.touching.up){
              if (crouching){
                  player.children[1].body.velocity.y = 500;
              }
              else{
                  player.children[0].body.velocity.y = 500;
              }
              machine_boss.children[0].body.velocity.y = -2000;
              //machine_boss.children[1].body.velocity.y = -1000;
              console.log('Player Down');
              console.log("Health Loss");
              this.loseHealth();
            }
            else if(bigFootChild.body.touching.right && playerChild.body.touching.left){
              if (crouching){
                  player.children[1].body.velocity.x = 2000;
              }
              else{
                  player.children[0].body.velocity.x = 2000;
              }
              machine_boss.children[0].body.velocity.x = -6000;
              //machine_boss.children[1].body.velocity.x = -3000;
              console.log('Player Left');
              console.log("Health Loss");
              this.loseHealth();
            }
            else if(bigFootChild.body.touching.left && playerChild.body.touching.right){
              if (crouching){
                  player.children[1].body.velocity.x = -2000;
              }
              else{
                  player.children[0].body.velocity.x = -2000;
              }
              machine_boss.children[0].body.velocity.x = 6000;
              //machine_boss.children[1].body.velocity.x = 3000;
              console.log('Player Right');
              console.log("Health Loss");
              this.loseHealth();
            }
            else{
              console.log("Nothing");
            }
          }, null, this);
        }

        // Pause button
        pausy = game.add.sprite(0, 0, 'pause_button1');
        pausy.visible = false;
        pausy.fixedToCamera = true;

  },

    update: function() {

        // if(player.body.velocity.y <= -5000){
        //   game.state.start('lvl4');
        // }

        //menu updates
        health1.frame = health_frame;
        meter.frame = 5;

        var hitPlatform = game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(shirt1, platforms);
        game.physics.arcade.collide(shirt2, platforms);
        game.physics.arcade.collide(shirt3, platforms);
        game.physics.arcade.collide(shirt1, player);
        game.physics.arcade.collide(shirt2, player);
        game.physics.arcade.collide(shirt3, player);
        game.physics.arcade.collide(shirt2, machine_boss);
        game.physics.arcade.collide(shirt3, machine_boss);
        game.physics.arcade.collide(heart, pole2);
        game.physics.arcade.collide(player, pole2);
        //game.physics.arcade.collide(bullets1, machine_boss);
        //game.physics.arcade.collide(bullets2, machine_boss);
        //game.physics.arcade.collide(bullets3, machine_boss);
        game.physics.arcade.collide(heart, platforms);
        game.physics.arcade.collide(special_shirt, platforms);
        game.physics.arcade.collide(player, machine_boss,function(player1, enemy1){
          this.loseHealth();
          machine_boss.children[0].body.velocity.x = 1500;
          player.children[0].body.velocity.x = -1500;
          player.children[1].body.velocity.x = -1500;
        }, null, this);
        // Stop foot from colliding with left bounds and going under ground
        if (machine_boss.children[0].body.x < 50){
            machine_boss.children[0].body.velocity.x = 2000;
        }
        if (machine_boss.children[0].body.y > game.world.height - 100){
            machine_boss.children[0].body.velocity.y = -1000;
        }
        if (machine_boss.children[0].body.x > 1150){
            machine_boss.children[0].body.velocity.x = -4000;
        }
        if (machine_boss.children[0].body.y < 0){
            machine_boss.children[0].body.velocity.y = 1000;
        }

        game.physics.arcade.collide(player, machine_boss);

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
            music = game.sound.play('jump');
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
            music = game.sound.play('jump');
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

        if(crouching == false && player.children[0].body.x >= machine_boss.children[0].body.x){
            // yuh
        }
        else if(crouching == true && player.children[1].body.x >= machine_boss.children[0].body.x){
            // yuh
        }
        else{
            // yuh
        }

        // var evilWasher = machine_boss.create(1050, 375, 'machine_boss1');
        // //evilWasher.body.gravity.y = 1000;
        // evilWasher.body.collideWorldBounds = true;
        // evilWasher.scale.setTo(0.7, 0.7);
        // evilWasher.animations.add('leftyuh', [0, 1, 2, 3], 2, true);

        // Change Socks for Firing
        //game.physics.arcade.overlap(player, shirt1, this.changeBulletsRed);
        //game.physics.arcade.overlap(player, shirt2, this.changeBulletsYellow);

        // set fire button input
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            this.fire(changeBullets);
        }

        //overlap of bullet and enemy
        game.physics.arcade.overlap(bullets1, machine_boss, this.hitBigWasher);
        game.physics.arcade.overlap(bullets2, machine_boss, this.hitBigWasher);
        game.physics.arcade.overlap(bullets3, machine_boss, this.hitBigWasher);
        game.physics.arcade.overlap(bullets1, bullets4,this.hit);
        game.physics.arcade.overlap(bullets1, bullets5,this.hit);
        game.physics.arcade.overlap(bullets1, bullets6,this.hit);
        game.physics.arcade.overlap(bullets2, bullets4,this.hit);
        game.physics.arcade.overlap(bullets2, bullets5,this.hit);
        game.physics.arcade.overlap(bullets2, bullets6,this.hit);
        game.physics.arcade.overlap(bullets3, bullets4,this.hit);
        game.physics.arcade.overlap(bullets3, bullets5,this.hit);
        game.physics.arcade.overlap(bullets3, bullets6,this.hit);
        game.physics.arcade.overlap(player, bullets4, this.hitByBullets);
        game.physics.arcade.overlap(player, bullets5, this.hitByBullets);
        game.physics.arcade.overlap(player, bullets6, this.hitByBullets);
        game.physics.arcade.overlap(bullets1, bullets4, this.hit);
        game.physics.arcade.overlap(bullets2, bullets5, this.hit);
        game.physics.arcade.overlap(bullets3, bullets6, this.hit);
        if (health_frame < 6 && health_frame > 0){
            game.physics.arcade.overlap(player, heart, this.collectHealth);
        }
        game.physics.arcade.overlap(player, special_shirt, this.hitSpecialShirt);

        // if(machine_boss.children[0].body.x >=  player.body.x){
        //     machineBossDirection = 0;
        // }
        // if(machine_boss.children[0].body.x >=  player.body.x){
        //     machineBossDirection = 0;
        // }
        // else{
        //     machineBossDirection = 1;
        // }

        // cue death scene when all lives are lost
        if(health_frame == 6){
          console.log("hello")
          lvl_music.pause()
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
            if (event.keyCode == "S".charCodeAt(0)){
                game.state.start('spaceTransition');
            }
            if (event.keyCode == "4".charCodeAt(0)){
                game.state.start('lvl4');
            }
        }

    },

    createEnemy: function() {
        enemy = enemyGroup.create(360 + Math.random() * 4000, 200 + Math.random() * 200,'badWasher');
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
                  music = game.sound.play('throw');
                  star1.body.velocity.x = -600; //left bullet speed
              }
              if (playerDirection == 1){
                  if (crouching){
                      star1.reset(player.children[1].x+60, player.children[1].y+50);
                  }
                  else{
                     star1.reset(player.children[0].x+60, player.children[0].y+50);
                  }
                  music = game.sound.play('throw');
                  star1.body.velocity.x = 600; //left bullet speed
              }
              console.log("RedSock");
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
                  music = game.sound.play('throw');
                  star2.body.velocity.x = -600; //left bullet speed
              }
              if (playerDirection == 1){
                  if (crouching){
                      star2.reset(player.children[1].x+60, player.children[1].y+50);
                  }
                  else{
                      star2.reset(player.children[0].x+60, player.children[0].y+50);
                  }
                  music = game.sound.play('throw');
                  star2.body.velocity.x = 600; //left bullet speed
              }
              console.log("GreenSock");
            }
            else if(changeBullets == 3){
              var star3 = bullets3.getFirstDead();
              star3.lifespan = 750; //how long bullet lasts
              if (playerDirection == -1){
                  if (crouching){
                      star3.reset(player.children[1].x-20, player.children[1].y+50);
                  }
                  else{
                      star3.reset(player.children[0].x-20, player.children[0].y+50);
                  }
                  music = game.sound.play('throw');
                  star3.body.velocity.x = -600; //left bullet speed
              }
              if (playerDirection == 1){
                  if (crouching){
                      star3.reset(player.children[1].x+60, player.children[1].y+50);
                  }
                  else{
                      star3.reset(player.children[0].x+60, player.children[0].y+50);
                  }
                  music = game.sound.play('throw');
                  star3.body.velocity.x = 600; //left bullet speed
              }
              console.log("GreenSock");
            }

        }
    },

    fireBoss: function(changeBullets, vel, fireRate2){
        if (washerHealth > 0){
            if(game.time.now > nextFire2){
                nextFire2 = game.time.now + fireRate2;
                //sets rate of fire, change fireRate to set speed
                console.log('Boss Firing');
                //music = game.sound.play('blaster');
                if(changeBullets == 1){
                  var star4 = bullets4.getFirstDead();
                  star4.lifespan = 750; //how long bullet lasts
                  star4.reset(machine_boss.children[0].x+50, machine_boss.children[0].y+150);
                  star4.body.velocity.x = vel; //left bullet speed
                }
                else if(changeBullets == 2){
                  var star5 = bullets5.getFirstDead();
                  star5.lifespan = 750; //how long bullet lasts
                  star5.reset(machine_boss.children[0].x+50, machine_boss.children[0].y+150);
                  star5.body.velocity.x = vel; //left bullet speed
                }
                else if(changeBullets == 3){
                  var star6 = bullets6.getFirstDead();
                  star6.lifespan = 750; //how long bullet lasts
                  star6.reset(machine_boss.children[0].x+50, machine_boss.children[0].y+150);
                  star6.body.velocity.x = vel; //left bullet speed
                }
            }
        }
    },

    hitEnemy: function(bullets, enemy){
        if(enemy.body.x >= bullets.body.x + 40 || enemy.body.x <= bullets.body.x - 40){
          music = game.sound.play('hit');
          console.log('hit');
          enemy.kill();
          enemy.destroy();
          bullets.kill();
          //music = game.sound.play('explosion');
        }
    },

    hitWasherBullets: function(bullet, washerBullet){
      console.log('bullet collision');
      music = game.sound.play('hit');
      bullet.kill();
      washerBullet.kill();
    },

    hitByBullets: function(player, bullet){
      console.log('your hit!');
      music = game.sound.play('hit');
      bullet.kill();
      if(health_frame < 6){
        health_frame += 1;
        console.log('Ay');
      }
    },

    hitBigWasher: function(bullet, washerBoss){
        console.log('Big Wash Down');
        music = game.sound.play('hit');
        washerHealth -= 20;
        washerText.text = 'Evil Washer: ' + washerHealth;
        bullet.kill();
        console.log("washer health " +  washerHealth)
        if(washerHealth <= 0){
            machine_boss.children[0].body.x = -300;
            machine_boss.children[0].kill();
            washerText.kill();
            console.log("WORK!!" +  washerHealth);
            var special_shirt1 = special_shirt.create(1100, 0, 'special_shirt');
            special_shirt1.scale.setTo(1,1);
            special_shirt1.body.gravity.y = 300;
            special_shirt1.body.bounce.y = .5;
        }
    },

    hitSpecialShirt: function(player, special_shirt1){
        lvl_music.pause()
        music = game.sound.play('whoop');
        special_shirt1.kill();
        // player.body.velocity.y = -10000;
        game.state.start('shirtPowerup');
    },

    hit: function(s, e){
        s.kill();
        e.kill();
    },

    changeBulletsRed: function(player,item){
      changeBullets = 1;
      console.log('Red Shirt Collected');
    },

    changeBulletsYellow: function(player,item){
      changeBullets = 2;
      console.log('Yellow Shirt Collected');
    },

    changeBulletsPurple: function(player,item){
      changeBullets = 3;
      console.log('Purple Shirt Collected');
    },

    collectAttractiveness: function(player, item){
    // shirt is gone
        music = game.sound.play('pickup');
        item.kill();

        // update meter
        if(meter_frame < 10){
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
    // Sock is gone
        music = game.sound.play('pickup');
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

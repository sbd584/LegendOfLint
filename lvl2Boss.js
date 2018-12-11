/*var demo = {}, player, platforms, backgroundEffects, cloudy, sock, heart, cursors, bullets, nextFire = 0, fireRate = 200,
BigFoot1, velocity = 1000, attractiveness = 0, health = 100, music, bigFootHealth = 300, bigFootText, health1,
health_frame = 0; meter_frame = 0;*/

demo.lvl2Boss = function(){}
demo.lvl2Boss.prototype = {

    preload: function() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('baddie', 'lintAssets/bad_sock.png',77,133);
        game.load.image('ground', 'lintAssets/ground.png');
        game.load.image('cloudBig','lintAssets/cloud_long.png');
        game.load.image('cloudMed','lintAssets/cloud_med.png');
        game.load.image('cloudSmall','lintAssets/cloud_small.png');
        game.load.image('squares', 'lintAssets/backgroundSquares.png');
        game.load.image('sock1', 'lintAssets/sock_1.png');
        game.load.image('stank', 'lintAssets/sock_1.png');
        game.load.image('sock2', 'lintAssets/sock_2.png');
        game.load.image('heart1', 'lintAssets/heart.png');
        //game.load.image('evilFoot', 'lintAssets/foot.png');
        game.load.image('special_sock', 'lintAssets/jump_shoes.png');
        game.load.image('foot_1', 'lintAssets/foot_1.png');
        game.load.image('foot_2', 'lintAssets/foot_2.png');
        game.load.image('pause_button1', 'pause_lvl2.png');
        game.load.image('sprint1Bg1Long', 'lintAssets/sprint1_bg_long.png');
        game.load.image('sprint1Bg1', 'lintAssets/sprint1_bg.png');
        game.load.spritesheet('dude', 'lintAssets/Sprites/lint_walk_lvl2.png', 75, 147);
        game.load.spritesheet('crouch', 'lintAssets/Sprites/lint_crouch_lvl2', 93, 109);
        game.load.spritesheet('lives', 'lintAssets/lives_spritesheet.png', 275, 75);
        game.load.spritesheet('meter', 'lintAssets/meter_sheet.png', 400, 100);
        game.load.audio('lvl2_music','Audio/CoolAsACucumber.mp3');
        game.load.audio('jump', 'Audio/Jump_00.mp3');
        game.load.audio('throw', 'Audio/Shoot_01.mp3');
        game.load.audio('pickup', 'Audio/Collect_Point_00.mp3')
        game.load.audio('whoop', 'Audio/round_end.wav');
        game.load.audio('hit', 'Audio/Explosion__003.wav');
        game.load.audio('ded', 'Audio/Jingle_Lose_00.mp3');

    },

    create: function() {

        // Game setup
        game.stage.backgroundColor = '#ffffff';
        game.world.setBounds(0,0, 1200, 800);
        //game.scale.scaleMode= Phaser.ScaleManager.RESIZE;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        current_lvl = 2;
        enemyNumber = 5;
        crouching = false;

        bigFootHealth = 300;

        // Set PlayerDirection
        playerDirection = 1;

        //Tiles/squares
        backgroundEffects = game.add.group();
        //Ground
        platforms = game.add.group();
        platforms.enableBody = true;
        //BigToe
        BigFoot1 = game.add.group();
        BigFoot1.enableBody = true;
        game.physics.arcade.enable(player);
        //Clouds
        cloudy = game.add.group();
        cloudy.enableBody = true;
        //Socks
        sockRed = game.add.group();
        sockRed.enableBody = true;
        sockGreen = game.add.group();
        sockGreen.enableBody = true;
        //Hearts
        heart = game.add.group();
        heart.enableBody = true;

        special_sock = game.add.group();
        special_sock.enableBody = true;



        // Real Background
        var sprint1Bg1Long = backgroundEffects.create(0, -16, 'sprint1Bg1Long');
        sprint1Bg1Long.scale.setTo(1,1);

        //Tiles/squares: For Production
        //var squares = backgroundEffects.create(0, -16, 'squares');
        //squares.scale.setTo(1, 1);
        //squares = backgroundEffects.create(1200, -16, 'squares');
        //squares.scale.setTo(1, 1);


        //Ground
        var ground = platforms.create(0, game.world.height - 100, 'ground');
        // Edit distance of ground via x-value
        ground.scale.setTo(2, 1);
        ground.body.immovable = true;


        //BigFoot
        var evilFoot = BigFoot1.create(1050, 375, 'foot_1');
        evilFoot.body.gravity.y = 1000;
        evilFoot.body.collideWorldBounds = true;
        evilFoot.scale.setTo(0.7, 0.7);
        var evilLeg = BigFoot1.create(1050, 0, 'foot_2');
        evilLeg.body.gravity.y = 1000;
        evilLeg.body.collideWorldBounds = true;
        evilLeg.scale.setTo(0.7, 0.7);

        //Clouds
        // Small
        var cloudSmall = cloudy.create(900, game.world.height - 800, 'cloudSmall');
        cloudSmall.scale.setTo(1, 1);
        cloudSmall.body.immovable = true;
        cloudSmall = cloudy.create(800, game.world.height - 400, 'cloudSmall');
        cloudSmall.body.immovable = true;
        cloudSmall = cloudy.create(600, game.world.height - 675, 'cloudSmall');
        cloudSmall.body.immovable = true;
        cloudSmall = cloudy.create(500, game.world.height - 300, 'cloudSmall');
        cloudSmall.body.immovable = true;
        cloudSmall = cloudy.create(350, game.world.height - 250, 'cloudSmall');
        cloudSmall.body.immovable = true;
        cloudSmall = cloudy.create(200, game.world.height - 500, 'cloudSmall');
        cloudSmall.body.immovable = true;
        cloudSmall = cloudy.create(100, game.world.height - 625, 'cloudSmall');
        cloudSmall.body.immovable = true;
        var tinyCloud = cloudy.create(1050, game.world.height - 101, 'cloudSmall'); //the real MVP, plz dont delete
        tinyCloud.scale.setTo(0.01, 0.01);
        tinyCloud.body.immovable = true;

        // jump through bottom of clouds
        for (var i = 0; i < cloudy.length; i++){
            cloudy.children[i].body.checkCollision.up = true;
            cloudy.children[i].body.checkCollision.down = false;
            cloudy.children[i].body.checkCollision.right = false;
            cloudy.children[i].body.checkCollision.left = false;
        }

        // Hearts
        var heart1 = heart.create(800, 0, 'heart1');
        var heart2 = heart.create(300, 0, 'heart1');
        // var heart3 = heart.create(1100, 0, 'heart1');
        // var heart4 = heart.create(2350, 0, 'heart1');
        //  Gravity
        heart1.body.gravity.y = 300;
        heart2.body.gravity.y = 300;
        // heart3.body.gravity.y = 300;
        // heart4.body.gravity.y = 300;
        //  Bounce
        heart1.body.bounce.y = 0.5 + Math.random() * 0.1;
        heart2.body.bounce.y = 0.5 + Math.random() * 0.1;
        // heart3.body.bounce.y = 0.5 + Math.random() * 0.1;
        // heart4.body.bounce.y = 0.5 + Math.random() * 0.1;

        // Health
        health1 = game.add.sprite(900, 16, 'lives');
        health1.frame = 0; // begins at full health
        health1.fixedToCamera = true; //follows with camera

        // Attractiveness Meter
        meter = game.add.sprite(25, 16, 'meter');
        meter.frame = 0; //begins at empty meter
        meter.fixedToCamera = true; //follows with camera
        // 7 meter length

        bigFootText = game.add.text(550, 16, 'Big Foot: 300', { fontSize: '32px', fill: '#000' });
        bigFootText.fixedToCamera = true;

        // Player Group
        player = game.add.group();
        player.enableBody = true;
        player1 = player.create(200, game.world.height - 250, 'dude');
        game.physics.arcade.enable(player1);
        player1.body.gravity.y = 1000;
        player1.body.collideWorldBounds = true;
        player1.animations.add('right', [1, 2, 3, 4], 8, true);
        player1.animations.add('left', [7, 6, 5], 8, true);
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
        bullets1.createMultiple(50, 'sock1');
        bullets1.setAll('checkWorldBounds', true);
        bullets1.setAll('outOfBoundsKill', true);
        bullets1.setAll('anchor.y', 0.5);
        bullets1.setAll('scale.x', 0.85);
        bullets1.setAll('scale.y', 0.85);

        //add group for bullets2
        bullets2 = game.add.group()
        bullets2.enableBody = true;
        bullets2.physicsBodyType = Phaser.Physics.ARCADE;
        bullets2.createMultiple(50, 'sock2');
        bullets2.setAll('checkWorldBounds', true);
        bullets2.setAll('outOfBoundsKill', true);
        bullets2.setAll('anchor.y', 0.5);
        bullets2.setAll('scale.x', 0.85);
        bullets2.setAll('scale.y', 0.85);

        // // The enemy's bullets
        // stank = game.add.group();
        // stank.enableBody = true;
        // stank.physicsBodyType = Phaser.Physics.ARCADE;
        // stank.createMultiple(30, 'sock1');
        // stank.setAll('anchor.x', 0.5);
        // stank.setAll('anchor.y', 1);
        // stank.setAll('outOfBoundsKill', true);
        // stank.setAll('checkWorldBounds', true);

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
            mover = game.rnd.integerInRange(1, 5);
            mover2 = game.rnd.integerInRange(1, 5);
            if (mover == 1){
              enemyGroup.children[i].body.velocity.x = 100;
            }
            else if (mover == 2){
              enemyGroup.children[i].body.velocity.x = -100;
            }
            else if (mover == 3){
              enemyGroup.children[i].body.velocity.x = 300;
            }
            else if (mover == 4){
              enemyGroup.children[i].body.velocity.x = -300;
            }
            else{
              enemyGroup.children[i].body.velocity.x = 0;
            }
            if(mover2 == 1){
              enemyGroup.children[i].body.velocity.y = -500;
            }
          }
        }, this);

        //var tween = game.add.tween(BigFoot1).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        //tween.onLoop.add(moveBigFoot, this);

        game.time.events.loop(Phaser.Timer.SECOND * 5, function(){
            console.log('foot up')
            BigFoot1.children[0].body.velocity.y = -1000;
            BigFoot1.children[1].body.velocity.y = -1000;

        },this);

        game.time.events.loop(Phaser.Timer.SECOND / 5, function(){
            mover = game.rnd.integerInRange(1, 4);
            if (mover == 1){
                console.log('right')
                BigFoot1.children[0].body.velocity.x = 300;
                BigFoot1.children[1].body.velocity.x = 300;
            }
            else if (mover == 2 || mover == 3){
                console.log('left')
                BigFoot1.children[0].body.velocity.x = -300;
                BigFoot1.children[1].body.velocity.x = -300;
            }
            else{
                console.log('still')
                BigFoot1.children[0].body.velocity.x = 0;
                BigFoot1.children[1].body.velocity.x = 0;
                //evilFoot.body.x = 0
            }
        }, this);

        // Pause button
        pausy = game.add.sprite(0, 0, 'pause_button1');
        pausy.visible = false;
        pausy.fixedToCamera = true;

    },

    update: function() {
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        var hitShoes = game.physics.arcade.collide(special_sock, cloudy);
        game.physics.arcade.collide(player, cloudy);
        game.physics.arcade.collide(sockRed, platforms);
        game.physics.arcade.collide(sockGreen, platforms);
        game.physics.arcade.collide(heart, platforms);
        game.physics.arcade.collide(special_sock, platforms);
        game.physics.arcade.collide(heart, cloudy);
        game.physics.arcade.collide(enemyGroup, platforms);
        game.physics.arcade.collide(enemyGroup, cloudy);
        game.physics.arcade.collide(BigFoot1, platforms);
        game.physics.arcade.collide(BigFoot1.children[0], BigFoot1.children[1]);

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

        //collision player and foot, push back, lose health
        for (var i = 0; i < BigFoot1.length; i++){
          game.physics.arcade.collide(player.children[i], BigFoot1.children[i], function(playerChild,bigFootChild){
            console.log('It Works!!');
            if(bigFootChild.body.touching.up && playerChild.body.touching.down){
              if (crouching){
                  player.children[1].body.velocity.y = -500;
              }
              else{
                  player.children[0].body.velocity.y = -500;
              }
              BigFoot1.children[0].body.velocity.y = 1000;
              BigFoot1.children[1].body.velocity.y = 1000;
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
              BigFoot1.children[0].body.velocity.y = -1000;
              BigFoot1.children[1].body.velocity.y = -1000;
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
              BigFoot1.children[0].body.velocity.x = -3000;
              BigFoot1.children[1].body.velocity.x = -3000;
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
              BigFoot1.children[0].body.velocity.x = 3000;
              BigFoot1.children[1].body.velocity.x = 3000;
              console.log('Player Right');
              console.log("Health Loss");
              this.loseHealth();
            }
            else{
              console.log("Nothing");
            }
          }, null, this);
        }

        game.physics.arcade.collide(player, BigFoot1);
        // Fixing Foot Collision with Ground
        var tinyCloudfix = game.physics.arcade.collide(BigFoot1, cloudy.children[7]);

        if (tinyCloudfix){
            cloudy.children[7].kill();
        }

        // Stop foot from colliding with left bounds and going under ground
        if (BigFoot1.children[0].body.x < 50){
            BigFoot1.children[0].body.velocity.x = 2000;
            BigFoot1.children[1].body.velocity.x = 2000;
        }
        if (BigFoot1.children[0].body.y > game.world.height - 50){
            BigFoot1.children[0].body.velocity.y = -1000;
            BigFoot1.children[1].body.velocity.y = -1000;
        }

        //fix broken foot
        if (BigFoot1.children[1].x != BigFoot1.children[0].x + 138){
            BigFoot1.children[1].x = BigFoot1.children[0].x + 138
            console.log('fix')
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

        // Change Socks for Firing
        game.physics.arcade.overlap(player, sockRed, this.changeBulletsRed);
        game.physics.arcade.overlap(player, sockGreen, this.changeBulletsGreen);

        // set fire button input
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            this.fire(changeBullets);
        }


        //overlap of bullet and enemy
        game.physics.arcade.overlap(bullets1, enemyGroup, this.hitEnemy, 0, this);
        game.physics.arcade.overlap(bullets1, BigFoot1, this.hitBigFoot);
        game.physics.arcade.overlap(bullets2, enemyGroup, this.hitEnemy, 0, this);
        game.physics.arcade.overlap(bullets2, BigFoot1, this.hitBigFoot);
        game.physics.arcade.overlap(player, sock, this.collectAttractiveness);
        if (health_frame < 6 && health_frame > 0){
            game.physics.arcade.overlap(player, heart, this.collectHealth);
        }
        game.physics.arcade.overlap(player, special_sock, this.hitShoes);

        // cue death scene when all lives are lost
        if(health_frame == 6){
          console.log("hello")
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
        }

    },

    createEnemy: function() {
        enemy = enemyGroup.create(360 + Math.random() * 1000, 120 + Math.random() * 200,'baddie');
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

        }
    },

    hitEnemy: function(bullets, enemy){
        if(enemy.body.x >= bullets.body.x + 40 || enemy.body.x <= bullets.body.x - 40){
          console.log('hit');
          music = game.sound.play('hit');
          enemy.kill();
          enemy.destroy();
          bullets.kill();
          //music = game.sound.play('explosion');
        }
    },

    hitBigFoot: function(bullet,evilFoot){
        console.log('hit');
        music = game.sound.play('hit');
        bigFootHealth -= 20;
        bigFootText.text = 'Big Foot:' + bigFootHealth;
        bullet.kill();
        if(bigFootHealth <= 0){
            BigFoot1.children[0].kill();
            BigFoot1.children[1].kill();
            bigFootText.kill();
            var special_sock1 = special_sock.create(1100, 0, 'special_sock');
            special_sock1.scale.setTo(.5,.5);
            special_sock1.body.gravity.y = 300;
            special_sock1.body.bounce.y = .5;
           }
    },

    hitShoes: function(player, special_sock1){
        lvl_music.pause();
        music = game.sound.play('whoop');
        special_sock1.kill();
        game.state.start('dbljump');
    },

    hit: function(s, e){
        s.kill();
        e.kill();
    },

    changeBulletsRed: function(player,item){
      changeBullets = 1;
      console.log('Red Sock Collected');
    },

    changeBulletsGreen: function(player,item){
      changeBullets = 2;
      console.log('Green Sock Collected');
    },

    collectAttractiveness: function(player, item){
    // Sock is gone
        music = game.sound.play('pickup');
        item.kill();

        // update meter
        if(meter_frame < 5){
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
//     },
//
//     enemyStank: function(){
//       //  Grab the first bullet we can from the pool
//       stank = stank.getFirstExists(false);
//
//       //livingEnemies.length=0;
//
//     if (enemyBullet)
//     {
//
//         var random=game.rnd.integerInRange(0,livingEnemies.length-1);
//
//         // randomly select one of them
//         var shooter=livingEnemies[random];
//         // And fire the bullet from this enemy
//         enemyBullet.reset(shooter.body.x, shooter.body.y);
//
//         game.physics.arcade.moveToObject(enemyBullet,player,120);
//         firingTimer = game.time.now + 2000;
//     }
//
// }


//     ,
//
//     footStank: function(){
//       if (enemyBullet && livingEnemies.length > 0)
//
//     var random=game.rnd.integerInRange(0,livingEnemies.length-1);
//
//     // randomly select one of them
//     var shooter=livingEnemies[random];
//     // And fire the bullet from this enemy
//     enemyBullet.reset(shooter.body.x, shooter.body.y);
//
//     game.physics.arcade.moveToObject(enemyBullet,player,120);
//     firingTimer = game.time.now + 2000;
//     }


}
//to change bullet types we can probably just have an if statement
//that catches an input then reassigns the bullet group to a different sprite

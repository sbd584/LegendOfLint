/*var demo = {}, player, platforms, backgroundEffects, cloudy, sock, heart, cursors, bullets, nextFire = 0, fireRate = 200,
BigFoot1, velocity = 1000, attractiveness = 0, health = 100, music, bigFootHealth = 300, bigFootText, health1,
health_frame = 0; meter_frame = 0;*/

demo.lvl2 = function(){}
demo.lvl2 = {

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
        game.load.image('sock2', 'lintAssets/sock_2.png');
        game.load.image('heart1', 'lintAssets/heart.png');
        game.load.image('evilFoot', 'lintAssets/foot.png');
        game.load.image('sprint1Bg1Long', 'lintAssets/sprint1_bg_long.png');
        game.load.image('sprint1Bg1', 'lintAssets/sprint1_bg.png');
        game.load.image('arrow', 'lintAssets/arrow.png');
        game.load.image('warning', 'lintAssets/warning1.png');
        game.load.image('pause_button1', 'pause_lvl2.png');
        game.load.spritesheet('dude', 'lintAssets/Sprites/lint_walk_lvl2.png', 75, 147);
        game.load.spritesheet('crouch', 'lintAssets/Sprites/lint_crouch_lvl2.png', 93, 109);
        game.load.spritesheet('lives', 'lintAssets/lives_spritesheet.png', 275, 75);
        game.load.spritesheet('meter', 'lintAssets/meter_sheet.png', 400, 100);
        game.load.audio('boss music','lintAssets/PowerSupply.mp3');
        game.load.audio('blaster', 'lintAssets/blaster.mp3');
        game.load.audio('explosion', 'lintAssets/explosion.mp3');
    },

    create: function() {
        //Music
        music = game.sound.play('boss music');

        console.log('Level 2');

        // Game setup
        game.stage.backgroundColor = '#ffffff';
        game.world.setBounds(0,0, 3600, 800);
        //game.scale.scaleMode= Phaser.ScaleManager.RESIZE;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        current_lvl = 2;
        enemyNumber = 5;
        crouching = false;


        // Set PlayerDirection
        playerDirection = 1;

        //Tiles/squares
        backgroundEffects = game.add.group();
        //Ground
        platforms = game.add.group();
        platforms.enableBody = true;
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

        // Real Background
        var sprint1Bg1Long = backgroundEffects.create(0, -16, 'sprint1Bg1Long');
        sprint1Bg1Long.scale.setTo(1,1);


        //Ground
        for (var i = 0; i < 3; i++){
            var ground = platforms.create(i * 1200, game.world.height - 100, 'ground');
            // Edit distance of ground via x-value
            ground.body.immovable = true;
        }

        //Clouds
        // Big
        var cloudBig = cloudy.create(50, game.world.height - 450, 'cloudBig');
        cloudBig.scale.setTo(1, 1);
        cloudBig.body.immovable = true;
        cloudBig = cloudy.create(550, game.world.height - 250, 'cloudBig');
        cloudBig.body.immovable = true;
        cloudBig = cloudy.create(1500, game.world.height - 200, 'cloudBig');
        cloudBig.body.immovable = true;
        cloudBig = cloudy.create(2500, game.world.height - 200, 'cloudBig');
        cloudBig.body.immovable = true;
        // Medium
        var cloudMed = cloudy.create(700, game.world.height - 450, 'cloudMed');
        cloudMed.scale.setTo(1, 1);
        cloudMed.body.immovable = true;
        //cloudMed = cloudy.create(1250, game.world.height - 250, 'cloudMed');
        //cloudMed.body.immovable = true;
        cloudMed = cloudy.create(1450, game.world.height - 550, 'cloudMed');
        cloudMed.body.immovable = true;
        cloudMed = cloudy.create(1850, game.world.height - 725, 'cloudMed');
        cloudMed.body.immovable = true;
        cloudMed = cloudy.create(2750, game.world.height - 725, 'cloudMed');
        cloudMed.body.immovable = true;
        cloudMed = cloudy.create(3200, game.world.height - 525, 'cloudMed');
        cloudMed.body.immovable = true;
        // Small
        var cloudSmall = cloudy.create(850, game.world.height - 750, 'cloudSmall');
        cloudSmall.scale.setTo(1, 1);
        cloudSmall.body.immovable = true;
        cloudSmall = cloudy.create(150, game.world.height - 750, 'cloudSmall');
        cloudSmall.body.immovable = true;
        cloudSmall = cloudy.create(50, game.world.height - 725, 'cloudSmall');
        cloudSmall.body.immovable = true;
        cloudSmall = cloudy.create(250, game.world.height - 775, 'cloudSmall');
        cloudSmall.body.immovable = true;
        cloudSmall = cloudy.create(1100, game.world.height - 375, 'cloudSmall');
        cloudSmall.body.immovable = true;
        cloudSmall = cloudy.create(1700, game.world.height - 825, 'cloudSmall');
        cloudSmall.body.immovable = true;
        cloudSmall = cloudy.create(1750, game.world.height - 450, 'cloudSmall');
        cloudSmall.body.immovable = true;
        cloudSmall = cloudy.create(2500, game.world.height - 775, 'cloudSmall');
        cloudSmall.body.immovable = true;
        cloudSmall = cloudy.create(2150, game.world.height - 425, 'cloudSmall');
        cloudSmall.body.immovable = true;
        cloudSmall = cloudy.create(2650, game.world.height - 325, 'cloudSmall');
        cloudSmall.body.immovable = true;
        cloudSmall = cloudy.create(3050, game.world.height - 800, 'cloudSmall');
        cloudSmall.body.immovable = true;
        // jump through bottom of clouds
        for (var i = 0; i < cloudy.length; i++){
            cloudy.children[i].body.checkCollision.up = true;
            cloudy.children[i].body.checkCollision.down = false;
            cloudy.children[i].body.checkCollision.right = false;
            cloudy.children[i].body.checkCollision.left = false;
        }


        //arrow
        arrow = game.add.sprite(3400, game.height - 190, 'arrow');
        //not attractive pop-up
        warning = game.add.sprite(3000, 100, 'warning');
        warning.visible = false;

        //  Socks
        var sock1 = sockRed.create(70, 0, 'sock1');
        var sock2 = sockGreen.create(2700, 0, 'sock2');
        var sock3 = sockRed.create(470, 0, 'sock1');
        var sock4 = sockGreen.create(800, 0, 'sock2');
        var sock5 = sockRed.create(1270, 400, 'sock1');
        var sock6 = sockGreen.create(2000, 0, 'sock2');
        var sock7 = sockRed.create(1670, 300, 'sock1');
        var sock10 = sockGreen.create(1200, 400, 'sock2');
        var sock11 = sockRed.create(1170, 0, 'sock1');
        var sock12 = sockGreen.create(1500, 0, 'sock2');
        //  Gravity
        sock1.body.gravity.y = 300;
        sock2.body.gravity.y = 300;
        sock3.body.gravity.y = 300;
        sock4.body.gravity.y = 300;
        sock5.body.gravity.y = 300;
        sock6.body.gravity.y = 300;
        sock7.body.gravity.y = 300;
        sock10.body.gravity.y = 300;
        sock11.body.gravity.y = 300;
        sock12.body.gravity.y = 300;
        //  Bounce
        sock1.body.bounce.y = 0.7 + Math.random() * 0.2;
        sock2.body.bounce.y = 0
        sock3.body.bounce.y = 0.7 + Math.random() * 0.2;
        sock4.body.bounce.y = 0
        sock5.body.bounce.y = 0.7 + Math.random() * 0.2;
        sock6.body.bounce.y = 0
        sock7.body.bounce.y = 0.7 + Math.random() * 0.2;

        sock10.body.bounce.y = 0
        sock11.body.bounce.y = 0.7 + Math.random() * 0.2;
        sock12.body.bounce.y = 0

        // Hearts
        var heart1 = heart.create(700, 0, 'heart1');
        var heart2 = heart.create(1300, 0, 'heart1');
        var heart3 = heart.create(1100, 0, 'heart1');
        var heart4 = heart.create(2350, 0, 'heart1');
        //  Gravity
        heart1.body.gravity.y = 300;
        heart2.body.gravity.y = 300;
        heart3.body.gravity.y = 300;
        heart4.body.gravity.y = 300;
        //  Bounce
        heart1.body.bounce.y = 0.5 + Math.random() * 0.1;
        heart2.body.bounce.y = 0.5 + Math.random() * 0.1;
        heart3.body.bounce.y = 0.5 + Math.random() * 0.1;
        heart4.body.bounce.y = 0.5 + Math.random() * 0.1;

        // Health
        health1 = game.add.sprite(900, 16, 'lives');
        health1.frame = 0; // begins at full health
        health1.fixedToCamera = true; //follows with camera

        // Attractiveness Meter
        meter = game.add.sprite(25, 16, 'meter');
        meter.frame = 0; //begins at empty meter
        meter_frame = 0;
        meter.fixedToCamera = true; //follows with camera
        // 5 meter length

        // Player Group
        player = game.add.group();
        player.enableBody = true;
        player1 = player.create(200, game.world.height - 250, 'dude');
        game.physics.arcade.enable(player1);
        player1.body.gravity.y = 1000;
        player1.body.collideWorldBounds = true;
        player1.animations.add('right', [1, 3, 4], 5, true);
        player1.animations.add('left', [8, 6, 5], 5, true);

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

        // Pause button
        pausy = game.add.sprite(0, 0, 'pause_button1');
        pausy.visible = false;
        pausy.fixedToCamera = true;
    },

    update: function() {
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(player, cloudy);
        game.physics.arcade.collide(sockRed, platforms);
        game.physics.arcade.collide(sockGreen, platforms);
        game.physics.arcade.collide(sockRed, cloudy);
        game.physics.arcade.collide(sockGreen, cloudy);
        game.physics.arcade.collide(heart, platforms);
        game.physics.arcade.collide(heart, cloudy);
        game.physics.arcade.collide(enemyGroup, platforms);
        game.physics.arcade.collide(enemyGroup, cloudy);

        //jump through platforms from below
        platforms.collideDown = false;
        platforms.collideUp = true;

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

        // Change Socks for Firing
        game.physics.arcade.overlap(player, sockRed, this.changeBulletsRed);
        game.physics.arcade.overlap(player, sockGreen, this.changeBulletsGreen);

        // set fire button input
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
          this.fire(changeBullets);
        }

        //overlap of bullet and enemy
        game.physics.arcade.overlap(bullets1, enemyGroup, this.hitEnemy, 0, this);
        game.physics.arcade.overlap(bullets2, enemyGroup, this.hitEnemy, 0, this);
        game.physics.arcade.overlap(player, sockRed, this.collectAttractiveness);
        game.physics.arcade.overlap(player, sockGreen, this.collectAttractiveness);
        if (health_frame < 6 && health_frame > 0){
            game.physics.arcade.overlap(player, heart, this.collectHealth);
        }

        // allow player to progress to boss stage when meter is full
        if(meter_frame == 5){
            for (var i = 0; i < player.length; i++){
                if(player.children[i].x >= 3400){
                    game.state.start('lvl2Boss');
                }
            }
        }
        else{ //if player is not attractive enough
            for (var i = 0; i < player.length; i++){
                if(player.children[i].x >= 3400){
                    console.log('still ugly')
                    warning.visible = true;
                }
                else if(player.children[i].x <= 3000){
                    warning.visible = false;
                }
            }
        }

        // cue death scene when all lives are lost
        if(health_frame == 6){
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
              console.log("GreenSock");
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

}

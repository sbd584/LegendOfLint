demo.lvl3 = function(){}
demo.lvl3.prototype = {

    preload: function() {
        game.load.image('clinemed1','lintAssets/Level3Platforms/clothesline_med1.png');
        game.load.image('clinemed2','lintAssets/Level3Platforms/clothesline_med2.png');
        game.load.image('clinemed3','lintAssets/Level3Platforms/clothesline_med3.png');
        game.load.image('clineshort1','lintAssets/Level3Platforms/clothesline_short1.png');
        game.load.image('clineshort2','lintAssets/Level3Platforms/clothesline_short2.png');
        game.load.image('clineshort3','lintAssets/Level3Platforms/clothesline_short3.png');
        game.load.image('clinetall1','lintAssets/Level3Platforms/clothesline_tall1.png');
        game.load.image('clinetall2','lintAssets/Level3Platforms/clothesline_tall2.png');
        game.load.image('clinetall3','lintAssets/Level3Platforms/clothesline_tall3.png');
        game.load.image('clinetiny1','lintAssets/Level3Platforms/clothesline_tiny1.png');
        game.load.image('clinetiny2','lintAssets/Level3Platforms/clothesline_tiny2.png');
        game.load.image('clinetiny3','lintAssets/Level3Platforms/clothesline_tiny3.png');
        game.load.image('squares', 'lintAssets/backgroundSquares.png');
        game.load.image('shirt1', 'lintAssets/shirt_1.png');
        game.load.image('shirt2', 'lintAssets/shirt_2.png');
        game.load.image('shirt3', 'lintAssets/shirt_3.png');
        game.load.image('heart1', 'lintAssets/heart.png');
        game.load.image('lvl3Big', 'lintAssets/lvl3_bg.png');
        game.load.image('lvl3BigLong', 'lintAssets/lvl3_bg_long.png');
        game.load.image('lvl3Ground', 'lintAssets/lvl3_ground.png');
        game.load.image('arrow', 'lintAssets/arrow.png');
        game.load.image('warning', 'lintAssets/warning1.png');
        game.load.image('pause_button1', 'pause_lvl3.png');
        game.load.spritesheet('dude', 'lintAssets/Sprites/lint_walk_lvl3.png', 75, 147);
        game.load.spritesheet('crouch', 'lintAssets/Sprites/lint_crouch_lvl3.png', 93, 109);
        game.load.spritesheet('lives', 'lintAssets/lives_spritesheet.png', 275, 75);
        game.load.spritesheet('meter', 'lintAssets/meter_sheet2.png', 400, 100);
        game.load.spritesheet('badWasher', 'lintAssets/bad_washer.png', 108, 130);
        game.load.audio('kyle','lintAssets/kyleDev.mp3');
        game.load.audio('blaster', 'lintAssets/blaster.mp3');
        game.load.audio('explosion', 'lintAssets/explosion.mp3');
    },

    create: function() {

        // Game setup
        game.stage.backgroundColor = '#ffffff';
        game.world.setBounds(0,0, 7200, 800);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        current_lvl = 3;
        meter_frame = 0;
        health_frame = 0;
        enemyNumber = 10;
        crouching = false;

        // Set PlayerDirection
        playerDirection = 1;

        //Tiles/squares
        backgroundEffects = game.add.group();
        //Ground
        platforms = game.add.group();
        platforms.enableBody = true;
        //Clothes Lines
        clothesLine = game.add.group();
        clothesLine.enableBody = true;
        pole = game.add.group();
        pole.enableBody = true;
        pole2 = game.add.group();
        pole2.enableBody = true;
        //shirts
        shirtRed = game.add.group();
        shirtRed.enableBody = true;
        shirtYellow = game.add.group();
        shirtYellow.enableBody = true;
        shirtPurple = game.add.group();
        shirtPurple.enableBody = true;

        //Hearts
        heart = game.add.group();
        heart.enableBody = true;


        // Real Background
        var lvl3BigLong = backgroundEffects.create(0, -16, 'lvl3BigLong');

        //Ground
        for (var i = 0; i < 6; i++){
            var ground = platforms.create(i * 1200, game.world.height - 100, 'lvl3Ground');
            // Edit distance of ground via x-value
            ground.body.immovable = true;
        }

        //Clothes Lines
        var clinemed1 = pole2.create(300, game.world.height - 510, 'clinemed1');
        clinemed1.body.immovable = true;

        var clinetiny2 = pole2.create(200, game.world.height - 265, 'clinetiny2');
        clinetiny2.body.immovable = true;

        var clinetall3 = pole2.create(1300, game.world.height - 650, 'clinetall3');
        clinetall3.body.immovable = true;

        var clinetiny3 = pole2.create(1300, game.world.height - 265, 'clinetiny3');
        clinetiny3.body.immovable = true;

        var clinemed3 = pole2.create(1700, game.world.height - 510, 'clinemed3');
        clinemed3.body.immovable = true;

        var clineshort3 = pole2.create(2100, game.world.height - 400, 'clineshort3');
        clineshort3.body.immovable = true;

        var clineshort2 = pole2.create(2785, game.world.height - 400, 'clineshort2');
        clineshort2.body.immovable = true;

        var clinetiny1 = pole2.create(2500, game.world.height - 265, 'clinetiny1');
        clinetiny1.body.immovable = true;

        var clinetall2 = pole2.create(3500, game.world.height - 650, 'clinetall2');
        clinetall2.body.immovable = true;

        clineshort3 = pole2.create(4000, game.world.height - 400, 'clineshort3');
        clineshort3.body.immovable = true;

        clinetiny3 = pole2.create(4500, game.world.height - 265, 'clinetiny3');
        clinetiny3.body.immovable = true;

        clinetall3 = pole2.create(4900, game.world.height - 650, 'clinetall3');
        clinetall3.body.immovable = true;

        clinetiny3 = pole2.create(4900, game.world.height - 265, 'clinetiny3');
        clinetiny3.body.immovable = true;

        clinetiny3 = pole2.create(5300, game.world.height - 265, 'clinetiny3');
        clinetiny3.body.immovable = true;

        clinemed1 = pole2.create(5700, game.world.height - 510, 'clinemed1');
        clinemed1.body.immovable = true;

        clinetiny3 = pole2.create(5900, game.world.height - 265, 'clinetiny3');
        clinetiny3.body.immovable = true;

        clinetall2 = pole2.create(6400, game.world.height - 650, 'clinetall2');
        clinetall2.body.immovable = true;


        // jump through bottom of clothes lines
        for (var i = 0; i < pole2.length; i++){
            pole2.children[i].body.checkCollision.up = true;
            pole2.children[i].body.checkCollision.down = false;
            pole2.children[i].body.checkCollision.right = false;
            pole2.children[i].body.checkCollision.left = false;
        }

        //arrow
        arrow = game.add.sprite(7050, game.height - 190, 'arrow');
        //not attractive pop-up
        warning = game.add.sprite(6500, 300, 'warning');
        warning.visible = false;

        shirt1_x = 300
        for (var i = 0; i < 6; i++){
            var shirt1 = shirtRed.create(shirt1_x += 3000 * Math.random(), 0, 'shirt1');
            shirt1.body.gravity.y = 300;
            shirt1.body.bounce.y = 0.5 + Math.random() * 0.1;
        }

        shirt2_x = 300
        for (var i = 0; i < 6; i++){
            var shirt2 = shirtYellow.create(shirt2_x += 3000 * Math.random(), 0, 'shirt2');
            shirt2.body.gravity.y = 300;
            shirt2.body.bounce.y = 0.5 + Math.random() * 0.1;
        }

        shirt3_x = 300
        for (var i = 0; i < 6; i++){
            var shirt3 = shirtPurple.create(shirt3_x += 3000 * Math.random(), 0, 'shirt3');
            shirt3.body.gravity.y = 300;
            shirt3.body.bounce.y = 0.5 + Math.random() * 0.1;
        }

        // Hearts
        heart_x = 700
        for (var i = 0; i < 7; i++){
            var hearts = heart.create(heart_x += 800, 0, 'heart1');
            hearts.body.gravity.y = 300;
            hearts.body.bounce.y = 0.5 + Math.random() * 0.1;
        }

        // Health
        health1 = game.add.sprite(900, 16, 'lives');
        health1.frame = 0; // begins at full health
        health1.fixedToCamera = true; //follows with camera

        // Attractiveness Meter
        meter = game.add.sprite(25, 16, 'meter');
        meter.frame = 0; //begins at empty meter
        meter.fixedToCamera = true; //follows with camera
        // 10 meter length

        // Player Group
        player = game.add.group();
        player.enableBody = true;
        player1 = player.create(200, game.world.height - 250, 'dude');
        game.physics.arcade.enable(player1);
        player1.body.gravity.y = 1000;
        player1.body.collideWorldBounds = true;
        player1.animations.add('right', [1, 2, 3, 4], 7, true);
        player1.animations.add('left', [8, 7, 6, 5], 7, true);

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

        //Enemies
        enemyGroup = game.add.group();
        enemyGroup.enableBody = true;
        enemyGroup.physicsBodyType = Phaser.ARCADE;
        for (var i = 0; i < enemyNumber; i++){
            this.createEnemy();
        }
        enemyGroup.setAll('scale.x', 1);
        enemyGroup.setAll('scale.y', 1);
        enemyGroup.callAll('animations.add', 'animations', 'walk', [0,1,2], 7, true);
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
        game.physics.arcade.collide(player, pole2);
        game.physics.arcade.collide(shirtRed, platforms);
        game.physics.arcade.collide(shirtRed, pole2);
        game.physics.arcade.collide(shirtYellow, platforms);
        game.physics.arcade.collide(shirtYellow, pole2);
        game.physics.arcade.collide(shirtPurple, platforms);
        game.physics.arcade.collide(shirtPurple, pole2);
        game.physics.arcade.collide(heart, platforms);
        game.physics.arcade.collide(heart, pole2);
        game.physics.arcade.collide(enemyGroup, platforms);
        game.physics.arcade.collide(enemyGroup, pole2);
        //game.physics.arcade.collide(enemyGroup, pole);



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
        game.physics.arcade.overlap(player, shirtRed, this.changeBulletsRed);
        game.physics.arcade.overlap(player, shirtYellow, this.changeBulletsYellow);
        game.physics.arcade.overlap(player, shirtPurple, this.changeBulletsPurple);

        // set fire button input
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            this.fire(changeBullets);
        }

        //overlap of bullet and enemy
        game.physics.arcade.overlap(bullets1, enemyGroup, this.hitEnemy, 0, this);
        game.physics.arcade.overlap(bullets2, enemyGroup, this.hitEnemy, 0, this);
        game.physics.arcade.overlap(bullets3, enemyGroup, this.hitEnemy, 0, this);
        game.physics.arcade.overlap(player, shirtRed, this.collectAttractiveness);
        game.physics.arcade.overlap(player, shirtYellow, this.collectAttractiveness);
        game.physics.arcade.overlap(player, shirtPurple, this.collectAttractiveness);
        if (health_frame < 6 && health_frame > 0){
            game.physics.arcade.overlap(player, heart, this.collectHealth);
        }

        // allow player to progress to boss stage when meter is full
        if(meter_frame == 10){
          if(player.children[1].x >= 7000 || player.children[0].x >= 7000){
            game.state.start('lvl3Boss');
          }
        }
        else{ //if player is not attractive enough
            if(player.children[1].x >= 7000 || player.children[0].x >= 7000 ){
                console.log('still ugly')
                warning.visible = true;
            }
            else if(player.children[1].x <= 6600|| player.children[0].x <= 6600){
                warning.visible = false;
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
              game.state.start('lvl3Boss');
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
                  star3.body.velocity.x = -600; //left bullet speed
              }
              if (playerDirection == 1){
                  if (crouching){
                      star3.reset(player.children[1].x+60, player.children[1].y+50);
                  }
                  else{
                      star3.reset(player.children[0].x+60, player.children[0].y+50);
                  }
                  star3.body.velocity.x = 600; //left bullet speed
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

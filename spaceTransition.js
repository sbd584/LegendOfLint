demo.spaceTransition = function(){}
demo.spaceTransition.prototype = {

    preload: function() {
        game.load.image('background', 'lintAssets/lvl3_bg.png');
        game.load.image('lvl3Ground', 'lintAssets/lvl3_ground.png');
        game.load.image('background2', 'lintAssets/level4/lvl4_bg.png');
        game.load.image('shirt1', 'lintAssets/shirt_1.png');
        game.load.image('shirt2', 'lintAssets/shirt_2.png');
        game.load.image('shirt3', 'lintAssets/shirt_3.png');
        game.load.image('heart', 'lintAssets/heart.png');
        game.load.image('arrow', 'lintAssets/arrow.png');
        game.load.image('special_shirt', 'lintAssets/turtleneck_pup.png');
        game.load.image('pause_button1', 'inst_lvl3.png');
        game.load.spritesheet('dude', 'lintAssets/Sprites/lint_walk_lvl4.png', 75, 147);
        game.load.spritesheet('crouch', 'lintAssets/Sprites/lint_crouch_lvl4.png', 93, 109);
        game.load.spritesheet('machine_boss1', 'lintAssets/machine_boss.png', 230, 240);
        game.load.spritesheet('machine_boss2', 'lintAssets/machine_boss2.png', 230, 240);
        game.load.spritesheet('lives', 'lintAssets/level4/health_lvl4.png', 388, 60);
        game.load.spritesheet('meter', 'lintAssets/meter_sheet.png', 400, 100);
        game.load.audio('blaster', 'lintAssets/blaster.mp3');
        game.load.audio('explosion', 'lintAssets/explosion.mp3');
    },

       create: function() {

        console.log('spaceTransition');
        //Game setup
        game.stage.backgroundColor = '#ffffff';
        game.world.setBounds(0, 0, 1200, 4800);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        current_lvl = 4;
        crouching = false;

        // Set PlayerDirection
        playerDirection = 1;

        // Real Background
        var background = game.add.sprite(0, 4000, 'background');
        var background2 = game.add.sprite(0, 0, 'background2');
        background2 = game.add.sprite(0, 800, 'background2');
        background2 = game.add.sprite(0, 1600, 'background2');
        background2 = game.add.sprite(0, 2400, 'background2');
        background2 = game.add.sprite(0, 3200, 'background2');

        //Ground
        platforms = game.add.group();
        platforms.enableBody = true;

        //Ground
        var ground = platforms.create(0, game.world.height - 100, 'lvl3Ground');
        ground.body.immovable = true;

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
        var heart1 = heart.create(100, 4200, 'heart1');
        var heart2 = heart.create(300, 4200, 'heart1');
        var heart3 = heart.create(500, 4200, 'heart1');
        var heart4 = heart.create(700, 4200, 'heart1');

        //  Gravity
        heart1.body.gravity.y = 300;
        heart2.body.gravity.y = 300;
        heart3.body.gravity.y = 300;
        heart4.body.gravity.y = 300;
        //  Bounce
        heart1.body.bounce.y = 0.5 + Math.random() * 0.1;
        heart2.body.bounce.y = 0.5 + Math.random() * 0.2;
        heart3.body.bounce.y = 0.5 + Math.random() * 0.4;
        heart4.body.bounce.y = 0.5 + Math.random() * 0.3;

        // Health
        health1 = game.add.sprite(800, 16, 'lives');
        health1.frame = 0; // begins at full health
        health1.fixedToCamera = true; //follows with camera

        // Attractiveness Meter
        meter = game.add.sprite(25, 16, 'meter');
        meter.frame = 0; //begins at empty meter
        meter.fixedToCamera = true; //follows with camera
        // 7 meter length

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
        bullets4.createMultiple(50, 'shirt1');
        bullets4.setAll('checkWorldBounds', true);
        bullets4.setAll('outOfBoundsKill', true);
        bullets4.setAll('anchor.y', 0.5);
        bullets4.setAll('scale.x', 1.2);
        bullets4.setAll('scale.y', 1.2);

        //add group for bullets2
        bullets5 = game.add.group()
        bullets5.enableBody = true;
        bullets5.physicsBodyType = Phaser.Physics.ARCADE;
        bullets5.createMultiple(50, 'shirt2');
        bullets5.setAll('checkWorldBounds', true);
        bullets5.setAll('outOfBoundsKill', true);
        bullets5.setAll('anchor.y', 0.5);
        bullets5.setAll('scale.x', 1.2);
        bullets5.setAll('scale.y', 1.2);

        //add group for bullets1
        bullets6 = game.add.group()
        bullets6.enableBody = true;
        bullets6.physicsBodyType = Phaser.Physics.ARCADE;
        bullets6.createMultiple(50, 'shirt3');
        bullets6.setAll('checkWorldBounds', true);
        bullets6.setAll('outOfBoundsKill', true);
        bullets6.setAll('anchor.y', 0.5);
        bullets6.setAll('scale.x', 1.2);
        bullets6.setAll('scale.y', 1.2);

        cursors = game.input.keyboard.createCursorKeys();
           
        //arrow
        arrow = game.add.sprite(60, 4670, 'arrow');
        arrow.scale.setTo(.5, .5);

        // Pause button
        pausy = game.add.sprite(0, 0, 'pause_button1');
        pausy.visible = false;
        pausy.fixedToCamera = true;

  },

    update: function() {

        for (var i = 0; i < player.length; i++){
            if(player.children[i].body.x >= 410){
                player.children[i].body.velocity.y = -5000;
            }

            if(player.children[i].body.y <= 200){
                game.state.start('lvl4');
            }
        }

        //menu updates
        health1.frame = health_frame;
        meter.frame = meter_frame;

        var hitPlatform = game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(shirt1, platforms);
        game.physics.arcade.collide(shirt2, platforms);
        game.physics.arcade.collide(shirt3, platforms);
        game.physics.arcade.collide(shirt1, player);
        game.physics.arcade.collide(shirt2, player);
        game.physics.arcade.collide(shirt3, player);
        game.physics.arcade.collide(heart, platforms);

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

        // set fire button input
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            this.fire(changeBullets);
        }

        //overlap of bullet and enemy
        game.physics.arcade.overlap(player, heart, this.collectHealth);

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

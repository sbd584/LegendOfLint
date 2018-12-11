var demo = {}, current_lvl = 0, new_state, pauseButton,
    player, platforms, backgroundEffects, cloudy, sock, heart, cursors, bullets1, bullets2, bullets3, bullets4, bullets5, changeBullets = 1,
    nextFire = 0, fireRate = 600, BigFoot1, velocity = 1000, attractiveness = 0,
    health = 100, music, bigFootHealth = 300, bigFootText, health1, health_frame = 0,
    meter_frame = 0, stank, footStank, blaster, tween, death_frame, stateName, playerDirection,
    enemyNumber = 5, special_sock, bFnum = 0, nextFire2 = 900, crouching = false, music, lvl_music;

demo.menu = function (){};
demo.menu.prototype = {
    preload: function (){
        game.load.image('menu', 'lintAssets/start.png');
    },
    create: function (){

        current_lvl = 0;

        game.stage.backgroundColor = '#000000';
        addChangeStateEventListeners();

        game.world.setBounds(0, 0, 1200, 800);
        var menuBG = game.add.sprite(0, 0, 'menu');

    },
    update: function (){
    }
};

function changeState(i, new_state){
    // console.log(i);
    game.state.start(new_state);
};

function addKeyCallback(key, fn, args){
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
};

function addChangeStateEventListeners(){
    if(current_lvl == 0){
      addKeyCallback(Phaser.Keyboard.SPACEBAR, changeState, 'tutorial');
    }

    if (stateName == 'outro'){
      addKeyCallback(Phaser.Keyboard.SPACEBAR, changeState, new_state);
      addKeyCallback(Phaser.Keyboard.DOWN, changeState, 'death2');
    }

    if (stateName == 'death2'){
      addKeyCallback(Phaser.Keyboard.SPACEBAR, changeState, new_state);
      addKeyCallback(Phaser.Keyboard.UP, changeState, 'outro');
    }

};

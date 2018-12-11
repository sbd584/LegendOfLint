demo.death = function (){}
demo.death.prototype = {
    preload: function (){
        game.load.spritesheet('death1', 'lintAssets/death_1.png');
        game.load.audio('choose', 'Audio/Menu_Navigate_03.mp3');
    },
    create: function (){

        // console.log('option 1');

        new_state = 'lvl' + current_lvl
        

        game.stage.backgroundColor = '#000000';

        game.world.setBounds(0, 0, 1200, 800);
        death1 = game.add.sprite(0, 0, 'death1');
        music = game.sound.play('choose');

        stateName = 'outro'

    },
    update: function (){

        addChangeStateEventListeners();
    },
};

demo.death2 = function (){};
demo.death2.prototype = {
    preload: function (){
        game.load.image('option2', 'lintAssets/death_2.png');
        game.load.audio('choose', 'Audio/Menu_Navigate_03.mp3');
    },
    create: function (){

        // console.log('option 2');

        new_state = 'intro'

        game.stage.backgroundColor = '#000000';
        addChangeStateEventListeners();

        game.world.setBounds(0, 0, 1200, 800);
        var death1 = game.add.sprite(0, 0, 'option2');
        music = game.sound.play('choose');

        stateName = 'death2'

    },
    update: function (){
        addChangeStateEventListeners();
      }
};

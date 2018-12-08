demo.pants_power = function (){};
demo.pants_power.prototype = {
    preload: function (){
        game.load.image('pants_pwrup', 'lintAssets/shorts_pup_screen.png');
        game.load.image('howto', 'howto_crouch.png');
    },
    create: function (){

        current_lvl = 0;
        console.log('pants!');

        game.stage.backgroundColor = '#000000';

        game.world.setBounds(0, 0, 1200, 800);
        pwr = game.add.sprite(0, 0, 'pants_pwrup');
        pwr.visible = true;
        inst = game.add.sprite(0, 0, 'howto');
        inst.visible = false;

    },
    update: function (){
         game.time.events.add(Phaser.Timer.SECOND * 5, function(){
            pwr.visible = false;
            inst.visible = true;
        })
        game.time.events.add(Phaser.Timer.SECOND * 10, function(){
            croucho();
        })
    }
}

function croucho(){
    game.state.start('lvl2');
}

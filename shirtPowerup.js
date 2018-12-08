demo.shirtPowerup = function (){};
demo.shirtPowerup.prototype = {
    preload: function (){
        game.load.image('turtle_pwrup', 'lintAssets/shirt_pup_screen.png');
        game.load.image('howto', 'howto_health.png');
    },
    create: function (){

        current_lvl = 0;
        console.log('turtleneck!');

        game.stage.backgroundColor = '#000000';

        game.world.setBounds(0, 0, 1200, 800);
        pwr = game.add.sprite(0, 0, 'turtle_pwrup');
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
            defenso();
        })
    }
}

function defenso(){
    game.state.start('spaceTransition');
}

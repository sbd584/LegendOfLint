demo.hatPowerup = function (){};
demo.hatPowerup.prototype = {
    preload: function (){
        game.load.image('hat', 'lintAssets/endscene/howto_irresistible.png');
        game.load.image('hat2', 'lintAssets/hat_pup_screen.png');
    },
    create: function (){

        current_lvl = 0;
        // console.log('turtleneck!');

        game.stage.backgroundColor = '#000000';

        game.world.setBounds(0, 0, 1200, 800);
        pwr1 = game.add.sprite(0, 0, 'hat2');
        pwr1.visible = true;
        pwr2 = game.add.sprite(0, 0, 'hat');
        pwr2.visible = false;

    },
    update: function (){
        game.time.events.add(Phaser.Timer.SECOND * 5, function(){
            pwr1.visible = false;
            pwr2.visible = true;
        })
        game.time.events.add(Phaser.Timer.SECOND * 10, function(){
            game.state.start('getTheGirl');
        })
    }
}

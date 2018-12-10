demo.hatPowerup = function (){};
demo.hatPowerup.prototype = {
    preload: function (){
        game.load.image('hat', 'lintAssets/endscene/howto_irresistible.png');
    },
    create: function (){

        current_lvl = 0;
        // console.log('turtleneck!');

        game.stage.backgroundColor = '#000000';

        game.world.setBounds(0, 0, 1200, 800);
        pwr = game.add.sprite(0, 0, 'hat');
        pwr.visible = true;

    },
    update: function (){
        game.time.events.add(Phaser.Timer.SECOND * 5, function(){
            game.state.start('getTheGirl');
        })
    }
}

demo.dbljump = function (){};
demo.dbljump.prototype = {
    preload: function (){
        game.load.image('pwrUp', 'lintAssets/shoe_powerup_screen.png');
        game.load.image('howto', 'howto_doublejump.png');
    },
    create: function (){

        current_lvl = 0;
        // console.log('double jump');

        game.stage.backgroundColor = '#000000';

        game.world.setBounds(0, 0, 1200, 800);
        pwr = game.add.sprite(0, 0, 'pwrUp');
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
            dbl();
        })
    }
}

function dbl(){
    game.state.start('lvl3');
}

demo.end = function (){};
demo.end.prototype = {
    preload: function (){
        game.load.image('end', 'lintAssets/endscene/end.png');
        game.load.image('credits', 'lintAssets/credits.png');
    },
    create: function (){

        current_lvl = 5;
        // console.log('turtleneck!');

        game.stage.backgroundColor = '#000000';

        game.world.setBounds(0, 0, 1200, 800);
        pwr = game.add.sprite(0, 0, 'end');
        pwr.visible = true;
        credits = game.add.sprite(0, 0, 'credits');
        credits.visible = false;

        // window.onkeydown = function(event) {
        //     if (event.keyCode == "32".charCodeAt(0)){
        //         game.state.start('intro');
        //     }
        // }
        game.time.events.add(Phaser.Timer.SECOND * 4, function(){
            pwr.visible = false;
            credits.visible = true;
        })
        game.time.events.add(Phaser.Timer.SECOND * 10, function(){
            game.state.start('intro');
        })

    },
    update: function (){
      if(credits.visible == true){
        addKeyCallback(Phaser.Keyboard.SPACEBAR, changeState, 'intro');
      }
    }
}

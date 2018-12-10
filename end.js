demo.end = function (){};
demo.end.prototype = {
    preload: function (){
        game.load.image('end', 'lintAssets/endscene/end.png');
    },
    create: function (){

        current_lvl = 0;
        // console.log('turtleneck!');

        game.stage.backgroundColor = '#000000';

        game.world.setBounds(0, 0, 1200, 800);
        pwr = game.add.sprite(0, 0, 'end');
        pwr.visible = true;

        // window.onkeydown = function(event) {
        //     if (event.keyCode == "32".charCodeAt(0)){
        //         game.state.start('intro');
        //     }
        // }

    },
    update: function (){
      addKeyCallback(Phaser.Keyboard.SPACEBAR, changeState, 'intro');
    }
}

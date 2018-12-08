demo.tutorial = function (){};
demo.tutorial.prototype = {
    preload: function (){
        game.load.image('tutorial', 'lintAssets/instructions.png');
    },
    create: function (){

        current_lvl = 0;
        console.log('tutorial');

        game.stage.backgroundColor = '#000000';

        game.world.setBounds(0, 0, 1200, 800);
        var tutorial = game.add.sprite(0, 0, 'tutorial');

        game.time.events.loop(Phaser.Timer.SECOND * 5, function(){
            tut();
        })

    },
    update: function (){
      window.onkeydown = function(event) {
          // Press SpaceBar to skip
          if (event.keyCode == 32){
              game.state.start('lvl1');
          }
      }
    }
}

function tut(){
    game.state.start('lvl1');
}

demo.tutorial = function (){};
demo.tutorial.prototype = {
    preload: function (){
        game.load.image('scene1', 'lintAssets/CutScenes/scene1.png');
        game.load.image('scene2', 'lintAssets/CutScenes/scene2.png');
        game.load.image('scene3', 'lintAssets/CutScenes/scene3.png');
        game.load.image('scene4', 'lintAssets/CutScenes/scene4.png');
        game.load.image('scene5', 'lintAssets/CutScenes/scene5.png');
        game.load.image('scene6', 'lintAssets/CutScenes/scene6.png');
        game.load.image('scene7', 'lintAssets/CutScenes/scene7.png');
        game.load.image('scene8', 'lintAssets/CutScenes/scene8.png');
        game.load.image('scene9', 'lintAssets/CutScenes/scene9.png');
        game.load.image('scene10', 'lintAssets/CutScenes/scene10.png');
        game.load.image('scene11', 'lintAssets/CutScenes/scene11.png');
        game.load.image('scene12', 'lintAssets/CutScenes/scene12.png');
        game.load.image('scene13', 'lintAssets/CutScenes/scene13.png');
        game.load.image('scene14', 'lintAssets/CutScenes/scene14.png');
        game.load.image('tutorial', 'instructions.png');
        game.load.audio('linen', 'Audio/Linen.mp3');
    },
    create: function (){

        i = 1;
        current_lvl = 0;
        // console.log('tutorial');

        game.stage.backgroundColor = '#000000';

        game.world.setBounds(0, 0, 1200, 800);
        var scene1 = game.add.sprite(0, 0, 'scene1');
        
        
        music = game.sound.play('linen');

        game.time.events.loop(Phaser.Timer.SECOND * 2, function(){
            nextUp(i);
            i += 1;
            // console.log("next");
            // console.log(i);
        })

    },
    update: function (){
        
      game.input.enabled = false;    
        
      window.onkeydown = function(event) {
        if (event.keyCode == 27){
          game.paused = !game.paused;
          pausy.visible = !pausy.visible;
        }
        if (event.keyCode == "0".charCodeAt(0)){
          game.state.start('lvl1_2');
        }
        if (event.keyCode == "1".charCodeAt(0)){
          game.state.start('lvl1Boss');
        }
        if (event.keyCode == "2".charCodeAt(0)){
          game.state.start('lvl2');
        }
        if (event.keyCode == "3".charCodeAt(0)){
          game.state.start('lvl3Boss');
        }
        if (event.keyCode == "S".charCodeAt(0)){
          game.state.start('spaceTransition');
        }
        if (event.keyCode == "4".charCodeAt(0)){
          game.state.start('lvl4');
        }
        //if (event.keyCode == 39){
        //    if(i == 14){
        //      game.state.start('lvl1')
        //    }
        //    i = 14;
        //}
      }
    }
}

function tut(){
    game.state.start('lvl1');
}

function nextUp(i){

    if(i == 1){
      var scene2 = game.add.sprite(0, 0, 'scene2');
    }
    else if(i == 2){
      var scene3 = game.add.sprite(0, 0, 'scene3');
    }
    else if(i == 3){
      var scene4 = game.add.sprite(0, 0, 'scene4');
    }
    else if(i == 4){
      var scene5 = game.add.sprite(0, 0, 'scene5');
    }
    else if(i == 5){
      var scene6 = game.add.sprite(0, 0, 'scene6');
    }
    else if(i == 6){
      var scene7 = game.add.sprite(0, 0, 'scene7');
    }
    else if(i == 7){
      var scene8 = game.add.sprite(0, 0, 'scene8');
    }
    else if(i == 8){
      var scene8 = game.add.sprite(0, 0, 'scene8');
    }
    else if(i == 9){
      var scene9 = game.add.sprite(0, 0, 'scene9');
    }
    else if(i == 10){
      var scene9 = game.add.sprite(0, 0, 'scene9');
    }
    else if(i == 11){
      var scene10 = game.add.sprite(0, 0, 'scene10');
    }
    else if(i == 12){
      var scene10 = game.add.sprite(0, 0, 'scene10');
    }
    else if(i == 13){
      var scene11 = game.add.sprite(0, 0, 'scene11');
    }
    else if(i == 14){
      var scene12 = game.add.sprite(0, 0, 'scene12');
    }
    else if(i == 15){
      var scene12 = game.add.sprite(0, 0, 'scene12');
    }
    else if(i == 16){
      var scene13 = game.add.sprite(0, 0, 'scene13');
    }
    else if(i == 17){
      var scene14 = game.add.sprite(0, 0, 'scene14');
    }
    else if(i == 18){
      var scene14 = game.add.sprite(0, 0, 'scene14');
    }
    else if(i == 19){
      var tutorial = game.add.sprite(0, 0, 'tutorial');
      music.fadeOut();
      music.stop();
    }
    else if(i == 20){
      var tutorial = game.add.sprite(0, 0, 'tutorial');
      music.fadeOut();
      music.stop();
    }
    else{
      tut();
    }

}

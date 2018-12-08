var game = new Phaser.Game(1200, 800, Phaser.AUTO);
game.state.add('intro', demo.menu);
game.state.add('tutorial', demo.tutorial);
game.state.add('lvl1', demo.lvl1);
game.state.add('lvl1_2', demo.lvl1_2);
game.state.add('lvl1Boss', demo.lvl1Boss);
game.state.add('pantsPower', demo.pants_power);
game.state.add('lvl2', demo.lvl2);
game.state.add('lvl2Boss', demo.lvl2Boss);
game.state.add('dbljump', demo.dbljump);
game.state.add('lvl3', demo.lvl3);
game.state.add('lvl3Boss', demo.lvl3Boss);
game.state.add('shirtPowerup', demo.shirtPowerup);
game.state.add('spaceTransition', demo.spaceTransition);
game.state.add('lvl4', demo.lvl4);
game.state.add('lvl4Boss', demo.lvl4Boss);
game.state.add('outro', demo.death);
game.state.add('death2', demo.death2);
game.state.start('intro');
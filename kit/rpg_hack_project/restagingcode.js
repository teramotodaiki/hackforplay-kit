window.addEventListener('load', function () {

	Hack.restagingCode =
"// Game start\n"+
"game.onload = function () {\n"+
"\n"+
"\tvar map = Hack.maps['room1'];\n"+
"\tmap.load(); // Load Map;  Hack.defaultParentNode == map.scene\n"+
"\n"+
"\n"+
"\t// スライム\n"+
"\tvar blueSlime = new BlueSlime();\n"+
"\tblueSlime.locate(7, 5);\n"+
"\tblueSlime.scale(1, 1);\n"+
"\tblueSlime.hp = 10;\n"+
"\t// When become dead... たおれたら...\n"+
"\tblueSlime.onbecomedead = function () {\n"+
"\n"+
"\t\t// たおしたらクリア\n"+
"\t\tHack.gameclear();\n"+
"\n"+
"\t};\n"+
"\n"+
"\n"+
"\t// くだりかいだん\n"+
"\tvar stair = new MapObject('DownStair');\n"+
"\tstair.locate(12, 5);\n"+
"\t// When enter... ふまれたら...\n"+
"\tstair.onplayerenter = function () {\n"+
"\n"+
"\t\t// ふんだら room2 にいく\n"+
"\t\tHack.changeMap('room2');\n"+
"\n"+
"\t};\n"+
"\n"+
"\n"+
"\t// ワープゆか\n"+
"\tvar warp = new MapObject(93);\n"+
"\twarp.locate(3, 3);\n"+
"\t// When enter... ふまれたら...\n"+
"\twarp.onplayerenter = function () {\n"+
"\n"+
"\t\t// ふんだらワープ\n"+
"\t\tHack.player.locate(12, 3);\n"+
"\n"+
"\t};\n"+
"\n"+
"\n"+
"\t// くだりかいだん２\n"+
"\tvar stair2 = new MapObject('DownStair');\n"+
"\tstair2.locate(5, 5, 'room2');\n"+
"\t// When enter... ふまれたら...\n"+
"\tstair2.onplayerenter = function () {\n"+
"\n"+
"\t\t// ゲームクリア\n"+
"\t\tHack.gameclear();\n"+
"\n"+
"\t};\n"+
"\n"+
"\n"+
"\t// プレイヤー（騎士）\n"+
"\tvar player = Hack.player = new Player();\n"+
"\tplayer.locate(3, 5);\n"+
"\n"+
"};\n"+
"\n"+
"// Before game start\n"+
"Hack.onload = function () {\n"+
"\n"+
"\tMapObject.Dictionaly = {\n"+
"\t\t'Pot': 400,\t\t\t'Rock': 401,\t\t'UpStair': 402,\n"+
"\t\t'Box': 420,\t\t\t'Flower': 421,\t\t'DownStair': 422,\n"+
"\t\t'Trap': 440,\t\t'UsedTrap': 441,\t'Step': 442,\n"+
"\t\t'Castle': 500,\t\t'Village': 501,\t\t'Cave': 502,\n"+
"\t\t'Tree': 520,\t\t'Table': 521\n"+
"\t};\n"+
"\n"+
"\tHack.maps = [];\n"+
"\tHack.maps['room1'] = new RPGMap(32, 32);\n"+
"\tHack.maps['room1'].imagePath = 'enchantjs/x2/map1.gif';\n"+
"\tHack.maps['room1'].bmap.loadData([\n"+
"\t\t[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],\n"+
"\t\t[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],\n"+
"\t\t[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],\n"+
"\t\t[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],\n"+
"\t\t[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],\n"+
"\t\t[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],\n"+
"\t\t[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],\n"+
"\t\t[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],\n"+
"\t\t[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322],\n"+
"\t\t[322,322,322,322,322,322,322,322,322,322,322,322,322,322,322]\n"+
"\t]);\n"+
"\tHack.maps['room1'].cmap = [\n"+
"\t\t[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],\n"+
"\t\t[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],\n"+
"\t\t[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],\n"+
"\t\t[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],\n"+
"\t\t[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],\n"+
"\t\t[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],\n"+
"\t\t[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],\n"+
"\t\t[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],\n"+
"\t\t[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],\n"+
"\t\t[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]\n"+
"\t];\n"+
"\tHack.maps['room2'] = new RPGMap(32, 32);\n"+
"\tHack.maps['room2'].imagePath = 'enchantjs/x2/map1.gif';\n"+
"\tHack.maps['room2'].bmap.loadData([\n"+
"\t\t[323,323,323,323,323,323,323,323,323,323,323,323,323,323,323],\n"+
"\t\t[323,323,323,323,323,323,323,323,323,323,323,323,323,323,323],\n"+
"\t\t[323,323,323,323,323,323,323,323,323,323,323,323,323,323,323],\n"+
"\t\t[323,323,323,323,323,323,323,323,323,323,323,323,323,323,323],\n"+
"\t\t[323,323,323,323,323,323,323,323,323,323,323,323,323,323,323],\n"+
"\t\t[323,323,323,323,323,323,323,323,323,323,323,323,323,323,323],\n"+
"\t\t[323,323,323,323,323,323,323,323,323,323,323,323,323,323,323],\n"+
"\t\t[323,323,323,323,323,323,323,323,323,323,323,323,323,323,323],\n"+
"\t\t[323,323,323,323,323,323,323,323,323,323,323,323,323,323,323],\n"+
"\t\t[323,323,323,323,323,323,323,323,323,323,323,323,323,323,323]\n"+
"\t]);\n"+
"\tHack.maps['room2'].cmap = [\n"+
"\t\t[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],\n"+
"\t\t[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],\n"+
"\t\t[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],\n"+
"\t\t[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],\n"+
"\t\t[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],\n"+
"\t\t[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],\n"+
"\t\t[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],\n"+
"\t\t[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],\n"+
"\t\t[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],\n"+
"\t\t[  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]\n"+
"\t];\n"+
"};\n"+
"\n"+
"// EnchantBook\n"+
"Hack.hint =\n"+
"\t\"//  -            =\\n\"+\n"+
"\t\"// -  BASIC CODE  =\\n\"+\n"+
"\t\"//  -            =\\n\"+\n"+
"\t\"Hack.player.locate(6, 5);  // Teleportation\\n\"+\n"+
"\t\"Hack.player.direction = 2; // Turn\\n\"+\n"+
"\t\"Hack.player.atk = 10;      // Power Up\\n\"+\n"+
"\t\"\\n\"+\n"+
"\t\"\\n\"+\n"+
"\t\"//  *            +\\n\"+\n"+
"\t\"// *  EXTRA CODE  +  Remove // to use.\\n\"+\n"+
"\t\"//  *            +   // をけして つかおう!\\n\"+\n"+
"\t\"\\n\"+\n"+
"\t\"// Hack.changeMap('room2');\\n\"+\n"+
"\t\"// Hack.log('wwwwwwww');\\n\"+\n"+
"\t\"\\n\"+\n"+
"\t\"\\n\";\n"+
"\n";

});
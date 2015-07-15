window.addEventListener('load', function() {

	var game = enchant.Core.instance;
	game.preload(['resources/lifeup.mp3','resources/speedup.mp3','resources/damage.mp3','resources/attack.mp3','resources/BGM.mp3','enchantjs/font1.png','enchantjs/x2/icon0.png','enchantjs/x2/map1.png','enchantjs/x2/map0.png','enchantjs/chara1.png','enchantjs/bigmonster1.gif','enchantjs/bigmonster2.gif','enchantjs/monster1.gif','enchantjs/monster2.gif','enchantjs/monster3.gif', 'enchantjs/monster4.gif','enchantjs/monster7.gif','hackforplay/enchantbook.png']);

	var binded_key = ' '.charCodeAt(0);
	game.keybind(binded_key, 'a'); // aボタンはスペースキー

	Hack.textarea.backgroundColor = 'rgba(0,20,40,0.5)';

	// ====> 改造コードへ
	// Hack.restagingCode =
	// "game.preload(['enchantjs/x2/map2.png', 'enchantjs/x1.5/chara0.png', 'enchantjs/monster1.gif', 'hackforplay/enchantbook.png']);\n"+
	// "\n"+
	// "// ゲームが開始されたときに呼ばれるイベント\n"+
	// "game.onload = function() {\n"+
	// "\tHack.pressStartKey(' ');\n"+
	// "\tHack.defaultParentNode = new enchant.Group(); // スクロールの準備\n"+
	// "\tgame.rootScene.addChild(Hack.defaultParentNode); // スクロールの準備\n"+
	// "\n"+
	// "\tHack.createScrollMap([\n"+
	// "\t\t[22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22],\n"+
	// "\t\t[21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21],\n"+
	// "\t\t[20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20],\n"+
	// "\t\t[19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],\n"+
	// "\t\t[18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18],\n"+
	// "\t\t[18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18],\n"+
	// "\t\t[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\n"+
	// "\t\t[ 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],\n"+
	// "\t\t[ 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],\n"+
	// "\t\t[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]\n"+
	// "\t]);\n"+
	// "\n"+
	// "\t// プレイヤーを作成\n"+
	// "\tHack.player = Hack.createMovingSprite(48, 48, {\n"+
	// "\t\tx: 64, y: 160,\n"+
	// "\t\timage: game.assets['enchantjs/x1.5/chara0.png'],\n"+
	// "\t\tframe: [25, 25, 25, 24, 24, 24, 25, 25, 25, 26, 26, 26],\n"+
	// "\t\tuseGravity: true, useGround: true, footHeight: 48\n"+
	// "\t});\n"+
	// "\tHack.player.hp = 3; // プレイヤーのHP\n"+
	// "\tHack.player.isDamaged = false;\n"+
	// "\n"+
	// "\t// モンスターを出現させる\n"+
	// "\tHack.monster = [];\n"+
	// "\t//                               X,   Y\n"+
	// "\tHack.monster[0] = makeMonster( 400, 154);\n"+
	// "\tHack.monster[1] = makeMonster( 800, 154);\n"+
	// "\tHack.monster[2] = makeMonster(1200, 154);\n"+
	// "\tHack.monster[3] = makeMonster(1600, 154);\n"+
	// "\tHack.monster[4] = makeMonster(2000, 154);\n"+
	// "\tHack.monster[5] = makeMonster(2400, 154);\n"+
	// "\t// 魔道書\n"+
	// "\tHack.enchantBookIcon = Hack.createSprite(64, 64, {\n"+
	// "\t\timage: game.assets['hackforplay/enchantbook.png'],\n"+
	// "\t\tdefaultParentNode: game.rootScene,\n"+
	// "\t\tontouchend: function() {\n"+
	// "\t\t\tHack.openEditor(); // エディタを開く\n"+
	// "\t\t}\n"+
	// "\t});\n"+
	// "\t// 魔道書の中身\n"+
	// "\tHack.hint = 'Hack.player.velocity.x += 1; // 加速!!';\n"+
	// "\n"+
	// "\t// 最初のラベル\n"+
	// "\tHack.pressStartLabel = Hack.createLabel('スペースキーを押してスタート<br>↑キーでジャンプ', {\n"+
	// "\t\tx: 120, y: 160, width: 400\n"+
	// "\t});\n"+
	// "};\n"+
	// "\n"+
	// "// スタート（スペースキー）を押したときに呼ばれるイベント\n"+
	// "Hack.onpressstart = function() {\n"+
	// "\tHack.started = true;\n"+
	// "\n"+
	// "\tHack.player.parentNode.addChild(Hack.player); // 手前に持ってくる\n"+
	// "\t// HPラベル\n"+
	// "\t// defaultParentNode: game.rootScene と追加することで、スクロールしないようにしている\n"+
	// "\tHack.hpLabel = Hack.createLabel('HP: ', {\n"+
	// "\t\tx: 400, y: 20, color: 'black',\n"+
	// "\t\tdefaultParentNode: game.rootScene\n"+
	// "\t});\n"+
	// "\tHack.hpLabel.onenterframe = function() {\n"+
	// "\t\tthis.text = 'HP: ' + Hack.player.hp;\n"+
	// "\t};\n"+
	// "\n"+
	// "\t// プレイヤーの動きの処理\n"+
	// "\tHack.player.velocity.x = 4; // プレイヤーの速さ\n"+
	// "\tHack.player.on('enterframe', function(event) {\n"+
	// "\t\tif (game.input.up && this.y + this.footHeight >= Hack.groundHeight) {\n"+
	// "\t\t\tthis.velocity.y = -14; // ジャンプする速さ\n"+
	// "\t\t}\n"+
	// "\t});\n"+
	// "};\n"+
	// "\n"+
	// "// ゲーム実行中、毎フレーム呼び出されるイベント\n"+
	// "game.onenterframe = function() {\n"+
	// "\tif (!Hack.started) return; // ゲームが始まっているかどうかフラグ\n"+
	// "\n"+
	// "\t// ゴール (プレイヤーの位置が、右の数値を超えたら)\n"+
	// "\tif (Hack.player.x >= 3000) {\n"+
	// "\t\tHack.gameclear();\n"+
	// "\t\tHack.started = false;\n"+
	// "\t}\n"+
	// "\n"+
	// "\t// プレイヤーを基準にして、画面をスクロールさせる\n"+
	// "\tHack.scrollRight(Hack.player.x - 64);\n"+
	// "\n"+
	// "\t// ダメージを受ける処理\n"+
	// "\tif (!Hack.player.isDamaged) {\n"+
	// "\t\tHack.monster.forEach(function(enemy) {\n"+
	// "\t\t\t// 当たり判定\n"+
	// "\t\t\tif (Hack.player.within(enemy, 20)) {\n"+
	// "\t\t\t\tHack.player.hp--; // いてっ!! HPが減る\n"+
	// "\t\t\t\tHack.player.isDamaged = true; // ダメージを受けて点滅するフラグ\n"+
	// "\n"+
	// "\t\t\t\tif (Hack.player.hp <= 0) {\n"+
	// "\t\t\t\t\t// R.I.P (安らかに眠りたまえ…)\n"+
	// "\t\t\t\t\tHack.gameover(); // ゲームオーバー\n"+
	// "\t\t\t\t\tHack.started = false;\n"+
	// "\t\t\t\t\tHack.player.onenterframe = null; // 'onenterframe'を消して動かないようにする\n"+
	// "\t\t\t\t\tHack.player.tl.fadeOut(10); // ゆっくり消える\n"+
	// "\t\t\t\t} else {\n"+
	// "\t\t\t\t\t// まだ生きている場合\n"+
	// "\t\t\t\t\tvar saveFrame = Hack.player._originalFrameSequence; // ~= player.frame\n"+
	// "\t\t\t\t\tHack.player.frame = [-1, -1, 24, 24]; // 点滅 (-1: 透明)\n"+
	// "\n"+
	// "\t\t\t\t\twindow.setTimeout(function() {\n"+
	// "\t\t\t\t\t\t// 3 秒たったら...\n"+
	// "\t\t\t\t\t\tHack.player.isDamaged = false;\n"+
	// "\t\t\t\t\t\tHack.player.frame = saveFrame; // ~= player.frame を復帰\n"+
	// "\t\t\t\t\t}, 3000);\n"+
	// "\t\t\t\t}\n"+
	// "\t\t\t\treturn;\n"+
	// "\t\t\t}\n"+
	// "\t\t});\n"+
	// "\t}\n"+
	// "};\n"+
	// "\n"+
	// "// 新しくモンスターをつくる関数\n"+
	// "function makeMonster ( _x, _y, _frame, _useGravity, _useGround, _footHeight) {\n"+
	// "\treturn Hack.createMovingSprite(48, 48, {\n"+
	// "\t\tx: _x || 0, y: _y || 0,\n"+
	// "\t\timage: game.assets['enchantjs/monster1.gif'],\n"+
	// "\t\tframe: _frame || [2, 2, 2, 3, 3, 3],\n"+
	// "\t\tuseGravity: _useGravity || true,\n"+
	// "\t\tuseGround:  _useGround  || true,\n"+
	// "\t\tfootHeight: _footHeight || 32\n"+
	// "\t});\n"+
	// "}\n"+
	// "\n"+
	// "\n"+
	// "// 設定やクラス\n"+
	// "Hack.groundHeight = 32 * 6; // Y=0から地面までの高さ（６マス分）\n"+
	// "Hack.gravity = { x: 0, y: 1 }; // 重力の大きさ\n"+
	// "\n"+
	// "// enchant.Spriteを継承して、動くようにしたクラス\n"+
	// "Hack.MovingSprite = enchant.Class.create(enchant.Sprite, {\n"+
	// "\tinitialize: function(width, height) {\n"+
	// "\t\tenchant.Sprite.call(this, width, height);\n"+
	// "\t\tthis.velocity = { x: 0, y: 0 };\n"+
	// "\t},\n"+
	// "\tonenterframe: function() {\n"+
	// "\t\t// 重力の影響をうけて速度(velocity)がかわる処理\n"+
	// "\t\tif (this.useGravity) {\n"+
	// "\t\t\tthis.velocity.x += Hack.gravity.x;\n"+
	// "\t\t\tthis.velocity.y += Hack.gravity.y;\n"+
	// "\t\t}\n"+
	// "\t\t// 速度の分だけ動く\n"+
	// "\t\tthis.moveBy(this.velocity.x, this.velocity.y);\n"+
	// "\t\t// 地面に足がついたときの処理\n"+
	// "\t\tif (this.useGround) {\n"+
	// "\t\t\tvar foot = this.y + (this.footHeight || this.height); // 足の高さ\n"+
	// "\t\t\tif (foot >= Hack.groundHeight) {\n"+
	// "\t\t\t\tthis.y = Hack.groundHeight - (this.footHeight || this.height); // 足をつく\n"+
	// "\t\t\t\tthis.velocity.y = 0; // 足がついたのでYの速さを0にする\n"+
	// "\t\t\t}\n"+
	// "\t\t}\n"+
	// "\t}\n"+
	// "});\n"+
	// "// MovingSpriteのオブジェクトをつくるメソッド\n"+
	// "Hack.createMovingSprite = function(width, height, prop) {\n"+
	// "\treturn (function () {\n"+
	// "\t\t// @ new Hack.MovingSprite()\n"+
	// "\t\tif (prop) {\n"+
	// "\t\t\tObject.keys(prop).forEach(function(key) {\n"+
	// "\t\t\t\tthis[key] = prop[key];\n"+
	// "\t\t\t}, this);\n"+
	// "\t\t}\n"+
	// "\t\tif (Hack.defaultParentNode) {\n"+
	// "\t\t\tHack.defaultParentNode.addChild(this);\n"+
	// "\t\t}\n"+
	// "\t\treturn this;\n"+
	// "\n"+
	// "\t}).call(new Hack.MovingSprite(width, height));\n"+
	// "};\n";


	slime_encounter = 50;
	insect_encounter = 50;
	spider_encounter = 50;
	scopion_encounter = 50;
	dragon_encounter = 50;
	daemon_encounter = 50;
	speedup_encounter = 300;
	lifeup_encounter = 300;
	lifedown_encounter = 300;

	BGM = 'resources/BGM.mp3';
	Attack = 'resources/attack.mp3';
	Damage = 'resources/damage.mp3';
	Item_SE1 = 'resources/speedup.mp3';
	Item_SE2 = 'resources/lifeup.mp3';


	//ゲームを起動したときに行う処理
	game.onload = game.onload || function() {
		Hack.pressStartKey(' ');
		Hack.defaultParentNode = new enchant.Group(); // prepear to scroll
		

		//-------Map作り----------------------
		var map = new enchant.Map(32, 32);
		map.image = game.assets['enchantjs/x2/map1.png'];	

		map.loadData([
			[20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20],
			[20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20],
			[20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20],
			[20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20],
			[20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20],
			[20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20],
			[ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
			[ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
			[ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
			[ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
		]);

		Hack.defaultParentNode.addChild(map);
		game.rootScene.addChild(map);

		//=====================================



		//-----------プレイヤーの設定--------------

		//プレイヤーの画像設定
		Hack.player = Hack.createMovingSprite(32,32, {
			x: 210, y: 160,
			image: game.assets['enchantjs/chara1.png'],
			frame: [0,0,0,1,1,1,2,2,2],
		});

		//プレイヤーのHPとかサイズとかの宣言
		Hack.player.hp = 5; // player's hit point
		Hack.player.hp_img = [];
		Hack.player.size = 1;
		Hack.player.direction = 0;//0が左、1が右
		Hack.player.speed = 2;
		Hack.player.isDamaged = false; // damaged flag

		//====================================

		Hack.monster = [];
		Hack.item = [];

		// 魔道書
		Hack.enchantBookIcon = Hack.createSprite(64, 64, {
			image: game.assets['hackforplay/enchantbook.png'],
			defaultParentNode: game.rootScene,
			ontouchend: function() {
				Hack.openEditor();
			}
		});
		// 魔道書の中身
		Hack.hint = 'slime_encounter = 50;//スライムの出現頻度\n'+
					'insect_encounter = 50;//いもむしの出現頻度\n'+
					'spider_encounter = 50;//くもの出現頻度\n'+
					'scopion_encounter = 50;//さそりの出現頻度\n'+
					'dragon_encounter = 50;//ドラゴンの出現頻度\n'+
					'daemon_encounter = 50;//デーモンの出現頻度\n'+
					'speedup_encounter = 300;//リンゴの出現頻度\n'+
					'lifeup_encounter = 400;//ハートの出現頻度\n'+
					'lifedown_encounter = 400;//どくろの出現頻度\n'+
					'//出現頻度は低いほどたくさん出てくるようになるぞ！\n'+
					'//(でも0以下からは効果が変わらないぞ！)\n';

		// // 最初のラベル
		// Hack.pressStartLabel = Hack.createLabel('スペースキーを押してスタート', {
		// 	x: 150, y: 150, width: 400
		// });

		//遊び方のラベル
		Hack.howtoLabel = Hack.createLabel('                            [遊び方]<br>'+
											'このゲームは弱肉強食の世の中を再現しようとして作ったゲームです<br>'+
											'自分より小さいものを喰らい、どんどん大きくなっていきましょう<br>'+
											'くまのサイズが100を超えるとゲームクリアです！！<br>',
											{
												x: 70, y: 10, color: 'blue', width:400,
												defaultParentNode: game.rootScene									
											});		
		Hack.PressStartLabel = [];
		Hack.PressStartLabel[0] = CreateFont(220-16*4,170-16*2,48);//P
		Hack.PressStartLabel[1] = CreateFont(220-16*2,170-16*2,50);//R
		Hack.PressStartLabel[2] = CreateFont(220     ,170-16*2,37);//E
		Hack.PressStartLabel[3] = CreateFont(220+16*2,170-16*2,51);//E
		Hack.PressStartLabel[4] = CreateFont(220+16*4,170-16*2,51);//S

		Hack.PressStartLabel[5] = CreateFont(220-16*1/2*2,170,52);//T
		Hack.PressStartLabel[6] = CreateFont(220+16*1/2*2,170,47);//O

		Hack.PressStartLabel[7] = CreateFont(220-16*4,170+16*2,51);//S
		Hack.PressStartLabel[8] = CreateFont(220-16*2,170+16*2,48);//P
		Hack.PressStartLabel[9] = CreateFont(220     ,170+16*2,33);//A
		Hack.PressStartLabel[10] = CreateFont(220+16*2,170+16*2,35);//C
		Hack.PressStartLabel[11] = CreateFont(220+16*4,170+16*2,37);//E

		for(var i = 0; i < Hack.PressStartLabel.length;i++)
		{
			Hack.PressStartLabel[i].onenterframe = function(){
				this.scaleX=1.5+Math.sin(game.frame/20)/2;
				this.scaleY=1.5+Math.cos(game.frame/20)/2;
				//this.tl.scaleTo(1.5+Math.sin(game.frame/20),1.5+Math.sin(game.frame/20),1);
			}
		}

		//リンゴの絵
		Hack.apple = Hack.createMovingSprite(32,32, {
			x: 80, y: 70,
			image: game.assets['enchantjs/x2/icon0.png'],
			frame: [15],
		});

		Hack.apple_label = [];

		Hack.apple_label[0] = CreateFont(60     ,105   ,51);//S
		Hack.apple_label[1] = CreateFont(60+16  ,105   ,48);//P
		Hack.apple_label[2] = CreateFont(60+16*2,105   ,37);//E
		Hack.apple_label[3] = CreateFont(60+16*3,105   ,37);//E
		Hack.apple_label[4] = CreateFont(60+16*4,105   ,36);//D

		Hack.apple_label[5] = CreateFont(80     ,105+16,53);//U
		Hack.apple_label[6] = CreateFont(80+16  ,105+16,48);//P
		Hack.apple_label[7] = CreateFont(80+16*2,105+16, 1);//!

		//ハートの絵
		Hack.heart = Hack.createMovingSprite(32,32, {
			x: 210, y: 70,
			image: game.assets['enchantjs/x2/icon0.png'],
			frame: [10],
		});

		Hack.heart_label = [];
		Hack.heart_label[0] = CreateFont(195     ,105,40);//H
		Hack.heart_label[1] = CreateFont(195+16  ,105,48);//P

		Hack.heart_label[2] = CreateFont(230     ,105,53);//U
		Hack.heart_label[3] = CreateFont(230+16*1,105,48);//P
		Hack.heart_label[4] = CreateFont(230+16*2,105, 1);//!

		//どくろの絵
		Hack.skull = Hack.createMovingSprite(32,32, {
			x: 340, y: 70,
			image: game.assets['enchantjs/x2/icon0.png'],
			frame: [11],
		});		

		Hack.skull_label = [];
		Hack.skull_label[0] =  CreateFont(343    ,105,40);//H
		Hack.skull_label[1] =  CreateFont(343+16  ,105,48);//P
		Hack.skull_label[2] =  CreateFont(325     ,105+16,36);//D
		Hack.skull_label[3] =  CreateFont(325+16  ,105+16,47);//O
		Hack.skull_label[4] =  CreateFont(325+16*2,105+16,55);//W
		Hack.skull_label[5] =  CreateFont(325+16*3,105+16,46);//N
		Hack.skull_label[6] =  CreateFont(325+16*4,105+16, 1);//!

		Hack.size_label = [];
		Hack.size_label[0] = CreateFont(10,280,51);//S
		Hack.size_label[1] = CreateFont(22,280,41);//I
		Hack.size_label[2] = CreateFont(33,280,58);//Z
		Hack.size_label[3] = CreateFont(46,280,37);//E


		//スライムの絵
		Hack.slime_img = Hack.createMovingSprite(48,48, {
			x: 60, y: 240,
			image: game.assets['enchantjs/monster4.gif'],
			frame: [2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,5,5],
		});

		Hack.slime_label = [];
		Hack.slime_label[0] = CreateFont(65,280,17);//1
		Hack.slime_label[1] = CreateFont(78,280,14);//.
		Hack.slime_label[2] = CreateFont(84,280,16);//0

		//いもむしの絵
		Hack.incect_img = Hack.createMovingSprite(48,48, {
			x: 120, y: 235,
			image: game.assets['enchantjs/monster1.gif'],
			frame: [2,2,2,2,2,2,3,3,3,3,3,3],
		});				

		Hack.incect_label = [];
		Hack.incect_label[0] = CreateFont(128,280,18);//2
		Hack.incect_label[1] = CreateFont(141,280,14);//.
		Hack.incect_label[2] = CreateFont(147,280,16);//0

		//くもの絵
		Hack.spider_img = Hack.createMovingSprite(64,64, {
			x: 180, y: 225,
			image: game.assets['enchantjs/monster2.gif'],
			frame: [2,2,2,2,2,3,3,3,3,3,4,4,4,4,4],
		});

		Hack.spider_label = [];
		Hack.spider_label[0] = CreateFont(194,280,19);//3
		Hack.spider_label[1] = CreateFont(207,280,14);//.
		Hack.spider_label[2] = CreateFont(213,280,21);//5

		//さそりの絵
		Hack.scopion_img = Hack.createMovingSprite(48,48, {
			x: 250, y: 233,
			image: game.assets['enchantjs/monster7.gif'],
			frame: [2,2,2,2,2,3,3,3,3,3,4,4,4,4,4],
		});

		Hack.scopion_label = [];
		Hack.scopion_label[0] = CreateFont(258,280,22);//6
		Hack.scopion_label[1] = CreateFont(271,280,14);//.
		Hack.scopion_label[2] = CreateFont(277,280,21);//5

		//ドラゴンの絵
		Hack.dragon_img = Hack.createMovingSprite(80,80, {
			x: 310, y: 205,
			image: game.assets['enchantjs/bigmonster1.gif'],
			frame: [2,2,2,2,2,3,3,3,3,3,4,4,4,4,4],
		});

		Hack.dragon_label = [];
		Hack.dragon_label[0] = CreateFont(334,280,17);//1
		Hack.dragon_label[1] = CreateFont(350,280,16);//0

		//デーモンの絵
		Hack.daemon_img = Hack.createMovingSprite(80,80, {
			x: 385, y: 200,
			image: game.assets['enchantjs/bigmonster2.gif'],
			frame: [2,2,2,2,2,3,3,3,3,3,4,4,4,4,4],
		});

		Hack.daemon_label = [];
		Hack.daemon_label[0] = CreateFont(420,280,18);//2
		Hack.daemon_label[1] = CreateFont(436,280,16);//0	

	};

	//----------↓ボタンを押したらスタート↓--------------

	Hack.onpressstart = Hack.onpressstart || function() {
		Hack.started = true;

		if(game.assets[BGM] !== undefined){
			if(game.assets[BGM].src){
				game.assets[BGM].play();
				game.assets[BGM].src.loop = true;
			}
		}	

		//--------------最初の説明とかを消す処理----------

		//[遊び方]を消す処理
		Hack.defaultParentNode.removeChild(Hack.howtoLabel);
		game.rootScene.removeChild(Hack.howtoLabel);

		//PRESS TO SPACE を消す処理
		for(var i = 0; i < Hack.PressStartLabel.length;i++)
		{
			Hack.defaultParentNode.removeChild(Hack.PressStartLabel[i]);
			game.rootScene.removeChild(Hack.PressStartLabel[i]);
		}

		//リンゴの絵を消す処理
		Hack.defaultParentNode.removeChild(Hack.apple);
		game.rootScene.removeChild(Hack.apple);

		//SPEED UP! を消す処理
		for(var i = 0; i < Hack.apple_label.length;i++)
		{
			Hack.defaultParentNode.removeChild(Hack.apple_label[i]);
			game.rootScene.removeChild(Hack.apple_label[i]);	
		}

		//ハートの絵を消す処理
		Hack.defaultParentNode.removeChild(Hack.heart);
		game.rootScene.removeChild(Hack.heart);

		//HP UP! を消す処理
		for(var i = 0; i < Hack.heart_label.length;i++)
		{
			Hack.defaultParentNode.removeChild(Hack.heart_label[i]);
			game.rootScene.removeChild(Hack.heart_label[i]);
		}

		//どくろの絵を消す処理
		Hack.defaultParentNode.removeChild(Hack.skull);
		game.rootScene.removeChild(Hack.skull);

		//HP DOWN! を消す処理
		for(var i = 0; i < Hack.skull_label.length;i++)
		{
			Hack.defaultParentNode.removeChild(Hack.skull_label[i]);
			game.rootScene.removeChild(Hack.skull_label[i]);
		}

		//SIZEを消す処理
		for(var i = 0; i < Hack.size_label.length;i++)
		{
			Hack.defaultParentNode.removeChild(Hack.size_label[i]);
			game.rootScene.removeChild(Hack.size_label[i]);			
		}		

		//スライムの絵を消す処理
		Hack.defaultParentNode.removeChild(Hack.slime_img);
		game.rootScene.removeChild(Hack.slime_img);

		//1.0 を消す処理
		for(var i = 0; i < Hack.slime_label.length;i++)
		{
			Hack.defaultParentNode.removeChild(Hack.slime_label[i]);
			game.rootScene.removeChild(Hack.slime_label[i]);			
		}

		//いもむしの絵を消す処理
		Hack.defaultParentNode.removeChild(Hack.incect_img);
		game.rootScene.removeChild(Hack.incect_img);		

		//2.0 を消す処理
		for(var i = 0; i < Hack.incect_label.length;i++)
		{
			Hack.defaultParentNode.removeChild(Hack.incect_label[i]);
			game.rootScene.removeChild(Hack.incect_label[i]);			
		}		

		//くもの絵を消す処理
		Hack.defaultParentNode.removeChild(Hack.spider_img);
		game.rootScene.removeChild(Hack.spider_img);		

		//3.5 を消す処理
		for(var i = 0; i < Hack.spider_label.length;i++)
		{
			Hack.defaultParentNode.removeChild(Hack.spider_label[i]);
			game.rootScene.removeChild(Hack.spider_label[i]);			
		}	

		//さそりの絵を消す処理
		Hack.defaultParentNode.removeChild(Hack.scopion_img);
		game.rootScene.removeChild(Hack.scopion_img);		

		//6.5 を消す処理
		for(var i = 0; i < Hack.scopion_label.length;i++)
		{
			Hack.defaultParentNode.removeChild(Hack.scopion_label[i]);
			game.rootScene.removeChild(Hack.scopion_label[i]);			
		}	

		//ドラゴンの絵を消す処理
		Hack.defaultParentNode.removeChild(Hack.dragon_img);
		game.rootScene.removeChild(Hack.dragon_img);		

		//10 を消す処理
		for(var i = 0; i < Hack.dragon_label.length;i++)
		{
			Hack.defaultParentNode.removeChild(Hack.dragon_label[i]);
			game.rootScene.removeChild(Hack.dragon_label[i]);			
		}	

		//デーモンの絵を消す処理
		Hack.defaultParentNode.removeChild(Hack.daemon_img);
		game.rootScene.removeChild(Hack.daemon_img);		

		//20 を消す処理
		for(var i = 0; i < Hack.daemon_label.length;i++)
		{
			Hack.defaultParentNode.removeChild(Hack.daemon_label[i]);
			game.rootScene.removeChild(Hack.daemon_label[i]);			
		}	

		//=========================================		


		Hack.player.parentNode.addChild(Hack.player); // bring to the front
		// {defaultParentNode: game.rootScene} means no-scroll

		//HPとかサイズとかスピードとかタイムとかのラベルを作るところ

		for(var i = 0; i < Hack.player.hp;i++)
		{
			var clone = Hack.createMovingSprite(32,32, {
				x: (25+i*20), y: 220,
				image: game.assets['enchantjs/x2/icon0.png'],
				frame: [10],
				scaleX:0.6,
				scaleY:0.6,
			});


			Hack.player.hp_img.push(clone);
		}

		Hack.hpLabel = Hack.createLabel('HP ', {
			x: 10, y: 230, color: 'black',
			defaultParentNode: game.rootScene
		});
		Hack.sizeLabel = Hack.createLabel('サイズ: ', {
			x: 10, y: 250, color: 'black',
			defaultParentNode: game.rootScene
		});
		Hack.speedLabel = Hack.createLabel('スピード: ', {
			x: 10, y: 270, color: 'black',
			defaultParentNode: game.rootScene
		});
		Hack.timeLabel = Hack.createLabel('タイム: ', {
			x: 10, y: 290, color: 'black',
			defaultParentNode: game.rootScene
		});



		//HPとかサイズとかスピードとかタイムとかのラベルを処理するところ

		// Hack.hpLabel.onenterframe = function() {
		// 	this.text = 'HP:' + Hack.player.hp;
		// }
		Hack.sizeLabel.onenterframe = function(){
			this.text = 'サイズ:' + Hack.player.size.toFixed(1);//toFixed(1)で小数点第1位まで表わす
		}
		Hack.speedLabel.onenterframe = function(){
			this.text = 'スピード:' + Hack.player.speed.toFixed(1);
		}
		Hack.timeLabel.onenterframe = function(){
			this.text = 'タイム:' + parseInt(game.frame/game.fps);
		}

		//プレイヤーが十字キーで動く処理
		Hack.player.on('enterframe', function(event) {
			if (game.input.up) {
				this.y -= this.speed;
			}
			if(game.input.down)
			{
				this.y += this.speed;
			}
			if (game.input.left) {
				this.x -= this.speed;
				Hack.player.direction = 1;
			}
			if(game.input.right)
			{
				this.x += this.speed;
				Hack.player.direction = 0;
			}			
		});
	};

	//ゲームがスタートした時から毎回行う処理
	game.onenterframe = game.onenterframe || function() {
		if (!Hack.started) return; // game started and running flag

		//ゲームクリアの条件
		if (Hack.player.size >= 100)//プレイヤーのサイズが100以上の時
		{
			Hack.gameclear();
			Hack.started = false;
		}

		//---------------モンスターを生成する場所-------------------

		if(slime_encounter <= 0)slime_encounter = 1;
		if(game.frame%slime_encounter == 0)
		{
			var clone = new Slime();
			clone.ran = Math.floor( Math.random() * 2 );
			clone.x = (clone.ran%2 == 0)?-50:500;
			clone.y = Math.random()*250;
			clone.speed += Math.random()*5;
			Hack.monster.push(clone);
		}

		if(insect_encounter <= 0)insect_encounter = 1;
		if(game.frame%insect_encounter == 0)
		{
			var clone = new Insect();
			clone.ran = Math.floor( Math.random() * 2 );
			clone.x = (clone.ran%2 == 0)?-50:500;
			clone.y = Math.random()*250;
			clone.speed += Math.random()*7;
			Hack.monster.push(clone);
		}

		if(spider_encounter <= 0)spider_encounter = 1;
		if(game.frame%spider_encounter == 0)
		{
			var clone = new Spider();
			clone.ran = Math.floor( Math.random() * 2 );
			clone.x = (clone.ran%2 == 0)?-50:500;
			clone.y = Math.random()*250;
			clone.speed += Math.random()*3;
			clone.ran_y = Math.random()*360;
			Hack.monster.push(clone);
		}

		if(scopion_encounter <= 0)scopion_encounter = 1;
		if(game.frame%(scopion_encounter) == 0)
		{
			var clone = new Scorpion();
			clone.ran = Math.floor( Math.random() * 2 );
			clone.x = (clone.ran%2 == 0)?-50:500;
			clone.y = Math.random()*250;
			clone.speed += Math.random()*2;
			Hack.monster.push(clone);
		}

		if(dragon_encounter <= 0)dragon_encounter = 1;
		if(game.frame%(dragon_encounter) == 0)
		{
			var clone = new Dragon();
			clone.ran = Math.floor( Math.random() * 2 );
			clone.x = (clone.ran%2 == 0)?-50:500;
			clone.y = Math.random()*250;
			clone.speed += Math.random()*2;
			Hack.monster.push(clone);
		}

		 if(daemon_encounter <= 0)daemon_encounter = 1;
		 if(game.frame%(daemon_encounter) == 0)
		 {
		 	var clone = new Daemon();
		 	clone.ran = Math.floor( Math.random() * 2 );
		 	clone.x = Math.random()*400;
		 	clone.y = Math.random()*170;
		 	Hack.monster.push(clone);
		 }

		 //=================================================

		 //-----------------アイテムを生成する場所----------------

         if(speedup_encounter <= 0)speedup_encounter = 1;
		 if(game.frame%(speedup_encounter) == 0)
		 {
		 	var clone = new SpeedUp();
		 	clone.x = Math.random()*360+10;
		 	clone.y = 0;
		 	Hack.item.push(clone);
		 }

         if(lifeup_encounter <= 0)lifeup_encounter = 1;
		 if(game.frame%(lifeup_encounter) == 0)
		 {
		 	var clone = new LifeUp();
		 	clone.x = Math.random()*360+10;
		 	clone.y = -clone.width;
		 	Hack.item.push(clone);
		 }

		 if(lifedown_encounter <= 0)lifedown_encounter = 1;
		 if(game.frame%(lifedown_encounter) == 0)
		 {
		 	var clone = new LifeDown();
		 	clone.x = Math.random()*360+10;
		 	clone.y = -clone.width;
		 	Hack.item.push(clone);
		 }

		//=================================================

		//プレイヤーのサイズ
		if(Hack.player.direction == 0)
			Hack.player.scaleX = 0.8+Hack.player.size/5;
		else
			Hack.player.scaleX = -(0.8+Hack.player.size/5);
		Hack.player.scaleY = 0.8+Hack.player.size/5;

		//damage
		if (!Hack.player.isDamaged) {
			for(var i = 0; i < Hack.monster.length;i++)
			{
				if (Hack.player.within(Hack.monster[i], 20+Hack.player.size+Hack.monster[i].size*Hack.monster[i].scale_hosei))//当たり判定 
				{
					if(Hack.player.size >= Hack.monster[i].size)
					{
						Hack.player.size += Hack.monster[i].size/10;
						Hack.defaultParentNode.removeChild(Hack.monster[i]);
						game.rootScene.removeChild(Hack.monster[i]);
						Hack.monster.splice(i,1);

						if(game.assets[Attack] !== undefined){
							if(game.assets[Attack].src){
								game.assets[Attack].clone().play();
							}
						}
					}
					else
					{
						Damage_Me();
					}
					return;
				}
				else if(Hack.monster[i].ran%2 == 0)//ranの値が0だったら時
				{
					if(Hack.monster[i].x > (450+Hack.monster[i].width))//x座標が450を超えた(画面外に出た)モンスターを削除
					{
						Hack.defaultParentNode.removeChild(Hack.monster[i]);
						game.rootScene.removeChild(Hack.monster[i]);
						Hack.monster.splice(i,1);				
					}
				}
				else
				{
					if(Hack.monster[i].x < -(50+Hack.monster[i].width))//x座標が0を下回った(画面外に出た)モンスターを削除
					{
						Hack.defaultParentNode.removeChild(Hack.monster[i]);
						game.rootScene.removeChild(Hack.monster[i]);
						Hack.monster.splice(i,1);
					}
				}
			}

			for(var i = 0; i < Hack.item.length;i++)
			{
				if(Hack.player.within(Hack.item[i],20+Hack.player.size))
				{
					Hack.item[i].Get_Item();
					Hack.defaultParentNode.removeChild(Hack.item[i]);
					game.rootScene.removeChild(Hack.item[i]);
					Hack.item.splice(i,1);					
				}
				else if(Hack.item[i].y > 300+Hack.item[i].width)
				{
					Hack.defaultParentNode.removeChild(Hack.item[i]);
					game.rootScene.removeChild(Hack.item[i]);
					Hack.item.splice(i,1);
				}
			}
		}
	};

	// Environments and classes
	Hack.groundHeight = 32 * 6; // define ground distance from Y=0
	Hack.gravity = { x: 0, y: 1 };
	//---------------------------------------------------------------------
	var Slime = enchant.Class.create(enchant.Sprite,{
		initialize: function(){
			enchant.Sprite.call(this,this.width,this.height);
			this.image = game.assets['enchantjs/monster4.gif'];
			this.width = this.height = 48; // 本体の大きさ
			this.x = 10;
			this.y = 10;
			this.frame = [2, 2,2,3,3,4,4,5,5,5];
			this.size = 1; //大きさ
			this.speed = 1;//速さ
			this.scale_hosei = 0.8;
			this.scaleY = this.scale_hosei;
			this.ran = 0;//乱数発生用
			Hack.defaultParentNode.addChild(this)
		},	
		onenterframe:function(){
			if(this.ran%2 == 0)
			{
				this.x+=this.speed;
				this.scaleX = -this.size*this.scale_hosei;
				//this.rotation = 360;
			}
			else
			{
				this.x -= this.speed;
				this.scaleX = this.size*this.scale_hosei;
			}

		}
	});

	var Insect = enchant.Class.create(enchant.Sprite,{
		initialize: function(){
			enchant.Sprite.call(this,this.width,this.height);
			this.image = game.assets['enchantjs/monster1.gif'];
			this.width = this.height = 48; // 本体の大きさ
			this.x = 10;
			this.y = 10;
			this.frame = [2, 2,2,3,3,3];
			this.size = 2; //大きさ
			this.speed = 3;//速さ
			this.scale_hosei = 0.6;
			this.scaleY = this.size*this.scale_hosei;
			this.ran = 0;//乱数発生用
			Hack.defaultParentNode.addChild(this)
		},	
		onenterframe:function(){
			if(this.ran%2 == 0)
			{
				this.x+=this.speed;
				this.scaleX = -this.size*this.scale_hosei;
				//this.scaleX = this.scaleY =-this.size;
				//this.rotation = 360;
			}
			else
			{
				this.x -= this.speed;
				this.scaleX = this.size*this.scale_hosei;
			}

		}
	});

	var Spider = enchant.Class.create(enchant.Sprite,{
		initialize: function(){
			enchant.Sprite.call(this,this.width,this.height);
			this.image = game.assets['enchantjs/monster2.gif'];
			this.width = this.height = 64; // 本体の大きさ
			this.x = 10;
			this.y = 10;
			this.frame = [2, 2,2,3,3,3,4,4,4];
			this.size = 3.5; //大きさ
			this.speed = 3;//速さ
			this.scale_hosei = 0.3;
			this.scaleY = this.size*this.scale_hosei;
			this.ran = 0;//乱数発生用
			this.ran_y = 0;//角度変えるための乱数
			Hack.defaultParentNode.addChild(this)
		},	
		onenterframe:function(){
			if(this.ran%2 == 0)
			{
				this.x+=this.speed;
				this.y+= 5*Math.sin(this.ran_y+game.frame/20);
				this.scaleX = -this.size*this.scale_hosei;
				//this.scaleX = this.scaleY =-this.size;
				//this.rotation = 360;
			}
			else
			{
				this.x -= this.speed;
				this.y+= 5*Math.cos(this.ran_y+game.frame/20);
				this.scaleX = this.size*this.scale_hosei;
			}

		}
	});

	var Scorpion = enchant.Class.create(enchant.Sprite,{
		initialize: function(){
			enchant.Sprite.call(this,this.width,this.height);
			this.image = game.assets['enchantjs/monster7.gif'];
			this.width = this.height = 48; // 本体の大きさ
			this.x = 10;
			this.y = 10;
			this.frame = [2, 2,2,3,3,3,4,4,4];
			this.size = 6.5; //大きさ
			this.speed = 10;//速さ
			this.scale_hosei  = 0.3;
			this.scaleY = this.size*this.scale_hosei;
			this.ran = 0;//乱数発生用
			Hack.defaultParentNode.addChild(this)
		},	
		onenterframe:function(){
			if(this.ran%2 == 0)
			{
				if(Math.random()*10 < 3)
				this.x+=this.speed+Math.random()*10;
				if(Math.random()*10 < 1)
					this.y += Math.random()*50-25;
				this.scaleX = -this.size*this.scale_hosei;
				//this.scaleX = this.scaleY =-this.size;
				//this.rotation = 360;
			}
			else
			{
				if(Math.random()*10 < 3)
				this.x -= this.speed+Math.random()*10;
				if(Math.random()*10 < 1)
					this.y += Math.random()*50-25;			
				this.scaleX = this.size*this.scale_hosei;
			}

		}
	});

	var Dragon = enchant.Class.create(enchant.Sprite,{
		initialize: function(){
			enchant.Sprite.call(this,this.width,this.height);
			this.image = game.assets['enchantjs/bigmonster1.gif'];
			this.width = this.height = 80; // 本体の大きさ
			this.x = 10;
			this.y = 10;
			this.frame = [2, 2,2,2,3,3,3,3,4,4,4,4];
			this.size = 10; //大きさ
			this.speed = 3;//速さ
			this.scale_hosei = 0.15;
			this.scaleY = this.size*this.scale_hosei;
			this.ran = 0;//乱数発生用
			Hack.defaultParentNode.addChild(this)
		},	
		onenterframe:function(){
			if(this.ran%2 == 0)
			{
				this.x += this.speed;
				this.scaleX = -this.size*this.scale_hosei;
			}
			else
			{
				this.x -= this.speed;
				this.scaleX = this.size*this.scale_hosei;
			}

		}
	});
	var Daemon = enchant.Class.create(enchant.Sprite,{
		initialize: function(){
			enchant.Sprite.call(this,this.width,this.height);
			this.image = game.assets['enchantjs/bigmonster2.gif'];
			this.width = this.height = 80; // 本体の大きさ
			this.x = 10;
			this.y = 10;
			this.frame = [0,0,0,0,0,0,0,1,1,1,1,1,1,3,3,3,3,3,3];
			this.size = 20; //大きさ
			this.speed = 0;//速さ
			this.scale_hosei = 0.1;
			this.scaleY = this.size*this.scale_hosei;
			this.ran = 0;//乱数発生用
			this.state = 0;//状態
			this.count = 0;
			Hack.defaultParentNode.addChild(this);
		},	
		onenterframe:function(){
			this.count++;
			if(this.count==1)
			{
				if(this.ran%2 == 1)
				{
					this.scaleX = this.size*this.scale_hosei;
				}
				else
				{
					this.scaleX = -this.size*this.scale_hosei;
				}
			}
			else if(this.count==18)
			{
				this.frame = [3];
			}
			else if(this.count == 50)
			{
				this.frame = 	[2,2,2,2,2,3,3,3,3,4,4,4,4];
				this.speed = Math.random()*90+10;
			}
			else if(this.count > 18)
			{
			 	 if(this.ran%2 == 0)
			 	 {
				 	this.x += this.speed;
			 	 }
			 	 else
			 	 {
			 	 	this.x -= this.speed;
			 	 }
			}

		}
	});	

	//=======================================






	//-----------------アイテムの定義-----------

	var SpeedUp = enchant.Class.create(enchant.Sprite,{
		initialize: function(){
			enchant.Sprite.call(this,this.width,this.height);
			this.image = game.assets['enchantjs/x2/icon0.png'];
			this.width = this.height = 32; // 本体の大きさ
			this.x = 10;
			this.y = 10;
			this.frame = [15];
			this.speed = 1;//速さ
			Hack.defaultParentNode.addChild(this);
		},	
		onenterframe:function(){
			this.y += this.speed;
		},
		Get_Item:function(){
			Hack.player.speed += Math.abs(Math.random()-0.5);
			if(game.assets[Item_SE1] !== undefined){
							if(game.assets[Item_SE1].src){
								game.assets[Item_SE1].clone().play();
							}
						}
		}
	});	

	var LifeUp = enchant.Class.create(enchant.Sprite,{
		initialize: function(){
			enchant.Sprite.call(this,this.width,this.height);
			this.image = game.assets['enchantjs/x2/icon0.png'];
			this.width = this.height = 32; // 本体の大きさ
			this.x = 10;
			this.y = 10;
			this.frame = [10];
			this.speed = 3;//速さ
			Hack.defaultParentNode.addChild(this);
		},	
		onenterframe:function(){
			this.y += this.speed;
		},
		Get_Item:function(){
			Hack.player.hp += 1;			
			var clone = Hack.createMovingSprite(32,32, {
				x: 25+20*(Hack.player.hp-1), y: 220,
				image: game.assets['enchantjs/x2/icon0.png'],
				frame: [10],
				scaleX:0.6,
				scaleY:0.6,
			});
			Hack.player.hp_img.push(clone);
			if(game.assets[Item_SE2] !== undefined)
			{
				if(game.assets[Item_SE2].src)
				{
					game.assets[Item_SE2].clone().play();
				}
			}
		}
	});	

	var LifeDown = enchant.Class.create(enchant.Sprite,{
		initialize: function(){
			enchant.Sprite.call(this,this.width,this.height);
			this.image = game.assets['enchantjs/x2/icon0.png'];
			this.width = this.height = 32; // 本体の大きさ
			this.x = 10;
			this.y = 10;
			this.frame = [11];
			this.speed = 5;//速さ
			this.p1 = 0;
			this.count =0;
			Hack.defaultParentNode.addChild(this);
		},	
		onenterframe:function(){
			this.count++;
			if(this.count < 5)//カウントが2を超えるまでくまを追尾する
				p1 = Math.atan2((Hack.player.y-this.y),(Hack.player.x-this.x));
			this.x+=Math.cos(p1)*4;
			this.y+=Math.sin(p1)*4;
			// if(game.frame%50 < 5)
			// this.tl.moveTo(Hack.player.x,Hack.player.y,50).fadeOut(30).function(){
			// 	Hack.defaultParentNode.removeChild(Hack.dragon_label[i]);
			// 	game.rootScene.removeChild(Hack.dragon_label[i]);			
			// };
		},
		Get_Item:function(){
			Damage_Me();
		}
	});	

	//==================================================

	//--------------------関数------------------------

	function CreateFont (_x, _y, _frame) {
		return Hack.createMovingSprite(16, 16, {
			x: _x || 0, y: _y || 0,
			image: game.assets['enchantjs/font1.png'],
			frame: _frame || [0],
		});
	}

	function Damage_Me(){
		Hack.player.hp--; // ouch!!
		Hack.defaultParentNode.removeChild(Hack.player.hp_img[Hack.player.hp]);
		game.rootScene.removeChild(Hack.player.hp_img[Hack.player.hp]);												
		Hack.player.hp_img.splice(Hack.player.hp,1);
		Hack.player.isDamaged = true; // damaged (flashing) flag

		if(game.assets[Damage] !== undefined){
			if(game.assets[Damage].src){
				game.assets[Damage].clone().play();
			}
		}

		if (Hack.player.hp <= 0) {
			// R.I.P
			Hack.gameover();
			Hack.started = false;
			Hack.player.onenterframe = null; // remove 'onenterframe'
			Hack.player.tl.fadeOut(10);
		} else {
			// still living
			var saveFrame = Hack.player._originalFrameSequence; // ~= player.frame
			Hack.player.frame = [-1, -1, 3, 3]; // flashing (-1: invisible)

			window.setTimeout(function() {
			    // 3 秒たったら...
				Hack.player.isDamaged = false;
				Hack.player.frame = saveFrame; // walking animation
			}, 3000);
		}
	}



	//===============================================

	Hack.MovingSprite = enchant.Class.create(enchant.Sprite, {
		initialize: function(width, height) {
			enchant.Sprite.call(this, width, height);
			this.velocity = { x: 0, y: 0 };
		},
		onenterframe: function() {
			// move then effect from gravity
			if (this.useGravity) {
				this.velocity.x += Hack.gravity.x;
				this.velocity.y += Hack.gravity.y;
			}
			this.moveBy(this.velocity.x, this.velocity.y); // move
			// get a foot on the ground
			if (this.useGround) {
				var foot = this.y + (this.footHeight || this.height);
				if (foot >= Hack.groundHeight) {
					this.y = Hack.groundHeight - (this.footHeight || this.height);
					this.velocity.y = 0;
				}
			}
		}
	});
	Hack.createMovingSprite = function(width, height, prop) {
		return (function () {
			// @ new Hack.MovingSprite()
			if (prop) {
				Object.keys(prop).forEach(function(key) {
					this[key] = prop[key];
				}, this);
			}
			if (Hack.defaultParentNode) {
				Hack.defaultParentNode.addChild(this);
			}
			return this;

		}).call(new Hack.MovingSprite(width, height));
	};

	function makeMonster1 (_x, _y, _frame) {
		return Hack.createMovingSprite(48, 48, {
			x: _x || 0, y: _y || 0,
			image: game.assets['enchantjs/monster1.gif'],
			frame: _frame || [2, 2, 2, 3, 3, 3],
		});
	}

	function makeMonster2 (_x, _y, _frame) {
		return Hack.createMovingSprite(48, 48, {
			x: _x || 0, y: _y || 0,
			image: game.assets['enchantjs/monster4.gif'],
			frame: _frame || [2, 2,2, 3, 3,4, 4,5,5,5],
		});
	}

	// <===

	Hack.createScrollMap = function(map) {
		// Vertical stick maps are lined up horizontal
		// Can move only  <====RIGHT TO LEFT====
		Hack.backgroundImage = [];
		// repeat horizontal
		for (var x = 0; x < Math.max(16, map[0].length); x++) {
			Hack.backgroundImage[x] = new enchant.Map(32, 32);
			Hack.backgroundImage[x].image = game.assets['enchantjs/x2/map1.png'];
			var stickMap = [];
			for (var y = 0; y < 10; y++) {
				stickMap[y] = [];
				stickMap[y][0] = map[y][x] || map[y][x%map[y].length]; // map[y].length less than 16
			}
			Hack.backgroundImage[x].loadData(stickMap);
			Hack.backgroundImage[x].x = x * 32;
			if (Hack.defaultParentNode) {
				Hack.defaultParentNode.addChild(Hack.backgroundImage[x]);
			}
		}
		return Hack.backgroundImage;
	};

	Hack.scrollRight = function(x) {
		Hack.defaultParentNode.x = -x;
		Hack.backgroundImage.forEach(function(item) {
			if (item.x + item.parentNode.x <= -32) {
				item.x += game.width + 32;
			}
		});
		game.rootScene.childNodes.forEach(function(item) {
			if (Hack.defaultParentNode && item !== Hack.defaultParentNode
				&& item._element === undefined) {
				game.rootScene.addChild(item);
			}
		});
	};

	Hack.pressStartKey = function(keyString) {
		var keyCode = keyString.charCodeAt(0);
		game.keyunbind(binded_key, 'a');
		game.keybind(keyCode, 'a');
		binded_key = keyCode;
	};

	game.on('abuttondown', function(event) {
		if (Hack.started) return;
		Hack.dispatchEvent(new enchant.Event('pressstart'));
	});

});
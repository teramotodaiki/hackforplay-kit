window.addEventListener('load', function() {

	var game = enchant.Core.instance;
	game.preload(['resources/BGM.mp3','enchantjs/x2/map1.png','enchantjs/x2/map0.png','enchantjs/chara1.png','enchantjs/bigmonster1.gif','enchantjs/bigmonster2.gif','enchantjs/monster1.gif','enchantjs/monster2.gif','enchantjs/monster3.gif', 'enchantjs/monster4.gif','enchantjs/monster7.gif','hackforplay/enchantbook.png']);

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

	BGM = 'resources/BGM.mp3';

	game.onload = game.onload || function() {
		Hack.pressStartKey(' ');
		Hack.defaultParentNode = new enchant.Group(); // prepear to scroll
		var map = new enchant.Map(32, 32);
		map.image = game.assets['enchantjs/x2/map1.png'];

		if(game.assets[BGM] !== undefined){
			if(game.assets[BGM].src){
				game.assets[BGM].play();
				game.assets[BGM].src.loop = true;
			}
		}		

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

		Hack.player = Hack.createMovingSprite(32,32, {
			x: 210, y: 160,
			image: game.assets['enchantjs/chara1.png'],
			frame: [0,0,0,1,1,1,2,2,2],
		});

		Hack.player.hp = 5; // player's hit point
		Hack.player.size = 1;
		Hack.player.isDamaged = false; // damaged flag
		Hack.monster = [];
		// Hack.monster[1] = makeMonster1( 100, 150);
		// Hack.monster[2] = makeMonster1( 10, 30);
		// Hack.monster[3] = makeMonster2( 250, 100);
		// Hack.monster[4] = makeMonster2( 120, 180);
		// Hack.monster[5] = makeMonster2( 20, 150);

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
					'//出現頻度は低いほどたくさん出てくるようになるぞ！\n'+
					'//(でも0以下からは効果が変わらないぞ！)\n';

		// 最初のラベル
		Hack.pressStartLabel = Hack.createLabel('スペースキーを押してスタート', {
			x: 150, y: 150, width: 400
		});
		Hack.howtoLabel = Hack.createLabel('                            [遊び方]<br>'+
											'このゲームは弱肉強食の世の中を再現しようとして作ったゲームです<br>'+
											'自分より小さいものは食べれて、己の糧となりますが、<br>'+
											'逆に大きいものには食べられます。<br>'+
											'一番最初はスライムしか食べられませんが、最後はドラゴンなども食べれるようになってます。<br>'+
											'まぁ...やってみりゃわかるってことよっ！！<br><br>'+
											'                [捕食できるサイズ]<br>'+
											'サイズ   1.0            2.0          3.5      6.5          10              20<br>'+
											'         スライム → いもむし → くも → さそり → ドラゴン → デーモン',
											{
												x: 70, y: 10, color: 'blue', width:400,
												defaultParentNode: game.rootScene									
											});		
	};

	Hack.onpressstart = Hack.onpressstart || function() {
		Hack.started = true;

		Hack.defaultParentNode.removeChild(Hack.pressStartLabel);
		game.rootScene.removeChild(Hack.pressStartLabel);
		Hack.defaultParentNode.removeChild(Hack.howtoLabel);
		game.rootScene.removeChild(Hack.howtoLabel);		


		Hack.player.parentNode.addChild(Hack.player); // bring to the front
		// {defaultParentNode: game.rootScene} means no-scroll
		Hack.hpLabel = Hack.createLabel('HP: ', {
			x: 10, y: 250, color: 'black',
			defaultParentNode: game.rootScene
		});
		Hack.sizeLabel = Hack.createLabel('サイズ: ', {
			x: 10, y: 270, color: 'black',
			defaultParentNode: game.rootScene
		});
		Hack.timeLabel = Hack.createLabel('タイム: ', {
			x: 10, y: 290, color: 'black',
			defaultParentNode: game.rootScene
		});
		Hack.hpLabel.onenterframe = function() {
			this.text = 'HP:' + Hack.player.hp;
		}
		Hack.sizeLabel.onenterframe = function(){
			this.text = 'サイズ:' + Hack.player.size.toFixed(1);//toFixed(1)で小数点第1位まで表わす
		}
		Hack.timeLabel.onenterframe = function(){
			this.text = 'タイム:' + parseInt(game.frame/game.fps);
		}
		// move and jump
		Hack.player.on('enterframe', function(event) {
			if (game.input.up) {
				this.y -= 2;
			}
			if(game.input.down)
			{
				this.y += 2;
			}
			if (game.input.left) {
				this.x -= 2;
				this.scaleX = -(0.8+Hack.player.size/5);
			}
			if(game.input.right)
			{
				this.x += 2;
				this.scaleX = +(0.8+Hack.player.size/5);
			}			
		});
	};
	game.onenterframe = game.onenterframe || function() {
		if (!Hack.started) return; // game started and running flag


		// goal (player.x becomes more than {Number})
		if (Hack.player.x >= 3000) {
			Hack.gameclear();
			Hack.started = false;
		}

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
		if(game.frame%(scopion_encounter+1) == 0)
		{
			var clone = new Scorpion();
			clone.ran = Math.floor( Math.random() * 2 );
			clone.x = (clone.ran%2 == 0)?-50:500;
			clone.y = Math.random()*250;
			clone.speed += Math.random()*2;
			Hack.monster.push(clone);
		}

		if(dragon_encounter <= 0)dragon_encounter = 1;
		if(game.frame%(dragon_encounter+1) == 0)
		{
			var clone = new Dragon();
			clone.ran = Math.floor( Math.random() * 2 );
			clone.x = (clone.ran%2 == 0)?-50:500;
			clone.y = Math.random()*250;
			clone.speed += Math.random()*2;
			Hack.monster.push(clone);
		}

		 if(daemon_encounter <= 0)daemon_encounter = 1;
		 if(game.frame%(daemon_encounter+1) == 0)
		 {
		 	var clone = new Daemon();
		 	clone.ran = Math.floor( Math.random() * 2 );
		 	clone.x = Math.random()*400;
		 	clone.y = Math.random()*170;
		 	Hack.monster.push(clone);
		 }

		//Hack.player.scaleX = 0.8+Hack.player.size/5;
		Hack.player.scaleY = 0.8+Hack.player.size/5;

		// scroll
		//Hack.scrollRight(Hack.player.x - 64);

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
					}
					else
					{
						Hack.player.hp--; // ouch!!
						Hack.player.isDamaged = true; // damaged (flashing) flag

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
					return;
				}

				if(Hack.monster[i].ran%2 == 0)//ranの値が0だったら時
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
			// Hack.monster.forEach(function(enemy) {
			// 	// collision detection
			// 	if (Hack.player.within(enemy, 20+Hack.player.size))//当たり判定 
			// 	{
			// 		if(Hack.player.size >= enemy.size)
			// 		{
			// 			Hack.player.size += enemy.size/10;
			// 			Hack.defaultParentNode.removeChild(enemy);
			// 			game.rootScene.removeChild(enemy);
			// 			Hack.monster.splice(enemy,1);//何故かたまに生きてるやつで判定なくなるやついる
			// 		}
			// 		else
			// 		{
			// 			Hack.player.hp--; // ouch!!
			// 			Hack.player.isDamaged = true; // damaged (flashing) flag

			// 			if (Hack.player.hp <= 0) {
			// 				// R.I.P
			// 				Hack.gameover();
			// 				Hack.started = false;
			// 				Hack.player.onenterframe = null; // remove 'onenterframe'
			// 				Hack.player.tl.fadeOut(10);
			// 			} else {
			// 				// still living
			// 				var saveFrame = Hack.player._originalFrameSequence; // ~= player.frame
			// 				Hack.player.frame = [-1, -1, 1, 1]; // flashing (-1: invisible)

			// 				window.setTimeout(function() {
			// 					// 3 秒たったら...
			// 					Hack.player.isDamaged = false;
			// 					Hack.player.frame = saveFrame; // walking animation
			// 				}, 3000);
			// 			}
			// 		}
			// 		return;
			// 	}

			// 	if(enemy.ran%2 == 0)//ranの値が0だったら時
			// 	{
			// 		if(enemy.x > 450)//x座標が450を超えた(画面外に出た)モンスターを削除
			// 		{
			// 			Hack.defaultParentNode.removeChild(enemy);
			// 			game.rootScene.removeChild(enemy);
			// 			Hack.monster.splice(enemy,1);//何故かたまに生きてるやつで判定なくなるやついる						
			// 		}
			// 	}
			// 	else
			// 	{
			// 		if(enemy.x < -50)//x座標が0を下回った(画面外に出た)モンスターを削除
			// 		{
			// 			Hack.defaultParentNode.removeChild(enemy);
			// 			game.rootScene.removeChild(enemy);
			// 			Hack.monster.splice(enemy,1);//何故かたまに生きてるやつで判定なくなるやついる		
			// 		}
			// 	}
			// });
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
			Hack.defaultParentNode.addChild(this)
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

	//----------------------------------------------------------------------
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
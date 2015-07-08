//actionpuzzlea.js
window.addEventListener('load', function() {

	var game = enchant.Core.instance;
	// New Resourses : 
	game.preload(['enchantjs/x2/map2.png', 'hackforplay/dot_syuj.png', 'enchantjs/x2/icon0.png', 'free-resource/SC-Door-Entce03.png',
		 'free-resource/asa_no_komorebi.mp3']);

	var binded_key = ' '.charCodeAt(0);
	game.keybind(binded_key, 'a'); // aボタンはスペースキー

	BGM = 'free-resource/asa_no_komorebi.mp3';

	Hack.textarea.backgroundColor = 'rgba(0,20,40,0.5)';
	// ====> 改造コードへ
	Hack.restagingCode = "";
	/*
	"game.preload(['enchantjs/x2/map2.png', 'enchantjs/x1.5/chara0.png', 'enchantjs/monster1.gif', 'hackforplay/enchantbook.png']);\n"+
	"\n"+
	"// ゲームが開始されたときに呼ばれるイベント\n"+
	"game.onload = function() {\n"+
	"\tHack.pressStartKey(' ');\n"+
	"\tHack.defaultParentNode = new enchant.Group(); // スクロールの準備\n"+
	"\tgame.rootScene.addChild(Hack.defaultParentNode); // スクロールの準備\n"+
	"\n"+
	"\tHack.createScrollMap([\n"+
	"\t\t[22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22],\n"+
	"\t\t[21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21],\n"+
	"\t\t[20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20],\n"+
	"\t\t[19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],\n"+
	"\t\t[18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18],\n"+
	"\t\t[18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18],\n"+
	"\t\t[18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18],\n"+
	"\t\t[18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18],\n"+
	"\t\t[18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18],\n"+
	"\t\t[ 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]\n"+
	"\t]);\n"+
	"\n"+
	"\t// プレイヤーを作成\n"+
	"\tHack.player = Hack.createMovingSprite(48, 48, {\n"+
	"\t\tx: 64, y: 160,\n"+
	"\t\timage: game.assets['enchantjs/x1.5/chara0.png'],\n"+
	"\t\tframe: [25, 25, 25, 24, 24, 24, 25, 25, 25, 26, 26, 26],\n"+
	"\t\tuseGravity: true, useGround: true, footHeight: 48\n"+
	"\t});\n"+
	"\tHack.player.hp = 3; // プレイヤーのHP\n"+
	"\tHack.player.isDamaged = false;\n"+
	"\n"+
	"\t// モンスターを出現させる\n"+
	"\tHack.monster = [];\n"+
	"\t//                               X,   Y\n"+
	"\tHack.monster[0] = makeMonster( 400, 154);\n"+
	"\tHack.monster[1] = makeMonster( 800, 154);\n"+
	"\tHack.monster[2] = makeMonster(1200, 154);\n"+
	"\tHack.monster[3] = makeMonster(1600, 154);\n"+
	"\tHack.monster[4] = makeMonster(2000, 154);\n"+
	"\tHack.monster[5] = makeMonster(2400, 154);\n"+
	"\t// 魔道書\n"+
	"\tHack.enchantBookIcon = Hack.createSprite(64, 64, {\n"+
	"\t\timage: game.assets['hackforplay/enchantbook.png'],\n"+
	"\t\tdefaultParentNode: game.rootScene,\n"+
	"\t\tontouchend: function() {\n"+
	"\t\t\tHack.openEditor(); // エディタを開く\n"+
	"\t\t}\n"+
	"\t});\n"+
	"\t// 魔道書の中身\n"+
	"\tHack.hint = 'Hack.player.velocity.x += 1; // 加速!!';\n"+
	"\n"+
	"\t// 最初のラベル\n"+
	"\tHack.pressStartLabel = Hack.createLabel('スペースキーを押してスタート<br>↑キーでジャンプ', {\n"+
	"\t\tx: 120, y: 160, width: 400\n"+
	"\t});\n"+
	"};\n"+
	"\n"+
	"// スタート（スペースキー）を押したときに呼ばれるイベント\n"+
	"Hack.onpressstart = function() {\n"+
	"\tHack.started = true;\n"+
	"\n"+
	"\tHack.player.parentNode.addChild(Hack.player); // 手前に持ってくる\n"+
	"\t// HPラベル\n"+
	"\t// defaultParentNode: game.rootScene と追加することで、スクロールしないようにしている\n"+
	"\tHack.hpLabel = Hack.createLabel('HP: ', {\n"+
	"\t\tx: 400, y: 20, color: 'black',\n"+
	"\t\tdefaultParentNode: game.rootScene\n"+
	"\t});\n"+
	"\tHack.hpLabel.onenterframe = function() {\n"+
	"\t\tthis.text = 'HP: ' + Hack.player.hp;\n"+
	"\t};\n"+
	"\n"+
	"\t// プレイヤーの動きの処理\n"+
	"\tHack.player.velocity.x = 4; // プレイヤーの速さ\n"+
	"\tHack.player.on('enterframe', function(event) {\n"+
	"\t\tif (game.input.up && this.y + this.footHeight >= Hack.groundHeight) {\n"+
	"\t\t\tthis.velocity.y = -14; // ジャンプする速さ\n"+
	"\t\t}\n"+
	"\t});\n"+
	"};\n"+
	"\n"+
	"// ゲーム実行中、毎フレーム呼び出されるイベント\n"+
	"game.onenterframe = function() {\n"+
	"\tif (!Hack.started) return; // ゲームが始まっているかどうかフラグ\n"+
	"\n"+
	"\t// ゴール (プレイヤーの位置が、右の数値を超えたら)\n"+
	"\tif (Hack.player.x >= 3000) {\n"+
	"\t\tHack.gameclear();\n"+
	"\t\tHack.started = false;\n"+
	"\t}\n"+
	"\n"+
	"\t// プレイヤーを基準にして、画面をスクロールさせる\n"+
	"\tHack.scrollRight(Hack.player.x - 64);\n"+
	"\n"+
	"\t// ダメージを受ける処理\n"+
	"\tif (!Hack.player.isDamaged) {\n"+
	"\t\tHack.monster.forEach(function(enemy) {\n"+
	"\t\t\t// 当たり判定\n"+
	"\t\t\tif (Hack.player.within(enemy, 20)) {\n"+
	"\t\t\t\tHack.player.hp--; // いてっ!! HPが減る\n"+
	"\t\t\t\tHack.player.isDamaged = true; // ダメージを受けて点滅するフラグ\n"+
	"\n"+
	"\t\t\t\tif (Hack.player.hp <= 0) {\n"+
	"\t\t\t\t\t// R.I.P (安らかに眠りたまえ…)\n"+
	"\t\t\t\t\tHack.gameover(); // ゲームオーバー\n"+
	"\t\t\t\t\tHack.started = false;\n"+
	"\t\t\t\t\tHack.player.onenterframe = null; // 'onenterframe'を消して動かないようにする\n"+
	"\t\t\t\t\tHack.player.tl.fadeOut(10); // ゆっくり消える\n"+
	"\t\t\t\t} else {\n"+
	"\t\t\t\t\t// まだ生きている場合\n"+
	"\t\t\t\t\tvar saveFrame = Hack.player._originalFrameSequence; // ~= player.frame\n"+
	"\t\t\t\t\tHack.player.frame = [-1, -1, 24, 24]; // 点滅 (-1: 透明)\n"+
	"\n"+
	"\t\t\t\t\twindow.setTimeout(function() {\n"+
	"\t\t\t\t\t\t// 3 秒たったら...\n"+
	"\t\t\t\t\t\tHack.player.isDamaged = false;\n"+
	"\t\t\t\t\t\tHack.player.frame = saveFrame; // ~= player.frame を復帰\n"+
	"\t\t\t\t\t}, 3000);\n"+
	"\t\t\t\t}\n"+
	"\t\t\t\treturn;\n"+
	"\t\t\t}\n"+
	"\t\t});\n"+
	"\t}\n"+
	"};\n"+
	"\n"+
	"// 新しくモンスターをつくる関数\n"+
	"function makeMonster ( _x, _y, _frame, _useGravity, _useGround, _footHeight) {\n"+
	"\treturn Hack.createMovingSprite(48, 48, {\n"+
	"\t\tx: _x || 0, y: _y || 0,\n"+
	"\t\timage: game.assets['enchantjs/monster1.gif'],\n"+
	"\t\tframe: _frame || [2, 2, 2, 3, 3, 3],\n"+
	"\t\tuseGravity: _useGravity || true,\n"+
	"\t\tuseGround:  _useGround  || true,\n"+
	"\t\tfootHeight: _footHeight || 32\n"+
	"\t});\n"+
	"}\n"+
	"\n"+
	"\n"+
	"// 設定やクラス\n"+
	"Hack.groundHeight = 32 * 6; // Y=0から地面までの高さ（６マス分）\n"+
	"Hack.gravity = { x: 0, y: 1 }; // 重力の大きさ\n"+
	"\n"+
	"// enchant.Spriteを継承して、動くようにしたクラス\n"+
	"Hack.MovingSprite = enchant.Class.create(enchant.Sprite, {\n"+
	"\tinitialize: function(width, height) {\n"+
	"\t\tenchant.Sprite.call(this, width, height);\n"+
	"\t\tthis.velocity = { x: 0, y: 0 };\n"+
	"\t},\n"+
	"\tonenterframe: function() {\n"+
	"\t\t// 重力の影響をうけて速度(velocity)がかわる処理\n"+
	"\t\tif (this.useGravity) {\n"+
	"\t\t\tthis.velocity.x += Hack.gravity.x;\n"+
	"\t\t\tthis.velocity.y += Hack.gravity.y;\n"+
	"\t\t}\n"+
	"\t\t// 速度の分だけ動く\n"+
	"\t\tthis.moveBy(this.velocity.x, this.velocity.y);\n"+
	"\t\t// 地面に足がついたときの処理\n"+
	"\t\tif (this.useGround) {\n"+
	"\t\t\tvar foot = this.y + (this.footHeight || this.height); // 足の高さ\n"+
	"\t\t\tif (foot >= Hack.groundHeight) {\n"+
	"\t\t\t\tthis.y = Hack.groundHeight - (this.footHeight || this.height); // 足をつく\n"+
	"\t\t\t\tthis.velocity.y = 0; // 足がついたのでYの速さを0にする\n"+
	"\t\t\t}\n"+
	"\t\t}\n"+
	"\t}\n"+
	"});\n"+
	"// MovingSpriteのオブジェクトをつくるメソッド\n"+
	"Hack.createMovingSprite = function(width, height, prop) {\n"+
	"\treturn (function () {\n"+
	"\t\t// @ new Hack.MovingSprite()\n"+
	"\t\tif (prop) {\n"+
	"\t\t\tObject.keys(prop).forEach(function(key) {\n"+
	"\t\t\t\tthis[key] = prop[key];\n"+
	"\t\t\t}, this);\n"+
	"\t\t}\n"+
	"\t\tif (Hack.defaultParentNode) {\n"+
	"\t\t\tHack.defaultParentNode.addChild(this);\n"+
	"\t\t}\n"+
	"\t\treturn this;\n"+
	"\n"+
	"\t}).call(new Hack.MovingSprite(width, height));\n"+
	"};\n";
	*/

	var input = 
	{
		x: 0,
		y: 0
	};

	var cam = 
	{
		x: 0,
		y: 0,
	}

	touchX=0,touchY=0;
	touchMode = 'Induction';// 'Induction' or 'Create'
	makeCounter = 0;

	game.onload = game.onload || function() {
		Hack.pressStartKey(' ');
		Hack.defaultParentNode = new enchant.Group(); // prepear to scroll
		if(game.assets[BGM] !== undefined){
			if(game.assets[BGM].src){
				game.assets[BGM].play();
				game.assets[BGM].src.loop = true;
			}
		}
		Hack.monster = [];
		Hack.Blocks = [];

		Hack.createScrollMap([
			[22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22],
			[21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21],
			[20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20],
			[19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19],
			[18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18],
			[18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18],
			[18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18],
			[18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18],
			[18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18],
			[18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18]
		]);

		Hack.MapBlocks([
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1, 4,-1,-1, 0, 0, 0,-1,-1, 4,-1,-1,-1],
			[ 4, 4, 4, 3,10,10,10,10,10,10,10, 3, 4, 4, 4]
		], Hack.Blocks);

		Hack.width = 32 * 15;
		Hack.height = 32 * 10;

		Hack.goal = Hack.createMovingSprite(96, 64, {
			x: 32 * 12, y: 32 * 7,
			image: game.assets['free-resource/SC-Door-Entce03.png'],
			frame: [0],
			useGravity: false, useGround: false, useInput: false, useInduction: false
		});

		Hack.key = Hack.createMovingSprite(32, 32, {
			x: 32 * 7, y: 32 * 2,
			image: game.assets['enchantjs/x2/icon0.png'],
			frame: [33],
			useGravity: false, useGround: false, useInput: false, useInduction: false
		});

		Hack.key.rotate(180);

		Hack.getkey = false;

		Hack.player = Hack.createMovingSprite(40, 56, {
			x: 64, y: 0,
			image: game.assets['hackforplay/dot_syuj.png'],
			frame: [7],
			useGravity: true, useGround: true, useInput: false, useInduction: true, footHeight: 54, headHeight: 12,
		});

		//'free-resource/SC-Door-Entce03.png'
		Hack.player.hp = 1; // player's hit point
		Hack.player.isDamaged = false; // damaged flag
		touchX = Hack.player.x;
		touchY = 300;
		
		game.rootScene.addEventListener('touchstart', function(e){
			touchX = e.localX + cam.x;
			touchY = e.localY + cam.y;
			boolCollided = false;
			touchMode = 'Create';
			if( ( (parseInt(touchX/32) * 32 >= Hack.player.x + 6 && parseInt(touchX/32) * 32 <= Hack.player.x - 6 + Hack.player.width) ||
			 	( (parseInt(touchX/32)+1) * 32 >= Hack.player.x + 6 && (parseInt(touchX/32)+1) * 32 <= Hack.player.x - 6 + Hack.player.width) || 
			 	( parseInt(touchX/32) * 32 <= Hack.player.x + 6 && (parseInt(touchX/32)+1) * 32 >= Hack.player.x + 6) ) &&
				( (parseInt(touchY/32) * 32 >= Hack.player.y - Hack.player.headHeight && parseInt(touchY/32) * 32 <= Hack.player.y + Hack.player.footHeight) || 
				( (parseInt(touchY/32)+1) * 32 >= Hack.player.y - Hack.player.headHeight && (parseInt(touchY/32)+1) * 32 <= Hack.player.y + Hack.player.footHeight) ) ){
				touchMode = 'Induction';
				boolCollided = true;
			}
			else if( ( (parseInt(touchX/32) * 32 >= Hack.goal.x + 1 && parseInt(touchX/32) * 32 <= Hack.goal.x + Hack.goal.width - 1) ||
			 	(parseInt(touchX/32)+1) * 32 >= Hack.goal.x + 1 && (parseInt(touchX/32)+1) * 32 <= Hack.goal.x + Hack.goal.width - 1) &&
				( (parseInt(touchY/32) * 32 >= Hack.goal.y + 1 && parseInt(touchY/32) * 32 <= Hack.goal.y + Hack.goal.height - 1) || 
				( (parseInt(touchY/32)+1) * 32 >= Hack.goal.y + 1 && (parseInt(touchY/32)+1) * 32 <= Hack.goal.y + Hack.goal.height - 1) ) ){
				boolCollided = true;
			}
				Hack.Blocks.forEach(function(item) {
					if(touchX >= item.x && touchX <= item.x + item.width &&
						touchY >= item.y && touchY <= item.y + item.height){
						for(var i = 0;i < Hack.Blocks.length;i++){
							if(item.x === Hack.Blocks[i].x && item.y === Hack.Blocks[i].y && item.frame <= 1){
								Hack.Blocks.splice(i, 1);
								Hack.defaultParentNode.removeChild(item);
								makeCounter++;
								break;
							}
						}
						boolCollided = true;
					}
				});
			if(!boolCollided && makeCounter >= 1 && touchMode === 'Create'){
				var B_obj = makeWall(32 * parseInt(touchX / 32), 32 * parseInt(e.localY / 32) );
				Hack.Blocks.push(B_obj);	
				makeCounter--;
			}
		});
		game.rootScene.addEventListener('touchend', function(e){
			touchX = Hack.player.x + Hack.player.width / 2;
			touchY = Hack.height;
		});
		game.rootScene.addEventListener('touchmove', function(e){
			touchX = e.localX + cam.x;
			touchY = e.localY + cam.y;
		});

		Hack.goal.on('enterframe', function(event) {
			if(Hack.goal.x + Hack.goal.width/2 >= Hack.player.x + 6 && Hack.goal.x + Hack.goal.width/2 <= Hack.player.x + Hack.player.width - 6 && 
				Hack.goal.y + Hack.goal.height/2 >= Hack.player.y + Hack.player.headHeight && 
				Hack.goal.y + Hack.goal.height/2 <= Hack.player.y + Hack.player.footHeight && Hack.player.OnBlocks && Hack.getkey){
				game.assets[BGM].stop();
				Hack.player.useInput = false;
				Hack.player.useInduction = false;
				Hack.player.velocity.x = 0;
				Hack.player.velocity.y = 0;
				Hack.player.x = Hack.goal.x + Hack.goal.width/2 - Hack.player.width/2;
				Hack.player.frame = [9,9,9,10,10,10,11,11,11,10,10,10];
				Hack.player.tl.fadeOut(20);
				Hack.gameclear();
			}

		});

		Hack.key.on('enterframe', function(event) {
			if(Hack.key.x + Hack.key.width/2 >= Hack.player.x + 6 && Hack.key.x + Hack.key.width/2 <= Hack.player.x + Hack.player.width - 6 && 
				Hack.key.y + Hack.key.height/2 >= Hack.player.y + Hack.player.headHeight && 
				Hack.key.y + Hack.key.height/2 <= Hack.player.y + Hack.player.footHeight){
				Hack.getkey = true;
				Hack.goal.frame = [0,0,0,0,4,4,4,4,8,8,8,8,12,null];
				Hack.defaultParentNode.removeChild(Hack.key);
			}

		});

		Hack.player.on('enterframe',function(){
			if(Hack.player.x > 256 && Hack.player.x < Hack.width - 256){
		   		cam.x = Hack.player.x - 256;
	  	 	}
		   	else if(Hack.player.x <= 256){
				cam.x = 0;
		   	}
		   	if(Hack.player.y < Hack.height - 160 && Hack.player.y > 160){
		   		cam.y = Hack.player.y - 160;
		   	}
		   	else {
		   		cam.y = 0;
		    }
		});
		// 魔道書
		/*
		Hack.enchantBookIcon = Hack.createSprite(64, 64, {
			image: game.assets['hackforplay/enchantbook.png'],
			defaultParentNode: game.rootScene,
			ontouchend: function() {
				Hack.openEditor();
			}
		});
		*/
		// 魔道書の中身
		Hack.hint = 'null';
	};

	Hack.onpressstart = Hack.onpressstart || function() {
		Hack.started = true;

		Hack.player.parentNode.addChild(Hack.player); // bring to the front
		// {defaultParentNode: game.rootScene} means no-scroll
		/*
		Hack.hpLabel = Hack.createLabel('HP: ', {
			x: 400, y: 20, color: 'black',
			defaultParentNode: game.rootScene
		});
		Hack.hpLabel.onenterframe = function() {
			this.text = 'HP: ' + Hack.player.hp;
		};
		*/
		// move and jump
		//Hack.player.velocity.x = 0;
	};

	game.onenterframe = game.onenterframe || function() {
		//if (!Hack.started) return; // game started and running flag
		// goal (player.x becomes more than {Number})
		if(game.assets[BGM] !== undefined){
			if(!game.assets[BGM].src){
				game.assets[BGM].play();
			}
		}

		game.rootScene.x = -1 * cam.x;
		game.rootScene.y = 1 + cam.y;

		/*
		if (Hack.player.x >= 3000) {
			Hack.gameclear();
			Hack.started = false;
		}
		*/
		// scroll
		//Hack.scrollRight(Hack.player.x - 64);
		/*damage
		if (!Hack.player.isDamaged) {
			Hack.monster.forEach(function(enemy) {
				// collision detection
				if (Hack.player.within(enemy, 20)) {
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
						Hack.player.frame = [-1, -1, 24, 24]; // flashing (-1: invisible)

						window.setTimeout(function() {
							// 3 秒たったら...
							Hack.player.isDamaged = false;
							Hack.player.frame = saveFrame; // walking animation
						}, 3000);
					}
					return;
				}
			});
		}*/
	};

	// Environments and classes
	//Hack.groundHeight = 32 * 10; // define ground distance from Y=0
	Hack.gravity = { x: 0, y: 1 };
	Hack.MovingSprite = enchant.Class.create(enchant.Sprite, {
		initialize: function(width, height) {
			enchant.Sprite.call(this, width, height);
			this.useInput = false;
			this.useInduction = false;
			this.OnGround = false;
			this.OnBlocks = false;
			this.OnY = 0;
			this.velocity = { x: 0, y: 0 };
		},
		onenterframe: function() {
			var obj = this;
			obj.OnBlocks = false;

			Hack.Blocks.forEach(function(item) {
				if(Math.abs(obj.x+6-item.x) <= (obj.width-12+item.width)/2 &&
					Math.abs(obj.y+obj.headHeight-item.y) <= (obj.footHeight+item.height)/2){
					if( (obj.x + obj.width/4*3 > item.x && obj.x + obj.width/4 < item.x + item.width) && 
						obj.y + obj.footHeight >= item.y + item.width/2 && obj.y < item.y - item.height/2 &&  item.frame === 10){
							obj.hp--;
							obj.tl.fadeOut(5);
							//game.rootScene.addEventListener('touchstart',function(){});
							Hack.gameover();
					}
					if(obj.y + obj.footHeight >= item.y && obj.y < item.y - item.height){	
						if(( (obj.x + obj.width/4*3 > item.x && obj.x + obj.width/4 < item.x + item.width) ||
							(item.series === 3 || (obj.x < item.x && item.series === 1) || (obj.x > item.x && item.series === 2)) ) && item.frame !== 10){
							obj.OnBlocks = true;
							obj.velocity.y = 0;
							obj.OnY = item.y;
							obj.y = item.y - obj.footHeight;
						}
						else if(item.frame !== 10){
							obj.OnBlocks = false;
							if(obj.x < item.x){
								obj.velocity.x = 0;
								obj.x = item.x - obj.width + 6;
							}
							else{
								obj.velocity.x = 0;
								obj.x = item.x + item.width - 6;
							}
						}
					}
					else if(obj.x + obj.width - 6 >= item.x && obj.x + obj.width <= item.x + 10){
						obj.velocity.x = 0;
						obj.x = item.x - obj.width + 6;
					}
					else if(obj.x + 6 <= item.x + item.width && obj.x >= item.x + item.width - 10){
						obj.velocity.x = 0;
						obj.x = item.x + item.width - 6;
					}
					else if(obj.y + obj.headHeight <= item.y + item.height && obj.y > item.y){
						obj.velocity.y = 0;
						obj.y = item.y + item.height - obj.headHeight;
					}
				}
			});

			if (this.useGround) {
				this.velocity.x += Hack.gravity.x;
				this.velocity.y += Hack.gravity.y;
				var foot = this.y + (this.footHeight || this.height);
				if (foot >= Hack.height) {
					this.OnGround = true;
					this.y = Hack.height - (this.footHeight || this.height);
					this.velocity.y = 0;
				}
				if (this.x < 0) {
					this.x = 0;
					this.velocity.x = 0;
				}
				if (this.x + this.width >= Hack.width) {
					this.x = Hack.width - this.width;
					this.velocity.x = 0;
				}
				if(this.OnBlocks){
					this.y = this.OnY - this.footHeight;
					this.velocity.y = 0;
				}
			}
			// get a foot on the ground
			
			if(this.useInput){
				if (game.input.up && (this.OnGround || this.OnBlocks) ){
					this.OnBlocks = false;
					this.OnGround = false;
					this.velocity.y = -10;
				}
    	   		if(game.input.right){
        			this.velocity.x = 3;
   		       		this.frame = 7;
   		       	}
    	   	   	else if(game.input.left){
   		       		this.velocity.x = -3;
   		       		this.frame = 4;
		       	}
		       	else{
		       		this.velocity.x = 0;
		       	}
	    	}

	    	if(this.useInduction && touchMode === 'Induction'){
	    		if(this.y + this.headHeight > touchY && (this.OnGround || this.OnBlocks) ){
	    			this.OnBlocks = false;
					this.OnGround = false;
					this.velocity.y = -10;
	    		}
	    		if(this.x + this.width < touchX){
	    			this.velocity.x = 3;
   		       		this.frame = 7;
	    		}
	    		else if(this.x > touchX){
	    			this.velocity.x = -3;
   		       		this.frame = 4;
	    		}
	    		else{
		       		this.velocity.x = 0;
		       	}
	    	}

	    	this.moveBy(this.velocity.x, this.velocity.y);
	    },
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

	function makeWall ( _x, _y, _frame, _useGravity, _useGround, _useInput, _useInduction, _footHeight) {
	    var wall = Hack.createMovingSprite(32, 32, {
		x: _x || 0, y: _y || 0,
		image: game.assets['enchantjs/x2/map2.png'],
		frame: _frame || 0,
		useGravity: _useGravity || false,
		useGround:  _useGround  || false,
		useInput: _useInput || false,
		useInduction: _useInduction || false,
		footHeight: _footHeight || 32
		});
		wall.on('enterframe', function(){
			wall.series = 0;
			if(wall.frame === 1){
				wall.frame = 0;
			}
			if(wall.frame === 3){
				wall.frame = 4;
			}
			Hack.Blocks.forEach(function(item) {
				if(wall.x === item.x){
					if(wall.y - 32 === item.y){
						if(wall.frame === 0)wall.frame = 1;
						if(wall.frame === 4)wall.frame = 3;
					}
				}
				if(wall.y === item.y){
					if(wall.series === 3 || (wall.x - 32 === item.x && wall.series === 2 ) || (wall.x + 32 === item.x && wall.series === 1)){
						wall.series = 3;
					}
					else{
						if(wall.x - 32 === item.x && item.frame !== 10){
							wall.series = 1;
						}
						if(wall.x + 32 === item.x && item.frame !== 10){
							wall.series = 2;
						}
					}
				}
			});
			if(wall.frame === 10){
				wall.series = 0;
			}
		});
		return wall;
	}	
	
	function makeMonster (_x, _y, _frame, _useGravity, _useGround, _useInput, _useInduction, _footHeight) {
		return Hack.createMovingSprite(48, 48, {
			x: _x || 0, y: _y || 0,
			image: game.assets['enchantjs/monster1.gif'],
			frame: _frame || [2, 2, 2, 3, 3, 3],
			useGravity: _useGravity || true,
			useGround: _useGround|| true,
			useInput: _useInput || false,
			useInduction: _useInduction || false,
			footHeight: _footHeight || 32
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
			Hack.backgroundImage[x].image = game.assets['enchantjs/x2/map2.png'];
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

	Hack.MapBlocks = function(map, array){
		for(var x = 0; x < map[0].length; x++){
			for(var y = 0; y < map.length; y++){
				if(map[y][x] >= 0){
					var block = makeWall(32 * x, 32 * y, map[y][x]);
					array.push(block);
				}
			}
		}
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
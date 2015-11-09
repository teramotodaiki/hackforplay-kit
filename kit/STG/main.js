

/*

	Hack.CreateEnchantBook

*/


/*
	
*/
var ShotEvent = function()
{

	// イベントの適用範囲
	this.beginFrame = 0;
	this.endFrame = 0;

}


var Barrage = function()
{


	this.events = [];


}


// Barrage.prototype




var shotEvent = new ShotEvent();




window.addEventListener('load', function () {


	var game = enchant.Core.instance;

	game.preload(['hackforplay/enchantbook.png', 'enchantjs/x2/map2.png', 'hackforplay/dot_syuj.png', 'enchantjs/x2/icon0.png', 'enchantjs/font2.png', 'enchantjs/monster1.gif',
		 'dots_design/bg10_3.gif', 'dot_art_world/SC-Door-Entce03.png', 'rengoku-teien/asa_no_komorebi.mp3', 'etolier/01sougen.jpg']);




	var AddHint = function(text)
	{
		Hack.hint += text + '\n';
	}


	game.onload = game.onload || function() 
	{


		//アナログパッドの生成
		var pad = new APad();
		pad.moveTo(0, 220);

		pad.onenterframe = function()
		{
			_pad.x = this.vx;
			_pad.y = this.vy;


			// キー入力を APad に対応する
			var keyList = [game.input.up, game.input.right, game.input.down, game.input.left];

			// 方向キー
			var keyPad = Vec2(0, 0);

			for(var index in keyList)
			{
				var key = keyList[index];

				if(key)
				{
					// key[index] の方向
					var angle = 2 * Math.PI / 4 * index;

					//var keyVec = Vec2(Math.sin(angle), Math.cos(angle));
					var keyVec = Vec2(0, 0);
					var keyVec = { x: 0, y: 0 };

					keyVec.x = Math.sin(angle) | 0;
					keyVec.y = Math.cos(angle);


					// console.log(index + ' - key pad: ' + Math.sin(angle) + ' / ' + Math.cos(angle2));
					
					console.log(Math.sin(angle) + ' / ' + Math.cos(angle));
					

					keyPad.add(keyVec);
				}

				
			}





		}















		var scene = game.rootScene;
		scene.backgroundColor = '#fff';


        scene.addChild(pad);

        console.log(pad);




		// 魔道書
		Hack.enchantBookIcon = Hack.createSprite(64, 64, 
		{
			image: game.assets['hackforplay/enchantbook.png'],
			defaultParentNode: game.rootScene,
			ontouchend: function() 
			{
				Hack.openEditor();
			}
		});



		// 魔道書の中身
		Hack.hint = '';

		AddHint('// text1');
		AddHint('// text2');
		AddHint('// text3');
		AddHint('// text4');







//		console.log();



		var player = new Player(20, 20);


		player.backgroundColor = '#f00';

		scene.addChild(player);

		console.log(player);




// pad.isTouched == true


	}


	// console.log(Hack);
});



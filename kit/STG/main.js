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




window.addEventListener('load', function()
{


    var game = enchant.Core.instance;

    var input = game.input;



    game.preload(['hackforplay/enchantbook.png', 'enchantjs/x2/map2.png', 'hackforplay/dot_syuj.png', 'enchantjs/x2/icon0.png', 'enchantjs/font2.png', 'enchantjs/monster1.gif',
        'dots_design/bg10_3.gif', 'dot_art_world/SC-Door-Entce03.png', 'rengoku-teien/asa_no_komorebi.mp3', 'etolier/01sougen.jpg'
    ]);



    var AddHint = function(text)
    {
        Hack.hint += text + '\n';
    }


    game.onload = function()
    {


        //アナログパッドの生成
        var pad = new APad();
        pad.moveTo(0, 220);


		console.log(pad);

        pad.onenterframe = function()
        {
            _pad.x = this.vx;
            _pad.y = this.vy;




            // キー入力を APad に対応する
            var keyList = [input.down, input.right, input.up, input.left];


            // 方向キー
            var keyPad = Vec2(0, 0);

            for (var index in keyList)
            {
                var key = keyList[index];

                if (key)
                {
                    // key[index] の方向
                    var angle = Math.PI2 / 4 * index;

                    //var keyVec = Vec2(Math.sin(angle), Math.cos(angle));
                    var keyVec = Vec2(Math.sin(angle) | 0, Math.cos(angle) | 0);


                    keyPad.add(keyVec);
                }

            }



            _pad.add(keyPad);


			_pad.normalize();

			console.log('key pad: ' + _pad.x + ' / ' + _pad.y);

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





        // pad.isTouched == true


    }


    // console.log(Hack);
});

/*

	Hack.CreateEnchantBook

*/

/*
*/



// Barrage.prototype

var shotEvent = new ShotEvent();

window.addEventListener('load', function()
{


    var game = enchant.Core.instance;
    console.log(game);

    sceneSize.width = game.width;
    sceneSize.height = game.height;


    /* var */
    input = game.input;


    var KeyBind = function(keyCode, name)
    {
        game.keybind(keyCode, name);
    }

    KeyBind(16, 'shift');
    KeyBind(90, 'z');




    game.preload(['hackforplay/enchantbook.png', 'enchantjs/x2/map2.png', 'hackforplay/dot_syuj.png', 'enchantjs/x2/icon0.png', 'enchantjs/font2.png', 'enchantjs/monster1.gif',
        'dots_design/bg10_3.gif', 'dot_art_world/SC-Door-Entce03.png', 'rengoku-teien/asa_no_komorebi.mp3', 'etolier/01sougen.jpg'
    ]);



    var AddHint = function(text)
    {
        Hack.hint += text + '\n';
    }


    game.onload = function()
    {

        var padMargin = 10;

        //アナログパッドの生成
        var pad = new APad();
        pad.moveTo(0 + padMargin, 220 - padMargin);


        pad.onenterframe = function()
        {
            _pad.x = this.vx;
            _pad.y = this.vy;

            // 必ず 0.0 ～ 1.0 の範囲
            var aPadLength = _pad.length();

            // キー入力を APad に対応する
            var keys = [input.down, input.right, input.up, input.left];

            // 方向キー全ての入力
            var keyPad = Vec2(0, 0);

            for (var index in keys)
            {
                if (keys[index])
                {
                    // key[index] の方向
                    var angle = Math.PI2 / 4 * index;
                    var keyVec = Vec2(Math.sin(angle) | 0, Math.cos(angle) | 0);

                    keyPad.add(keyVec);
                }

            }


            // APad に KeyPad を加算して正規化
            _pad.add(keyPad).normalize();



            // 低速キー || APad の押し込みが少ない
            if (input.shift || (pad.isTouched && aPadLength < 0.5))
            {
                _pad.scale(0.5);
            }


            console.log(game._actualFps);

        }





        scene = game.rootScene;
        scene.backgroundColor = '#fff';


        scene.addChild(pad);




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

        AddHint('player.speed = 1;');
        AddHint('// text2');
        AddHint('// text3');
        AddHint('// text4');


        //----------// ここからステージ制作 //----------//



        player = new Player(20, 20);
        player.backgroundColor = '#f00';

        player.locate(sceneSize.width / 2, sceneSize.height / 2);

        player.speed = 5;


        barrage.speed = 3;



        player.updateAttackBarrage();



        scene.addChild(player);



    }


    // console.log(Hack);
});

window.addEventListener('load', function()
{



    // 前方宣言した変数の初期化とか
    InitializeGlobalVariable();


    var KeyBind = function(keyCode, name)
    {
        game.keybind(keyCode, name);
    }

    KeyBind(16, 'shift');
    KeyBind(90, 'z');


    game.preload(['hackforplay/enchantbook.png', 'enchantjs/x2/map2.png', 'hackforplay/dot_syuj.png', 'enchantjs/x2/icon0.png', 'enchantjs/font2.png', 'enchantjs/monster1.gif',
        'dots_design/bg10_3.gif', 'dot_art_world/SC-Door-Entce03.png', 'rengoku-teien/asa_no_komorebi.mp3', 'etolier/01sougen.jpg'
    ]);




    game.onload = function()
    {

        // Pad を生成する
        CreatePad();

        // 魔道書
        EnchantBook.Create();
        EnchantBook.PushHint('player.speed = 1;');



        //----------// ここからステージ制作 //----------//


        // プレイヤーを召喚
        player = new Player(20, 20);
        scene.addChild(player);

        player.backgroundColor = '#f00';
        player.locate(sceneSize.width / 2, sceneSize.height / 2);
        player.speed = 5;



        __Barrage.New('通常弾',
        {
            way: 10,
        });


        __Barrage.New('ホーミング弾',
        {

            way: 30,
            speed: 30,

        });

        __Spell.Make('プレイヤースペル')('通常弾', 'ホーミング弾');


        player.setAttackSpell('プレイヤースペル');



        //----------// EasyTimeline のテスト //----------//


        // 敵を召喚
        var e1 = new Enemy(20, 20);
        var e2 = new Enemy(20, 20);

        scene.addChild(e1);
        scene.addChild(e2);


        e1.speed = 1.5;
        e2.speed = 3.0;


        e1.locate(100, 50);
        e2.locate(380, 50);


        // とりあえず easing を短縮
        var quad = enchant.Easing.QUAD_EASEINOUT,
            linear = enchant.Easing.LINEAR;



        // 移動モーションを作成
        Motion.New('m-1').moveBy(30, 30)(1.0).moveBy(-30, 30)(1.0).easing(quad).moveBy(50, 20)(1.0).moveBy(-50, 20)(1.0).easing(linear).moveBy(20, 50)(2.0).moveBy(-20, 50)(2.0);


        // 移動モーションを適用
        e1.__set_motion('m-1');
        e2.__set_motion('m-1');




    }


    // console.log(Hack);
});

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


    Assets.Add('shot-none', 'tenonno-graphic/shot-none.png');
    Assets.Add('shot-normal', 'tenonno-graphic/shot-normal-min.png');



    Assets.Preload();

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
            textureName: 'shot-normal',
            way: 10,
            speed: 5,
            size: 20,
        }).shotControl(function()
        {

            this.angle.add(2);
        });


        __Barrage.New('ホーミング弾',
        {
            rangeAngle: 10,
            createFrame: 8,
            way: 8,
            speed: 10,
            targetType: 'enemy',

            size: 5,
        }).control(function()
        {

            // 一番近い標的を見つける
            var target = CharacterList.GetNear(this.creator, this.targetType);

            // 軸を標的の方向に
            this.setAxisFromTarget(target);

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
        Motion.New('m-1').moveBy(30, 30)(1.0).moveBy(-30, 30)(1.0).easing(quad).moveBy(50, 20)(1.0).moveBy(-50, 20)(1.0).easing(linear).moveBy(20, 50)(2.0).moveBy(-20, 50)(2.0).remove();

        // 移動モーションを適用
        e1.setMotion('m-1');
        e2.setMotion('m-1');




    }


    // console.log(Hack);
});
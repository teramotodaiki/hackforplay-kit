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


        /*
            50px の間隔で 2 つの弾を 0.0 度に放つ
        */
        __Barrage.New('player-normal',
        {
            textureName: 'shot-normal',
            createTime: 0.15,
            way: 1,
            speed: 20,
            size: 20,
            targetType: 'enemy',
            axisAngle: 0,
            repeatX: 2,
            repeatSpaceX: 50
        });



        __Barrage.New('10way弾',
        {
            textureName: 'shot-normal',
            way: 10,
            speed: 5,
            size: 20,
            createPos: 50
        }).shotControl(function()
        {


            this.angle.add(2);
        });


        __Barrage.New('ホーミング弾',
        {
            textureName: 'shot-normal',
            rangeAngle: 10,
            createTime: 10.2,
            way: 8,
            speed: 10,
            targetType: 'player',

            size: 5,
        }).control(function()
        {

            // 一番近い標的を見つける
            var target = CharacterList.GetNear(this.creator, this.targetType);

            // 軸を標的の方向に
            this.setAxisFromTarget(target);

        });



        __Barrage.New('テスト',
        {
            textureName: 'shot-normal',
            createTime: 1,
            way: 30,
            rangeAngle: 340,
        }).control(function()
        {
            // 弾を生成する度に 20 度追加する
            if (this.count % this.createFrame === 0)
            {
                this.axisAngle += 20;


            }
        }).shotControl(function()
        {

            if (this.count % 20 === 0)
            {
                this.Color(this.frame + 1);
            }

        });




        /*
            10 方向に 6 度の間隔を開けた 3 つの弾を放つ
        */
        __Barrage.New('10way-r3',
        {
            textureName: 'shot-normal',
            way: 6,
            repeat: 3,
            repeatAngle: 6
        });


        __Spell.Make('10way-r3')('10way-r3');


        __Spell.Make('プレイヤースペル')('10way弾', 'ホーミング弾', 'テスト');
        __Spell.Make('player-spell')('player-normal');





        //----------// EasyTimeline のテスト //----------//


        // 敵を召喚
        var e1 = new Enemy(20, 20);
        var e2 = new Enemy(20, 20);

        player.SetAttackSpell('player-spell');


        e1.SetSpell('10way-r3');

        e2.SetSpell('プレイヤースペル');


        scene.addChild(e1);
        // scene.addChild(e2);


        e1.speed = 1.5;
        e2.speed = 3.0;


        e1.locate(100, 50);
        e2.locate(380, 150);


        // とりあえず easing を短縮
        var quad = enchant.Easing.QUAD_EASEINOUT,
            linear = enchant.Easing.LINEAR;



        // 移動モーションを作成
        Motion.New('m-1').moveBy(30, 30)(1.0).moveBy(-30, 30)(1.0).easing(quad).moveBy(50, 20)(1.0).moveBy(-50, 20)(1.0).easing(linear).moveBy(20, 50)(2.0).moveBy(-20, 50)(2.0).remove();

        // 移動モーションを適用
        // e1.setMotion('m-1');
        // e2.setMotion('m-1');



    }


    // console.log(Hack);
});

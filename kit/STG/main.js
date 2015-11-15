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
    Assets.Add('effect', 'tenonno-graphic/effect/effect.jpg');
    Assets.Add('background', 'tenonno-graphic/background/dot-background.png');


    Assets.Preload();

    game.onload = function()
    {

        // 背景（仮）
        var background = new Sprite(scene.width, scene.height);
        var surface = background.image = new Surface(scene.width, scene.height);

        background.scroll = 0.0;

        background.onenterframe = function()
        {

            var texture = Assets.Get('background');

            var ratio = texture.width / scene.width;

            surface.draw(texture, 0, this.scroll * scene.height * ratio, scene.width, scene.height * ratio);
            surface.draw(texture, 0, (this.scroll - 1.0) * scene.height * ratio, scene.width, scene.height * ratio);


            if ((this.scroll += 0.01) >= 1.0)
            {
                this.scroll -= 1.0;
            }

        }

        scene.addChild(background);


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
            texture_name: 'shot-normal',
            create_time: 0.1,
            way: 1,
            speed: 15,
            size: 10,
            target_type: 'enemy',
            repeatX: 2,
            repeatSpaceX: 50,
            power: 100
        });

        __Barrage.New('10way弾',
        {
            texture_name: 'shot-normal',
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
            texture_name: 'shot-normal',
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





        /*
            Barrage.New('name', {}).Control(() => {}).ShotControl(() => {});
        */


        /*
            target_type: 'enemy'
            にすると同士討ちをするアレができる
        */
        __Barrage.New('自機狙い',
        {
            texture_name: 'shot-normal',
            create_time: 0.1,
            speed: 8,
            way: 1,
        }).control(function()
        {

            // 一番近い敵を狙う
            this.AxisFromNearTarger();


            if (this.time >= 2)
            {
                // this.speed += 1.1;
            }

            if(this.count % 30 === 0)
            {
                this.frame++;
            }

        });



        __Barrage.New('テスト',
        {
            texture_name: 'shot-normal',
            createTime: 1,
            way: 30,
            rangeAngle: 340,
        }).control(function()
        {
            // 弾を生成する度に 20 度追加する
            if (this.count % this.createFrame === 0)
            {
                this.axis_angle += 20;


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
            texture_name: 'shot-normal',
            way: 15,
            createTime: 0.5,
            speed: 5,
            repeat: 3,
            repeatAngle: 3
        }).control(function()
        {

            // 3 秒を超えたら way を変更してリスタート
            if (this.time >= this.createTime * 5 - 0.1)
            {
                this.way = Random(5, 100);
                this.Restart();
            }

        });



        __Spell.Make('10way-r3')('10way-r3');


        __Spell.Make('プレイヤースペル')('10way弾', 'ホーミング弾', 'テスト');
        __Spell.Make('player-spell')('player-normal');



        __Spell.Make('自機狙い')('自機狙い');

        player.SetAttackSpell('player-spell');


        //----------// EasyTimeline のテスト //----------//


        // とりあえず easing を短縮
        var quad = enchant.Easing.QUAD_EASEINOUT,
            linear = enchant.Easing.LINEAR;



        // 移動モーションを作成
        Motion.New('m-1').Move(30, 30)(1.0).Move(-30, 30)(1.0).easing(quad).Move(50, 20)(1.0).Move(-50, 20)(1.0).easing(linear).Move(20, 50)(2.0).Move(-20, 50)(2.0).remove();



        /*
        Stage.Make('ステージ',
        {
            1.0: function() {},
            2.0: function() {},
            3.0: function() {},
        });
        */


        /*

        Stage.Get('あああ').Chain(
        {
            //
        }).AddEnemy(0,
        {


        }).AddEnemy(0,
        {

        }).AddEnemy(0,
        {


        });

        */




        Stage.Make('ステージ');



        for (var i in Range(10))
        {

            Stage.Get('ステージ').AddEnemy(i,
            {
                pos: Vec2(scene.width / 10 * (i), 10),
                spell: '自機狙い'
            });
        }


        Stage.Get('ステージ').Chain(
        {
            // 1.0 秒
        }).AddEvent(1.0, function()
        {

            console.log('wwwwwwww');


            // 5.0 秒
        }).AddEvent(5.0, function()
        {


            console.log('5 秒経過');

        });


        game.addEventListener('enterframe', function()
        {
            // 現在のステージを更新する
            Stage.GetActive().Update();
        });



    }


    // console.log(Hack);
});

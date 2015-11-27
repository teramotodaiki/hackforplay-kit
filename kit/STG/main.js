window.addEventListener('load', function () {



    // 前方宣言した変数の初期化とか
    InitializeGlobalVariable();

    KeyBind(16, 'shift');
    KeyBind(90, 'z');
    KeyBind(84, 'Escape');


    Asset.Add('shot-none', 'tenonno-graphic/shot-none.png');
    Asset.Add('shot-normal', 'tenonno-graphic/shot-normal-min.png');
    Asset.Add('effect', 'tenonno-graphic/effect/effect.jpg');
    Asset.Add('background', 'tenonno-graphic/background/dot-background.png');


    Material.New('normal', {
        source: 'tenonno-graphic/shot-normal-min.png',
        width: 32,
        height: 32,
        default_width: 15,
        default_height: 15,
        collision_size: 10,
    });

    CharacterDesign.New('RIM', {
        source: 'tenonno-graphic/RIM-3.png',
        animation_time: 0.1,
        animation_row: 1,
        width: 64,
        height: 64,
        center_x: 32,
        center_y:  32,

        default_width: 40,
        default_height: 40,
        collision_size: 10,
    });


    Asset.Preload();


    game.onload = function () {



        // 背景（仮）
        var background = new enchant.Sprite(scene.width, scene.height);
        var surface = background.image = new enchant.Surface(scene.width, scene.height);
        background.scroll = 0.0;
        background.onenterframe = function () {

            var texture = Asset.Get('background');

            var ratio = texture.width / scene.width;

            surface.draw(texture, 0, this.scroll * scene.height * ratio, scene.width, scene.height * ratio);
            surface.draw(texture, 0, (this.scroll - 1.0) * scene.height * ratio, scene.width, scene.height * ratio);



            if ((this.scroll += 0.01) >= 1.0) {
                this.scroll -= 1.0;
            }

        }
        scene.addChild(background);



        // Pad を生成する
        CreatePad();

        // 魔道書
        EnchantBook.Create();



        //----------// ここからステージ制作 //----------//


        // プレイヤーを召喚
        player = new Player('RIM');


        scene.addChild(player);

        // player.backgroundColor = '#f00';
        player.MoveTo(sceneSize.width / 2, sceneSize.height / 2);
        player.speed = 5;




        /*
            50px の間隔で 2 つの弾を 0.0 度に放つ
        */
        __Barrage.New('player-normal', {
            material: 'normal',
            create_time: 0.1,
            way: 1,
            speed: 15,
            size: 10,
            target_type: 'enemy',
            repeat_x: 2,
            repeat_space_x: 50,
            power: 100
        });



        __Barrage.New('10way弾', {
            material: 'normal',
            way: 10,
            speed: 5,
            size: 20,
            space: 50
        }).shotControl(function () {

            this.angle.add(2);
        });


        __Barrage.New('ホーミング弾', {
            material: 'normal',
            range_angle: 10,
            createTime: 10.2,
            way: 8,
            speed: 10,

            size: 5,
        }).control(function () {

            // 一番近い標的を見つける
            var target = CharacterList.GetNear(this.creator, this.targetType);

            // 軸を標的の方向に
            this.AxisFromTarget(target);

        });




        /*
            Barrage.New('name', {}).Control(() => {}).ShotControl(() => {});
        */


        /*
            target_type: 'enemy'
            にすると同士討ちをするアレができる
        */
        __Barrage.New('自機狙い', {
            material: 'normal',
            create_time: 0.1,
            speed: 8,
            way: 1,
        }).control(function () {

            // 一番近い敵を狙う
            this.AxisFromNearTarger();



            if (this.count % 30 === 0) {
                this.frame++;
            }

        });




        /*
            10 方向に 6 度の間隔を開けた 3 つの弾を放つ
        */
        __Barrage.New('10way-r3', {
            material: 'normal',
            way: 15,
            create_time: 0.5,
            speed: 5,
            repeat: 3,
            repeat_angle: 3,
            pos_type: 'absolute'
        }).Random({
            axis_angle: [0, 360],
            way: [6, 18],
            speed: [5, 10],
            color: [0, 7],

            pos_x: [0, 480],
            pos_y: [100, 100],
            target_type: [1, 1],

        });


        __Barrage.New('aaaaaaaa', {
            material: 'normal',
            way: 1,


            // range_angle: 20,

            create_time: 1.05,
            speed: 5,
        }).Random({


        }).control(function () {

            this.AxisFromNearTarget();

        }).shotControl(function () {

            this.angle += 2;

            // this.angle += 2;


        });


        __Barrage.Get('aaaaaaaa').control(function () {

        });


        __Barrage.New('上から下', {
            material: 'normal',
            way: 1,
            axis_angle: 180,
            create_time: 0.5,
            speed: 5,
            repeat_x: 10,
            repeat_space_x: 480 / 10,

            pos_type: 'absolute',
            pos: [240, 0],

        });




        __Spell.Make('10way-r3')('aaaaaaaa' /*, '上から下'*/ );


        __Spell.Make('プレイヤースペル')('10way弾', 'ホーミング弾');
        __Spell.Make('player-spell')('player-normal');


        __Spell.Make('U to B')('上から下');

        __Spell.Make('自機狙い')('自機狙い');

        player.SetAttackSpell('player-spell');




        Motion.New('不動');



        Reflect.Range([0, 0], [480, 320]);


        Reflect.Circle([240, 160], 100);


        __Barrage.New('弾幕２２', {
            way: 3,
            speed: 5,

            create_time: 1.05,

            space: 10,
            target_type: 'enemy',

            pos_target_type: 'player',

            reflect: true,
            reflect_count: 1,

        }).Wave({

            axis_angle: {
                cycle_time: 5,
                min: 0,
                max: 360,
            },

        });
        var c2 = new Character2('RIM');


        __Spell.Make('弾幕１')('弾幕２２');


        Stage.Make('ステージ').AddEnemy(0, {
            pos: [240, 100],
            spell: '弾幕１',
            motion: '不動',
        });

        //
        Motion.New('ボス登場').MoveTo(scene.width / 2, 100)(1.0);
        Motion.New('ボス反復').MoveBy(-100, 0)(3.0).MoveBy(100, 0)(3.0).MoveBy(100, 0)(3.0).MoveBy(-100, 0)(3.0).Loop();

        ////////////////////////////////////////////////////





        // 現在のステージを更新する
        game.addEventListener('enterframe', function () {
            Stage.GetActive().Update();

            Debug.Set('stage-count', Stage.GetActive().count);

        });




        { // デバッグ用
            var RequestAnimationFrame = window.requestAnimationFrame;
            var canvas_override = true;
            var input_count = 0;

            window.requestAnimationFrame = function () {


                if ((input_count = Key.Escape ? input_count + 1 : 0) === 1) {
                    canvas_override = !canvas_override;
                    OverrideRenderFunctions = [];
                }



                // ESC キーを押していない場合は通常通りの処理
                if (!canvas_override) {
                    return RequestAnimationFrame.apply(this, arguments);
                }

                var args = arguments;


                var context = game.rootScene._layers.Canvas.context;
                OverrideRenderFunctions.forEach(function (render) {
                    render(context);
                });



                // 当たり判定を描画
                scene.childNodes.forEach(function (node) {

                    if (node.collision_size !== undefined) {
                        context.beginPath();
                        context.arc(node.pos.x, node.pos.y, node.GetCollisionSize() / 2, 0, Math.PI2);
                        context.stroke();
                    }

                });



                Reflect.__Render(context);

                // context.clearRect(10, 10, 300, 0300);

                setTimeout(function () {
                    RequestAnimationFrame.apply(this, args);
                }, 30);

            }

        }


        EnchantBook.PushHint("var b = __Barrage.Get('弾幕２２');");
        EnchantBook.PushHint("b.speed = 20;");


        Hack.oneditend = function () {
            __Spell.Reload();
        }


    }


    // console.log(Hack);
});

window.addEventListener('load', function () {



    // 前方宣言した変数の初期化とか
    InitializeGlobalVariable();

    KeyBind(16, 'shift');
    KeyBind(90, 'z');
    KeyBind(88, 'X');
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
        collision_size: 15,
    });

    CharacterDesign.New('RIM', {
        source: 'tenonno-graphic/RIM-3.png',
        animation_time: 0.1,
        animation_row: 1,
        width: 64,
        height: 64,
        center_x: 32,
        center_y: 32,
        default_width: 40,
        default_height: 40,
        collision_size: 6,
    });


    Asset.Preload();


    Game.onload = function () {


        // 背景（仮）
        {
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
        }


        //----------// ここからステージ制作 //----------//





        __Barrage.New('プレイヤーボム', {
            material: 'normal',
            create_time: 0.2,
            way: 20,
            speed: 5,
            scale: 3,
            destroyer: true,
            target_type: 'enemy',
        }).Random({
            color: [0, 7],
        }).Wave({

            speed: [1, [1, 5]],

        }).ShotControl(function () {


            this.speed += 0.2;

        }).Control(function () {

            // 2 秒でボム終了
            if (this.time >= 2) {
                this.RunEvent('player-bomb-end');
            }

        });








        // プレイヤーを召喚
        player = new Player('RIM');


        player.MoveTo(sceneSize.width / 2, sceneSize.height / 2);


        player.speed = 5;

        player.SetBombSpellFromBarrage('プレイヤーボム');

        player.Entry();


        PlayerStatus.New(player);




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

        }).ShotControl(function () {

            this.angle += 2;

            // this.angle += 2;


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

            space: 20,

            // pos_target_type: 'player',

            reflect: true,
            reflect_count: 1,

        }).Wave({

            /*
            /*
            test: [0, [0, 10]],
            axis_angle: {
                cycle_time: 5,
                min: 0,
                max: 360,
            },
            */
        });


        __Spell.Make('弾幕１')('弾幕２２');



        //
        Motion.New('ボス登場').MoveTo(scene.width / 2, 100)(1.0);
        Motion.New('ボス反復').MoveBy(-100, 0)(3.0).MoveBy(100, 0)(3.0).MoveBy(100, 0)(3.0).MoveBy(-100, 0)(3.0).Loop();




        var enemy = new Enemy('RIM');
        enemy.MoveTo(240, 100);
        enemy.SetMotion('ボス反復').SetSpell('弾幕１');


        enemy.AddEvent('remove', function () {

            Hack.gameclear();

        });





        Stage.Make('ステージ').AddEnemyFromInstance(0, enemy);


        ////////////////////////////////////////////////////





        // 現在のステージを更新する
        Game.addEventListener('enterframe', function () {
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

                context.lineWidth = 2;
                context.strokeStyle = '#000';
                context.fillStyle = 'rgba(255, 255, 255, .5)';

                // 当たり判定を描画
                scene.childNodes.forEach(function (node) {

                    if (node.collision_size !== undefined) {
                        context.beginPath();
                        context.arc(node.pos.x, node.pos.y, node.GetCollisionSize(), 0, Math.PI2);

                        context.fill();

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



        Hack.oneditend = function () {
            __Spell.Reload();
        }


        // 魔道書
        EnchantBook.Create();

        // Pad を生成する
        CreatePad();

        EnchantBook.PushHint("var b = __Barrage.Get('弾幕２２');");
        EnchantBook.PushHint("b.speed = 20;");


    }


    // console.log(Hack);
});

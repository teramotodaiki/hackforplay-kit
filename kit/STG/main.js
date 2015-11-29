window.addEventListener('load', function () {



    // 前方宣言した変数の初期化とか
    InitializeGlobalVariable();


    BindKeys([16, 'shift'], [90, 'z'], [88, 'X'], [84, 'Escape']);




    Asset.Add('shot-none', 'tenonno-graphic/shot-none.png');
    Asset.Add('shot-normal', 'tenonno-graphic/shot-normal-min.png');
    Asset.Add('effect', 'tenonno-graphic/effect/effect.jpg');
    Asset.Add('background', 'tenonno-graphic/background/dot-background2.png');



    Asset.Add('bg3', 'tenonno-graphic/background/3.png');


    Material.New('normal', {
        source: 'tenonno-graphic/shot-normal-min.png',
        width: 32,
        height: 32,
        default_width: 15,
        default_height: 15,
        collision_size: 15,
    });

    Material.New('light', {
        source: 'tenonno-graphic/shot-light-min.png',
        blend: 'lighter',
        width: 64,
        height: 64,
        default_width: 32,
        default_height: 32,
        collision_size: 18,
    });



    CharacterDesign.New('RIM', {
        source: 'tenonno-graphic/RIM-3.png',
        animation_time: 0.1,
        animation_row: 1,

        texture_size: [64, 64],
        center: [32, 32],

        default_width: 40,
        default_height: 40,
        collision_size: 6,
    });


    Asset.Preload();


    Game.onload = function () {





        Background.New('背景１', {

            texture: 'background',
            move: [0, -10],

        });


        Background.New('背景２', {

            texture: 'bg3',
            move: [-2, -4],

            blend: 'darken',

        });




        Background.Set('背景１', '背景２');



        // 背景（仮）

        //----------// ここからステージ制作 //----------//





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






        __Barrage.New('プレイヤーボム', {
            material: 'light',
            create_time: 0.2,
            way: 20,
            speed: 5,
            scale: 3,
            destroyer: true,
            unbreak: true,
            target_type: 'enemy',
        }).Random({

            color: [0, 10],

            once_axis_angle: [0, 360],

        }).ShotControl(function () {

            this.speed += 0.2;

        }).Control(function () {


            // 2 秒でボム終了
            if (this.time >= 2) {
                this.RunEvent('player-bomb-end');
            }

        });


        __Barrage.New('プレイヤー通常', {
            material: 'normal',
            create_time: 0.1,
            way: 1,
            speed: 15,
            target_type: 'enemy',
            repeat_x: 2,
            repeat_space_x: 50,
            power: 100
        });



        // プレイヤーを召喚
        player = new Player('RIM');

        player.MoveTo(sceneSize.width / 2, sceneSize.height / 2);


        player.speed = 5;

        player.SetAttackSpellFromBarrage('プレイヤー通常');
        player.SetBombSpellFromBarrage('プレイヤーボム');
        player.Entry();



        // PlayerStatus.New(player);




        // this.AxisFromNearTarget();



        Motion.New('不動');



        Reflect.Range([0, 0], [480, 320]);


        Reflect.Circle([240, 160], 100);


        __Barrage.New('弾幕２２', {
            way: 3,
            speed: 1,

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
        Motion.New('ボス登場').MoveTo(scene.width / 2, 100)(2.0);
        Motion.New('ボス反復').MoveBy(-100, 0)(3.0).MoveBy(100, 0)(3.0).MoveBy(100, 0)(3.0).MoveBy(-100, 0)(3.0).Loop();



        /*
        var enemy = new Enemy('RIM');
        enemy.MoveTo(240, 100);
        enemy.SetMotion('ボス反復').SetSpell('弾幕１');


        enemy.AddEvent('remove', function () {

            Hack.gameclear();

        });
        */


        //----------//----------//----------// ボス 1 //----------//----------//----------//


        __Boss.New('ボス１', {

            type: 'RIM',


        }).AddAction({

            name: '技１',

            spell: '弾幕１',
            hp: 3,
            motion: 'ボス反復',
            entry_motion: 'ボス登場',

        }).AddAction({

            name: '技２',
            spell: 'プレイヤーボム',
            hp: 3,
            motion: 'ボス反復',
            entry_motion: 'ボス登場',

        }).AddEvent('death', function () {

            // ボスを倒したら次のステージに
            Stage.Next();
            // Hack.gameclear();

        });


        //----------//----------//----------// ステージ 1 //----------//----------//----------//



        Stage.New('ステージ１', {

        }).AddBoss2(0, 'ボス１').DrawTitle(1.0, 'ステージ１', 'STAGE 1');


        //----------//----------//----------// ステージ 2 //----------//----------//----------//


        Stage.New('ステージ２', {

        }).DrawTitle(1.0, 'ステージ２', 'STAGE 2');
        /*


        Stage.Make('ステージ2', {

        }).AddEnemyFromInstance(0, enemy).DrawTitle(1, 'ステージ2', 'STAGE 2');

        */

        ////////////////////////////////////////////////////





        // 現在のステージを更新する
        Game.addEventListener('enterframe', function () {
            Stage.GetActive().Update();
            Debug.Set('stage-count', Stage.GetActive().count);
        });



        { // デバッグ用
            var RequestAnimationFrame = window.requestAnimationFrame;
            var canvas_override = false;
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


        RootScene.front_sprite = EnchantBook.GetSprite();

        // Pad を生成する
        CreatePad();

        EnchantBook.PushHint("var b = __Barrage.Get('弾幕２２');");
        EnchantBook.PushHint("b.speed = 20;");
        EnchantBook.PushHint("b.way = 120;");

    }


    // console.log(Hack);
});

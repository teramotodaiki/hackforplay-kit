window.addEventListener('load', function () {


    // 前方宣言した変数の初期化とか
    InitializeGlobalVariable();


    BindKeys([16, 'shift'], [90, 'Z'], [88, 'X'], [32, 'Space'], [67, 'C'], [68, 'D']);


    Asset.Add('shot-none', 'tenonno-graphic/shot-none.png');
    Asset.Add('shot-normal', 'tenonno-graphic/shot-normal-min.png');
    Asset.Add('弾消滅エフェクト', 'tenonno-graphic/effect/effect-min.jpg');
    Asset.Add('background', 'tenonno-graphic/background/dot-background2.png');
    Asset.Add('bg3', 'tenonno-graphic/background/3.png');
    Asset.Add('bg4', 'tenonno-graphic/background/4.png');


    Asset.directory = 'tenonno-graphic/';

    Asset.Add('残機', 'player-life.png');
    Asset.Add('残機背景', 'player-life-back.png');

    Asset.Add('ボム', 'player-bomb.png');
    Asset.Add('ボム背景', 'player-bomb-back.png');

    Asset.directory = '';

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
        source: 'tenonno-graphic/RIM-4.png',
        animation_time: 0.1,
        animation_row: 1,

        texture_size: [64, 64],
        center: [32, 32],

        default_width: 40,
        default_height: 40,
        collision_size: 6,
    });



    CharacterDesign.New('ドラゴン', {
        source: 'enchantjs/bigmonster1.gif',
        animation_time: 0.1,
        animation_row: 2,

        texture_size: [80, 80],
        center: [40, 40],

        default_width: 40,
        default_height: 40,
        collision_size: 6,
    });



    Asset.Preload();



    Barrage.New('自機狙い加速', {
        speed: 0,

        create_time: 0.5,

        repeat: 10,

        __speed_parameter: 50,

        reflect: 'ｂ',
        reflect_count: 10,

    }).Control(function () {

        this.AxisFromNearTarget();

    }).ShotControl(function () {

        this.speed += (this.create_index + 3) / 10.0 * this.time / this.barrage.__speed_parameter;
    });



    Barrage.New('星', {

        speed: 2,
        create_time: 10,

        star_size: 100,
        star_accuracy: 20,

        repeat: 5,
        repeat_angle: 360 / 5,

        blend: 'lighter'

    }).Create(function () {
        var result = [];
        for (var index in Range(5)) {
            var begin = Angle(360 / 5 * index + 180).ToVec2().Scale(this.star_size);
            // Vec2.Rotate を行列にしたら Scale の処理いらない
            var end = begin.Clone().Rotate(360 / 5 * 2).Scale(this.star_size);
            var add = end.Sub(begin).Scale(1 / this.star_accuracy);
            for (var r in Range(this.star_accuracy)) {
                result.push(begin.Add(add).Clone());
            }
        }
        return result;
    }).Random({
        color: [0, 10]
    }).ShotControl(function () {
        // 1 秒経ったら方向をランダムに
        if (this.count === TimeToCount(1.0)) {
            this.angle = Random(0, 360);

        }

    });

    Barrage.New('プレイヤー通常', {
        material: 'normal',
        create_time: 0.1,
        way: 1,
        speed: 15,
        target_type: 'enemy',
        repeat_x: 2,
        repeat_space_x: 50,
        power: 100
    });


    Barrage.New('プレイヤーボム', {
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


    // onload 互換
    Game.addEventListener('load', function () {


        //----------// 背景の定義 //----------//
        Background.New('背景１', {
            texture: 'background',
            move: [0, -10],
        });


        //----------// 反射の定義 //----------//
        Reflecter.New('画面端').Range([0, 0], [480, 320]);
        Reflecter.New('大きな円').Circle([240, 160], 160);


        //----------// モーションの定義 //----------//
        Motion.New('不動');

        Motion.New('ボス登場').MoveTo(scene.width / 2, 100)(2.5);
        Motion.New('ボス反復').MoveBy(-100, 0)(3.0).MoveBy(100, 0)(3.0).MoveBy(100, 0)(3.0).MoveBy(-100, 0)(3.0).Loop();

        Motion.New('真っ直ぐ降りてくる').MoveBy(0, 350)(2.0).Remove();

    });



    Game.onload = function () {


        //----------//----------// プレイヤー //----------//----------//

        player = new Player('RIM');
        player.MoveTo(Game.width / 2, Game.height / 2);
        player.speed = 5;
        player.SetAttack('プレイヤー通常');
        player.SetBomb('プレイヤーボム');
        player.Entry();

        //----------//----------// 弾幕の定義 //----------//----------//


        Barrage.New('新しい反射のテスト', {
            speed: 2,
            way: 50,
            create_time: 0.5,
            space: 50,
            reflect: ['画面端', '大きな円'],
            scale: 0.5,
        }).Random({
            color: [0, 10]
        });


        Barrage.New('自機狙い', {
            speed: 5,
            way: 3,
            create_time: 0.25,
            space: 50,
            range_angle: 20,
        }).Control(function () {
            this.AxisFromNearTarget();
        }).Random({
            once_color: [0, 10]
        });;


        //----------//----------// スペルの定義 //----------//----------//


        Spell.Make('スペル１')('新しい反射のテスト', '自機狙い');


        //----------//----------// ボス 1 //----------//----------//

        Boss.New('ボス１', {

            type: 'RIM',

        }).AddAction({

            name: '技１',

            spell: 'スペル１',
            hp: 30,
            motion: 'ボス反復',
            entry_motion: 'ボス登場',

        }).AddEvent('death', function () {

            // ボスを倒したらクリア
            Hack.gameclear();
        });



        //----------// ステージ 1 //----------//


        Stage.New('ステージ１', {
            background: '背景１',
        });

        var stage = Stage.Get('ステージ１');
        // タイトルを表示
        stage.DrawTitle('ステージ１', 'テストステージ').Delay(3.0);
        // 敵を追加する
        stage.AddEnemy({

            pos: [240, -30],
            hp: 10,
            spell: '星',
            motion: '真っ直ぐ降りてくる',
            attack_begin_time: 1.0,

        }).Delay(1.0);
        // ボスを追加する
        stage.AddBoss('ボス１');

        //----------// 魔道書 //----------//

        EnchantBook.Create();

        Hack.hint = function () {

            // スペースキーでデバッグ描画

            console.log(player);

            var barrage = Barrage.Get('プレイヤー通常');
            barrage.way = 3;

        };

    };


    // 初期化、更新など
    Game.addEventListener('load', function () {


        PlayerStatus.New();

        // Pad を生成する
        CreatePad();

        Game.addEventListener('enterframe', function () {

            Key.Update();
            Stage.Update();

            Debug.Set('stage-count', Stage.GetActive().count);

        });
    });



    { // デバッグ用
        var RequestAnimationFrame = window.requestAnimationFrame;
        var canvas_override = false;

        window.requestAnimationFrame = function () {


            if (Key.Space === 1) {
                canvas_override = !canvas_override;

                $('#debug').toggle();

            }

            // ESC キーを押していない場合は通常通りの処理
            if (!canvas_override) {
                return RequestAnimationFrame.apply(this, arguments);
            }

            var context = RootScene._layers.Canvas.context;

            context.lineWidth = 2;
            context.strokeStyle = '#000';
            context.fillStyle = 'rgba(255, 255, 255, .5)';

            // 当たり判定を描画
            SpriteList.Each(function (node) {

                if (node.collision_size !== undefined) {
                    context.beginPath();
                    context.arc(node.pos.x, node.pos.y, node.GetCollisionSize(), 0, Math.PI2);

                    context.fill();

                    context.stroke();

                }

            });


            Reflecter.Each(function () {

                this.RenderBorder(context);

            });



            var args = arguments;
            setTimeout(function () {
                RequestAnimationFrame.apply(this, args);
            }, 30);

        }

    }



    Hack.oneditend = function () {
        Spell.Reload();
    }


    // console.log(Hack);
});

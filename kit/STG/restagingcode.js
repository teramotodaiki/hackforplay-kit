window.addEventListener('load', function () {

    Hack.restagingCode = function () {
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
    };
});

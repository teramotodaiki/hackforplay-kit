var Barrage = function () {


    //----------// ユーザーが使用するメンバ //----------//

    // 何秒毎に生成するか
    this.create_time = 1.0;

    // way 方向に生成する
    this.way = 1;

    // 速度
    this.speed = 0;

    // 色
    this.color = 0;

    // 軸
    this.axis_angle = 0;




    // 撃つ範囲
    this.range_angle = 360;

    // 消滅時間
    // 秒に修正予定
    this.life = 300;

    // 敵対タイプ
    this.target_type = 'player';

    // 自分に自分の弾が当たるか
    this.hit_self = false;

    // 材質
    this.material = 'normal';


    // creator から space 離れた場所に弾が生成される
    this.space = 0;

    // 並べる
    this.repeat = 1;
    this.repeat_angle = 0;

    // 横に並べる
    this.repeat_x = 1;
    this.repeat_space_x = 0;

    // 縦に並べる
    this.repeat_y = 1;
    this.repeat_space_y = 0;

    this.pos = [0, 0];
    this.pos_type = 'relative';

    // pos の対象
    this.pos_target_type = 'this';

    // pos 互換
    this.pos_x = null;
    this.pos_y = null;

    // 反射
    this.reflect = false;

    // 待機
    this.wait_time = 0;
    this.wait_end_time = null;
    this.wait = false;



    // 弾幕変化形
    this.next_barrage = '';

    // 何回で次の弾幕に移行するか
    this.next_repeat = null;



    this.scale_x = 1.0;
    this.scale_y = 1.0;
    this.scale = null;


    this.destroyer = false;




    //----------// 固定互換 //----------//


    // once_ ...




    //----------// 未実装 //----------//




    //----------// 廃止 //----------//


    // this.material に変更
    // this.texture_name = 'shot-none';


    // material.width, height に変更
    // 変更する場合は Scale から
    // this.size = 10;


    // 生成者に依存
    // this.power = 1;


    //----------// 内部で使用するメンバ //----------//

    // 時間
    this.time = 0.0;
    this.count = 0;

    this.create_count = 0;

    this.shots = [];

    this.events = [];

    // 識別番号
    this.handle = null;


    this.frame = 0;


    // 弾幕の使用者
    this.creator = null;



    this.__control = null;
    this.shot_control = null;


    // this.axis = Vec2(0, 0);

    this.shotEvents = [];


    // 詳細設定
    this.random = null;

    this.wave = null;


}


// 乱数生成
Barrage.prototype.Random = function (values) {
    this.random = values;
    return this;
}


var lv1 = ['create_time', 'way', 'repeat', 'repeat_x', 'repeat_y'];

Barrage.prototype.RandomizeFirst = function () {


    // aa

    if (!this.random) return;

    for (var key in this.random) {



        // 1 回だけ計算すればいいプロパティだけ計算
        if (lv1.indexOf(key) < 0 && !key.match(/^once_.+$/)) continue;

        this[key] = this.RandomizeName(key);


    }

}

Barrage.prototype.RandomizeSecond = function () {

    if (!this.random) return;


    for (var key in this.random) {

        if (lv1.indexOf(key) >= 0 || key.match(/^once_.+$/)) continue;

        this[key] = this.RandomizeName(key);

    }

}


Barrage.prototype.RandomizeName = function (name) {


    // ランダムにしたらダメなプロパティ

    var a = ['target_type', 'material' /*, hit_self*/ ];




    if (a.indexOf(name) >= 0) {
        console.warn('プロパティ "' + name + '" はランダムにできません');
        return null;
    }


    // 整数値
    var int_keys = ['repeat', 'repeat_x', 'repeat_y', 'color'];


    // 検索する時は once を削除
    var name2 = name.replace(/^once_/, '');

    // 乱数生成器
    var _Random = int_keys.indexOf(name2) >= 0 ? Random2 : Random;



    return _Random(this.random[name][0], this.random[name][1]);
}



Barrage.prototype.AddShotEvent = function (time, property) {
    time *= game.fps;
    this.shotEvents.push(function () {
        if (this.count <= time) {
            this.attribute(property);
        }
    });
}




// sin 波
Barrage.prototype.Wave = function (property) {
    this.wave = property;

    return this;
}


// 波を適用する（仮）
Barrage.prototype.__Wave = function () {
    for (var key in this.wave) {

        var p = this.wave[key];

        var v =p[1][0] + Math.sin(Math.PI2 / p[0] * this.time) * (p[1][0] - p[1][1]) / 2

        this[key] = v;

    }
}


// 弾幕を自由に制御できる関数を設定
Barrage.prototype.Control = function (control) {
    this.__control = control;
    return this;
}



// 弾幕を自由に制御できる関数を設定
Barrage.prototype.control = function (control) {
    this.__control = control;
    return this;
}



// 弾を自由に制御できる関数を設定
Barrage.prototype.ShotControl = function (control) {
    this.shot_control = control;
    return this;
}



// 生成する時間なら
Barrage.prototype.CreateNow = function () {
    return this.count % this.create_count === 0;
}


Barrage.prototype.attribute = function (object) {
    for (var key in object) {
        this[key] = object[key];
    }
    return this;
}








// 弾を放つ
Barrage.prototype.Fire = function () {

    this.RandomizeFirst();

    this.__Wave();

    // 材質
    var material = Material.Get(this.material);

    // 仮
    for (var way in Range(this.way)) {


        // RangeN(r1, r2, r3...) -> [][][]

        // ずらし配置みたいな
        for (var repeat in Range(this.repeat)) {

            // 横に並べる
            for (var x in Range(this.repeat_x)) {
                // 縦に並べる
                for (var y in Range(this.repeat_y)) {
                    this.RandomizeSecond();


                    // 軸を選択する
                    var axis_angle = this.once_axis_angle === undefined ? this.axis_angle : this.once_axis_angle;


                    // 角度を計算する
                    var begin_angle = axis_angle - this.range_angle / 2;
                    var step_angle = this.range_angle / this.way;
                    var angle = begin_angle + step_angle * way;
                    angle -= this.repeat_angle * this.repeat / 2;
                    angle += this.repeat_angle * repeat;



                    // 弾を生成する
                    var shot = new Shot(this.creator, material);



                    // x, y が有効値なら pos に上書き
                    if (this.pos_x !== null && this.pos_y !== null) {
                        this.pos = [this.pos_x, this.pos_y];
                    }


                    if (this.scale !== null) {
                        this.scale_x = this.scale_y = this.scale;
                    }



                    var property = {};

                    property.speed = this.speed;
                    property.angle = angle;
                    property.life = this.life;
                    property.target_type = this.target_type;
                    property.__control = this.shot_control;
                    property.hit_self = this.hit_self;
                    property.power = this.creator.power;
                    property.color = this.color;
                    property.reflect = this.reflect;
                    property.reflect_count = this.reflect_count;

                    property.destroyer = this.destroyer;
                    property.unbreak = this.unbreak;


                    property.scale_x = this.scale_x;
                    property.scale_y = this.scale_y;




                    // once プロパティを上書き
                    for (var key in property) {
                        if (this['once_' + key] !== undefined) {
                            property[key] = this['once_' + key];
                        }
                    }


                    // プロパティを登録
                    shot.attribute(property);



                    // 座標の対象が自身ではない場合、対象を合わせる
                    if (this.pos_target_type !== 'this') {
                        var target = CharacterList.GetType(this.pos_target_type);
                        if (target.length) {
                            // とりあえず 0 番目に（というより 1 以上だと用途に合わない）
                            shot.pos = target[0].pos.Clone();
                        } else console.warn('次の生成対象は存在しません: ' + this.pos_target_type);
                    }



                    // pos を適用する
                    ({
                        relative: function () {
                            shot.pos.Add(this.pos.ToVec2());
                        },
                        absolute: function () {
                            shot.pos = this.pos.ToVec2();
                        }
                    })[this.pos_type].call(this);


                    // repeat_x, repeat_y を計算

                    var shot_width = (this.repeat_x - 1) * this.repeat_space_x;
                    shot.pos.Sub(Vec2(shot_width / 2, 0));
                    shot.pos.Add(Vec2(this.repeat_space_x * x, 0));

                    var shot_height = (this.repeat_y - 1) * this.repeat_space_y;
                    shot.pos.Sub(Vec2(shot_height / 2, 0));
                    shot.pos.Add(Vec2(this.repeat_space_y * y, 0));


                    // 使用者から距離を取る
                    // shot.pos.add(shot.angle.ToVec2().Scale(this.space));
                    shot.pos.Add(Angle(angle).ToVec2().Scale(this.space));



                    // 弾を登録する
                    shot.InitializeUpdate();

                    /*
                    scene.addChild(shot);
                    this.shots.push(shot);
                    */

                    shot.Entry(this.creator);


                }




            }
        }
    }




}






Barrage.prototype.NextColor = function () {
    this.color++;
}

// 弾幕を更新する
Barrage.prototype.Update = function () {

    // Spell ->
    // set creator
    // set count ++

    // 時間関連の変換
    this.time = CountToTime(this.count);
    this.create_count = TimeToCount(this.create_time);





    // 待機処理
    if (this.wait) {
        if (this.wait_end_time <= this.time) {
            this.wait = false;
            this.creator.barrage_count[this.handle] = 0;
        }
        return;
    }



    // 完全に自由な制御
    if (this.__control) {
        this.__control.call(this);
    }



    // 一定時間に達したら弾を生成する
    if (this.count % this.create_count === 0) {
        this.Fire();
    }


}


// 一番近い敵を狙う
Barrage.prototype.AxisFromNearTarget = function () {
    this.AxisFromTarget(CharacterList.GetNear(this.creator, this.target_type));
}



// target の方向に axis_angle を向ける
Barrage.prototype.AxisFromTarget = function (target) {
    // 標的がいるなら軸を向け、いないならとりあえず上に
    this.axis_angle = target ? this.creator.pos.angle(target.pos) : 0;
}


Barrage.prototype.Restart = function (wait) {
    this.wait_end_time = this.time + wait;
}



Barrage.prototype.End = function () {
    this.creator.RunEvent('barrage-end');
}


Barrage.prototype.RunEvent = function (name) {
    this.creator.RunEvent(name);
}





var barrage_asset = {};

var barrage_handle = 0;



var ___Barrage = Barrage;



var __Barrage = {

    Get: function (name) {

        if (barrage_asset[name] === undefined) {
            console.warn('弾幕 "' + name + '" は存在しません');
        }


        barrage_asset[name].asset_name = name;

        return barrage_asset[name];
    },


    New: function (name, property) {

        var barrage = barrage_asset[name] = new Barrage();




        barrage.handle = barrage_handle++;


        if (property) {
            barrage.attribute(property);
        }


        return barrage;
    },



}

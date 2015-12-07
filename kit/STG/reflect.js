var GetReflectRadian = function (front, normal) {

    var f_n = front; ///.Clone().Normalize();



    // var normal_n = normal.Clone().Normalize();
    /*
    var normal_n = Angle(ToAngle(normal.ToRadian() + Math.PI / 2)).ToVec2();

    var normal_n = normal.Clone().Normalize();
        */

    // var normal2 = normal.Clone().Normalize();

    var normal2 = normal.Clone().Reverse().Normalize();;

    var normal_n = normal2.ToNormal();


    var a = (function (spd, nor) {
        var t = -(nor.x * spd.x + nor.y * spd.y) /
            (nor.x * nor.x + nor.y * nor.y);
        return Vec2(
            spd.x + t * nor.x * 2.0,
            spd.y + t * nor.y * 2.0
        );
    })(f_n, normal_n);

    return a.Normalize().ToRadian();



    // バグってた

    return front.Sub(Math.Dot(front, normal).Scale(2).Mul(normal)).ToRadian();

}



var $Reflecter = function () {
    this.list = [];
};

$Reflecter.prototype.Clear = function () {
    this.list.clear();
};


$Reflecter.prototype.Push = function (line) {
    this.list.push(line);
    return this;
};

$Reflecter.prototype.PushPoints = function () {

    var points = Array.prototype.slice.call(arguments);

    for (var index in Range(points.length)) {

        index = Number(index);

        var next_index = (index === points.length - 1) ? 0 : index + 1;

        this.Push(Line(points[index], points[next_index]));

    }

    return this;
};

$Reflecter.prototype.Range = function (min, max) {

    min = min.ToVec2();
    max = max.ToVec2();


    this.PushPoints(
        min,
        Vec2(max.x, min.y),
        max,
        Vec2(min.x, max.y));


    return this;
};


$Reflecter.prototype.Circle = function (center, size, R) {


    center = center.ToVec2();

    // size /= 2;

    R = R || 16;


    var points = [];

    // var b_pos = Vec2(0, size);


    for (var index in Range(R)) {


        var angle = Math.PI2 / R * index;


        var x = Math.sin(angle) * size;
        var y = Math.cos(angle) * size;

        points.push(Vec2.Add(center, Vec2(x, y)));
    }


    this.PushPoints.apply(this, points);

    return this;
};



$Reflecter.prototype.Check = function (line, shot) {

    var reflect_indices = [];

    // 冷静に考えたら forEach で ブロックの外に return できないの不便すぎる
    for (var index = 0; index < this.list.length; index++) {


        // 前回反射した
        if (shot.before_reflect_indices.indexOf(index) >= 0) {
            continue;
        }

        var line2 = this.list[index];


        var collision = __Collision.Line(line, line2);

        if (collision) {

            reflect_indices.push(index);

            shot.angle = 180 - ToAngle(GetReflectRadian(line.V2V1(), line2.V2V1()));

            shot.pos = collision.pos;

            // shot.speed = 0;

            // 判定サイズだけ戻す（これしとかないとすり抜けることがある）
            // shot.pos.Sub(line.V2V1().Normalize().Scale(shot.collision_size / 2));

            // shot.color++;



            // 浅い反射処理なら 1 回判定を取った時点で抜ける
            var shallow = false;
            if (shallow) {
                return;
            }


            // 再帰的な反射は速度的に逆効果な気がするから無視

            /*
            // 壁にハマらないように押し出す（あまりよくない方法な気がする）
            // shot.pos.Add(Angle(shot.angle).ToVec2().Scale(1));
            // 反射地点までの距離
            var length = c_r.pos.Clone().Sub(line.begin).Length();
            // 残っている距離
            var n_length = line.ToVec2().Length() - length;
            // 次の位置
            var angle = line.ToVec2().ToRadian() + r_line.ToVec2().ToRadian();
            var x = Math.sin(angle) * n_length;
            var y = Math.cos(angle) * n_length;
            */

        }
    }

    if (reflect_indices.length) {

        shot.before_reflect_indices = reflect_indices;

    }



    if (reflect_indices.length) {
        // 一定回数反射したら崩壊
        if (shot.reflect_count-- <= 0) {
            shot.Remove();
        }

    }


};


$Reflecter.prototype.RenderBorder = function (context) {



    this.list.forEach(function (line) {
        context.beginPath();
        context.moveTo(line.pos[0].x, line.pos[0].y);
        context.lineTo(line.pos[1].x, line.pos[1].y);
        context.closePath();
        context.stroke();
    });



};


var MakeAsset = function (new_class) {
    return {

        asset: {},

        Each: function (callback) {

            for (var key in this.asset) {
                var object = this.asset[key];
                callback.call(object, object);
            }

        },

        New: function (name) {

            if (this.asset[name] !== undefined) {

                console.warn('');

            }


            return this.asset[name] = new new_class();
        },

        Get: function (name) {

            if (this.asset[name] === undefined) {

                console.warn(name);

            }

            return this.asset[name];
        }


    };
};



var Reflecter = MakeAsset($Reflecter);

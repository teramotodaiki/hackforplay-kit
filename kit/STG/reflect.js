var reflect_line_list = [];





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


var Reflect = {

    // [[deprecated]]
    // 全ての反射ラインを描画する
    __Render: function (context) {

        context.lineWidth = 3;
        context.strokeStyle = '#fff';

        reflect_line_list.forEach(function (line) {

            context.beginPath();
            context.moveTo(line.pos.x, line.pos.y);
            context.lineTo(line.pos.x + line.vec.x, line.pos.y + line.vec.y);
            context.stroke();

        });
    },


    Clear: function () {
        reflect_line_list = [];
        return this;
    },
    Push: function (line) {
        reflect_line_list.push(line);
        return this;
    },

    Range: function (min, max) {

        min = min.ToVec2();
        max = max.ToVec2();

        this.Clear();

        this.Push(Line(min, Vec2(max.x, 0)));
        this.Push(Line(Vec2(max.x, min.y), Vec2(0, max.y)));
        this.Push(Line(max, Vec2(-max.x, 0)));
        this.Push(Line(Vec2(min.x, max.y), Vec2(0, -max.y)));

    },

    Circle: function (center, size, R) {


        center = center.ToVec2();

        // size /= 2;

        R = R || 16;

        this.Clear();

        // var b_pos = Vec2(0, size);


        for (var index in Range(R)) {

            var angle = Math.PI2 / R * ++index;


            var b_pos_angle = Math.PI2 / R * --index;
            var b_x = Math.sin(b_pos_angle) * size;
            var b_y = Math.cos(b_pos_angle) * size;
            var b_pos = Vec2(b_x, b_y);


            var x = Math.sin(angle) * size;
            var y = Math.cos(angle) * size;

            var v = Vec2(x, y);


            var pos = Math.Add(center, b_pos);

            var v3 = Math.Sub(v, b_pos);



            this.Push(Line(pos, v3));

            // b_pos = v;
        }


    },

    Check: function (line, shot) {

        var reflect_indices = [];

        // 冷静に考えたら forEach で ブロックの外に return できないの不便すぎる
        for (var index = 0; index < reflect_line_list.length; index++) {


            // 前回反射した
            if (shot.before_reflect_indices.indexOf(index) >= 0) {
                continue;
            }

            var line2 = reflect_line_list[index];

            var collision = __Collision.Line(line, line2);

            if (collision) {

                reflect_indices.push(index);

                shot.angle = ToAngle(GetReflectRadian(line.vec, line2.vec));

                shot.pos = collision.pos;

                // 判定サイズだけ戻す（これしとかないとすり抜けることがある）
                shot.pos.Sub(line.vec.Clone().Normalize().Scale(shot.collision_size / 2));

                shot.color++;



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

        shot.before_reflect_indices = reflect_indices;


        if (reflect_indices.length) {
            // 一定回数反射したら崩壊
            if (shot.reflect_count-- <= 0) {
                shot.remove();
            }

        }


        // return line.begin.Clone().Add(line.end);
    }





};

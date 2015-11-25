var reflect_line_list = [];




var calcReflectVector = function (front, normal) {

    var f_n = front.Clone().Normalize();



    // var normal_n = normal.Clone().Normalize();
    var normal_n = Angle(ToAngle(normal.ToRadian() + Math.PI / 2)).ToVec2();


    return f_n.Sub(Math.Dot(f_n, normal_n).Scale(2).Mul(normal_n)).Normalize().ToRadian();

}


var Reflect = {

    // [[deprecated]]
    __Render: function (context) {


        reflect_line_list.forEach(function(line){


            context.beginPath();     // 1.Pathで描画を開始する
            context.moveTo(line.pos.x,line.pos.y); // 2.描画する位置を指定する
            context.lineTo(line.pos.x + line.vec.x,line.pos.y + line.vec.y); // 3.指定座標まで線を引く
            context.stroke();        // 4.Canvas上に描画する


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

        var b_pos = Vec2(size, 0);



        for (var index in Range(R)) {
            index++;

            console.log(index);

            var angle = Math.PI2 / R * index;

            var x = Math.sin(angle) * size;
            var y = Math.cos(angle) * size;

            var v = Vec2(x, y);


            var v2 = Math.Sub(b_pos, v);


            this.Push(Line(Math.Add(center, b_pos), v2.Scale(1.1)));

            b_pos = v;
        }


    },

    Check: function (line, shot) {

        // 冷静に考えたら forEach で ブロックの外に return できないの不便すぎる
        for (var index = 0; index < reflect_line_list.length; index++) {

            // 連続して同じ壁で反射しないように
            if (shot.before_reflect_index === index) continue;

            var line2 = reflect_line_list[index];

            var collision = __Collision.Line(line, line2);

            if (collision) {

                shot.before_reflect_index = index;
                shot.angle = ToAngle(calcReflectVector(line.vec, line2.vec));

                shot.pos = collision.pos;
                shot.remove();
                shot.color++;

                // 一定回数反射したら崩壊
                if (shot.reflect_count-- <= 0) {
                    shot.remove();
                }

                return;

                // 再帰的な反射は速度的に逆効果な気がするから無視

                /*
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


        // return line.begin.Clone().Add(line.end);
    }





};

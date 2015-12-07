/*
    math.js
*/




Math.PI2 = Math.PI * 2;
Math.ZERO = 1e-5;


/*

function Range(n) {
    return Array.apply(null, {
        length: n
    }).map(Number.call, Number);
}

*/


var Range = function (length, begin) {
    var range = [];
    var end = (begin = begin || 0) + length;

    for (var value = begin; value < end; ++value) {
        range.push(value);
    }

    return range;
};





var ToRadian = function (angle) {
    return angle * Math.PI / 180;
}

var ToAngle = function (radian) {
    return radian * 180 / Math.PI;
}


// min から max の乱数を生成する
function Random(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

// Random の整数版
function Random2(min, max) {
    return min + Math.random() * (max - min);
}




// Vec2 間の距離（比較用）
var _distance = function (x1, y1) {
    return function (x2, y2) {
        var x = x1 - x2;
        var y = y1 - y2;
        return Math.pow(x, 2) + Math.pow(y, 2);
    }
}


// Vec2 間の距離
var distance = function (x1, y1) {
    return function (x2, y2) {
        return Math.sqrt(_distance(x1, y1)(x2, y2));
    }
}



// Vec2 の距離
Math.Length = function (v1, v2) {
    return distance(v1.x, v1.y)(v2.x, v2.y);
}



// Vec2 の外積
Math.Cross = function (v1, v2) {
    return v1.x * v2.y - v1.y * v2.x;
}


// Vec2 の内積
Math.Dot = function (v1, v2) {
    return Vec2(v1.x * v2.x, v1.y * v2.y);
}



// Math.Add(v1, v2) === v1.Clone().Add(v2)
// Math.Sub(v1, v2) === v1.Clone().Sub(v2)


Math.Add = function (v1, v2) {
    return Vec2(v1.x + v2.x, v1.y + v2.y);
}

Math.Sub = function (v1, v2) {
    return Vec2(v1.x - v2.x, v1.y - v2.y);
}



var $Line = function (v1, v2) {

    this.pos = [v1.Clone(), v2.Clone()];

};


$Line.prototype.V1V2 = function () {
    return Vec2.Sub(this.pos[1], this.pos[0]);
};

$Line.prototype.V2V1 = function () {
    return Vec2.Sub(this.pos[0], this.pos[1]);
};


var Line = function (v1, v2) {
    return new $Line(v1, v2);
};


var Circle = function (pos, r) {
    return {
        pos: pos.ToVec2(),
        r: r,
    }
}


var __Collision = {};


__Collision.Line = function (l1, l2) {

    var s1 = l1.pos[0];
    var s2 = l2.pos[0];

    // var v1 = l1.vec.Clone(); // ToVec2();
    // var v2 = l2.vec.Clone(); // ToVec2();

    var v1 = l1.V1V2();
    var v2 = l2.V1V2();


    // var v = s2 - s1;

    // var v = s2.Clone().Sub(s1);

    var v = Vec2.Sub(s2, s1);

    var Crs_v1_v2 = Math.Cross(v1, v2);

    // 平行
    if (Math.abs(Crs_v1_v2) < Math.ZERO) {
        return null;
    }


    var Crs_v_v1 = Math.Cross(v, v1);
    var Crs_v_v2 = Math.Cross(v, v2);

    var t1 = Crs_v_v2 / Crs_v1_v2;
    var t2 = Crs_v_v1 / Crs_v1_v2;

    /*
    var outT1 = Crs_v_v2 / Crs_v1_v2;
    var outT2 = Crs_v_v1 / Crs_v1_v2;
    */

    var eps = Math.ZERO;

    if (t1 + eps < 0 || t1 - eps > 1 || t2 + eps < 0 || t2 - eps > 1) {
        return null;
    }

    // var outPos = s1.Add(v1.Scale(t1));

    var out_pos = Vec2.Add(s1, v1.Scale(t1));


    return {
        pos: out_pos
    };
}

/*

// 線分の衝突
bool ColSegments(
    Segment & seg1, // 線分1
    Segment & seg2, // 線分2
    float * outT1 = 0, // 線分1の内分比（出力）
    float * outT2 = 0, // 線分2の内分比（出力
    D3DXVECTOR2 * outPos = 0 // 交点（出力）
) {

*/





// Vec2
var $Vec2 = function (x, y) {
    this.x = x;
    this.y = y;
}


$Vec2.prototype.Clone = function () {
    return Vec2(this.x, this.y);
}



// 近い方の Vec2 を返す
$Vec2.prototype.near = function (v1, v2) {
    var distance = _distance(this.x, this.y);

    var d1 = distance(v1.x, v1.y);
    var d2 = distance(v2.x, v2.y);

    return d1 < d2 ? v1 : v2;
}

// 遠い方の Vec2 を返す
$Vec2.prototype.far = function (v1, v2) {
    var distance = _distance(this.x, this.y);

    var d1 = distance(v1.x, v1.y);
    var d2 = distance(v2.x, v2.y);

    return d1 > d2 ? v1 : v2;
}



// 角度に
$Vec2.prototype.ToRadian = function () {
    return Math.atan2(this.x, this.y);
}


$Vec2.prototype.ToAngle = function () {
    return ToAngle(this.ToRadian());
}


$Vec2.prototype.Rotate = function (angle) {

    // 行列使った方が速度でるかも？

    var vec = Angle(this.ToAngle() + angle).ToVec2()

    this.x = vec.x;
    this.y = vec.y;

    return this;

}


// 法線ベクトルに変換する
$Vec2.prototype.ToNormal = function () {
    return Vec2(-this.y, this.x);
}




// 長さ
$Vec2.prototype.Length = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
}



// 正規化
$Vec2.prototype.Normalize = function () {

    var length = this.Length();

    // 無効値
    if (length < Math.ZERO) {
        // console.warn('Vec2 の正規化に失敗しました');
        return this;
    }

    var _m = 1.0 / length;

    this.x *= _m;
    this.y *= _m;

    return this;
}

// operator*= && operator/=
$Vec2.prototype.Scale = function (value) {
    this.x *= value;
    this.y *= value;
    return this;
}


$Vec2.prototype.Reverse = function () {
    this.x *= -1;
    this.y *= -1;
    return this;
}


// operator+=
$Vec2.prototype.Add = function (vec) {
    this.x += vec.x;
    this.y += vec.y;
    return this;
}

// operator-=
$Vec2.prototype.Sub = function (vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
}


$Vec2.prototype.Mul = function (vec) {
    this.x *= vec.x;
    this.y *= vec.y;
    return this;
}



var Vec2 = function (x, y) {
    return new $Vec2(x, y);
};


(function () {

    Array.prototype.forEach.call(arguments, function (name) {

        this[name] = function (v1, v2) {
            return v1.Clone()[name](v2);
        }

    }, Vec2);


}('Add', 'Sub', 'Scale', 'Reverse'));



var Matrix2D = {


    Transform: function (vec, mat) {
        var x = vec.x * mat[0][0] + vec.y * mat[1][0] + mat[1][0];
        var y = vec.x * mat[0][1] + vec.y * mat[1][1] + mat[1][1];

        return Vec2(x, y);
    },

    Rotate: function (angle) {

        var radian = ToRadian(angle);

        var cos = Math.cos(radian);
        var sin = Math.sin(radian);

        return [
            [cos, sin],
            [-sin, cos],
            [0, 0],
        ];

    },



};



Object.defineProperty(Array.prototype, 'ToVec2', {
    value: function () {
        return Vec2(this[0], this[1]);
    }
});



function _Angle(value) {
    this.value = value;
}

_Angle.prototype.Add = function (value) {
    this.value += value;
    return this;
}

_Angle.prototype.Sub = function (value) {
    this.value -= value;
    return this;
}


_Angle.prototype.ToVec2 = function () {
    var radian = this.ToRadian();
    return Vec2(Math.sin(radian), Math.cos(radian));
}


_Angle.prototype.ToRadian = function () {
    return this.value * Math.PI / 180;
}




var Angle = function (value) {
    return new _Angle(value);
}

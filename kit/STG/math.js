/*
    math.js
*/



function Range(n) {
    return Array.apply(null, {
        length: n
    }).map(Number.call, Number);
}


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


Math.PI2 = Math.PI * 2;
Math.ZERO = 1e-5;


Math.Cross = function (v1, v2) {
    return v1.x * v2.y - v1.y * v2.x;
}


var __Collision = {};


__Collision.Line = function (s1, v1, s2, v2) {

    // var v = s2 - s1;

    var v = s2.Clone.Sub(s1);

    var Crs_v2tov1tov3 = Vec(0, 1, 2);


    var Crs_v1_v2 = Math.Cross(v1, v2);

    if (Crs_v1_v2 < Math.ZERO) {
        return false;
    }

    var Crs_v_v1 = D3DXVec2Cross(v, v1);
    var Crs_v_v2 = D3DXVec2Cross(v, v2);


    var t1 = Crs_v_v2 / Crs_v1_v2;
    var t2 = Crs_v_v1 / Crs_v1_v2;



var outT1 = Crs_v_v2 / Crs_v1_v2;
var outT2 = Crs_v_v1 / Crs_v1_v2;


    var eps = Math.ZERO;

    if (t1 + eps < 0 || t1 - eps > 1 || t2 + eps < 0 || t2 - eps > 1) {
        return false;
    }

    var outPos = s1 + v1 * t1;

    return true;
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
var _Vec2 = function (x, y) {
    this.x = x;
    this.y = y;
}




// 近い方の Vec2 を返す
_Vec2.prototype.near = function (v1, v2) {
    var distance = _distance(this.x, this.y);

    var d1 = distance(v1.x, v1.y);
    var d2 = distance(v2.x, v2.y);

    return d1 < d2 ? v1 : v2;
}

// 遠い方の Vec2 を返す
_Vec2.prototype.far = function (v1, v2) {
    var distance = _distance(this.x, this.y);

    var d1 = distance(v1.x, v1.y);
    var d2 = distance(v2.x, v2.y);

    return d1 > d2 ? v1 : v2;
}


// 方向
_Vec2.prototype.angle = function (vec) {
    return ToAngle(Math.atan2(this.x - vec.x, this.y - vec.y));
}



// 角度に
_Vec2.prototype.ToRadian = function () {
    return Math.atan2(this.x, this.y);
}



// 複製
_Vec2.prototype.Clone = function () {
    return new _Vec2(this.x, this.y);
}



// 長さ
_Vec2.prototype.length = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
}



// 正規化
_Vec2.prototype.Normalize = function () {

    var length = this.length();

    // 無効値
    if (length < Math.ZERO) {
        console.warn('Vec2 の正規化に失敗しました');
        return this;
    }

    var _m = 1.0 / length;

    this.x *= _m;
    this.y *= _m;

    return this;
}

// operator*= && operator/=
_Vec2.prototype.Scale = function (value) {
    this.x *= value;
    this.y *= value;
    return this;
}



// operator+=
_Vec2.prototype.Add = function (vec) {
    this.x += vec.x;
    this.y += vec.y;
    return this;
}

// operator-=
_Vec2.prototype.Sub = function (vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
}


var Vec2 = function (x, y) {
    return new _Vec2(x, y);
}


Object.defineProperty(Array.prototype, 'ToVec2', {
    value: function () {
        return Vec2(this[0], this[1]);
    }
});



function _Angle(value) {
    this.value = value;
}

// [[deprecated]]
_Angle.prototype.add = function (value) {
    this.value += value;
    return this;
}

// [[deprecated]]
_Angle.prototype.sub = function (value) {
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

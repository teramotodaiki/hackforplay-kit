/*
    math.js
*/

function range(n)
{
    return Array.apply(null,
    {
        length: n
    }).map(Number.call, Number);
}


var toRadian = function(angle)
{
    return angle * Math.PI / 180;
}

var toAngle = function(radian)
{
    return radian * 180 / Math.PI;
}





// Vec2 間の距離（比較用）
var _distance = function(x1, y1)
{
    return function(x2, y2)
    {
        var x = x1 - x2;
        var y = y1 - y2;
        return Math.pow(x, 2) + Math.pow(y, 2);
    }
}


// Vec2 間の距離
var distance = function(x1, y1)
{
    return function(x2, y2)
    {
        return Math.sqrt(_distance(x1, y1)(x2, y2));
    }
}



Math.PI2 = Math.PI * 2;

// Vec2
var _Vec2 = function(x, y)
{
    this.x = x;
    this.y = y;
}



// 近い方の Vec2 を返す
_Vec2.prototype.near = function(v1, v2)
{
    var distance = _distance(this.x, this.y);

    var d1 = distance(v1.x, v1.y);
    var d2 = distance(v2.x, v2.y);

    return d1 < d2 ? v1 : v2;
}

// 遠い方の Vec2 を返す
_Vec2.prototype.far = function(v1, v2)
{
    var distance = _distance(this.x, this.y);

    var d1 = distance(v1.x, v1.y);
    var d2 = distance(v2.x, v2.y);

    return d1 > d2 ? v1 : v2;
}



// 方向
_Vec2.prototype.angle = function(vec)
{
    return Math.atan2(this.x - vec.x, this.y - vec.y);
}



// 角度に
_Vec2.prototype.toRadian = function()
{
    return Math.atan2(this.x, this.y);
}


// 複製
_Vec2.prototype.copy = function()
{
    return new _Vec2(this.x, this.y);
}


// 長さ
_Vec2.prototype.length = function()
{
    return Math.sqrt(this.x * this.x + this.y * this.y);
}


// 正規化
_Vec2.prototype.normalize = function()
{

    var length = this.length();

    // 無効値
    if (length < 1e-5)
    {
        return this;
    }

    var _m = 1.0 / length;

    this.x *= _m;
    this.y *= _m;

    return this;
}

// operator*= && operator/=
_Vec2.prototype.scale = function(value)
{
    this.x *= value;
    this.y *= value;
    return this;
}


// operator+=
_Vec2.prototype.add = function(vec)
{
    this.x += vec.x;
    this.y += vec.y;
    return this;
}

// operator-=
_Vec2.prototype.sub = function(vec)
{
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
}


var Vec2 = function(x, y)
{
    return new _Vec2(x, y);
}

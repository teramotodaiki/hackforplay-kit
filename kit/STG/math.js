

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



Math.PI2 = Math.PI * 2;

// Vec2
var _Vec2 = function(x, y)
{
    this.x = x;
    this.y = y;
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

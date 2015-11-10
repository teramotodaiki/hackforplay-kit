Math.PI2 = Math.PI * 2;

// Vec2
var _Vec2 = function(x, y)
{
    this.x = x;
    this.y = y;
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


var _Vec3 = function(x, y, z)
{
    this.x = x;
    this.y = y;
    this.z = z;
}

_Vec3.prototype.xy = function()
{
    return Vec2(x, y);
}

_Vec3.prototype.xz = function()
{
    return Vec2(x, z);
}

//
/*
var Vec3 = function(x, y, z)
{
	return new _Vec3(x, y, z);
}
*/

var _pad = Vec2(0, 0);


var Size = function(width, height)
{
    this.width = width;
    this.height = height;
}


var sceneSize = new Size();


// キャラクター
var Character = enchant.Class.create(enchant.Sprite,
{
    initialize: function(width, height)
    {
        enchant.Sprite.call(this, width, height);

        // x, y
        this.pos = Vec2(0, 0);


        // 方向
        this.vec = Vec2(0, 0);

        // 移動速度
        this.speed = 1.0;

    },

    // 座標を画面内に収める
    clampPos: function()
    {
        this.pos.x = this.pos.x < 0 ? 0 : this.pos.x > sceneSize.width ? sceneSize.width : this.pos.x;
        this.pos.y = this.pos.y < 0 ? 0 : this.pos.y > sceneSize.height ? sceneSize.height : this.pos.y;
    },

    // フレームの最後に実行
    _test: function()
    {
        this.clampPos();

        this.x = this.pos.x - this.width / 2;
        this.y = this.pos.y - this.height / 2;


    },


    move: function()
    {
        // キャラクターの方向を取得
        var moveVec = Vec2(this.vec.x, this.vec.y);
        // moveVec.normalize();


        // 移動
        this.pos.add(moveVec.scale(this.speed));


    },

});



var CreateClass = enchant.Class.create;

var Player = enchant.Class.create(Character,
{
    initialize: function(width, height)
    {
        Character.call(this, width, height);



    },
    onenterframe: function()
    {

        this.vec = _pad;



        //		console.log('pos: ' + this.pos.x + ' / ' + this.pos.y)


        this.move();




        this._test();

    }

});

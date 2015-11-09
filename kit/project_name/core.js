

// Vec2 
var _Vec2 = function(x, y)
{
	this.x = x;
	this.y = y;
}


// 長さ
_Vec2.prototype.length = function()
{
	return Math.sqrt(this.x * this.x + this.y + this.y);
}

// 正規化
_Vec2.prototype.normalize = function()
{


	var length = this.length();

	if(length === 0)
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

		this.speed = 1.0;


	},


	// フレームの最後に実行
	_test: function()
	{
		this.x = this.pos.x;
		this.y = this.pos.y;

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


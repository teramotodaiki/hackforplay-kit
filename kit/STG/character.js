var _pad = Vec2(0, 0);


var Size = function(width, height)
{
    this.width = width;
    this.height = height;
}


var sceneSize = new Size();

/*

*/




// キャラクター
var Character = enchant.Class.create(enchant.Sprite,
{
    initialize: function(width, height)
    {
        enchant.Sprite.call(this, width, height);

        // x, y
        this.pos = Vec2(0, 0);


        this.hp = null;


        this.spell;

        // spell
        // this.spell =

        // 方向
        this.vec = Vec2(0, 0);

        // 移動速度
        this.speed = 1.0;

    },

    // set pos
    locate: function(x, y)
    {
        this.pos.x = x;
        this.pos.y = y;
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



// 敵キャラ
var Enemy = enchant.Class.create(Character,
{
    initialize: function(width, height)
    {
        Character.call(this, width, height);

    }
});



var Player = enchant.Class.create(Character,
{
    initialize: function(width, height)
    {
        Character.call(this, width, height);


        this.attackSpell;

    },



    // ◆初級◆ 通常攻撃を設定する
    updateAttackBarrage: function()
    {


        barrage.creator = this;

        var spell = CreateSpell();

        spell.name = '通常攻撃';

        spell.addBarrage(barrage);

        this.attackSpell = spell;




    },


    onenterframe: function()
    {

        // 攻撃する
        if (input.z)
        {
            this.attackSpell.fire();
        }
        else
        {
            this.attackSpell.resetFrame();
        }


        this.vec = _pad;


        //		console.log('pos: ' + this.pos.x + ' / ' + this.pos.y)


        this.move();




        this._test();

    }

});

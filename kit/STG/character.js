var _pad = Vec2(0, 0);


var Size = function(width, height)
{
    this.width = width;
    this.height = height;
}


var sceneSize = new Size();

/*

*/


var EnumBlendMode = {
    Add: 'lighter',

};




// キャラクター
var Character = enchant.Class.create(enchant.Sprite,
{
    initialize: function(width, height)
    {
        enchant.Sprite.call(this, width, height);

        this.type = 'character';

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


    // pos を x, y に
    convertPos: function()
    {
        this.x = this.pos.x - this.width / 2;
        this.y = this.pos.y - this.height / 2;
    },

    // set pos
    locate: function(x, y)
    {
        this.pos.x = x;
        this.pos.y = y;

        this.convertPos();

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

        this.convertPos();

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


// 移動パターン
var movePatterns = {};
var MovePattern = {

    // 登録する
    Register: function(name, callback)
    {
        movePatterns[name] = callback;
    },

    // 使用する
    Use: function(name, target)
    {
        movePatterns[name].call(target.tl);
    }

};




// 敵キャラ
var Enemy = enchant.Class.create(Character,
{
    initialize: function(width, height)
    {
        Character.call(this, width, height);

        enemies.push(this);


        this.backgroundColor = '#00f';

    },

    // 移動パターンを設定する
    __set_move: function(name)
    {
        MovePattern.Use(name, this);


        console.log(this.tl);

    },

    __set_motion: function(name)
    {

        Motion.Use(name, this);
    },

    // speed を考慮した TL の制御（仮）
    __speed: function() {




    },

    onenterframe: function()
    {
        // this.move();

        this.__speed();

    }
});



var Player = enchant.Class.create(Character,
{
    initialize: function(width, height)
    {
        Character.call(this, width, height);


        this.attackSpell;

    },

    // 通常攻撃スペルを設定する
    setAttackSpell: function(name)
    {
        this.attackSpell = __Spell.Get(name);


        // 弾幕の親になる
        this.attackSpell.attributeAll(
        {
            creator: this
        });



    },


    // 弾幕から通常攻撃を登録
    __set_attackSpellFromBarrage: function(name)
    {

        var barrage = __Barrage.Get(name).attribute(
        {
            creator: this,
        });


        var spell = CreateSpell();
        spell.addBarrage(barrage);

        spell.name = 'w';


        this.attackSpell = spell;
    },

    __set_attackSpell: function(name)
    {
        //        this.attackSpell = __Barrage.Get(name);
    },

    // ◆初級◆ 通常攻撃を設定する
    updateAttackBarrage: function()
    {


        barrage.creator = this;

        var spell = new Spell();

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

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


var Palette = {

    Red: 0,
    Green: 1,
    Blue: 2,
    Yellow: 3,
    White: 6

};




// キャラクター
var Character = enchant.Class.create(enchant.Sprite,
{
    initialize: function(width, height)
    {
        enchant.Sprite.call(this, width, height);

        this.type = 'character';

        this.collision_size = 15.0;
        this.barrage_count = {};


        // x, y
        this.pos = Vec2(0, 0);


        // 方向
        this.vec = Vec2(0, 0);

        // 移動速度
        this.speed = 1.0;

        character_list.push(this);


        this.power = 1.0;


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

Character.prototype.TEST_ALERT = function()
{
    alert('test');
}




// 敵キャラ
var Enemy = enchant.Class.create(Character,
{
    initialize: function(width, height)
    {
        Character.call(this, width, height);

        enemies.push(this);


        this.type = 'enemy';


        this.backgroundColor = '#00f';


        this.hp = 10;


        this.count = 0;


        // 攻撃開始時間
        this.attack_begin_time = null;

        // 攻撃回数
        this.attack_end_time = null;


        this.spell = null;


        this.motion_name = '';


    },


    ReloadMotion: function()
    { // tl.clear だとイベントが破棄されないっぽいから初期化（物理）
        this.tl = new enchant.Timeline(this);
    },

    // 移動処理を設定する
    setMotion: function(name)
    {
        this.motion_name = name;


        Motion.Use(name, this);
    },

    onenterframe: function()
    {
        // this.move();

        this.time = CountToTime(this.count);

        // TL を使用するから x, y から pos に逆輸入

        /*
        this.pos.x = this.x + this.width / 2;
        this.pos.y = this.y + this.height / 2;

        */

        if (this.timeline !== undefined)
        {
            this.timeline.Update(this);
            this.convertPos();
        }

        // this.spell.counts = this.spellCounts;



        // 攻撃する
        if (this.spell && (this.attack_begin_time === null || this.attack_begin_time <= this.time) && (this.attack_end_time === null || this.attack_end_time >= this.time))
        {

            this.spell.Update(this);

        }



        this.count++;

    }
});



Enemy.prototype.SetHP = function(hp)
{
    this.hp = this.maxHP = hp;
}


// スペルを登録する
Enemy.prototype.SetSpell = function(name)
{

    this.spell = __Spell.Get(name).Clone();


    // barrage_count を初期化する
    this.spell.barrages.forEach(function(barrage)
    {
        this.barrage_count[barrage.handle] = 0;
    }, this);


}

// 被弾
Enemy.prototype.Damage = function(damage)
{

    console.log('hp: ' + this.hp);

    this.hp -= damage;


    if (this.hp <= 0)
    {
        this.remove();
    }

}




var Player = enchant.Class.create(Character,
{
    initialize: function(width, height)
    {
        Character.call(this, width, height);

        this.type = 'player';

        this.attackSpell;

        this.count = 0;
        this.attackSpellCount = 0;
        this.bombSpellCount = 0;


        this.escape_count = 0;
        this.escape_time = 0.0;

    },

    // 通常攻撃スペルを設定する
    SetAttackSpell: function(name)
    {



        // this.spell = __Spell.Get(name);


        this.attackSpell = __Spell.Get(name);


        // barrage_count を初期化する
        this.attackSpell.barrages.forEach(function(barrage)
        {
            this.barrage_count[barrage.handle] = 0;
        }, this);

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





        // 通常攻撃
        if (this.attackSpell)
        {

            // 攻撃する
            if (input.z)
            {
                console.log('z');
                this.attackSpell.Update(this);
            }
            else
            {
                this.attackSpell.ResetCount(this);
            }
        }





        this.vec = _pad;


        //		console.log('pos: ' + this.pos.x + ' / ' + this.pos.y)


        this.move();



        this._test();


        this.escape_time = CountToTime(this.escape_count++);
        Debug.Set('escape-time', this.escape_time.toFixed(2));


    }

});


// 被弾
Player.prototype.Damage = function(damage)
{
    this.escape_count = 0;
    this.hp -= damage;
}

/* メモ
    Array.forEach 使ってもいいのか
    canvas 自体が IE9 以降だし IE8 以下には消えてもらうしか
*/


/* 魔道書の予定


    //----------// 簡単に遊べる使い方 //----------//
    // 簡単だけど色々作れるのが理想


    barrage.ステータス = 値;


    // player の攻撃を barrage にする
    player.updateAttackBarrage();



    //----------// 上級者向け //----------//

    // 新しい弾幕を生成する
    var newBarrage = CreateBarrage();

    // カスタム弾幕を登録
    player.registerCustomBarrage(newBarrage);


*/


var scene, input, game;

// 敵キャラ
var enemies = [];

// プレイヤー
var player;


// キャラクター管理
var character_list = [];

var CharacterList = {


    Each: function(type, callback)
    {

        character_list.forEach(function(character)
        {
            if (character.type === type)
            {
                callback.call(character);
            }
        });
    }


}



// 弾
var Shot = enchant.Class.create(enchant.Sprite,
{
    initialize: function(creator)
    {
        Sprite.call(this, 24, 24);

        //

        this.compositeOperation = 'lighter';


        // 能力の使用者
        this.creator = creator;


        this.pos = Vec2(0, 0);


        this.pos.x = creator.pos.x;
        this.pos.y = creator.pos.y;

        // 仮
        this.target = 'enemy';

        this.frame = 0;
        // this.image = shotTexture;

        this.backgroundColor = '#0f0';

        this.VecToPos();




    },

    // pos を x, y に
    VecToPos: function()
    {
        this.x = this.pos.x - this.width / 2;
        this.y = this.pos.y - this.height / 2;
    },

    // 自身を削除する
    remove: function()
    {
        scene.removeChild(this);
    },

    // 衝突
    hit: function(target)
    {

        if (this.within(target))
        {
            this.remove();
        }

    },

    // シンプルな弾制御
    move: function()
    {


        this.pos.add(this.angle.copy().scale(this.speed));


        // ベクトル使った方がイイかも
        /*
        this.x += Math.sin(this.angle) * this.speed;
        this.y += Math.cos(this.angle) * this.speed;
        this.angle += this.addAngle;
        */

        this.VecToPos();

    },

    onenterframe: function()
    {


        // 移動
        this.move();

        // 敵を狙う（自機弾）
        if (this.target === 'enemy')
        {
            var _this = this;
            // 敵と衝突判定
            enemies.forEach(function(enemy)
            {

                _this.hit(enemy);

            });


        }
        // プレイヤーを狙う（敵弾）
        else
        {
            this.hit(player);
        }

        /*
        // スライム虐待
        if (this.within(blueSlime))
        {

            this.remove();
        }
        */

        ++this.frame;

        // 寿命
        if (this.frame >= this.life)
        {

            this.remove();
        }
    }

});






var ShotEvent = function()
{

    // イベントの適用範囲
    this.beginFrame = 0;
    this.endFrame = 0;

}


var Barrage = function()
{


    this.shots = [];

    this.events = [];

    // 識別番号
    this.handle = null;

    this.frame = 0;

    this.createFrame = 30;

    this.way = 3;

    this.speed = 3;

    this.frame = 0;

    this.power = 1;

    // 軸
    this.axisAngle = Math.PI;

    // 撃つ範囲角度
    this.rangeAngle = Math.PI2;


    // this.addAngle = Math.PI / 300;

    this.life = 300;

    this.creator = null;


    this.__control = null;


    // this.axis = Vec2(0, 0);

}


// 弾幕を自由に制御できる関数を設定
Barrage.prototype.control = function(control)
{

    this.__control = control;

    return this;
}



// イベント
Barrage.prototype.addEvent = function(callback)
{
    //events



}

Barrage.prototype.attribute = function(object)
{
    for (var key in object)
    {
        this[key] = object[key];
    }
    return this;
}




// 弾を追加
Barrage.prototype.addShot = function()
{


    // 仮
    for (var i in range(this.way))
    {

        var shot = new Shot(this.creator);


        // プロパティを追加
        // shot = $.extend(shot, this);

        shot.speed = this.speed;

        shot.angle = Vec2(0, 0);


        var beginAngle = this.axisAngle - this.rangeAngle / 2;
        var stepAngle = this.rangeAngle / this.way;
        var angle = beginAngle + stepAngle * i;



        shot.angle.x = Math.sin(angle);
        shot.angle.y = Math.cos(angle);



        // scene.insertBefore(shot, player);

        scene.addChild(shot);
        this.shots.push(shot);

    }




}

// 弾幕を更新する
Barrage.prototype.update = function()
{

    // 完全に自由な制御
    if (this.__control)
    {
        this.__control.call(this);
    }



    if (this.frame % this.createFrame === 0)
    {
        this.addShot();
    }


    ++this.frame;
}





// 弾幕を生成する
var CreateBarrage = function()
{
    return new Barrage();
}


var Spell = function()
{
    this.name = '';
    // 弾幕の識別に使用する値
    this.handleIndex = 0;

    this.barrages = [];

    this.frame = 0;
}

Spell.prototype.resetFrame = function()
{
    this.frame = 0;

    this.barrages.forEach(function(barrage)
    {
        barrage.frame = 0;
    });

}


// オブジェクトのプロパティをコピー
Spell.prototype.attribute = function(object)
{
    for (var key in object)
    {
        this[key] = object[key];
    }
    return this;
}

// オブジェクトのプロパティを全ての弾幕にコピー
Spell.prototype.attributeAll = function(object)
{
    this.barrages.forEach(function(barrage)
    {
        barrage.attribute(object);
    });
}



// 技を生成する
var CreateSpell = function()
{
    return new Spell();
}


// 弾幕を追加する
Spell.prototype.addBarrage = function(barrage)
{
    this.barrages.push(barrage);
}



// Barrage.update 弾を生成する
Spell.prototype.fire = function()
{

    this.barrages.forEach(function(barrage)
    {
        barrage.update();
    });

}


// 技の名前とか表示するやつ
Spell.prototype.statusRender = function()
{
    /* default */
};




//

barrage = CreateBarrage();


/*
    かなり遊ぶ側の難易度が高い気がする
    できればもっと簡略化したい（けど条件を文字列として eval するのは闇が深そう）
*/
barrage.addEvent(function(status)
{
    return status.frame > 100;
},
{
    way: 10
});



var barrage_asset = {};

var __Barrage = {

    Get: function(name)
    {
        return barrage_asset[name];
    },


    New: function(name, property)
    {

        var barrage = barrage_asset[name] = new Barrage();

        if (property)
        {
            barrage.attribute(property);
        }


        return barrage;
    },



}

var spell_asset = {};

var __Spell = {

    // スペルを取得する
    Get: function(name)
    {
        return spell_asset[name];
    },

    // 技を作成する
    Make: function(name, property)
    {


        // Spell.Make('name')('b1', 'b2', 'b3');
        // Spell.Make('name', { property: value })('b1', 'b2', 'b3');


        var spell = spell_asset[name] = new Spell();


        if (property)
        {
            spell.attribute(property);
        }

        return function()
        {
            for (var index in range(arguments.length))
            {

                spell.addBarrage(__Barrage.Get(arguments[index]));

            }

            return spell;

        }

    }



}

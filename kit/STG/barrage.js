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





var preload_textures = {};

var preload_sources = [];

preload_sources.push('hackforplay/enchantbook.png', 'enchantjs/x2/map2.png', 'hackforplay/dot_syuj.png', 'enchantjs/x2/icon0.png', 'enchantjs/font2.png', 'enchantjs/monster1.gif',
    'dots_design/bg10_3.gif', 'dot_art_world/SC-Door-Entce03.png', 'rengoku-teien/asa_no_komorebi.mp3', 'etolier/01sougen.jpg');

var Assets = {
    Add: function(name, source)
    {

        preload_sources.push(source);

        preload_textures[name] = source;

    },

    Preload: function()
    {
        game.preload(preload_sources);
    },

    Get: function(name)
    {
        return game.assets[preload_textures[name]];
    }

};





// 敵キャラ
var enemies = [];

// プレイヤー
var player;


// キャラクター管理
var character_list = [];

var CharacterList = {


    Each: function(type, callback)
    {

        scene.childNodes.forEach(function(character)
        {
            if (character.type === type)
            {
                callback.call(character);
            }
        });
    },

    // base に一番近い type のキャラクターを取得する
    GetNear: function(base, type)
    {

        var target = null;
        this.Each(type, function()
        {

            if (base !== this)
            {

                if (!target)
                {
                    target = this;
                }
                else
                {
                    target = base.pos.near(target, this);
                }
            }

        });

        return target;
    }


}



// 弾
var Shot = enchant.Class.create(enchant.Sprite,
{
    initialize: function(creator, size)
    {
        Sprite.call(this, size, size);

        this.compositeOperation = 'lighter';

        // 能力の使用者
        this.creator = creator;


        this.pos = Vec2(0, 0);

        this.pos.x = creator.pos.x;
        this.pos.y = creator.pos.y;


        this.angle = Angle(0);

        // 仮
        this.targetType = 'enemy';

        this.count = 0;

        this.spriteSize = size;

        this.__control = null;

        this.updatePos();

    },

    resize: function()
    {
        this.scaleX = this.scaleY = (this.size / this.spriteSize);

    },

    // (pos) を (x, y) に反映する
    updatePos: function()
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
        this.resize();


        this.pos.add(this.angle.toVec2().scale(this.speed));


        this.updatePos();

    },

    onenterframe: function()
    {

        // 完全に自由な制御
        if (this.__control)
        {
            this.__control.call(this);
        }



        // 移動
        this.move();


        var self = this;

        // 攻撃対象に被弾判定
        CharacterList.Each(this.targetType, function()
        {

            self.hit(this);

        });

        // 寿命
        if (this.count++ >= this.life)
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

    this.textureName = 'shot-none';


    this.shots = [];

    this.events = [];

    // 識別番号
    this.handle = null;

    this.frame = 0;

    this.createFrame = 30;

    this.way = 3;

    this.speed = 3;

    this.size = 10;

    this.frame = 0;

    this.power = 1;

    // 軸
    this.axisAngle = 0;

    // 撃つ範囲角度
    this.rangeAngle = 360;



    // this.addAngle = Math.PI / 300;

    this.life = 300;

    this.creator = null;


    this.__control = null;
    this.__shotControl = null;


    // this.axis = Vec2(0, 0);

}


// 弾幕を自由に制御できる関数を設定
Barrage.prototype.control = function(control)
{
    this.__control = control;
    return this;
}

// 弾を自由に制御できる関数を設定
Barrage.prototype.shotControl = function(control)
{
    this.__shotControl = control;
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


    var shotTexture = Assets.Get(this.textureName);
    var shotSize = shotTexture.height;


    // 仮
    for (var i in range(this.way))
    {


        var shot = new Shot(this.creator, shotSize);


        // プロパティを追加
        // shot = $.extend(shot, this);

        shot.speed = this.speed;

        shot.angle = Vec2(0, 0);

        shot.life = this.life;

        shot.__control = this.__shotControl;


        var beginAngle = this.axisAngle - this.rangeAngle / 2;
        var stepAngle = this.rangeAngle / this.way;
        var angle = beginAngle + stepAngle * i;


        shot.image = Assets.Get(this.textureName);


        shot.size = this.size;

        shot.angle = Angle(angle - 180);


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


// target の方向に axisAngle を向ける
Barrage.prototype.setAxisFromTarget = function(target)
{
    // 標的がいるなら軸を向け、いないならとりあえず上に
    this.axisAngle = target ? this.creator.pos.angle(target.pos) : 0;
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

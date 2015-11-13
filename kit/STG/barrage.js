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



// 秒をフレームカウントに変換する
var TimeToCount = function(time)
{
    return Math.round(time * game.fps);
}

// フレームカウントを病に変換する
var CountToTime = function(count)
{
    return count / game.fps;
}



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

        this.type = 'shot';



        this.compositeOperation = 'lighter';


        // 画面外に出た場合削除するか
        this.outScreenRemove = true;

        this.time = 0.0;

        // 能力の使用者
        this.creator = creator;

        this.pos = Vec2(0, 0);

        this.pos.x = creator.pos.x;
        this.pos.y = creator.pos.y;


        // 移動方向
        this.angle = Angle(0);



        // 仮
        this.targetType = 'enemy';

        this.count = 0;

        this.spriteSize = size;

        this.__control = null;

        this.events = [];

    },

    // 色を変更する
    Color: function(color)
    {
        this.frame = color;
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



        // 画面外に出た場合
        if (this.outScreenRemove)
        {
            if (this.pos.x < 0 || this.pos.x > scene.width || this.pos.y < 0 || this.pos.y > scene.height)
            {
                this.remove();
                return;
            }
        }





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


        this.pos.add(this.angle.toVec2().scale(this.speed));


    },

    onenterframe: function()
    {


        this.resize();
        this.updatePos();

        var self = this;

        // 完全に自由な制御
        if (this.__control)
        {
            this.__control.call(this);
        }

        // イベントを実行する
        this.events.forEach(function(event)
        {
            event.call(self);
        });




        // 移動
        this.move();




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



        this.time = CountToTime(this.count);

    }

});


Shot.prototype.attribute = function(object)
{
    for (var key in object)
    {
        this[key] = object[key];
    }
    return this;
}


// 初期化後に呼ぶ
Shot.prototype.InitializeUpdate = function()
{
    this.updatePos();
    this.resize();
}




var Barrage = function()
{

    this.textureName = 'shot-none';

    this.time = 0.0;

    this.shots = [];

    this.events = [];

    // 識別番号
    this.handle = null;

    this.frame = 0;

    this.createFrame = 30;

    // 何秒で生成するか
    this.createTime = 1.0;

    this.way = 3;





    this.speed = 3;

    this.size = 10;

    this.count = 0;

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

    this.shotEvents = [];

    this.targetType = 'player';


    // 詳細設定


    // creator から createPos 離れた場所に弾が生成される
    this.createPos = 0;


    // 並べる
    this.repeat = 1;
    this.repeatAngle = 0;

    // 横に並べる
    this.repeatX = 1;
    this.repeatSpaceX = 0;

    // 縦に並べる


}


Barrage.prototype.AddShotEvent = function(time, property)
{
    time *= game.fps;
    this.shotEvents.push(function()
    {
        if (this.count <= time)
        {
            this.attribute(property)
            {}
        }
    });
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
    for (var way in range(this.way))
    {

        // 弾の角度を算出
        var beginAngle = this.axisAngle - this.rangeAngle / 2;
        var stepAngle = this.rangeAngle / this.way;
        var angle = beginAngle + stepAngle * way;



 angle -= (this.repeat -1 ) * this.repeatAngle / 2 ;


        var shotProperty = {


            speed: this.speed,
            life: this.life,
            __control: this.__shotControl,
            targetType: this.targetType,
            image: Assets.Get(this.textureName),
            size: this.size,

        };


        // プロパティを追加
        // shot = $.extend(shot, this);


        /*
        this.shotEvents.forEach(function(event)
        {
            shot.events.push(event);
        })
        */



        // 弾を登録する

        // ずらし配置みたいな
        for (var repeat in range(this.repeat))
        {


            // 横に並べる
            for (var x in range(this.repeatX))
            {



                shotProperty.angle = Angle(angle);


                // 弾を生成する
                var shot = new Shot(this.creator, shotSize);

                // プロパティを登録
                shot.attribute(shotProperty);


                var shotWidth = (this.repeatX - 1) * this.repeatSpaceX;
                shot.pos.sub(Vec2(shotWidth / 2, 0));


                shot.pos.add(Vec2(this.repeatSpaceX * x, 0));


                // 使用者から距離を取る
                shot.pos.add(shot.angle.toVec2().scale(this.createPos));

                // 弾を登録する
                shot.InitializeUpdate();
                scene.addChild(shot);
                this.shots.push(shot);


            }


            angle += this.repeatAngle;


        }


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


    var count = TimeToCount(this.createTime) | 0;


    if ((this.count++ % count) === 0)
    {
        this.addShot();
    }


    this.time = CountToTime(this.count);

}


// target の方向に axisAngle を向ける
Barrage.prototype.setAxisFromTarget = function(target)
{
    // 標的がいるなら軸を向け、いないならとりあえず上に
    this.axisAngle = target ? this.creator.pos.angle(target.pos) - 180 : 0;
}




// 弾幕を組み合わせてスペルを創造する
var Spell = function()
{
    this.name = '';

    this.barrages = [];


}


// [[deprecated]]
Spell.prototype.resetCount = function()
{
    this.count = 0;
    this.barrages.forEach(function(barrage)
    {
        barrage.count = 0;
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



// 弾幕を追加する
Spell.prototype.addBarrage = function(barrage)
{

    var barrage2 = $.extend(
    {}, barrage);

    this.barrages.push(barrage2);
}

// 弾幕を追加する
Spell.prototype.pushBarrage = function(barrage)
{
    this.barrages.push(barrage);
}

// 更新する
Spell.prototype.update = function(creator)
{

    this.barrages.forEach(function(barrage)
    {

        barrage.count = creator.count;
        barrage.creator = creator;

        barrage.update();
    });

}



// 技の名前とか表示するやつ
Spell.prototype.statusRender = function()
{
    /* default */
};




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

        return function(Args___)
        {
            for (var index in range(arguments.length))
            {

                spell.pushBarrage(__Barrage.Get(arguments[index]));

            }

            return spell;

        }

    }



}

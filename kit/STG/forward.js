// 前方宣言
var scene, input, game, player;


var Key;


// 敵キャラ
var enemies = [];

// プレイヤー
var player;


var Class = function (_super, property) {
    return enchant.Class.create(_super, property);
}


var OverrideRenderFunctions = [];


var Clone = function (object) {
    return $.extend({}, object);
}


var SpriteObject = Class(enchant.Sprite, {
    initialize: function (width, height) {
        enchant.Sprite.call(this, width, height);


        // this.pos = Vec2(0, 0);


        this.Initialize();
    },
    onenterframe: function () {
        this.Update();
    }
});


var A = Class(SpriteObject, {


    
});

A.prototype.Initialize = function () {

    SpriteObject.call(this, 1, 1);
}

A.prototype.Update = function () {

}



// console.log = Hack.log;
// console.warn = Hack.log;



/* デバッグ用 */
var Debug = {
    values: [],

    Update: function () {
        $('#debug').val('');

        var text = '';
        for (var key in this.values) {
            text += key + ': ' + this.values[key] + '\n';
        }

        $('#debug').val(text);
    },

    Set: function (name, text) {
        this.values[name] = text;
    }

};

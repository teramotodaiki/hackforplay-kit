// 前方宣言
var scene, input, game, player;


var Key;

var Game;


var KeyBind = function (key_code, name) {
    Game.keybind(key_code, name);
}


// 秒をフレームカウントに変換する
var TimeToCount = function (time) {
    return Math.round(time * game.fps);
}

// フレームカウントを病に変換する
var CountToTime = function (count) {
    return count / game.fps;
}


var Select = function (a, b) {
    return a === undefined ? b : a;
}



// 敵キャラ
var enemies = [];

// プレイヤー
var player;



var OverrideRenderer = {


};


var OverrideRenderFunctions = [];





var Clone = function (object) {
    return $.extend({}, object);
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

var _pad = Vec2(0, 0);


var Size = function (width, height) {
    this.width = width;
    this.height = height;
}


var sceneSize = new Size();


var EnumBlendMode = {
    Add: 'lighter',

};



var Character2 = Class(Sprite, {


    Initialize: function (name) {


        var CD = CharacterDesign.Get(name);


        this.SpriteConstructor(CD);


        this.collision_size = CD.collision_size;


        this.type = 'character';


        this.speed = 1.0;
        this.power = 1.0;
        this.hp = 1.0;
        this.hp_max = 1.0;


        this.barrage_count = {};

    },



    HP: function (hp) {
        this.hp = this.hp_max = hp;
    },




});

// 後々使う可能性もあるので念の為に削除はしない
/*

var Character = enchant.Class.create(enchant.Sprite, {
    initialize: function (width, height) {
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

        // イベント
        this.event_listener = [];

    },




    // pos を x, y に
    convertPos: function () {
        this.x = this.pos.x - this.width / 2;
        this.y = this.pos.y - this.height / 2;
    },

    // set pos
    locate: function (x, y) {
        this.pos.x = x;
        this.pos.y = y;

        this.convertPos();

    },

    // 座標を画面内に収める
    clampPos: function () {
        this.pos.x = this.pos.x < 0 ? 0 : this.pos.x > sceneSize.width ? sceneSize.width : this.pos.x;
        this.pos.y = this.pos.y < 0 ? 0 : this.pos.y > sceneSize.height ? sceneSize.height : this.pos.y;
    },

    // フレームの最後に実行
    _test: function () {
        this.clampPos();

        this.convertPos();

    },


    move: function () {
        // キャラクターの方向を取得
        var moveVec = Vec2(this.vec.x, this.vec.y);
        // moveVec.normalize();

        // 移動
        this.pos.Add(moveVec.Scale(this.speed));


    },

});



// イベントを追加する
Character.prototype.AddEvent = function (name, listener) {
    this.event_listener.push({
        name: name,
        listener: listener
    });
}


// イベントを発火する
Character.prototype.EventTrigger = function (name) {
    this.event_listener.forEach(function (event) {
        if (event.name === name) {
            event.listener();
        }
    });
}









Character.prototype.SetHP = function (hp) {
    this.hp = this.hp_max = hp;
}


Character.prototype.TEST_ALERT = function () {
    alert('test');
}
*/

var Class = function (base, define) {

    define.initialize = define.Initialize;
    define.onenterframe = define.Update;

    define.Base = function () {
        base.apply(this, arguments);
    }

    return enchant.Class.create(base, define);
}


/* Sprite 互換 */
var Sprite = Class(enchant.Sprite, {


    /* { name: '', width: 0, height: 0 } */
    SpriteConstructor: function (source) {
        enchant.Sprite.call(this, source.width, source.height);
        this.image = Asset.Get(source.name);

        this.type = 'sprite';
        this.pos = Vec2(0, 0);

        this.count = 0;
        this.time = 0;

        this.image_scale_x = source.image_scale_x || 1.0;
        this.image_scale_y = source.image_scale_y || 1.0;

        // 画像の中心
        this.center_x = Select(source.center_x, this.width / 2);
        this.center_y = Select(source.center_y, this.height / 2);


        this.scale_x = 1.0;
        this.scale_y = 1.0;
        this.scale = null;


        this.collision_size = 0.0;

    },

    GetCollisionSize : function(){
        var scale = Math.min(this.scale_x, this.scale_y);
        return this.collision_size * scale / 2;
    },

    // 座標を反映する
    PosToXY: function () {


        var x = (this.width - this.width * this.scaleX) / 2;
        var y = (this.height - this.height * this.scaleY) / 2;

        this.x = this.pos.x - x - this.center_x * this.scaleX;
        this.y = this.pos.y - y - this.center_y * this.scaleY;

    },

    // 拡大率を更新する
    UpdateScale: function () {

        if (this.scale !== null) {
            this.scale_x = this.scale_y = this.scale;
        }

        this.scaleX = this.image_scale_x * this.scale_x;
        this.scaleY = this.image_scale_y * this.scale_y;



    },

    // 時を進める
    Chrono: function () {
        this.time = CountToTime(this.count++);
    },

    MoveTo: function (x, y) {
        this.pos.x = x;
        this.pos.y = y;
    },

});
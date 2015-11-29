var Background = Class(enchant.Sprite, {
    Initialize: function (name) {


        enchant.Sprite.call(this, Game.width, Game.height);

        this.image = new Surface(this.width, this.height);

        var texture = this.texture = Asset.Get(name);


        this.pos = Vec2(0, 0);
        this.move = Vec2(0, 0);


        this.compositeOperation;


    },

    ClampPos: function () {

        this.pos.x = this.pos.x % this.texture.width;
        this.pos.y = this.pos.y % this.texture.height;



        if (this.pos.x > 0) {
            this.pos.x -= this.texture.width;
        }
        if (this.pos.y > 0) {
            this.pos.y -= this.texture.height;
        }

    },

    Tile: function () {



    },

    Update: function () {


        this.pos.Add(this.move);


        var _x = Math.ceil((Game.width - (this.pos.x + this.texture.width)) / this.texture.width) + 1;
        var _y = Math.ceil((Game.height - (this.pos.y + this.texture.height)) / this.texture.height) + 1;



        var ctx = this.image.context;
        ctx.clearRect(0, 0, Game.width, Game.height);
        var surface = this.image;

        var ___x = this.pos.x;


        for (var x in Range(_x)) {

            var ___y = this.pos.y;


            for (var y in Range(_y)) {


                surface.draw(this.texture, ___x, ___y);


                ___y += this.texture.height;

            }
            ___x += this.texture.width;

        }





        this.ClampPos();

    }
});



var __Background = Background;


var Background = {

    asset: {},

    New: function (name, option) {

        var background = this.asset[name] = new __Background(option.texture);


        background.move = option.move.ToVec2();

        background.compositeOperation = option.blend;

        return background;
    },

    Get: function (name) {
        return this.asset[name];
    },

    Set: function () {

        Array.prototype.slice.call(arguments).forEach(function (name) {


            RootScene.addChild(this.Get(name));

        }, this);



    }



};

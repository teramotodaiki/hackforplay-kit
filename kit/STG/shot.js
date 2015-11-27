/*
    円同士の衝突判定
    pos.x, pos.y, collision_size
*/

var Collision = function (o1, o2) {


    // 当たり判定は小さい方のスケールを参照して拡大
    c1 = o1.GetCollisionSize();
    c2 = o2.GetCollisionSize();


    return Math.pow(o1.pos.x - o2.pos.x, 2) + Math.pow(o1.pos.y - o2.pos.y, 2) <= Math.pow((c1 + c2), 2);
}





// キャラクター管理
var character_list = [];

var CharacterList = {


    GetType: function (type) {
        return scene.childNodes.filter(function (character) {
            return character.type === type;
        });
    },


    Each: function (type, callback) {

        scene.childNodes.forEach(function (character) {
            if (character.type === type) {
                callback.call(character);
            }
        });
    },

    // base に一番近い type のキャラクターを取得する
    GetNear: function (base, type) {

        var target = null;
        this.Each(type, function () {

            //

            if (base !== this) {

                if (!target) {
                    target = this;
                } else {
                    target = base.pos.near(target, this);
                }
            }

        });

        return target;
    }


}





// 弾
var Shot = Class(Sprite, {
    Initialize: function (creator, material) {

        if (!material) {
            console.log('マテリアルが存在しません');
        }


        // Sprite.call(this, material.width, material.height);


        // this.image = Asset.Get(material.name);

        this.SpriteConstructor(material);

        this.material = material;


        this.type = 'shot';

        this.collision_size = material.collision_size;


        Object.defineProperty(this, "b", {
            get: function () {
                return this.compositeOperation;
            },
            set: function (type) {
                this.compositeOperation = type;
            }
        });



        // 自分に自分の弾が当たるか
        this.hit_self = false;


        // this.compositeOperation = 'lighter';


        // 画面外に出た場合削除するか
        this.outScreenRemove = true;

        this.time = 0.0;

        this.power = null;

        // 能力の使用者
        this.creator = creator;


        this.pos.x = creator.pos.x;
        this.pos.y = creator.pos.y;


        // 移動方向
        this.angle = 0;


        // 仮
        this.target_type = 'enemy';


        // 反射番号
        // this.before_reflect_index = -1;
        this.before_reflect_indices = [];

        this.reflect_count = 1;

        this.__control = null;

        this.events = [];

        this.scale_x = 1.0;
        this.scale_y = 1.0;

    },

    // 色を変更する
    // [[deprecated]]
    Color: function (color) {
        this.frame = color;
    },

    resize: function () {


        this.scaleX = this.material.scale_width;
        this.scaleY = this.material.scale_height;


    },

    // (pos) を (x, y) に反映する
    updatePos: function () {
        this.x = this.pos.x - this.width / 2;
        this.y = this.pos.y - this.height / 2;


        var screen_margin = 30;

        // 画面外に出た場合
        if (this.outScreenRemove /*&& !this.reflect*/ ) {
            if (this.pos.x < -screen_margin || this.pos.x > scene.width + screen_margin || this.pos.y < -screen_margin || this.pos.y > scene.height + screen_margin) {
                this.remove();
                return;
            }
        }




    },


    // 自身を削除する
    remove: function () {
        scene.removeChild(this);
    },

    // 衝突
    hit: function (target) {


        // 自滅を回避する
        if (target === this.creator && !this.hit_self) {
            return;
        }


        if (Collision(this, target)) {


            target.Damage(this.power);
            this.remove();
        }

    },

    // シンプルな弾制御
    move: function () {


        var pos = this.pos.Clone();
        var vec = Angle(this.angle).ToVec2().Scale(this.speed);


        this.pos.Add(vec);

        // 反射
        if (this.reflect) {



            vec.Add(vec.Clone().Normalize().Scale(this.collision_size / 2));

            Reflect.Check(Line(pos, vec), this);

        }


    },

    Update: function () {

        this.Chrono();

        this.resize();

        this.UpdateScale();

        this.updatePos();


        this.frame = this.color;

        var self = this;

        // 完全に自由な制御
        if (this.__control) {
            this.__control.call(this);
        }

        // イベントを実行する
        this.events.forEach(function (event) {
            event.call(self);
        });




        // 移動
        this.move();




        // 攻撃対象に被弾判定
        CharacterList.Each(this.target_type, function () {

            self.hit(this);

        });

        // 寿命
        if (this.count++ >= this.life) {
            this.remove();
        }




    }

});


Shot.prototype.attribute = function (object) {
    for (var key in object) {
        this[key] = object[key];
    }
    return this;
}


// 初期化後に呼ぶ
Shot.prototype.InitializeUpdate = function () {

    this.updatePos();
    this.resize();
}

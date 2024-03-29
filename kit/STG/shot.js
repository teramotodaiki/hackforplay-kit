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




// 範囲の弾を消す
var RemoveRangeShot = function (sprite, range) {

    SpriteList.Filter(function (shot) {

        return shot !== sprite && Math.Length(sprite.pos, shot.pos) <= range;

    }).forEach(function (node) {
        node.Remove();
    });


};

// 全ての弾を消す
RemoveAllShot = function () {

    SpriteList.TypeFilter('shot').forEach(function (node) {
        node.Remove();
    })

};


RemoveAllEnemyShot = function () {
    SpriteList.TypeFilter('shot').forEach(function (node) {
        if (node.creator.type === 'enemy') {
            node.Remove();
        }
    })
};




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
var ShotEffect = Class(Sprite, {
    Initialize: function (shot) {


        // 定数に近いやつ
        this.row = 13;
        this.remove_time = 0.3;

        this.shot = shot;

        this.SpriteConstructor({

            name: '弾消滅エフェクト',

            width: 128,
            height: 128,

            image_scale_x: 0.5,
            image_scale_y: 0.5,

            blend: 'lighter'
        });


        this.pos = this.shot.pos;


        this.PosToXY();
        this.UpdateScale();

    },
    Update: function () {


        if (this.time >= this.remove_time) {
            this.Remove();
        }


        this.frame = (this.time / this.remove_time) * (this.row - 0.5);
        this.frame += (this.shot.frame % 10) * this.row;


        this.PosToXY();
        this.UpdateScale();



        this.Chrono();
    }


});


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



        this.remove_effect = true;


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




        this.AddEvent('remove', function () {

            if (!this.remove_effect) return;

            var effect = new ShotEffect(this);

            effect.Entry();

            ShotCount--;

        });


    },

    // 色を変更する
    // [[deprecated]]
    Color: function (color) {
        this.frame = color;
    },


    // 画面外
    OutScreen: function () {

        if (!this.outScreenRemove) return;

        var screen_margin = 30;



        if (this.pos.x < -screen_margin || this.pos.x > scene.width + screen_margin || this.pos.y < -screen_margin || this.pos.y > scene.height + screen_margin) {

            // 画面外に出て消滅した場合はエフェクトなし
            this.remove_effect = false;

            this.Remove();
            return;
        }


    },



    // 衝突
    hit: function (target) {


        // 自滅を回避する
        if (target === this.creator && !this.hit_self) {
            return;
        }


        if (Collision(this, target)) {


            target.Damage(this.power);

            if (!this.unbreak) this.Remove();
        }

    },

    // 移動
    Move: function () {

        // 時計回りにする為に角度を反転
        var angle = Angle(-this.angle);


        var pos = this.pos.Clone();
        var vec = angle.ToVec2().Scale(this.speed);


        var before_pos = this.pos.Clone();

        this.pos.Add(vec);

        // 反射
        if (this.reflect) {


            // var pos2 = this.pos.Clone().Sub(angle.ToVec2().Scale(this.collision_size / 2));



            // 反射処理
            for (var index in this.reflect) {

                var name = this.reflect[index];


                Reflecter.Get(name).Check(Line(before_pos, this.pos), this);


            }


            // Reflect.Check(Line(pos, vec), this);

        }


    },

    Update: function () {



        this.UpdateScale();



        // 移動
        this.Move();



        this.PosToXY();
        this.OutScreen();


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







        // 攻撃対象に被弾判定
        SpriteList.TypeEach(this.target_type, function () {

            self.hit(this);

        });



        // 衝突した他の弾を打ち消す
        if (this.destroyer) {
            SpriteList.TypeEach('shot', function (shot) {
                if (self.creator !== shot.creator) {
                    if (Collision(self, shot)) {
                        shot.Remove();
                    };
                }
            });
        }


        this.Chrono();



        // 寿命
        if (this.count >= this.life) {
            this.Remove();
        }




    }

});


Shot.prototype.attribute = function (object) {
    for (var key in object) {
        this[key] = object[key];
    }
    return this;
}

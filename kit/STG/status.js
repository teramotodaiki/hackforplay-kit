// 東方みたいな HP ゲージ
var HP = Class(enchant.Sprite, {
    Initialize: function (enemy) {
        enchant.Sprite.call(this, 100, 100);

        this.enemy = enemy;
        this.image = new Surface(this.width, this.height);


        // 位置を更新する
        this.updatePos = function () {
            this.x = this.enemy.x + (this.enemy.width - this.width) / 2;
            this.y = this.enemy.y + (this.enemy.height - this.height) / 2;
        }




        // this.compositeOperation = 'lighter';


        this.before_value = 0.0;


        this.smooth_value = 10;

        this.canvas = new Canvas(this.image);

        this.value = 0.0;

        this.opacity = 0.0;

        this.updatePos();


        enemy.AddEvent('death', function () {


            RootScene.removeChild(this);

            // console.log('HPゲージを破棄します');

        })

    },

    Update: function () {

        // 位置を合わせる
        this.updatePos();




        var op = 1.0;

        // 対象が準備中なら透過
        if (this.enemy.returning === true || this.enemy.death) {
            op = 0.0;
        }


        this.opacity = (this.opacity * this.smooth_value + op) / (this.smooth_value + 1);


        // HP を正規化
        this.value = this.enemy.hp / this.enemy.hp_max;


        if (isNaN(this.value)) {
            this.value = 0.0;
        }


        // 簡易スムージング
        this.value = (this.before_value * this.smooth_value + this.value) / (this.smooth_value + 1);

        this.before_value = this.value;


        var hpNorm = this.value * Math.PI2;


        (function () {

        }).call(this.image.context);



        var ctx = this.image.context;

        this.canvas.Clear();

        // 円
        this.canvas.ArcPath(this.width / 2, this.height / 2)(40)(Math.PI2);


        // 枠
        ctx.lineWidth = 7;
        ctx.strokeStyle = '#f04';
        ctx.stroke();

        // 背景
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#b00';
        // ctx.stroke();

        // 対象が既に倒れているなら HP ゲージは表示しなくても OK
        if (this.enemy.hp <= 0) return;

        ctx.lineWidth = 5;
        // HP ゲージ
        ctx.beginPath();
        ctx.arc(this.width / 2, this.height / 2, 40, -Math.PI / 2, -Math.PI / 2 - hpNorm, true);
        ctx.strokeStyle = '#fff';
        ctx.stroke();

    }
});




var $PlayerStatus = Class(enchant.Sprite, {
    Initialize: function () {

        var max = 4;
        var height = 50;
        var margin = 4;
        var size = height / 2 - margin * 1.5;
        var width = size * max + margin * (max + 1);


        enchant.Sprite.call(this, width, height);

        this.image = new Surface(this.width, this.height);


        this.player = null;

        this.life = -1;
        this.bomb = -1;


        this.x = 70;
        this.y = 6;

    },


    Rewrite: function () {

        var life = Asset.Get('残機');
        var life_back = Asset.Get('残機背景');

        var bomb = Asset.Get('ボム');
        var bomb_back = Asset.Get('ボム背景');

        var ctx = this.image.context;


        ctx.clearRect(0, 0, this.width, this.height);


        ctx.fillStyle = 'rgba(255, 255, 255, .3)';

        ctx.fillRect(0, 0, this.width, this.height);





        var margin = 4;

        var size = this.height / 2 - margin * 1.5;


        for (var index in Range(4)) {
            this.image.draw(life_back, margin + index * (size + margin), margin, size, size)
            this.image.draw(bomb_back, margin + index * (size + margin), size + margin * 2, size, size)
        }


        if (this.player) {
            // 残機
            for (var index in Range(this.life)) {
                this.image.draw(life, margin + index * (size + margin), margin, size, size)
            }
            // ボム
            for (var index in Range(this.bomb)) {
                this.image.draw(bomb, margin + index * (size + margin), size + margin * 2, size, size)
            }

        }

    },

    Update: function () {


        // プレイヤーを発見する
        if (!this.player) {
            this.player = SpriteList.Get('player');
            return;
        }

        // ステータスが変わったら再描画
        if (this.player.life !== this.life || this.player.bomb !== this.bomb) {

            this.life = this.player.life;
            this.bomb = this.player.bomb;

            this.Rewrite();
        }

    },


});


var PlayerStatus = {
    instance: null,
    New: function () {
        this.instance = new $PlayerStatus();
        RootScene.addChild(this.instance);
    },
};

// 東方みたいな HP ゲージ
var HP = Class(Sprite, {
    Initialize: function (enemy) {
        Sprite.call(this, 100, 100);

        this.enemy = enemy;
        this.image = new Surface(this.width, this.height);


        // 位置を更新する
        this.updatePos = function () {
            this.x = this.enemy.x + (this.enemy.width - this.width) / 2;
            this.y = this.enemy.y + (this.enemy.height - this.height) / 2;
        }


        this.compositeOperation = 'lighter';


        this.before_value = 0.0;


        this.smooth_value = 10;

        this.canvas = new Canvas(this.image);

        this.value = 0.0;

        this.opacity = 0.0;

        this.updatePos();
    },

    Update: function () {

        // 位置を合わせる
        this.updatePos();


        if (this.enemy.death) {
            return scene.removeChild(this);
        }


        var op = 1.0;

        // 対象が準備中なら透過
        if (this.enemy.entry_motion === true || this.enemy.death) {
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
        ctx.strokeStyle = '#fff';
        ctx.stroke();

        // 背景
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#444';
        ctx.stroke();

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

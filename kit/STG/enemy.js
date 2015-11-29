// 敵キャラ
var Enemy = Class(Character2, {
    Initialize: function (name) {


        // Character.call(this, width, height);

        // this.Base.call(this, name);

        Character2.call(this, name);

        // enemies.push(this);


        this.type = 'enemy';

        this.backgroundColor = '#00f';


        this.hp = 10;


        this.count = 0;


        // 攻撃開始時間
        this.attack_begin_time = null;

        // 攻撃回数
        this.attack_end_time = null;


        this.spell = null;
        this.spell_name = '';


        this.motion_name = '';


        // HP が 0.0 以下になったらそのまま死亡
        this.AddEvent('dying', function () {
            this.RunEvent('death');
            this.death = true;
            this.Remove();
        });



    },

    SetMotion: function (name) {

        this.motion_name = name;

        Motion.Use(name, this);

        return this;
    },



    Update: function () {
        // this.move();

        // this.time = CountToTime(this.count);

        this.Chrono();

        this.UpdateScale();

        if (this.timeline) {
            this.timeline.Update(this);
            // this.convertPos();
        }


        this.PosToXY();



        this.Animation();

        // this.spell.counts = this.spellCounts;



        // 攻撃する
        if (this.spell && (this.attack_begin_time === null || this.attack_begin_time <= this.time) && (this.attack_end_time === null || this.attack_end_time >= this.time)) {

            this.spell.Update(this);

        }


    },


    ReloadSpell: function () {
        if (this.spell_name && this.spell) {
            this.SetSpell(this.spell_name, true);

            console.log('スペル "' + this.spell_name + '" を更新しました');
        }
    }

});



// スペルを登録する
Enemy.prototype.SetSpell = function (name, overwrite) {
    this.spell_name = name;
    this.spell = __Spell.Get(name).Clone();

    // barrage_count を初期化しない
    if (overwrite) return;


    // barrage_count を初期化する
    this.spell.barrages.forEach(function (barrage) {
        this.barrage_count[barrage.handle] = 0;
    }, this);


}

var Player = Class(Character2, {

    Initialize: function (name) {


        // Player

        var design = CharacterDesign.Get(name);


        // Character.call(this, design.width, design.height);


        this.Base(name);


        this.animation_time = design.animation_time;
        this.animation_row = design.animation_row;

        this.type = 'player';

        this.attackSpell;

        this.attackSpellCount = 0;
        this.bombSpellCount = 0;

        this.power = 10;

        this.escape_count = 0;
        this.escape_time = 0.0;


        this.animation_type = 'center';


        this.animation_frame = 0;

        this.previous_pos = null;

    },

    UpdateAnimation: function () {


        if (this.count % TimeToCount(this.animation_time) === 0) {
            this.animation_frame = (this.animation_frame + 1) % this.animation_row;
        }




        this.frame = this.animation_frame;


        this.frame += ['center', 'left', 'right'].indexOf(this.animation_type) * this.animation_row;


    },


    // 通常攻撃スペルを設定する
    SetAttackSpell: function (name) {



        // this.spell = __Spell.Get(name);


        this.attackSpell = __Spell.Get(name);


        // barrage_count を初期化する
        this.attackSpell.barrages.forEach(function (barrage) {
            this.barrage_count[barrage.handle] = 0;
        }, this);

    },




    // 弾幕から通常攻撃を登録
    __set_attackSpellFromBarrage: function (name) {

        var barrage = __Barrage.Get(name).attribute({
            creator: this,
        });


        var spell = CreateSpell();
        spell.addBarrage(barrage);

        spell.name = 'w';

        this.attackSpell = spell;
    },


    // 移動する
    Move: function (vec) {
        this.pos.Add(vec.Normalize().Scale(this.speed));
    },


    // 座標を画面内に収める
    PosClamp: function () {
        this.pos.x = this.pos.x < 0 ? 0 : this.pos.x > sceneSize.width ? sceneSize.width : this.pos.x;
        this.pos.y = this.pos.y < 0 ? 0 : this.pos.y > sceneSize.height ? sceneSize.height : this.pos.y;
    },


    Update: function () {

        this.Chrono();


        this.UpdateAnimation();
        this.UpdateScale();


        // 通常攻撃
        if (this.attackSpell) {

            // 攻撃する
            if (input.z) {
                // console.log('z');
                this.attackSpell.Update(this);
            } else {
                this.attackSpell.ResetCount(this);
            }
        }



        this.Move(_pad);
        this.PosClamp();
        this.PosToXY();



        this.escape_time = CountToTime(this.escape_count++);
        Debug.Set('escape-time', this.escape_time.toFixed(2));


        //
        if (this.previous_pos) {
            this.animation_type = this.previous_pos.x > this.pos.x ? 'left' : this.previous_pos.x < this.pos.x ? 'right' : 'center';
        }




        this.previous_pos = this.pos.Clone();
    }

});


// 被弾
Player.prototype.Damage = function (damage) {
    this.escape_count = 0;
    this.hp -= damage;
}

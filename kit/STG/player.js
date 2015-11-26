var Player = enchant.Class.create(Character, {
    initialize: function (design_name) {


        // Player

        var design = CharacterDesign.Get(design_name);

        console.log(design);

        Character.call(this, design.width, design.height);

        this.image = Assets.Get(design.name);

        this.scale_width = design.scale_width;
        this.scale_height = design.scale_height;

        this.animation_time = design.animation_time;
        this.animation_row = design.animation_row;

        this.type = 'player';

        this.attackSpell;

        this.count = 0;
        this.attackSpellCount = 0;
        this.bombSpellCount = 0;

        this.power = 10;

        this.escape_count = 0;
        this.escape_time = 0.0;

        this.scale_x = 1;
        this.scale_y = 1;
        this.scale = null;


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


        console.log(this.animation_type);

    },

    UpdateScale: function () {

        if (this.scale !== null) {
            this.scale_x = this.scale_y = this.scale;
        }

        this.scaleX = this.scale_width * this.scale_x;
        this.scaleY = this.scale_height * this.scale_y;

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

    __set_attackSpell: function (name) {
        //        this.attackSpell = __Barrage.Get(name);
    },

    // ◆初級◆ 通常攻撃を設定する
    updateAttackBarrage: function () {


        barrage.creator = this;

        var spell = new Spell();

        spell.name = '通常攻撃';

        spell.addBarrage(barrage);


        this.attackSpell = spell;




    },


    onenterframe: function () {

        this.time = CountToTime(this.count++);

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





        this.vec = _pad;


        //		console.log('pos: ' + this.pos.x + ' / ' + this.pos.y)


        this.move();



        this._test();


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

var Boss = Class(Enemy, {
    Initialize: function (name) {

        this.Base(name);


        // this.type = 'boss';


        // 復帰中
        this.returning = true;


        this.spells = [];

        this.active_spell_index = -1;

        this.active = false;


        this.ClearEvent();

        // HP が 0.0 以下になったら次の行動へ
        this.AddEvent('dying', function () {

            console.log('ボスの HP が 0.0 以下になりました');


            // RemoveAllShot();

            RemoveAllEnemyShot();

            this.NextSpell();

        });



    },
    Update: function () {


        // 初期化
        if (!this.initialized) {
            this.NextSpell();
            this.initialized = true;
        }


        if (this.death) return;

        this.Chrono();

        this.UpdateScale();

        // entry motion が終了したら
        if (this.returning && this.timeline.end) {

            this.returning = this.invincible = false;

            // 戦闘モーションに移行
            Motion.Use(this.GetActiveSpell().motion, this);

            this.HP(this.GetActiveSpell().hp);


        }



        if (this.timeline) {
            this.timeline.Update(this);
        }



        this.PosToXY();

        this.Animation();

        // 攻撃する
        if (!this.returning) {
            this.spells[this.active_spell_index].Update(this);
        }


    },






});

Boss.prototype.Active = function () {
    this.active = true;
    this.NextSpell();
}




Boss.prototype.ReloadSpell = function () {
    var self = this;


    /*


        this.spells.forEach(function (spell) {
            console.log('スペル "' + spell.__name + '" を更新しました');


            console.log(spell.barrages[0].speed);

            spell = __Spell.Get(spell.__name).Clone();

            console.log(spell.barrages[0].speed);
            // option を上書き
            spell = $.extend(spell, spell.__option);



            // barrage_count を初期化する
            spell.barrages.forEach(function (barrage) {


                this.barrage_count[barrage.handle] = 0;
            }, self);


        });


        this.spells.forEach(function (spell) {
            console.log('スペル "' + spell.__name + '" を確認します');


            console.log(spell.barrages[0].speed);

        });

    */


    for (var index = 0; index < this.spells.length; index++) {


        var spell = this.spells[index];


        this.spells[index] = __Spell.Get(spell.asset_name).Clone();



        var css = 'font-size:16px;background:#E0E4CC;border-left: solid 6px #A7DBD8;padding:3px;';



        console.log('%cボススペル "' + 　spell.asset_name + '" を更新しました', css);


        /*
            this.spells[index] = $.extend(spell, spell.__option);
            これをすると反映されない
            参照絡みのバグだろうけど、手動でプロパティをコピーした方が色々楽なので放置
        */



        this.spells[index].name = spell.name;
        // this.spells[index].spell = spell.spell;
        this.spells[index].hp = spell.hp;
        this.spells[index].motion = spell.motion;
        this.spells[index].entry_motion = spell.entry_motion;

        //



    }



}


// スペルを追加する
Boss.prototype.AddSpell = function (name, option) {


    var spell = __Spell.Get(name).Clone();



    // option を上書き
    spell = $.extend(spell, option);


    // barrage_count を初期化する
    spell.barrages.forEach(function (barrage) {
        this.barrage_count[barrage.handle] = 0;
    }, this);


    spell.__name = name;
    spell.__option = option;


    this.spells.push(spell);

}


Boss.prototype.AddAction = function (option) {



    var spell = __Spell.Get(option.spell).Clone();


    // option を上書き
    spell = $.extend(spell, option);


    // barrage_count を初期化する
    spell.barrages.forEach(function (barrage) {
        this.barrage_count[barrage.handle] = 0;
    }, this);


    spell.__name = option.spell;
    spell.__option = option;


    this.spells.push(spell);

    return this;
}


Boss.prototype.GetActiveSpell = function () {

    if (this.spells[this.active_spell_index] === undefined) {
        console.error('スペルが存在しません');
        console.error(this.spells);
    }

    return this.spells[this.active_spell_index];
}


// 次のスペルに
Boss.prototype.NextSpell = function () {
    this.active_spell_index++;

    // 全てのスペルを使用したら
    if (this.spells.length <= this.active_spell_index) {
        console.log('ボスが死亡しました');
        this.death = true;


        this.Remove();

        this.RunEvent('death');


    } else {

        // 準備移動を登録
        this.returning = this.invincible = true;
        Motion.Use(this.GetActiveSpell().entry_motion, this);


    }

}


Boss.prototype.SetEntryMotion = function (name) {
    this.returning = this.invincible = true;

    // motion を適用
    Motion.Use(name, this);
}



var __Boss = {

    asset: {},

    New: function (name, status) {

        // Required_propatie

        if (this.asset[name]) {
            console.warn('');
        }

        var boss = this.asset[name] = new Boss(status.type);




        return boss;
    },

    Get: function (name) {
        return this.asset[name];
    }




};

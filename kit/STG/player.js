var Player = Class(Character2, {

    Initialize: function (name) {


        // Player

        this.Base(name);


        this.type = 'player';


        this.attack_spell = null;
        this.bomb_spell = null;

        // ボムを撃っているか
        this.bombing = false;


        this.escape_count = 0;
        this.escape_time = 0.0;


        this.life = 1;
        this.bomb = 2;


        // 無敵状態
        this.invincible_time = 5.0;
        this.invincible_end_time = null;




        this.AddEvent('damage', function () {

            if (this.invincible) return;


            // 被弾したら無敵になり画面の弾を全て消去
            this.Invincible();
            RemoveAllShot();


            // 残機がマイナスになったらゲームオーバー
            if (--this.life < 0) {
                this.RunEvent('death');
                this.Remove();

                Hack.gameover();
            }

            this.escape_count = 0;
        });


        this.AddEvent('player-bomb-end', function () {
            this.bombing = false;
            this.bomb_spell.ResetCount(this);
        });

    },

    // 無敵状態になる
    Invincible: function () {

        this.invincible = true;
        this.invincible_end_time = this.time + this.invincible_time;

    },


    // 通常攻撃スペルを設定する
    SetAttackSpell: function (name, overwrite) {


        // this.spell = __Spell.Get(name);

        this.attack_spell = __Spell.Get(name).Clone();
        // this.attack_spell_name = name;



        // barrage_count を初期化しない
        if (overwrite) return;


        // barrage_count を初期化する
        this.attack_spell.barrages.forEach(function (barrage) {
            this.barrage_count[barrage.handle] = 0;
        }, this);



    },


    SetBombSpell: function (name, overwrite) {

        this.bomb_spell = __Spell.Get(name).Clone();

        if (overwrite) return;

        this.bomb_spell.barrages.forEach(function (barrage) {
            this.barrage_count[barrage.handle] = 0;
        }, this);
    },



    ReloadSpell: function () {



        var css = 'font-size:16px;background:#E0E4CC;border-left: solid 6px #A7DBD8;padding:3px;';



        if (this.attack_spell) {

            console.log('%cプレイヤー通常スペル "' + this.attack_spell.asset_name + '" を更新しました', css);

            this.SetAttackSpell(this.attack_spell.asset_name, true);
        }
        if (this.bomb_spell) {

            console.log('%cプレイヤーボムスペル "' + this.bomb_spell.asset_name + '" を更新しました', css);

            this.SetBombSpell(this.bomb_spell.asset_name, true);
        }
    },


    // 弾幕からボムスペルを登録する
    SetBombSpellFromBarrage: function (name) {

        __Spell.Make(name)(name);


        console.log(__Spell.Get(name));


        this.SetBombSpell(name);

    },


    SetAttackSpellFromBarrage: function (name) {
        __Spell.Make(name)(name);
        this.SetAttackSpell(name);
    },


    // 移動する
    Move: function (vec) {
        this.pos.Add(vec.Scale(this.speed));
    },


    // 座標を画面内に収める
    PosClamp: function () {
        this.pos.x = this.pos.x < 0 ? 0 : this.pos.x > sceneSize.width ? sceneSize.width : this.pos.x;
        this.pos.y = this.pos.y < 0 ? 0 : this.pos.y > sceneSize.height ? sceneSize.height : this.pos.y;
    },


    Update: function () {

        this.Chrono();


        this.UpdateScale();


        // 通常攻撃
        if (this.attack_spell) {
            if (input.z) {
                this.attack_spell.Update(this);
            } else {
                this.attack_spell.ResetCount(this);
            }
        }


        // ボムを発動
        if (this.bomb > 0 && this.bomb_spell && !this.bombing && Key.X) {
            this.bomb--;
            this.bombing = true;
            this.Invincible();
        }

        // ボムを更新
        if (this.bombing) {
            this.bomb_spell.Update(this);
        }


        // 無敵なら点滅
        if (this.invincible) {

            this.opacity = Math.sin(this.count) * 0.5 + 0.5;


            if (this.time >= this.invincible_end_time) {
                this.invincible = false;
            }

        } else this.opacity = 1;




        this.Move(_pad);
        this.PosClamp();
        this.PosToXY();



        this.Animation();





        this.escape_time = CountToTime(this.escape_count++);


        Debug.Set('escape-time', this.escape_time.toFixed(2));




    }

});






var PlayerStatus = function (player) {

    this.label = new enchant.Label();

    this.player = player;

    this.label.onenterframe = this.Update;


    console.log(this.label);

};

PlayerStatus.prototype.Update = function () {



    this.text = player.life + ' / ' + player.bomb;

    Debug.Set('player.life', player.life);
    Debug.Set('player.bomb', player.bomb);


}


var __PlayerStatus = PlayerStatus;


var PlayerStatus = {


    New: function (player) {

        var status = new __PlayerStatus(player);

        RootScene.addChild(status.label);




    }




};

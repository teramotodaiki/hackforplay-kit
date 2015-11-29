var CreateEnemy = function (property) {

    console.log('敵を追加します');

    var enemy = new Enemy('RIM');

    if (property.pos) {
        enemy.MoveTo(property.pos[0], property.pos[1]);
        enemy.PosToXY();

    }

    if (property.motion) {
        enemy.SetMotion(property.motion);
    }


    if (property.spell) {
        enemy.SetSpell(property.spell);
    }


    enemy.Update();


    scene.addChild(enemy);
}





var _Stage = function () {

    this.events = {};

    this.count = 0;
    this.time = 0.0;


    this.index = null;

    this.__boss = false;


};



_Stage.prototype.AddEnemyFromInstance = function (time, enemy) {
    this.AddEvent(time, function () {


        enemy.InitializeUpdate();

        RootScene.addChild(enemy);
    });

    return this;
}


// 既存のボスを追加する
_Stage.prototype.AddBossFromInstance = function (time, boss) {
    this.AddEvent(time, function () {


        RemoveAllShot();

        this.__boss = true;

        scene.addChild(boss);
        scene.addChild(new HP(boss));
    });

    return this;
}


_Stage.prototype.AddBoss2 = function (time, name) {



    this.AddEvent(time, function () {


        var boss = __Boss.Get(name);

        boss.Entry();



                RootScene.addChild(new HP(boss));


                

        this.__boss = true;
        // (new HP(boss)).Entry();


    });


    return this;
}


// ボスを追加する
_Stage.prototype.AddBoss = function (time, property) {
    this.AddEvent(time, function () {
        console.log('ボスを追加します');


        RemoveAllShot();

        // var boss = new Boss(20, 20);


        boss.SetHP(100);

        scene.addChild(boss);

        scene.addChild(new HP(boss));


        this.__boss = true;


        if (property.pos) {
            boss.locate(property.pos.x, property.pos.y);
        }
        if (property.motion) {
            boss.SetMotion(property.motion);
        }
        if (property.spell) {
            boss.SetSpell(property.spell);
        }

        if (property.entry_motion) {
            boss.SetEntryMotion(property.entry_motion);
        }




    });
    return this;
}

_Stage.prototype.Update = function () {


    // ボスが出現していない時はカウントを進める
    if (!this.__boss) {

        // イベントを処理する
        if (this.events[this.count] !== undefined) {
            this.events[this.count].call(this);
            console.log('stage: event');
        }





        this.time = TimeToCount(++this.count);


    }

}



_Stage.prototype.DrawTitle = function (time, title, sub_title) {

    this.AddEvent(time, function () {



        if (sub_title) {

            sub_title = new enchant.Label(sub_title);
            sub_title.font = 　'16px "Times New Roman", "游明朝", YuMincho, "ヒラギノ明朝 ProN W3", "Hiragino Mincho ProN", "メイリオ", Meiryo, serif';
            sub_title.cvsRender = function (ctx) {
                ctx.shadowColor = '#000';
                ctx.shadowBlur = 6;
                enchant.Label.prototype.cvsRender.call(this, ctx);
                ctx.shadowBlur = 0;
            };
            sub_title.moveTo((game.width - sub_title._boundWidth) / 2, 50);


            sub_title.tl.delay(20).fadeIn(30, E).delay(30).fadeOut(30, E).removeFromScene();


            sub_title.color = '#fff';


            sub_title.opacity = 0;
            RootScene.addChild(sub_title);
        }






        var sampleLabel = new enchant.Label();
        sampleLabel.font = 　'30px "Times New Roman", "游明朝", YuMincho, "ヒラギノ明朝 ProN W3", "Hiragino Mincho ProN", "メイリオ", Meiryo, serif';
        sampleLabel.text = title;
        // 以下で中央の座標を計算し、指定します
        sampleLabel.moveTo((game.width - sampleLabel._boundWidth) / 2, 120);


        var E = enchant.Easing.QUAD_EASEOUT;


        sampleLabel.opacity = 0;

        sampleLabel.tl.fadeIn(30, E).and().moveBy(0, -50, 30, E).delay(50).fadeOut(30, E).removeFromScene();




        sampleLabel.color = '#fff';


        sampleLabel.cvsRender = function (ctx) {

            ctx.shadowColor = '#000';
            ctx.shadowBlur = 10;


            enchant.Label.prototype.cvsRender.call(this, ctx);

            ctx.shadowBlur = 0;


        };



        RootScene.addChild(sampleLabel);

    });


    return this;
}




// 整形用
_Stage.prototype.Chain = function () {
    return this;
}


// 敵を追加する
_Stage.prototype.AddEnemy = function (time, enemy) {

    this.AddEvent(time, function () {
        CreateEnemy(enemy);
    });

    return this;
}


// イベントを追加する
_Stage.prototype.AddEvent = function (time, event) {

    var count = TimeToCount(time);

    if (stage.events[count] === undefined) {
        stage.events[count] = event;
    }
    // 多分ないだろうけど time が小さすぎて count が重複した場合
    else {
        console.warn('ステージのイベントが重複しています\n結合しました');

        // イベントを合成する

        var _event = stage.events[count];

        delete stage.events[count];

        stage.events[count] = function () {

            _event.call(this);
            event.call(this);

        }


    }

    return this;
}


_Stage.prototype.Attribute = Spell.prototype.attribute;

var stage_asset = {};
var active_stage = null;


var stage_list = [];


var Stage = {

    Get: function (name) {

        if (stage_asset[name] === undefined) {
            console.warn('ステージ "' + name + '" は存在しません');
        }

        return stage_asset[name];
    },

    // 現在のステージを取得する
    GetActive: function () {
        return active_stage;
    },

    // 次のステージに
    Next: function () {


        active_stage = stage_list[active_stage.index + 1]

        if (active_stage === undefined) {
            console.error('次のステージは存在しません');
        }



        return active_stage;
    },

    New: function (name, property) {

        stage = stage_asset[name] = new _Stage();


        if (property) {

            // 時間をカウントに変換する
            for (var key in property) {

                stage.AddEvent(key, property[key]);

            }

        }

        stage.index = stage_list.length;
        stage_list.push(stage);

        active_stage = stage_list[0];


        return stage;
    }


};

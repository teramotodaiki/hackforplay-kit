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


    this.index = null;

    this.__boss = false;


};



_Stage.prototype.AddEnemyFromInstance = function (time, enemy) {
    this.AddEvent(time, function () {


        enemy.InitializeUpdate();

        RootScene.addChild(enemy);
    });
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


// ボスを追加する
_Stage.prototype.AddBoss = function (time, property) {
    this.AddEvent(time, function () {
        console.log('ボスを追加します');


        RemoveAllShot();

        var boss = new Boss(20, 20);


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




        var self = this;

        // ボスを倒したらカウントを再開
        boss.death_event = function () {
            self.__boss = false;




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

        ++this.count;
    }

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
        console.log('Stage: イベントが重複しています');

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
        return (active_stage = stage_list[active_stage.index + 1]);
    },

    Make: function (name, property) {

        stage = active_stage = stage_asset[name] = new _Stage();


        if (property) {

            // 時間をカウントに変換する
            for (var key in property) {

                stage.AddEvent(key, property[key]);

            }

        }

        stage.index = stage_list.length;
        stage_list.push(stage);

        return stage;
    }


};

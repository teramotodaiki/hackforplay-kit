var CreateEnemy = function(property)
{

    console.log('敵を追加します');

    var enemy = new Enemy(20, 20);


    if (property.pos)
    {
        enemy.locate(property.pos.x, property.pos.y);
    }


    if(property.motion)
    {
        enemy.setMotion(property.motion);
    }




    scene.addChild(enemy);
}





var _Stage = function()
{

    this.events = {};

    this.count = 0;
};


_Stage.prototype.Update = function()

{

    // イベントを処理する
    if (this.events[this.count] !== undefined)
    {
        this.events[this.count].call(this);
        console.log('stage: event');
    }



    ++this.count;
}

// 整形用
_Stage.prototype.Chain = function(_)
{
    return this;
}




// 敵を追加する
_Stage.prototype.AddEnemy = function(time, enemy)
{

    this.AddEvent(time, function()
    {
        CreateEnemy(enemy);
    });

    return this;
}


// イベントを追加する
_Stage.prototype.AddEvent = function(time, event)
{

    var count = TimeToCount(time);

    if (stage.events[count] === undefined)
    {
        stage.events[count] = event;
    }
    // 多分ないだろうけど time が小さすぎて count が重複した場合
    else
    {
        console.log('Stage: イベントが重複しています');
    }

    return this;
}


_Stage.prototype.Attribute = Spell.prototype.attribute;

var stage_asset = {};

var Stage = {

    Get: function(name)
    {
        return stage_asset[name];
    },

    Make: function(name, property)
    {

        stage = stage_asset[name] = new _Stage();



        if (property)
        {

            // 時間をカウントに変換する
            for (var key in property)
            {

                stage.AddEvent(key, property[key]);

            }

        }
    }


};



/*

    TL を簡単に扱えるようにする闇のクラス（仮）

    ◆ 時間をフレーム単位から秒単位に
    ◆ (x, y, time, easing) を (x, y)(time).easing(value) に
    ◆ TL の速度を変更できるように
    ◆ 適用するキャラクターの速度を参照することで character.speed = n みたいな改造ができるように


*/


var EasyTimeline = function()
{

    this._easing;
    this.events = [];

}


// easing を変更する
EasyTimeline.prototype.easing = function(value)
{
    this._easing = value;
    return this;
}



EasyTimeline.prototype.moveBy = function(x, y)
{
    var self = this;
    return function(time)
    {
        self.events.push(
        {
            x: function()
            {
                return this.x + x;
            },
            y: function()
            {
                return this.y + y;
            },
            time: time,
            easing: self._easing
        });
        return self;
    }
}




EasyTimeline.prototype.moveTo = function(x, y)
{

    var self = this;

    return function(time)
    {

        self.events.push(
        {
            x: x,
            y: y,
            time: time,
            easing: self._easing
        });

        return self;
    }
}



// Timeline に変換する
EasyTimeline.prototype.toTimeline = function()
{

    var self = this;

    return function(node)
    {

        var timeline = node.tl;

        self.events.forEach(function(event)
        {
            // 今後の設計によっては削除するかも
            var _event = $.extend({}, event);


            _event.time = _event.time * game.fps * (1.0 / node.speed);


            timeline = timeline.tween(_event);

        });


    }


}




var easyTimelineList = {};


var Motion =
{
    // 新しいモーションを作成
    New: function(name)
    {

        var ETL = new EasyTimeline();

        easyTimelineList[name] = (ETL);

        return ETL;

    },

    // キャラクターに適用する
    Use: function(name, target)
    {

        var a = easyTimelineList[name].toTimeline();

        a(target);

    }



}

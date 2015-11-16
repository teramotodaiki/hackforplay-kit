/*
    拡張だとやりたいことが実現できないから自作する最終手段

*/
var NewEasyTimeline = function()
{
    this.events = [];

    this.event_index = 0;


    this.loop = false;


    // 再生終了
    this.end = false;
}

NewEasyTimeline.prototype.MoveBy = function(x, y)
{
    var self = this;

    return function(time)
    {

        var event = {
            initialize: function()
            {
                this.x = this.value_x + self.target.pos.x;
                this.y = this.value_y + self.target.pos.y;
            },
            value_x: x,
            value_y: y,
            time: time,
        };

        self.events.push(event);
        return self;
    }
}


NewEasyTimeline.prototype.MoveTo = function(x, y)
{
    var self = this;
    return function(time)
    {
        var event = {
            x: x,
            y: y,
            time: time,
        };
        self.events.push(event);
        return self;
    }
}



// ループする
NewEasyTimeline.prototype.Loop = function()
{


    this.events.push(function()
    {
        this.loop = true;
    });

}

NewEasyTimeline.prototype.Call = function(name)
{

    this.events.push(function()
    {
        (function()
        {
            this[name]();
        }).call(this.target);

    });

    return this;
}


NewEasyTimeline.prototype.Next = function()
{

    this.event_index++;
    this.target.timeline_count = 0;

    var event = this.events[this.event_index];

    // 最後まで再生した
    if (event === undefined)
    {

        // 再帰
        if (this.loop)
        {
            console.log('loop');
            this.event_index = -1;
            return this.Next();
        }


        console.log('再生が終了しました');
        this.end = true;
        return;
    }


    // 即時イベントなら
    if (typeof event === 'function')
    {
        event.call(this);
        return this.Next();
    }



    // イベント開始時の座標を保持
    event._x = this.target.pos.x;
    event._y = this.target.pos.y;

    // 初期化
    if (event.initialize)
    {
        event.initialize();
    }

}

NewEasyTimeline.prototype.Use = function(target)
{
    target.timeline = $.extend({}, this);
    target.timeline_count = 0;

        this.target = target;
    this.event_index = -1;
    this.Next();

}

NewEasyTimeline.prototype.Update = function(a)
{

    this.target = a;

    if (this.end) return;

    var event = this.events[this.event_index];

    // move_count 経過すると移動が完了する
    // 対象の speed も考慮する（この為だけに自作をする闇）
    var move_count = TimeToCount(event.time / this.target.speed);


    var x = (event.x - event._x) / move_count * this.target.timeline_count;
    var y = (event.y - event._y) / move_count * this.target.timeline_count;

    this.target.pos.x = event._x + x;
    this.target.pos.y = event._y + y;



    if (this.target.timeline_count++ > move_count)
    {

        this.target.pos.x = event.x;
        this.target.pos.y = event.y;

        this.Next();
    }


}

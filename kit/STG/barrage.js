




/* 魔道書の予定


    //----------// 簡単に遊べる使い方 //----------//
    // 簡単だけど色々作れるのが理想


    barrage.ステータス = 値;


    // barrage を player に設定する
    player.registerBarrage();


    //----------// 上級者向け //----------//

    // 新しい弾幕を生成する
    var newBarrage = CreateBarrage();

    // カスタム弾幕を登録
    player.registerCustomBarrage(newBarrage);


*/



var ShotEvent = function()
{

    // イベントの適用範囲
    this.beginFrame = 0;
    this.endFrame = 0;

}



var Barrage = function()
{

    this.events = [];

    // 識別番号
    this.handle = null;
}


// 弾幕を生成する
var CreateBarrage = function()
{
    return new Barrage();
}



// デフォルト弾幕
/* var */ barrage = CreateBarrage();



//
var Spell = function()
{

    this.name = '';

    // 弾幕の識別に使用する値
    this.handleIndex = 0;

    this.barrages = [];

}


// 攻撃
Spell.prototype.fire = function()
{
    for(var index in barrages)
    {

    }
}


// 技の名前とか表示するやつ
Spell.prototype.statusRender = function()
{
    /* default */
};


// 弾幕を追加する
Spell.prototype.addBarrage = function()
{
    var barrage = new Barrage();



    this.barrages.push(barrage);
}

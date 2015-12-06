// 弾幕を組み合わせてスペルを創造する
var $Spell = function () {
    this.name = '';

    this.barrages = [];

}





// オブジェクトのプロパティをコピー
$Spell.prototype.attribute = function (object) {
    for (var key in object) {
        this[key] = object[key];
    }
    return this;
}

// オブジェクトのプロパティを全ての弾幕にコピー
$Spell.prototype.attributeAll = function (object) {
    this.barrages.forEach(function (barrage) {
        barrage.attribute(object);
    });
}



// 弾幕を追加する
$Spell.prototype.AddBarrage = function (barrage) {
    this.barrages.push(barrage);
}



// カウントを初期化する
$Spell.prototype.ResetCount = function (creator) {
    this.barrages.forEach(function (barrage) {
        creator.barrage_count[barrage.handle] = 0;
    });
}



// 更新する
$Spell.prototype.Update = function (creator) {

    this.barrages.forEach(function (barrage, index) {

        barrage.creator = creator;
        barrage.count = creator.barrage_count[barrage.handle]++;

        barrage.Update();

    });

}


// 複製する
$Spell.prototype.Clone = function () {

    var spell = new $Spell();

    spell.name = this.name;
    spell.asset_name = this.asset_name;

    // 闇の処理
    this.barrages.forEach(function (barrage) {
        spell.barrages.push($.extend({}, barrage));

        //        spell.barrages.push( /*Clone*/ (Barrage.Get(barrage.asset_name)));

    });

    return spell;
}

// 技の名前とか表示するやつ
$Spell.prototype.statusRender = function () {
    /* default */
};



/*
var Asset = {

    asset: [],
    name: '',

    Get: function(name) {

        if (this.asset[name] === undefined) {
            console.warn(this.name + ' "' + name + '" は存在しません');
        }

        return spell_asset[name];

    }

}
*/



var Spell = {


    asset: {},



    // スペルを取得する
    Get: function (name) {

        if (this.asset[name] === undefined) {

            // console.warn('弾幕')

            // スペルがないけど弾幕はある場合は、弾幕からスペルを生成する
            if (Barrage.Get(name)) {
                console.warn('スペル "' + name + '" は存在しません\n弾幕からスペルを生成します');
                Spell.Make(name)(name);
                // スペルも弾幕もない場合
            } else {
                console.error('スペル "' + name + '" は存在しません');
            }

        }

        return this.asset[name];
    },


    Reload: function () {



        var sty = 'font-size:16px;background:#E0E4CC;border-left: solid 6px #A7DBD8;padding:3px;';
        console.log('%c全てのスペルを更新します', sty);



        //        console.info('spell reload');

        SpriteList.Each(function (character) {

            if (character.ReloadSpell) {


                character.ReloadSpell();

            }
        });


    },


    // 技を作成する
    Make: function (name, property) {


        // Spell.Make('name')('b1', 'b2', 'b3');
        // Spell.Make('name', { property: value })('b1', 'b2', 'b3');

        var spell = this.asset[name] = new $Spell();


        spell.asset_name = name;



        if (property) {
            spell.attribute(property);
        }

        return function (Args___) {


            Array.prototype.forEach.call(arguments, function (name) {
                spell.AddBarrage(Barrage.Get(name));
            });

            /*
            for (var index in Range(arguments.length))
            {
                spell.push$Barrage(Barrage.Get(arguments[index]));
            }
            */

            return spell;

        }

    }



}

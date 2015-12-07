var InitializeGlobalVariable = function () {


    Game = game = enchant.Core.instance;
    RootScene = scene = game.rootScene;




    RootScene.background_layer = new enchant.Sprite(0, 0);
    RootScene.addChild(RootScene.background_layer);


    /* var */
    Input = Game.input;

    game.addEventListener('enterframe', function () {



        // FPS
        Debug.Set('fps', game._actualFps);

        // Nodes
        Debug.Set('nodes', scene.childNodes.length)



        Debug.Update();
    });

}



// 魔道書
var EnchantBook = {

    Create: function () {


        // 魔道書
        Hack.enchantBookIcon = Hack.createSprite(64, 64, {
            image: game.assets['hackforplay/enchantbook.png'],
            defaultParentNode: RootScene,
            ontouchend: function () {
                Hack.openEditor();
            }
        });


        RootScene.front_sprite = Hack.enchantBookIcon;

    },


};


var CreatePad = function () {




    var padMargin = 10;

    //アナログパッドの生成
    var pad = new APad();
    pad.moveTo(0 + padMargin, 220 - padMargin);



    pad.onenterframe = function () {
        _pad.x = this.vx;
        _pad.y = this.vy;

        // 必ず 0.0 ～ 1.0 の範囲
        var aPadLength = _pad.Length();

        // キー入力を APad に対応する
        var keys = [Key.down, Key.right, Key.up, Key.left];

        // 方向キー全ての入力
        var keyPad = Vec2(0, 0);

        for (var index in keys) {
            if (keys[index]) {
                // key[index] の方向
                var angle = Math.PI2 / 4 * index;
                var keyVec = Vec2(Math.sin(angle) | 0, Math.cos(angle) | 0);

                keyPad.Add(keyVec);
            }

        }


        // APad に KeyPad を加算して正規化
        _pad.Add(keyPad).Normalize();



        // 低速キー || APad の押し込みが少ない
        if (Key.shift || (pad.isTouched && aPadLength < 0.5)) {
            _pad.Scale(0.5);
        }


    }

    scene.addChild(pad);



}

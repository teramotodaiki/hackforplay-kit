# hackforplay-kit
Developing restaging kit of hackforplay.

このリポジトリはHackforPlayの「ステージプレイ」を抽出したキット開発環境です。

https://hackforplay.xyz/


現在のバージョンでは、PHPやlocalhostサーバを使わずに実行することができます
> You can run __without PHP__ in this version.

__Clone in Desktop__ してローカルリポジトリを作成するか、__Download ZIP__ して開発を始められます。
> __Clone in desktop__ or __Download ZIP__ to start developing.

## Directiory

* hackforplay-kit/
  * index.html
  * __frame.html__
  * __common.js__
  * view.js
  * lib/
    * __enchant.js__
    * __Hack.js__
  * kit/
    * rpg_hack_project
      * main.js
      * restagingcode.js
      * rpgobjects.js
...

デフォルトでは、RPG-Hackキットを実行するようになっています。


## Run RPG

### 1. `/hackforplay-kit` ディレクトリを展開してください
> Deployment directory `/hackforplay-kit`

PC上のどこに展開しても構いません。（例：__Desktop__）
> You can deployment in anywhere like __Desktop__.

### 2. `index.html`をブラウザで開いてください
> Open `index.html` in browser

RPG-Hack キットが開始されます。
> will start RPG.


## Make your project


### 1. プロジェクト用のディレクトリを追加します
> Add project directory

`/kit` ディレクトリの中に、任意の名前（ここでは__your project name__とします）のディレクトリを作成します
> Make directry in `/kit` and name the directory __your project name__.

## 2. JavaScript ファイルを追加します
> Add javascript file

作成した__your project name__ディレクトリの中に、任意の名前（ここでは__main.js__とします）のファイルを作成します
> If you will add __main.js__.js in __your project name/__,

このようになれば正解です

* hackforplay-kit/
  * kit/
    * __your project name/__
      * __main.js__

では、とりあえず下のコードを__main.js__に書き込んでください
> For now, type this code in __main.js__

```javascript
window.addEventListener('load', function () {
	var game = enchant.Core.instance;
	game.onload = function () {
		// Enchant book
		Hack.enchantBookIcon = Hack.createSprite(64, 64, {
			image: game.assets['hackforplay/enchantbook.png'],
			defaultParentNode: Hack.menuGroup,
			ontouchend: function() {
				Hack.textarea.hide();
				Hack.openEditor();
			}
		});
	};
});
```

魔導書のアイコンを表示し、クリックされたら魔導書を開くというスクリプトです

### 3. `/frame.html`を編集して、ゲームを開始します
> Modify `/frame.html`

最初はこのようになっている部分があります
> From,
```html 
		<script src="kit/rpg_hack_project/restagingcode.js" type="text/javascript" charset="utf-8"></script>
		<script src="kit/rpg_hack_project/main.js" type="text/javascript" charset="utf-8"></script>
		<script src="kit/rpg_hack_project/rpgobjects.js" type="text/javascript" charset="utf-8"></script>
```

それを、このようにしてください
＊書かれていない２行は消します
＊あなたがつけたディレクトリ名、ファイル名を指定します
> To,
```html 
		<script src="kit/__your project name__/main.js" type="text/javascript" charset="utf-8"></script>
```

もちろん任意のファイルをいくつでも読み込ませることができます
> You can load any scripts later.

では、`index.html`をもう一度開いてください
> Open `index.html` again

空のステージが開始されます
> will start empty stage.


## Reference


###Hack
* __Hack__ : object::HackEnchant::enchant.EventTarget
* __Hack.onload__ : function
* __Hack.hint__ : string
* __Hack.restagingCode__ : string
* __Hack.gameclear__ : function
* __Hack.gameover__ : function
* __Hack.textarea__ : object::enchant.Entity
* __Hack.log__ : function
* __Hack.clearLog__ : function
* __Hack.enchantBook__ : object::enchant.Entity
* __Hack.openEditor__ : function
* __Hack.closeEditor__ : function
* __Hack.createLabel__ : function
* __Hack.createSprite__ : function
* __Hack.overlay__ : function
* __Hack.defaultParentNode__ : object::enchant.Group
* __Hack.menuGroup__ : object::enchant.Group
* __Hack.menuOpener__ : object::enchant.Sprite
* __Hack.menuOpenedFlag__ : boolean
* __Hack.openMenu__ : function
* __Hack.onmenuopened__ : function
* __Hack.closeMenu__ : function
* __Hack.onmenuclosed__ : function

（製作中。意味は後で追記します）

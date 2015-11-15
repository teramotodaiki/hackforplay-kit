# hackforplay-kit
Developing restaging kit of hackforplay.
https://hackforplay.xyz/
英語がおかしかったら、 Issue または PullRequest してください。

You can run __without PHP__ in this version.

__Clone your desktop__ or __Download ZIP__ to start developing.

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

## Run RPG

### 1. Deployment directory `/hackforplay-kit`

You can deployment in anywhere like __Desktop__.

### 2. Open `index.html`

* Local file : Double click to open `/hackforplay-kit/index.html`
* Use localhost : Browse `localhost/hackforplay-kit/index.html`

will start RPG.


## Make your project


### 1. Add project directory

Make directly in `/kit` and name the directory __your project name__.

## 2. Add javascript file

If you will add __main.js__.js in __your project name/__,

* hackforplay-kit/
  * kit/
    * __your project name/__
      * __main.js__

For now, type this code in __main.js__

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


### 3. Modify `/frame.html`

From,
```html 
		<script src="kit/rpg_hack_project/restagingcode.js" type="text/javascript" charset="utf-8"></script>
		<script src="kit/rpg_hack_project/main.js" type="text/javascript" charset="utf-8"></script>
		<script src="kit/rpg_hack_project/rpgobjects.js" type="text/javascript" charset="utf-8"></script>
```

To,
```html 
		<script src="kit/__your project name__/main.js" type="text/javascript" charset="utf-8"></script>
```

You can load any scripts later.

Open `index.html` again
will start empty stage.


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

var ArcSprite = enchant.Class.create(enchant.Sprite,
{

    initialize: function(name)
    {

        var texture = Asset.Get(name);


        enchant.Sprite.call(texture.width, texture.height);


        this.image = texture;


        
    }
});



var Particle = function() {


}

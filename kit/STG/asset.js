var preload_textures = {};

var preload_sources = [];

preload_sources.push('hackforplay/enchantbook.png', 'enchantjs/x2/map2.png', 'hackforplay/dot_syuj.png', 'enchantjs/x2/icon0.png', 'enchantjs/font2.png', 'enchantjs/monster1.gif',
    'dots_design/bg10_3.gif', 'dot_art_world/SC-Door-Entce03.png', 'rengoku-teien/asa_no_komorebi.mp3', 'etolier/01sougen.jpg');

var Asset = {
    Add: function (name, source) {

        preload_sources.push(source);

        preload_textures[name] = source;

    },

    Preload: function () {
        game.preload(preload_sources);
    },

    Get: function (name) {
        return game.assets[preload_textures[name]];
    }

};


var character_design_asset = {};

var CharacterDesign = {

    Get: function (name) {
        return character_design_asset[name];
    },

    New: function (name, property) {
        var design = character_design_asset[name] = {};


        (function () {

            this.name = 'character-' + name;

            this.width = property.width;
            this.height = property.height;
            this.animation_row = property.animation_row;
            this.animation_time = property.animation_time;

            this.center_x = property.center_x;
            this.center_y = property.center_y;


            // 比率を計算する
            this.image_scale_x = property.default_width === undefined ? 0 : property.default_width / this.width;
            this.image_scale_y = property.default_height === undefined ? 0 : property.default_height / this.height;

            this.collision_size = property.collision_size;

        }).call(design);


        // テクスチャを登録する
        Asset.Add(design.name, property.source);

    },





};









var shot_material_asset = {};


var Material = {

    New: function (name, property) {
        var material = shot_material_asset[name] = {};


        (function () {

            this.name = 'material-' + name;

            this.width = property.width;
            this.height = property.height;

            // 比率を計算する
            this.image_scale_x = property.default_width === undefined ? 0 : property.default_width / this.width;
            this.image_scale_y = property.default_height === undefined ? 0 : property.default_height / this.height;


            this.collision_size = property.collision_size;

        }).call(material);


        // テクスチャを登録する
        Asset.Add(material.name, property.source);

    },

    Get: function (name) {
        return shot_material_asset[name];
    }

};

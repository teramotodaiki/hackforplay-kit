// 設定ファイル
(function(){
	var s = function(key, value){
		sessionStorage.setItem('stage_param_'+key, value);
	};

	s('directly_restaging', ''); // 空文字以外にすると、最初からrestaging状態になる
	s('youtube', 'm2Qb2ryoUhs'); // 埋め込みYouTubeのURL

	// ========DON'T TOUCH========
	s('src', "frame.html");
	s('mode', "official");
	s('game_mode', "official");

})();
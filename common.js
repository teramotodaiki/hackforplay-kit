// 設定ファイル
(function(){
	var s = function(key, value){
		sessionStorage.setItem('stage_param_'+key, value);
	};
	s('src', "frame.html");
	s('mode', "official");
	s('game_mode', "official");
	s('youtube', 'm2Qb2ryoUhs');

})();
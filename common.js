// 設定ファイル
(function(){
	var s = function(key, value){
		sessionStorage.setItem('stage_param_'+key, value);
	};
	s('src', "frame.html");
	s('mode', "official");
})();
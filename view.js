$(function(){
	var focus_on_game = true; // focus mode -> game
	// ゲーム画面にフォーカスする
	setInterval(function(){
		var game = $(".h4p_game>iframe").get(0);
		if(	game !== undefined && game !== document.activeElement && focus_on_game){
			var source = "refocus();";	// フォーカスを戻すメソッドをゲーム側で呼び出す
			game.contentWindow.postMessage(source, '/');
		}
	}, 100);
	// モーダル表示中は、モーダルにフォーカスする
	$('.modal').on('show.bs.modal', function() {
		focus_on_game = false;
	});
	$('.modal').on('hide.bs.modal', function() {
		focus_on_game = true;
	});
	// ゲームフレームを横幅基本で3:2にする
	var width = $(".h4p_game").width();
	// frame.phpを経由して、getParam('src')のページをincludeさせる
	var gameSrc = encodeURIComponent(getParam('src'));
	$(".h4p_game").height(width/1.5)
		.children('iframe').attr({
			'src': 'frame.php?file=' + gameSrc + '&path=' + getParam('path') + '&next=' + getParam('next') + '&mode=' + getParam('mode'),
			'width': width,
			'height': width/1.5
		});
	$(".h4p_clear").height(width/1.5);
	// ゲームクリアの処理
	window.addEventListener('message', function(e){
		switch(e.data){
			case "clear":
				$(".h4p_game").hide();
				// 一旦全部隠す
				$(".h4p_clear-img").hide();
				$(".h4p_clear-next").hide();
				// フェードイン
				$(".h4p_clear").fadeIn('slow', 'linear', function(){
					var width = $(".h4p_clear-img").css('width');
					$(".h4p_clear-img").css({'width':'100%', 'opacity':'0'})
					.animate({'width':width, 'opacity':'1'}, 'slow', function() {
						$(".h4p_clear-next").fadeIn('slow');
					});
				});
				break;
			case "thumbnail":
				var data = sessionStorage.getItem('image');
				if (data) $(".stage-thumbnail").attr('src', data);
				break;
			case "screenshot":
				$("#screenshotModal").modal("show");
				// このあと"thumbnail"を呼び出す
				break;
			case "replace_code":
				var code = sessionStorage.getItem('restaging_code');
				jsEditor.setValue(code);
				break;
		}
	});

	// HackforPlay RePlay (then externalizing the code)
	// 読み込み時の処理
	var jsEditor = CodeMirror.fromTextArea($('textarea[name=restaging_code]').get(0), {
		mode: "javascript",
		lineNumbers: true,
		indentUnit: 4,
		autoClossBrackets: true
	});
	jsEditor.on('beforeChange', function(cm, change) {
		if (change.origin === "undo" && cm.doc.historySize().undo === 0) {
			// Ctrl+Zの押し過ぎで、全部消えてしまうのをふせぐ
			change.cancel();
		}
	});
	var $div = $("div.h4p_restaging_editor");
	jsEditor.setSize($div.width(), $div.height());
	if(getParam('mode') !== "restaging"){
		$(".h4p_restaging").hide();
		$(".h4p_while-restaging").hide();
	}
	// ステージ改造中、画面遷移するとき注意をうながす
	var alert_on_unload = false;
	$(window).on('beforeunload', function(event) {
		if(alert_on_unload){
			return "制作中のステージは「マイページ」に保存されています。ただし「ステージ改造コードを実行」を押してから変更した部分は保存されません";
		}else{
			event.preventDefault();
		}
	});
	(function(){
		var beginRestaging = function(){
			alert_on_unload = true;
			$(".h4p_restaging").fadeIn("fast", function() {
				var storage_key = getParam('retry') === '1' ? 'retry_code' : 'restaging_code';
				var code = sessionStorage.getItem(storage_key);
				if(code !== null){
					jsEditor.setValue(code);
				}
				$(this).hover(function() {
					focus_on_game = false; // focus on editor
				}, function() {
					if (!$('.modal').hasClass('in')) {
						focus_on_game = true; // focus on game
					}
				});
			});
			$(".h4p_info-footer").text("（リステージング中）");
			$(".h4p_info-restaging>button").hide();
			$(".h4p_info-retry>a").hide();
			$(".h4p_info-retry-button").show();
			$(".h4p_info-retry-button").on('click', function() {
				jsEditor.save();
				var code = jsEditor.getTextArea().value;
				sessionStorage.setItem('retry_code', code);
				alert_on_unload = false;
				location.href = '?id='+getParam('id') + '&mode=restaging&retry=true';
			});
			$(".h4p_restaging_button").on('click', function() {
				// RUN (Add &mode=restaging)
				var loading = $(this).find('button');
				jsEditor.save();
				var code = jsEditor.getTextArea().value;
				sessionStorage.setItem('restaging_code', code);
				alert_on_unload = false;
				location.href = "?id=" + getParam('id') + "&mode=restaging";
			});
			$(".h4p_while-restaging").show();
		};
		switch(getParam('mode')){
			case "official":
				// official mode (load default code from main.js)
				$(".begin_restaging").on('click', function() {
					beginRestaging();
				});
				break;
			case "restaging":
				// restaging mode (load javascript-code from sessionStorage)
				beginRestaging();
				$(".h4p_publish").show();
				$("#stage-name_alert").hide();
				$("#author_alert").hide();
				$('#inputModal').on('show.bs.modal', function () {
					// canvas to image
					var game = $(".h4p_game>iframe").get(0);
					var source = "saveImage();";
					game.contentWindow.postMessage(source, '/');
				});
				$("#publish-button").on('click', function() {
					alert('キット開発用なので投稿はできません');
				});
				scrollToAnchor();
				break;
			case "replay":
				// replay mode (load javascript-code and run it)
				sessionStorage.setItem('restaging_code', getParam('replay_code'));
				$(".begin_restaging").on('click', function() {
					beginRestaging();
				});
				break;
			case "extend":
				// extend mode (extends restaging-code in tutorial)
				beginRestaging();
				scrollToAnchor('.h4p_restaging');
				break;
		}
	})();

	function getParam(key){
		return sessionStorage.getItem('stage_param_'+key) || '0';
	}
});
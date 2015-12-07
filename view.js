var onYouTubeIframeAPIReady = null;
$(function(){
	var focus_on_game = true; // focus mode -> game
	// ゲーム画面にフォーカスする
	setInterval(function(){
		var game = $(".h4p_game>iframe").get(0);
		if(	game !== undefined && game !== document.activeElement && focus_on_game){
			var source = "refocus();";	// フォーカスを戻すメソッドをゲーム側で呼び出す
			game.contentWindow.postMessage(source, '*');
		}
	}, 100);
	// テキストボックスにフォーカスがあるときはゲームにフォーカスしない
	$('input,textarea').focus(function(event) {
		focus_on_game = false;
	}).blur(function(event) {
		focus_on_game = true;
	});

	// ゲームフレームを横幅基本で3:2にする
	var width = $(".h4p_game").width();
	// frame.phpを経由して、getParam('src')のページをincludeさせる
	$(".h4p_game").height(width/1.5)
		.children('iframe').attr({
			'src': getParam('src'),
			'width': width,
			'height': width/1.5
		});
	$(".h4p_clear").height(width/1.5);
	$(".h4p_credit").height(width/1.5);
	// ゲームクリアの処理
	window.addEventListener('message', function(e){
		switch(e.data){
			case "tutorial_next_page":
				// 1~5のときは次のページへ / 6のときは getaccount へ
				if (getParam('next') >> 0) {
					location.href = '/s/?id=' + getParam('next');
				} else {
					location.href = '/getaccount/';
				}
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
			case "begin_restaging":
				// ゲーム側からリステージングを開始する
				$('.begin_restaging').trigger('click');
				break;
			case "show_hint":
				// ゲーム側からヒントを表示すると、モーダルがひらく
				$('#youtubeModal').modal('show');
				break;
			case "show_comment":
				// ゲーム側からコメントの入力画面を表示する
				$('#commentModal').modal('show');
				break;
			case "quest_clear_level":
				(function (callback) {
					// 報告義務はあるか？ (クエスト|レベル) に, 初挑戦した or まだクリアしていない とき true
					if (getParam('reporting_requirements')) {

						$.post('../stage/sendlevelstate.php', {
							'level': getParam('level')
						} , function(data, textStatus, xhr) {
							callback();
						});
					} else {
						callback();
					}
				})(function() {
					// 次のレベルに移動する処理を準備しておく (トリガーはゲーム側に引かせる)
					window.addEventListener('message', function (event) {
						if (event.data === 'quest_move_next') {
							// 次のレベルが存在するか
							if (getParam('next') >> 0 > 0) {
								// 次のレベルに遷移
								location.href = '/s/?mode=quest&level=' + getParam('next');
							} else {
								// (クエストコンプリート後の動線.ひろばにもどる)
								location.href = '/town/';
							}
						}
					});
				});
				break;
		}
	});

	// leave comment then take
	$('#commentModal').on('show.bs.modal', function () {
		// canvas to image
		var game = $(".h4p_game>iframe").get(0);
		var source = "saveImage('thumbnail');";
		game.contentWindow.postMessage(source, '*');

		$(this).find('#leave-comment').button('reset');
	});

	$('#commentModal #leave-comment').on('click', function(event) {

		var tag_value = $('#commentModal input[name="comment-tag"]:checked').val();
		var message_value = $('#commentModal #comment-message').val();
		var loading = $(this).button('loading');
		$('#commentModal #comment-alert-message').addClass('hidden');

		// submit
		var timezone = new Date().getTimezoneString();
		$.post('../stage/addcommentandtag.php',{
			'stageid' : getParam('id'),
			'message': message_value,
			'tags': tag_value,
			'thumb': sessionStorage.getItem('image') || null,
			'timezone': timezone,
			'attendance-token': sessionStorage.getItem('attendance-token')
		}, function(data, textStatus, xhr) {
			switch (data) {
				case 'missing-message':
					$('#commentModal #comment-alert-message').removeClass('hidden');
					loading.button('reset');
					break;
				case 'missing-stage':
				case 'already-comment':
				case 'database-error':
				case '':
					// コメントのリロード
					getCommentTask(function() {
						loading.button('reset');
						$('#commentModal').modal('hide');
					});
					break;
			}
		});

	});

	// コメントを取得
	function getCommentTask(callback) {

		$('.h4p_my-comment').addClass('hidden');

	}
	getCommentTask();

	$('.h4p_my-comment .h4p_comment-trash').on('click', function(event) {

		// コメントの削除
		var message = $('.h4p_my-comment .comment-message').text();
		if (confirm(message + '\n\nこのメッセージを さくじょ します')) {
			// 削除の実行
			$.post('../stage/removecommentbyid.php', {
				'comment_id': $('.h4p_my-comment .h4p_comment-trash').data('id'),
				'attendance-token' : sessionStorage.getItem('attendance-token')
			} , function(data, textStatus, xhr) {
				switch (data) {
					case 'no-session':
						$('#signinModal').modal('show');
						break;
					case 'not-found':
					case 'database-error':
						alert('エラー\nさくじょ できなかった');
						sessionStorage.setItem('stage_param_comment', 'true');
						break;
					case 'success':
						$('.h4p_my-comment').addClass('hidden');
						sessionStorage.setItem('stage_param_comment', '');
						break;
				}
			});
		}
	});

	// Share Buttons
	(function () {
		var encodedTitle = encodeURIComponent(getParam('title'));
		var URL = 'https://hackforplay.xyz/s/?id='+getParam('id');
		var encodedURL = encodeURIComponent(URL);
		$('.twitter-share-button').attr('href', 'https://twitter.com/intent/tweet?hashtags=hackforplay&text=' + encodedTitle + '&url=' + encodedURL);
		$('.fb-share-button').attr('data-href', URL);
		$('.h4p-link-button').height(22).css({
			'margin-top': '-10px',
			'padding': '1px 10px'
		}).addClass('btn btn-sm btn-default').click(function(event) {
			var input = $('<input>').attr({
				'type': 'text',
				'size': URL.length,
				'value': URL
			}).click(function(event) {
				$(this).get(0).selectionStart = 0;
				$(this).get(0).selectionEnd = URL.length;
				$(this).focus();
			}).focus(function(event) {
				focus_on_game = false;
			}).blur(function(event) {
				focus_on_game = true;
			}).insertAfter(this);
			$(this).remove();
			input.focus();
		});
	})();

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
	// ステージ改造中、画面遷移するとき注意をうながすフラグ
	var alert_on_unload = false;

	(function(){
		var beginRestaging = function(isExtendMode){

			// frame.phpを経由して、getParam('src')のページをincludeさせる
			// モードをRestagingにする
			var gameSrc = encodeURIComponent(getParam('src'));
			// hack系統のみ、GETパラメータではmodeを渡せないことがあるので、modeはsessionStorageで渡すようにする.
			sessionStorage.setItem('stage_param_mode', 'restaging');
			sessionStorage.setItem('stage_param_game_mode', 'restaging');
			$(".h4p_game").height(width/1.5).children('iframe').attr({
				'src': getParam('src')
			});
			// シェアボタンを非表示に
			$('.h4p_share-buttons').hide();

			// ロギングを開始
			(function() {
				// 前のトークンを削除
				sessionStorage.removeItem('restaginglog-token');

				// ロギングをサーバーで開始
				beginLog();

				var log = {}; // 初期化
				var updateInterval = 10 * 1000; // [ms]

				// ロギング
				$('.h4p_restaging_button').on('click', function() {
					log.ExecuteCount = log.ExecuteCount || 0;
					log.ExecuteCount ++;
				});
				$('.h4p_save_button').on('click', function() {
					log.SaveCount = log.SaveCount || 0;
					log.SaveCount ++;
				});
				jsEditor.on('beforeChange', function(cm, change) {
					switch (change.origin) {
					case '+input':
						change.text.forEach(function(input){
							Array.prototype.forEach.call(input, function(key) {
								if (key.match(/[0-9]/g)) {
									log.InputNumberCount = log.InputNumberCount || 0;
									log.InputNumberCount ++;
								} else if (key.match(/[a-zA-Z]/g)){
									log.InputAlphabetCount = log.InputAlphabetCount || 0;
									log.InputAlphabetCount ++;
								} else {
									log.InputOtherCount = log.InputOtherCount || 0;
									log.InputOtherCount ++;
								}
							});
						});
						break;
					case 'paste':
						log.PasteCount = log.PasteCount || 0;
						log.PasteCount ++;
						break;
					case '+delete':
					case 'cut':
						log.DeleteCount = log.DeleteCount || 0;
						log.DeleteCount ++;
						break;
					}
				});

				// 定期送信
				var lastJsonString = JSON.stringify(log);
				var currentInterval = updateInterval;
				(function task () {
					var current = JSON.stringify(log);
					if (lastJsonString !== current) {
						updateLog(function() {
							lastJsonString = current;
							currentInterval = updateInterval;
						}, function() {
							currentInterval *= 2; // 失敗時の対処
						});
					}
					setTimeout(task, currentInterval);
				})();

				// 最終送信
				window.addEventListener('beforeunload', function(event) {
					updateLog();
					if (alert_on_unload) {
						event.returnValue = "せいさくちゅう の ステージ は「マイページ」に ほぞん されています。";
					} else {
						event.preventDefault();
					}
				});

				function beginLog (successed, failed) {
					// ロギングの開始をサーバーに伝え、トークンを取得する
				}
				function updateLog (successed, failed) {
					// ログをアップデートする
					$.post('../analytics/updaterestaginglog.php', {
						'token': sessionStorage.getItem('restaginglog-token'),
						'log': JSON.stringify(log)
					}, function(data, textStatus, xhr) {
						switch (data) {
							case 'parse-error':
								break;
							case 'invalid-token':
								// もういちどbeginLogをこころみる
								beginLog(function() {
									setTimeout(function() {
										updateLog();
									}, 1000);
								}, function() {
									if (failed) failed();
								});
								break;
							case 'error':
								if (failed) failed();
								break;
							case 'success':
								if (successed) successed();
								break;
							default:
								if (failed) failed();
								break;
						}
					});
				}

			})();

			(function() {

				// タブの描画（画面の高さにレスポンシブ）
				var old_container_height = 0;
				setInterval(function() {

					var container_height = $('.container-game').outerHeight();
					if (old_container_height !== container_height) {
						var top_height = $('.h4p_tab-top').height();
						var bottom_height = $('.h4p_tab-bottom').height();
						$('.h4p_tab-middle').height(container_height - top_height - bottom_height);

						old_container_height = container_height;
					}
				}, 100);

				// ２カラムアライメント（ゲームビュー | YouTubeビュー）
				// var alignmentMode = getParam('youtube') ? 'both' : 'game'; // both(２カラム) | game(ゲーム画面のみ)
				var alignmentMode = 'both'; // both(２カラム) | game(ゲーム画面のみ)
				var reload_timer = null;

				// アライメントモードの切り替え
				$('.h4p_alignment-trigger').on('click', function(event) {
					switch (alignmentMode) {
					case 'both':
						alignmentMode = 'game';
						$('.h4p_tab-top img').attr('src', 'img/tab_top_r.png');
						break;
					case 'game':
						alignmentMode = 'both';
						$('.h4p_tab-top img').attr('src', 'img/tab_top.png');
						break;
					}
					alignment();
				});

				function alignment() {

					var body_width = $(document.body).width();
					switch (alignmentMode) {
					case 'both':
						// 2カラム およそ50:50
						$('.container-game').css({
							'padding-left': '25px',
							'padding-right': '0px',
							'width': body_width / 2 >> 0
						});
						$('.container-tab').removeClass('hidden');
						var youtube_width = body_width - $('.container-game').outerWidth() - $('.container-tab').outerWidth() - 60;
						$('.container-youtube,.container-assets').removeClass('hidden').outerWidth(youtube_width);
						$('.h4p_youtube-frame iframe').attr({
							'width': youtube_width,
							'height': youtube_width / 1.5
						});
						break;
					case 'game':
						// 1カラム 100:0 ただし幅には最大値がある
						var right_space = $('.container-tab').outerWidth() + 20;
						var content_width = Math.min(800, body_width - right_space * 2);
						$('.container-game').css({
							'padding-left': (body_width - content_width) / 2 >> 0,
							'padding-right': (body_width - content_width) / 2 - right_space >> 0
						});
						$('.container-game').width(content_width);

						$('.container-tab').removeClass('hidden');
						$('.container-youtube,.container-assets').addClass('hidden').width(0);
						break;
					}

					if ($('.h4p_game>iframe').width() !== $('.container-game').width()) {
						// ゲームの幅を変更
						$('.h4p_game,.h4p_game>iframe').width($('.container-game').width()).height($('.container-game').width() / 1.5 >> 0);

						// リロード ごまかしのフェードイン
						if (reload_timer) clearTimeout(reload_timer);
						reload_timer = setTimeout(function() {
							$(".h4p_game>iframe").hide().get(0).contentWindow.postMessage('window.location.reload();', '*');
							$('.h4p_game>iframe').fadeIn('slow');
						}, 100);
					}
					$('.container-game').css('float', 'left');

					// エディタの幅を変更
					setTimeout(function() {
						var $div = $("div.h4p_restaging_editor");
						jsEditor.setSize($div.width(), $div.height());
					}, 10);

				}

				// リサイズイベント
				(function() {
					var old_body_width = 0;
					$(window).on('resize', function() {
						// 幅が変わっていないときはスルー
						if (old_body_width === $(document.body).width()) return;
						alignment();
						old_body_width = $(document.body).width();
					});

				})();
				alignment();

			})();

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
			$(".h4p_restaging_button").on('click', function() {
				// RUN
				jsEditor.save();
				var code = jsEditor.getTextArea().value;
				sessionStorage.setItem('restaging_code', code);

				// 投稿可能状態に
				$(".h4p_publish").show();
				$("#stage-name_alert").hide();
				$("#author_alert").hide();

				// ゲームをリロード
				if (!isExtendMode) {
					// リロード
					$('.h4p_game>iframe').get(0).contentWindow.postMessage('window.location.reload();', '*');
				} else {
					// Extendモード時はmode=restagingにしてリロード
					sessionStorage.setItem('stage_param_game_mode', 'restaging');
					$('.h4p_game>iframe').attr({
						'src': getParam('src')
					});
				}
			});
			$('.h4p_save_button').on('click', function() {
				// Save
				var loading = $(this).find('button');

				// サムネイル生成のコールバックとしてタスクを準備
				window.addEventListener('message', (function task(e) {
					// onmessageのリスナとして登録するので識別をおこなう
					if (e.data !== 'updateProject') return;
					// 即座にリスナを解放する
					window.removeEventListener('message', task);

					if(sessionStorage.getItem('project-token') === null){
						// プロジェクトが作られていないので、作成
						loading.button('loading');
						makeProject(function() {
							updateTask(function() {
								loading.button('reset');
							});
						}, function() {
							loading.button('reset');
						});
					}else{
						loading.button('loading');
						updateTask(function() {
							loading.button('reset');
						});
					}
				}));

				// サムネイルを生成
				$('.h4p_game>iframe').get(0).contentWindow.postMessage("saveImage('updateProject');", '*');

			});

			// ビューの設定
			$(".h4p_while-restaging").show(); // UI
			$(document.body).css('background-color', 'rgb(92, 92, 92)');

			// 投稿時の設定
			$('#inputModal').on('show.bs.modal', function () {
				// サムネイルを生成
				$(".h4p_game>iframe").get(0).contentWindow.postMessage("saveImage('thumbnail');", '*');
			});

			// 投稿
			$("#publish-button").on('click', function() {

				$("#inputModal").modal('hide');
				// 必ず保存してから投稿
				$('.h4p_save_button button').button('loading');
				updateTask(function() {
					$('.h4p_save_button button').button('reset');
					publishTask();
				});
			});

			// YouTubeの設定
			if (getParam('youtube') !== '') {

				// YouTube Frame API をロード
				$('<script>').attr('src', 'https://www.youtube.com/iframe_api').prependTo('body');
				onYouTubeIframeAPIReady = function() {
					var player = new YT.Player('kit-embed-content', {
						width: $('.h4p_youtube-frame').width(),
						height: $('.h4p_youtube-frame').width() / 1.5,
						videoId: getParam('youtube')
					});
				};
			}

			// Smart Assets
			(function () {
				var smartAsset = null, __counters = {};
				window.addEventListener('message', function (event) {
					if (event.data === 'game_loaded') {
						var str = sessionStorage.getItem('stage_param_smart_asset');
						smartAsset = $.parseJSON(str); // Update Smart Assets
						smartAsset.apps.forEach(function (asset, index) {
							// elementのdata-cacheと比較. eleがない:追加, eleと同じ:無視, eleと違う: 挿入後、eleを削除
							var element = $('.container-assets .smart-asset-entity').get(index),
							json = JSON.stringify(asset);
							if (element && $(element).data('cache') === json) return; // eleと同じ:無視
							var $div = this.clone(true, true).data({
								index: index,
								cache: json,
								init: 'no'
							}).toggleClass('smart-asset-sample smart-asset-entity query-' + asset.query);
							if (!element) {
								$div.appendTo(this.parent()); // eleがない:追加
							} else {
								$div.insertBefore(element);
								element.remove(); // eleと違う: 挿入後、eleを削除
							}
							// icon
							var size = $div.find('.toggle-click-false').outerHeight($div.width()).height();
							$div.find('img.icon').attr('src', asset.image).on('load', function() {
								if (asset.trim) {
									var x = asset.trim.x !== undefined ? asset.trim.x / asset.trim.width :
									asset.trim.frame % (this.width / asset.trim.width),
									y = asset.trim.y !== undefined ? asset.trim.y / asset.trim.height :
									asset.trim.frame / this.width * asset.trim.width >> 0;
									$(this).css({
										position: 'relative',
										top: '-' + (y * size >> 0) + 'px',
										left: '-' + (x * size >> 0) + 'px',
										width: this.width * size / asset.trim.width,
										height: this.height * size / asset.trim.height
									});
								} else {
									$(this).addClass('img-responsive');
								}
							});
						}, $('.container-assets .smart-asset-sample'));
						// Removed Assets
						$('.container-assets .smart-asset-entity').filter(function(index) {
							return index >= smartAsset.apps.length;
						}).remove();
						$('.container-assets').css('height', $('.container-assets').outerHeight());
					}
				});
				$('.container-assets').on('click', '.smart-asset-entity', function() {
					$(this).toggleClass('toggle-clicked');
					var index = $(this).data('index') >> 0;
					var asset = smartAsset.apps[index];
					var toggle = $(this).hasClass('toggle-clicked');
					var init = $(this).data('init');
					$('.container-assets .smart-asset-entity').each(function(index, el) {
						// close all
						$(el).removeClass('col-xs-12 toggle-clicked').addClass('col-lg-2 col-md-3 col-sm-4 col-xs-6');
					});
					if (toggle) {
						if (init === 'no') {
							$(this).trigger('init.hfp', asset).data('init', 'yes');
						}
						$(this).trigger('show.hfp', asset);
						$(this).toggleClass('col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-12 toggle-clicked');
						// $(this).insertBefore('.smart-asset-entity:first');
					}
				}).on('init.hfp', '.query-embed', function(event, asset) {
					$(this).find('.title').text(asset.title);
					$(this).find('img.embed-icon').attr('src', asset.image).on('load', function() {
						var size = $(this).parent().outerHeight($(this).parent().parent().width()).height();
						if (asset.trim) {
							var x = asset.trim.x !== undefined ? asset.trim.x / asset.trim.width :
							asset.trim.frame % (this.width / asset.trim.width),
							y = asset.trim.y !== undefined ? asset.trim.y / asset.trim.height :
							asset.trim.frame / this.width * asset.trim.width >> 0;
							$(this).css({
								position: 'relative',
								top: '-' + (y * size >> 0) + 'px',
								left: '-' + (x * size >> 0) + 'px',
								width: this.width * size / asset.trim.width,
								height: this.height * size / asset.trim.height
							});
						} else {
							$(this).addClass('img-responsive');
						}
					});
					$(this).find('.embed-caption').text(asset.caption);
				}).on('init.hfp', '.query-toggle', function(event, asset) {
					$(this).find('.title').text(asset.title);
					$(this).find('.media-image').attr('src', asset.media);
				}).on('show.hfp', '.query-embed', function(event, asset) {
					// Update Embed Code
					$(this).trigger('update.hfp', asset);
				}).on('click', '.query-embed button', function(event) {
					// Get asset
					var $div = $(this).parents('.query-embed'),
					index = $div.data('index') >> 0,
					asset = smartAsset.apps[index];
					// Get code
					jsEditor.save();
					var code = jsEditor.getTextArea().value,
					keyword = $div.data('keyword'),
					replacement = $div.data('replacement'),
					splited = code.split(keyword);
					// Replace
					jsEditor.setValue(splited.join(replacement));
					jsEditor.save();
					if (splited.length > 1) {
						jsEditor.setSelection({
							line: splited[0].split('\n').length, ch: 0 }, {
							line: splited[0].split('\n').length + replacement.split('\n').length - 5, ch: 0 }, {
							scroll: true
						});
					}
					// Count up
					asset.counters.forEach(function (key) {
						var cnt = __counters[key];
						cnt.index = (cnt.index + 1) % cnt.table.length;
					});
					$('.h4p_restaging_button').trigger('click');
					$(this).trigger('update.hfp', asset); // Update code
					return false;
				}).on('update.hfp', '.query-embed', function(event, asset) {
					jsEditor.save();
					var code = jsEditor.getTextArea().value;
					// regExp に一致する matches について、それぞれ head, indent, comment に分割
					var placeholders = (function (regExp) {
						var result = [];
						(code.match(regExp) || []).forEach(function (match, index) {
							var array = match.replace(regExp, '$1\0$2\0$3').split('\0');
							result.push({
								raw: match,
								head: array[0],
								indent: array[1],
								comment: array[2]
							});
						});
						return result;
					})(/(^|\n)([ \t]*)(\/\/.*\/\/\n)/g);
					// Make dictionaly
					var dictionaly = (asset.variables || []).map(function(item) {
						// Variable
						for (var i = 1; i < 100000; i++) {
							if (code.match(new RegExp('(^|\\W)' + item + i + '(\\W|$)')) === null) {
								return {
									key: new RegExp('(^|\\W)' + item + '(\\W|$)', 'g'),
									value: '$1' + item + i + '$2'
								};
							}
						}
					}).concat((asset.counters || []).map(function(item) {
						// Counters
						if (smartAsset.counters[item] !== undefined) {
							var cnt = __counters[item] = (__counters[item] || smartAsset.counters[item]);
							cnt.index = cnt.index > -1 ? cnt.index : 0;
							return {
								key: item,
								value: cnt.table[cnt.index]
							};
						}
					}));
					// Translation
					var lines = asset.lines.map(function(line) {
						dictionaly.forEach(function (item) {
							line = line.replace(item.key, item.value);
						});
						return line;
					});
					// Replacement (ALL keywords contains)
					var replacement = null;
					placeholders.filter(function (p) {
						var raw = asset.identifier,
						identifier = typeof raw === 'string' ? raw.split('') : raw instanceof Array ? raw : [];
						return identifier.every(function (keyword) {
							return p.comment.indexOf(keyword) > -1;
						});
					}).forEach(function (p) {
						replacement = [
							p.head, // 事前の改行または行頭
							lines.join('\n' + p.indent) + '\n', // Smart Assets の中身
							'\n', '\n', // ２つの空行
							p.comment
						].join(p.indent);
						$(this).data({
							'keyword': p.raw,
							'replacement': replacement
						});
					}, this);
					// Set
					$(this).find('.embed-code').children().remove();
					lines.forEach(function (line) {
						$('<p>').text(line).appendTo(this);
					}, $(this).find('.embed-code'));
				}).affix({
					offset: {
						top: $('nav.navbar').outerHeight(true),
						bottom: function () { return -$('.container-game').outerHeight()+340; }
					}
				}).css('left', $('.container-game').outerWidth() + $('.container-tab').outerWidth());
			})();
		};

		function makeProject (successed, failed) {
			// 残っているトークンを破棄
			sessionStorage.removeItem('project-token');
			var code = sessionStorage.getItem('restaging_code');
			var timezone = new Date().getTimezoneString();
			$.post('../project/makefromstage.php', {
				'stageid': getParam('id'),
				'timezone': timezone,
				'attendance-token': sessionStorage.getItem('attendance-token')
			}, function(data, textStatus, xhr) {

				switch(data){
					case 'no-session':
						$('#signinModal').modal('show').find('.modal-title').text('ステージを改造するには、ログインしてください');
						if (failed !== undefined) {
							failed();
						}
						break;
					case 'invalid-stageid':
						showAlert('alert-danger', 'このステージは改造できません');
						break;
					case 'database-error':
						showAlert('alert-danger', 'エラーにより改造できませんでした');
						break;
					default:
						sessionStorage.setItem('project-token', data);
						if(successed !== undefined){
							successed();
						}
						break;
				}
			});
		}
		function updateTask (callback) {
			// Update data
			var token = sessionStorage.getItem('project-token');
			var timezone = new Date().getTimezoneString();
			jsEditor.save();
			var code = jsEditor.getTextArea().value;

			$.post('../project/updatefromtoken.php', {
				'token': token,
				'data': code,
				'source_stage_id': getParam('id'),
				'timezone': timezone,
				'thumb': sessionStorage.getItem('image') || null,
				'attendance-token': sessionStorage.getItem('attendance-token')
			}, function(data, textStatus, xhr) {

				switch(data){
					case 'no-session':
						$('#signinModal').modal('show').find('.modal-title').text('ステージを改造するには、ログインしてください');
						break;
					case 'invalid-token':
						// project-tokenがない、またはサーバー側と照合できないとき
						showAlert('alert-danger', 'プロジェクトが保存されていません。新規に作成を行いますので、しばらくお待ちください…');
						$('.h4p_save_button button').button('loading');
						var tmpCallback = callback; // callbackの発動を遅らせる
						callback = undefined; // callbackの発動を遅らせる
						makeProject(function() {
							updateTask(function() {
								showAlert('alert-success', 'プロジェクトが作成されました！');
								if (tmpCallback !== undefined) {
									tmpCallback();
								}
							});
						});
						break;
					case 'already-published':
						showAlert('alert-danger', 'すでに投稿されたステージです');
						break;
					case 'data-is-null':
						showAlert('alert-danger', '更新するデータが破損していたため、更新されませんでした');
						break;
					case 'database-error':
						showAlert('alert-danger', 'データベースエラーにより、更新されませんでした');
						break;
					case 'no-update':
					case 'success':
						break;
				}
				if (callback !== undefined) {
					callback();
				}
			});
		}
		function publishTask (callback) {

			var title = $("#stage-name").val();
			var explain = $('#stage-explain').val();
			if(title === ""){ $("#stage-name_alert").show('fast'); }
			if(title !== ""){
				$("#h4p_publish button").button('loading');
				jsEditor.save();
				var code = jsEditor.getTextArea().value;
				var timezone = new Date().getTimezoneString();
				$.post('../project/publishreplaystage.php', {
					'token': sessionStorage.getItem('project-token'),
					'thumb': sessionStorage.getItem('image') || null,
					'path': getParam('path'),
					'title': title,
					'explain': explain,
					'timezone': timezone,
					'attendance-token': sessionStorage.getItem('attendance-token')
				} , function(data, textStatus, xhr) {

					$('#h4p_publish button').button('reset');

					switch(data){
						case 'no-session':
							$('#signinModal').modal('show').find('.modal-title').text('ステージを投稿するには、ログインしてください');
							break;
						case 'invalid-token':
							// project-tokenがない、またはサーバー側と照合できないとき
							showAlert('alert-danger', 'プロジェクトが見つかりません。新規に作成を行いますので、しばらくお待ちください…');
							$('.h4p_save_button button').button('loading');
							makeProject(function() {
								updateTask(function() {
									$('.h4p_save_button button').button('reset');
									showAlert('alert-success', 'プロジェクトが作成されました！もう一度投稿してください');
								}, function() {
									$('.h4p_save_button button').button('reset');
								});
							});
							break;
						case 'already-published':
							showAlert('alert-danger', 'すでに投稿されたステージです');
							break;
						case 'database-error':
							showAlert('alert-danger', 'エラーにより投稿できませんでした');
							break;
						default:
							var val = data.split(',');
							$('.h4p_publish button').text('Thank you for your ReStaging!!').attr('disabled', 'disabled');
							$(".h4p_published-info").removeClass('hidden');
							alert_on_unload = false; // 遷移時の警告を非表示
							focus_on_game = false; // iframeにfocusできるように
							$('#stage-share-frame').attr('src', 'share.php?share_id=' + val[0] + '&share_title=' + val[1]);
							break;
					}
				});
			}
		}

		switch(getParam('mode')){
			case "official":
				// official mode (load default code from main.js)
				$(".begin_restaging").on('click', function() {
					beginRestaging();
					sessionStorage.removeItem('project-token'); // プロジェクトキーをリセット
				});
				break;
			case "restaging":
				// restaging mode (load javascript-code from sessionStorage)
				beginRestaging();
				// 投稿可能状態に
				$(".h4p_publish").show();
				$("#stage-name_alert").hide();
				$("#author_alert").hide();

				scrollToAnchor();
				break;
			case "replay":
				// replay mode (load javascript-code and run it)
				sessionStorage.setItem('restaging_code', getParam('replay_code'));
				$(".begin_restaging").on('click', function() {
					beginRestaging();
					sessionStorage.removeItem('project-token'); // プロジェクトキーをリセット
				});
				break;
			case "extend":
				// extend mode (extends restaging-code in tutorial)
				beginRestaging(true);
				scrollToAnchor('.h4p_restaging');
				break;
			case "quest":
				// quest mode (load javascript-code and run it)
				sessionStorage.setItem('restaging_code', getParam('replay_code'));
				$(".begin_restaging").on('click', function() {
					beginRestaging();
					sessionStorage.removeItem('project-token'); // プロジェクトキーをリセット
				});
				if (!getParam('directly_restaging')) {
					// Show credit
					$('.container-game .h4p_game iframe').css('opacity', 0);
					$('.container-game .h4p_credit').removeClass('hidden');
					$('.container-game .h4p_credit .Title').text(getParam('title'));
					$('.container-game .h4p_credit .Author').text(getParam('author'));
					$('.container-game .h4p_credit .hasnext-' + !!(getParam('next') >> 0)).removeClass('hidden');
					$('.container-game .h4p_credit .PlayOrder').text(getParam('playorder'));

					// 順番にフェードイン
					$('.credit-timeline').hide();
					(function task (index) {
						var $element = $('.credit-timeline.credit-timeline-' + index);
						if ($element === undefined) return;
						$element.fadeIn(1000, function() {
							task(index + 1);
						});
					})(0);

					// ロードされた瞬間、ゲームを一時停止する
					var paused = false, creditVisibility = true;
					window.addEventListener('message', function(event) {
						if (event.data === 'game_loaded' && creditVisibility) {
							$('.container-game .h4p_game iframe').get(0).contentWindow.postMessage('game.pause()', '*');
							paused = true;
						}
					});
					// 2秒後、ゲームをフェードインする
					setTimeout(function() {
						$('.container-game .h4p_credit').addClass('hidden');
						$('.container-game .h4p_game iframe').css('opacity', 1);
						creditVisibility = false;
						if (paused) {
							$('.container-game .h4p_game iframe').get(0).contentWindow.postMessage('game.resume()', '*');
						}
					}, 4000);
				}
				break;
		}

		// Directly restaging
		// 任意のステージをmode=restaging以外で読み込んだ直後にbeginRestagingするモード
		if (getParam('directly_restaging')) {
			switch (getParam('mode')) {
			case 'official':
				// replace_code を受けたのち, beginRestaging
				window.addEventListener('message', function task(event) {
					if (event.data === 'replace_code') {
						beginRestaging();
						sessionStorage.removeItem('project-token'); // プロジェクトキーをリセット
						window.removeEventListener('message', task);
					}
				});
				break;
			case 'replay':
			case 'quest':
				// 直後にbeginRestaging
				beginRestaging();
				sessionStorage.removeItem('project-token'); // プロジェクトキーをリセット
				break;
			}
		}
	})();
	(function(){
		// チュートリアル
		var stage_id = getParam('id');
		if(101 <= stage_id && stage_id <= 106){
			// 改造ボタン非表示
			$(".h4p_info-restaging>button").hide();
		}
		// ステージ改造のチュートリアル
		if(201 <= stage_id && stage_id <= 206){
			// この改造ステージを投稿する->次のステージへ
			$(".h4p_publish button").text('次のステージへ')
			.attr({
				'data-toggle': '',
				'data-target': ''
			}).on('click', function() {
				// sessionStorageに保管→EXTENDCODEに送られるように
				jsEditor.save();
				var code = jsEditor.getTextArea().value;
				sessionStorage.setItem('extend_code', code);
				alert_on_unload = false;
				location.href = "/s?id=" + getParam('next') + "&mode=extend";
			});
		}
	})();

	// Twitter OAuthログイン
	$('.login-with-twitter').on('mousedown', function(event) {
		// clickイベントより先に呼び出されるので、色々仕込みができる

		// restaging中ならrestaging_codeを保管する処理を行う
		jsEditor.save();
		var code = jsEditor.getTextArea().value;
		if (code !== '') {

			$(this).data('login_successed', '/s?id=' + getParam('id') + '&mode=restaging');
			alert_on_unload = false; // 警告を出さない
			sessionStorage.setItem('restaging_code', code);
		}
	});

	// ゲームフレームのリロード
	$('.h4p_info-retry button').on('click', function() {
		$(".h4p_game>iframe").get(0).contentWindow.postMessage('window.location.reload();', '*');
	});

	function getParam(key){
		return sessionStorage.getItem('stage_param_'+key) || '';
	}

	// YouTube等によるキットの説明
	(function() {
		// 説明すべきコンテンツが存在するかどうか
		var embed_content = getParam('youtube');
		if (embed_content === '') return;

		// 開かれたときにまだYouTubeがロードされていない場合、ロードを開始する
		var player;
		var body_width = 270; // 仮の幅 実際はモーダルの幅に合わせる
		$('#youtubeModal').on('show.bs.modal', function() {

			if (!player) {
				// YouTube Frame API をロード
				$('<script>').attr('src', 'https://www.youtube.com/iframe_api').prependTo('body');
				onYouTubeIframeAPIReady = function() {
					player = new YT.Player('embed-content', {
						width: body_width,
						height: 400,
						videoId: getParam('youtube')
					});
				};
			}
		}).on('shown.bs.modal', function() {

			body_width = $(this).find('.modal-body').width();
			$('#youtubeModal div#embed-content,#youtubeModal iframe#embed-content').attr({
				width: body_width,
				height: 400
			});
		});

		$('#youtubeModal').on('hide.bs.modal', function(event) {

			// モーダルを閉じた時、再生をストップする
			if (player && player.pauseVideo) {
				player.pauseVideo();
			}
		});

	})();

});
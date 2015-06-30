<?php
// topPage or inGame
$header_pattern = "inGame";
$mode 	= filter_input(INPUT_GET, "mode");
if(!isset($mode)){
	$mode	= $stage['Mode'];
}
?>
<header class="navbar navbar-static-top">
	<div class="container <?php echo $header_pattern === 'inGame' ? 'container-game' : ''; ?>">
		<div class="navbar-header">
	     	<a class="navbar-brand" title="ハックフォープレイ" href="/?rewrite=no">
	        	<img alt="hackforplay" src="/logo.png">
	     	</a>
	    </div>
	    <nav class="collapse navbar-collapse">
	    	<ul class="nav navbar-nav">
	    	<?php if($header_pattern === 'inGame' && $mode === 'official'): ?>
	    		<li><a class="btn btn-link navbar-btn" href="../" title="トップに戻る">トップに戻る</a></li>
	    	<?php elseif ($header_pattern === 'inGame' && $mode !== 'official'): ?>
	    		<li><a class="btn btn-link navbar-btn" href="/r" title="改造ステージ一覧へ">改造ステージ一覧へ</a></li>
	    		<?php if ($author_id !== NULL) : ?>
		    		<li><a class="btn btn-link navbar-btn" href="/m?id=<?php echo $author_id; ?>" target="_blank" title="この人が作った他のステージ">この人が作った他のステージ</a></li>
	    		<?php endif; ?>
	    	<?php else: ?>
	    		<li><a class="btn btn-link navbar-btn" href="/r" title="新着ステージ">新着ステージ</a></li>
	    		<li><a class="btn btn-link navbar-btn" href="/resources" title="リソース">リソース</a></li>
	    		<li><a class="btn btn-link navbar-btn" href="/reference" title="リファレンス">リファレンス</a></li>
			<?php endif; ?>
	    	</ul>
	    	<ul class="nav navbar-nav navbar-right">
	    		<li class="h4p_signin"><button type="button" class="btn btn-link navbar-btn" data-toggle="modal" data-target="#signinModal">ログイン</button></li>
				<li class="h4p_signin"><button type="button" class="btn btn-default navbar-btn" data-toggle="modal" data-target="#authModal">会員登録</button></li>
				<li class="h4p_signout">
					<div class="dropdown">
						<a id="h4p_header-dropdown" class="btn navbar-btn" data-target="#" href="#" data-toggle="dropdown" aria-haspopup="true" role="button" aria-expanded="false" onfocus="this.blur();" >
							<div data-toggle="tooltip" data-placement="bottom" title="マイページと設定">
								<span class="h4p_own-nickname btn btn-link"></span>
								<img class="img-circle h4p_own-thumbnail">
							</div>
						</a>
						<ul class="dropdown-menu" role="menu" aria-labelledby="h4p_header-dropdown">
							<li role="presentation"><a href="/m" title="settings">マイページ</a></li>
							<li role="presentation"><a href="/p" title="settings">設定</a></li>
							<li role="presentation" class="divider"></li>
							<li role="presentation" class="h4p_signout"><a href="javascript:void(0);" onclick="signout();">ログアウト</a></li>
						</ul>
					</div>
				</li>
	    	</ul>
	    </nav>
	</div>
</header>
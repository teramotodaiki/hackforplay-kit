<?php
// Play game
$next = filter_input(INPUT_GET, "next", FILTER_VALIDATE_INT);
$mode = filter_input(INPUT_GET, "mode");
if(!isset($mode)){
	$mode = "official";
}
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="x-ua-compatible" content="IE=Edge">
		<meta name="viewport" content="width=device-width, user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
		<title><?php echo $title; ?> - hackforplay</title>
	</head>
	<body style="margin: 0; background-color: #000;">
		<script type="text/javascript" charset="utf-8">
		var __H4PENV__MODE		= "<?php echo $mode; ?>";
		var __H4PENV__NEXT		= "<?php echo $next; ?>";
		</script>


		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js" type="text/javascript" charset="utf-8"></script>


		<script src="lib/enchant.js" type="text/javascript" charset="utf-8"></script>
		<script src="lib/ui.enchant.js" type="text/javascript" charset="utf-8"></script>
		<script src="lib/hack.js" type="text/javascript" charset="utf-8"></script>
		<script src="kit/STG/math.js" type="text/javascript" charset="utf-8"></script>
		<script src="kit/STG/barrage.js" type="text/javascript" charset="utf-8"></script>
		<script src="kit/STG/character.js" type="text/javascript" charset="utf-8"></script>
		<script src="kit/STG/math.js" type="text/javascript" charset="utf-8"></script>
		<script src="kit/STG/main.js" type="text/javascript" charset="utf-8"></script>
		<style type="text/css">
		textarea.log {
			color: #fff;
			font: bold large sans-serif;
			border: 3px solid #fff;
			border-radius: 10px;
			padding: 10px;
			margin: 3px;
		}


		#debug {
			position: absolute;
			width: 30%;
			height: 30%;
			top: 70%;
			left: 70%;
			box-sizing: border-box;
			border: none;
			resize:none;
			background: rgba(0, 0, 0, .8);
			color: #0f0;
			font-size: 1.2rem;
		}

		</style>



		<textarea id="debug" readonly />



	</body>
</html>

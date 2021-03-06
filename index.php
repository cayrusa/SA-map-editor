<!DOCTYPE html>
<html>
	<head>
		<title>TI3:SA Map Editor v1.0a</title>
		<link rel="stylesheet" href="css/normalize.css">
		<link rel="stylesheet" href="css/style.css">
		<style type="text/css">
			* { -webkit-user-select:none; -webkit-tap-highlight-color:rgba(255, 255, 255, 0); }
			html {height:100%;width:100%;overflow:hidden;}
			body {background:black;color:white;height:100%;width:100%;margin:0;}
			input, textarea {-webkit-user-select:text;}
		</style>
		<script src="https://code.createjs.com/createjs-2015.11.26.min.js"></script>
		<script src="http://code.jquery.com/jquery-2.2.0.min.js"></script>
		<script src="lib/bitmapdata-1.1.1.min.js"></script>
		<script src="lib/canvas-toBlob.js"></script>
		<script src="lib/GameObjects-0.3.js"></script>
		<script src="lib/TI3SA-0.1.js"></script>
	</head>
	<body>
		<canvas id="stage"></canvas>
		<div class="content">
			<div id="menu">
				<ul>
					<li>
						<a class="dropdown" href="#">File</a>
						<ul>
							<li id="new">
								<a href="#">New</a>
							</li>
							<li>
								<a class="dropright" href="#">Save</a>
								<ul>
									<li id="png">
										<a href="#">PNG</a>
									</li>
									<li id="json">
										<a href="#">JSON</a>
									</li>
									<li id="tts">
										<a href="#">TTS</a>
									</li>
								</ul>
							</li>
							<li id="load">
								<a href="#">Load</a>
							</li>
						</ul>
					</li>
					<li id="map">
						<a href="#">Map</a>
					</li>
					<li id="tiles">
						<a class="dropdown" href="#">Tiles</a>
						<ul>
                            <li>
                                <a id="units" href="#">Units</a>
                            </li>
                            <li>
                                <a id="cc" href="#">CC</a>
                            </li>
                            <li>
                                <a id="flags" href="#">Flags</a>
                            </li>
                            <li>
                                <a id="counters" href="#">Counters</a>
                            </li>
                            <li>
                                <a id="misc" href="#">Misc</a>
                            </li>
                            <li>
                                <a id="leaders" href="#">Leaders</a>
                            </li>
                            <li>
                                <a id="objectives" href="#">Objectives</a>
                            </li>
							<li>
								<a id="planets" href="#">Planets</a>
							</li>
							<li>
								<a id="special" href="#">Special</a>
							</li>
							<li>
								<a id="homesystems" href="#">Homesystems</a>
							</li>
							<li>
								<a id="tokens" href="#">Tokens</a>
							</li>
						</ul>
					</li>
					<li>
						<a href="#">Help</a>
					</li>
					<li>
						<a href="#">About</a>
					</li>
				</ul>
			</div>
		</div>
	</body>
</html>

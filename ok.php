<html>

<head>
	<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE" />
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<meta name="mobile-web-app-capable" content="yes">

	<script src='jquery/dist/jquery.min.js'></script>
	<script type="text/javascript" src="bower_components/spectrum/spectrum.js"></script>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/tinysort/3.2.5/tinysort.min.js"></script>
	<link rel="stylesheet" href="css/main.css">
	<link rel="stylesheet" href="css/style2.css">
	<link rel="stylesheet" href="css/improvements.css">
	<link rel="stylesheet" href="css/new-layout.css">
	<link rel="stylesheet" href="css/top-toolbar.css">

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />

	<!--Import Google Icon Font-->
	<!-- 	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> -->

	<!--Import materialize.css-->
	<link type="text/css" rel="stylesheet" href="css/materialize.min.css" media="screen,projection" />

	<!-- SweetAlert2 -->
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

	<script src="js/easytimer.min.js"></script>
	<style data-main="1"></style>
</head>

<body>
	<?php
	$rows = isset($_GET["rows"]) ? $_GET["rows"] : 12;
	$cols = isset($_GET["cols"]) ? $_GET["cols"] : 12;
	?>

	<script>
		function getXOb() {
			"use strict";

			var x;

			if (window.XMLHttpRequest) { // Mozilla, Safari,...
				x = new XMLHttpRequest();
				if (x.overrideMimeType) {
					x.overrideMimeType("text/xml");
				}
			} else if (window.ActiveXObject) { // IE
				try {
					x = new ActiveXObject("Msxml2.XMLHTTP");
				} catch (e) {
					x = new ActiveXObject("Microsoft.XMLHTTP");
				}
			}
			return x;
		}


		function loadPuzzle(data) {

			let $rows = data.rows;
			let $cols = data.cols;
			let html = "";
			for ($r = 0; $r < $rows; $r++) {
				for ($c = 0; $c < $cols; $c++) {
					html += `<div class='wr_box'>
						<input class='box' row="` + $r + `" bh='0' bv='0' col="` + $c + `" name="` + $r + "_" + $c + `" type="text">
						<span class='number'></span>
						<span class='actions'></span>
					</div>`;

				}
				html += "<div class='nl'></div>";
			}
			//console.log (html);
			$("#crossword").html(html);
		}



		function loadPuzzleJson(target) {
			"use strict";

			// clear out old puzzle and clues

			/* var n = document.getElementById("puzTable").rows.length;
			while (n > 0) {
				document.getElementById("puzTable").deleteRow(--n);
			}

			document.getElementById("puzAuthor").innerHTML = "";
			document.getElementById("puzNotepad").style.display = "none";
			document.getElementById("puzCopy").innerHTML = "";
			document.getElementById("across").innerHTML = "";
			document.getElementById("down").innerHTML = "";
			document.getElementById("clue1").style.visibility = "hidden";
			document.getElementById("clue2").style.visibility = "hidden";

			document.getElementById("puzTitle").innerHTML = "Fetching data..."; */
			var xob = getXOb();
			xob.open("GET", "22.json?date=" + target, true);  // asynch call to JSON server
			xob.onreadystatechange = function () {
				if (xob.readyState === 4) {                     // if asynch call has returned object
					var json = xob.responseText;
					var puzzle = JSON.parse(json);
					showPuzzleJson(puzzle);
				}
			};
			xob.send(null);
		}

		function showPuzzleJson(puzzle) {

			let $rows = puzzle.size.rows;
			let $cols = puzzle.size.cols;
			let grid = puzzle.grid;
			let across = puzzle.clues.across;
			let down = puzzle.clues.down;
			/* let $rows = data.rows;
			let $cols = data.cols; */
			let mCounter = 0;
			let html = "";
			for ($r = 0; $r < $rows; $r++) {
				for ($c = 0; $c < $cols; $c++) {

					let clDis = "";
					let correctLetter = grid[mCounter];
					if (grid[mCounter] == '.')
						clDis = ' disabled '
					html += `<div class='wr_box'>
						<input class='box ` + clDis + `' row="` + $r + `" bh='0' bv='0' col="` + $c + `" name="` + $r + "_" + $c + `" type="text" data-correct="` + (correctLetter !== '.' ? correctLetter : '') + `">
						<span class='number'></span>
						<span class='actions'></span>
					</div>`;
					mCounter++;
				}
				html += "<div class='nl'></div>";
			}
			//console.log (html);
			$("#crossword").html(html);
			numberize();

			across.forEach(element => {
				let ar = element.split('. ');
				var num = ar[0];
				//console.log(ar[1]);
				$("#fdef input[data-number=" + num + "]").val(element);
			});
			down.forEach(element => {
				let ar = element.split('. ');
				var num = ar[0];
				//console.log(ar[1]);
				$("#vfdef input[data-number=" + num + "]").val(element);
			});
		}

		function showPuzzle(puzzle) {
			"use strict";

			document.getElementById("puzTitle").innerHTML = puzzle.title;
			document.getElementById("puzAuthor").innerHTML = "by " + puzzle.author;
			document.getElementById("puzCopy").innerHTML = "&copy; " + puzzle.copyright;

			var pt = document.getElementById("puzTable");
			var n = 0;
			var i = 0;
			var row, thisrow, col, cell, grid, val;

			for (row = 0; row < puzzle.size.rows; row += 1) {
				thisrow = pt.insertRow(row);
				for (col = 0; col < puzzle.size.cols; col += 1) {
					cell = thisrow.insertCell(col);
					grid = puzzle.gridnums[n];

					if (grid === 0) {                     // 0 means no grid number at this location
						grid = " ";
					}

					val = puzzle.grid[n];

					if (val === ".") {
						cell.className = "black";
					}
					else {
						cell.innerHTML = "<div class='grid'>" + grid + "</div>" + "<div class='letter'>" + val + "</div>";
						if (puzzle.circles && puzzle.circles[n] === 1) {
							cell.className = puzzle.shadecircles ? "shade" : "circle";
						}
					}

					n += 1;
				}
			}

			if (puzzle.notepad) {
				var notepad = document.getElementById("puzNotepad");
				notepad.innerHTML = "<b>Notepad:</b> " + puzzle.notepad;
				notepad.style.display = "block";

				var w = pt.clientWidth;
				notepad.style.width = (w - 10) + "px";
			}

			document.getElementById("clue1").style.visibility = "visible";
			var across = document.getElementById("across");
			for (i in puzzle.clues.across) {
				across.innerHTML += (puzzle.clues.across[i] + "<br />");
			}

			document.getElementById("clue2").style.visibility = "visible";
			var down = document.getElementById("down");
			for (i in puzzle.clues.down) {
				down.innerHTML += (puzzle.clues.down[i] + "<br />");
			}
		}


		$(document).ready(function () {

			let cols = <?= $cols ?>;
			let rows = <?= $rows ?>;
			let data = {
				"cols": cols,
				"rows": rows
			};
			//loadPuzzle(data);

			loadPuzzleJson("");
			var timerInstance = new easytimer.Timer();
			timerInstance.start();
			timerInstance.addEventListener('secondsUpdated', function (e) {
				$('#basicUsage').html(timerInstance.getTimeValues().toString());
			});



		});
	</script>
	<style>
		:root {
			--blue: #6495ed;
			--cols:
				<?= $cols ?>
			;
		}
	</style>

	<div class="row">
		<form class="col s4" name='inputs'>
			<div class="input-field col s2">
				<input placeholder="Rows" min="4" max="77" type="number" id='rows' name='rows'>
			</div>
			<div class="input-field col s2">
				<input type="number" placeholder="Cols" min="4" max="77" id='cols' name='cols'>
			</div>
			<div class="input-field col s2">
				<input class="waves-effect waves-light btn" type="submit" value="Send">
			</div>
		</form>
	</div>

	<!-- TOP TOOLBAR - Contains all controls -->
	<div id="topToolbar">
		<!-- Timer -->
		<div id="basicUsage">00:00:08</div>

		<!-- Toolbar buttons -->
		<div id="toolbar">
			<button id="new-grid" type="button" data-tooltip="New puzzle" onclick="createNewPuzzle()">
				<i class="fa fa-plus fa-fw" aria-hidden="true"></i>
			</button>
			<button id="open-JSON" type="button" data-tooltip="Open puzzle..." onmouseenter="showMenu(event)"
				onclick="openPuzzle()">
				<i class="fa fa-folder-open-o fa-fw" aria-hidden="true"></i>
			</button>
			<input id="open-puzzle-input" class="hidden" type="file" accept=".json,.txt,.xw,.puz" />
			<div id="export-menu" class="menu hidden" onmouseleave="hideMenu(event)">
				<h4>Export as:</h4>
				<button id="export-JSON" class="default" type="button" data-tooltip="Phil puzzle (.xw)"
					onmouseup="setDefault(event)" onclick="writeFile('xw')">
					<i class="fa fa-download fa-fw" aria-hidden="true"></i>
				</button>
				<button id="export-PUZ" type="button" data-tooltip="Across Lite puzzle (.puz)"
					onmouseup="setDefault(event)" onclick="writeFile('puz')">
					<i class="fa fa-download fa-fw" aria-hidden="true"></i>
				</button>
				<button id="print-puzzle" type="button" data-tooltip="Printable puzzle (.pdf)"
					onmouseup="setDefault(event)" onclick="printPDF()">
					<i class="fa fa-print fa-fw" aria-hidden="true"></i>
				</button>
				<button id="print-NYT-submission" type="button" data-tooltip="NYT submission (.pdf)"
					onmouseup="setDefault(event)" onclick="printPDF('nyt')">
					<i class="fa fa-newspaper-o fa-fw" aria-hidden="true"></i>
				</button>
			</div>
			<button id="export" type="button" data-tooltip="Save puzzle" onmouseenter="showMenu(event)"
				onclick="doDefault(event)">
				<i class="fa fa-download fa-fw" aria-hidden="true"></i>
			</button>
			<a id="download-puzzle-link" class="hidden">Download puzzle</a>

			<div class="divider"></div>

			<button id="quick-layout" type="button" data-tooltip="Generate pattern" onmouseenter="showMenu(event)"
				onclick="generatePattern()">
				<i class="fa fa-delicious fa-fw" aria-hidden="true"></i>
			</button>
			<button id="toggle-freeze-layout" type="button" data-tooltip="Freeze pattern" data-state="off"
				class="disabled">
				<i class="fa fa-snowflake-o fa-fw" aria-hidden="true"></i>
			</button>
			<button id="clear-fill" type="button" data-tooltip="Clear white squares" onclick="clearFill()">
				<i class="fa fa-eraser fa-fw" aria-hidden="true"></i>
			</button>
			<button id="toggle-symmetry" type="button" data-tooltip="Turn off symmetry" data-state="on"
				class="button-on" onclick="toggleSymmetry()">
				<i class="fa fa-balance-scale fa-fw" aria-hidden="true"></i>
			</button>

			<div class="divider"></div>

			<button id="open-wordlist" type="button" data-tooltip="Change dictionary..." onclick="openWordlist()">
				<i class="fa fa-book fa-fw" aria-hidden="true"></i>
			</button>
			<input id="open-wordlist-input" class="hidden" type="file" accept=".txt" />
			<button id="auto-fill" type="button" data-tooltip="Auto-fill puzzle" onclick="autoFill()">
				<i class="fa fa-magic fa-fw" aria-hidden="true"></i>
			</button>
		</div>

		<!-- Reveal Buttons -->
		<div id="revealButtons">
			<button id="revealLetter" class="reveal-btn" title="Reveal current letter">
				<i class="fa fa-font" aria-hidden="true"></i> Reveal Letter
			</button>
			<button id="revealWord" class="reveal-btn" title="Reveal current word">
				<i class="fa fa-text-width" aria-hidden="true"></i> Reveal Word
			</button>
			<button id="revealAll" class="reveal-btn" title="Reveal entire puzzle">
				<i class="fa fa-eye" aria-hidden="true"></i> Reveal All
			</button>
		</div>

		<!-- Current Clue Display -->
		<div id="currentClueDisplay">
			<div id="currentClueNumber"></div>
			<div id="currentClueText"></div>
		</div>
	</div>

	<!-- MAIN CONTENT - Only crossword and definitions -->
	<div class="maincont">
		<!-- Crossword Container with Clue Bar -->
		<div id="crosswordContainer">
			<!-- Current Clue Bar above crossword -->
			<div id="clueBar">
				<span id="clueBarDirection">
					<i id="clueBarIcon" class="fa fa-arrow-right" aria-hidden="true"></i>
					<span id="clueBarNumber">1</span>
					<span id="clueBarType">ACROSS</span>
				</span>
				<span id="clueBarText">Click on a cell to see the clue</span>
			</div>
			<form id='crossword' name="boxes">



			</form>
		</div>

		<!-- Combined Definitions Panel -->
		<div id='definitionsPanel'>
			<h3 class='def-section-title'>📋 CLUES</h3>

			<div class="def-section">
				<h4 class='def-subtitle'>→ ACROSS</h4>
				<form id='fdef'>
				</form>
			</div>

			<div class="def-section">
				<h4 class='def-subtitle'>↓ DOWN</h4>
				<form id='vfdef'>
				</form>
			</div>
		</div>
	</div>

	<script src="js/main.js"></script>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.debug.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/2.3.2/jspdf.plugin.autotable.js"></script>
	<script src="js/patterns.js"></script>
	<script src="js/cross.js"></script>
	<script src="js/wordlist.js"></script>
	<script src="js/files.js"></script>
	<script src="js/clue-display.js"></script>
	<script src="js/click-override.js"></script>

</body>

</html>
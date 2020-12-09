<html>

<head>
	<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE" />
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<meta name="mobile-web-app-capable" content="yes">

	<script src='jquery/dist/jquery.min.js'></script>
	<script type="text/javascript" src="bower_components/spectrum/spectrum.js"></script>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/tinysort/3.2.5/tinysort.min.js"></script>

</head>

<body>


	<?php
	$rows = isset($_GET["rows"]) ? $_GET["rows"] : 12;
	$cols = isset($_GET["cols"]) ? $_GET["cols"] : 12;;
	?>

	<form name='inputs'>
		<label for="rows">Rows</label>
		<input type="text" id='rows' name='rows'>

		<label for="cols">Cols</label>
		<input type="text" id='cols' name='cols'>
		<input type="submit" value="Send">
	</form>


	<div class="maincont">
	<form id='crossword' name="boxes">

		<?php for ($r = 0; $r < $rows; $r++) : ?>
			<?php for ($c = 0; $c < $cols; $c++) : ?>
				<div class='wr_box'>
					<input class='box' row="<?php echo $r ?>" bh='0' bv='0' col="<?php echo $c ?>" name="<?php echo "$r" . "_" . "$c"; ?>" type="text">
					<span class='number'></span>
					<span class='actions'></span>
				</div>

			<?php endfor; ?>
			<?php echo "<div class='nl'></div>"; ?>
		<?php endfor; ?>

	</form>

	<div id='def'>
		<form id='fdef'>

		</form>
	</div>


	<div id='vdef'>
		<form id='vfdef'>

		</form>
	</div>

	</div>



	<div class='fixed2'>
		Menu left
	</div>

	<div>
		Ciao IFIv


	</div>


	<div id='s_colors'>
		<form method="get">
			<input type='color' name='color' />
			<input type='color' name='color2' value='#3355cc' />
			<input type='color' name='color3' value='#000000' />
			<input type="submit" />
		</form>
	</div>
	<script>
		var modality = 'h';
		let arrVert = [];
		let arrHoriz = [];



		$(document).ready(function() {

			$("body").on("focusout", ".vInput", function() {
				//$("#crossword input").removeClass("selVert");
				$(".wr_box input").removeClass ("selHoriz selVert");
			});

			$("body").on("focus", "#vfdef .vInput"   ,   function() 
			{

				$(".wr_box input").removeClass ("selHoriz selVert");
				let coord = $(this).attr("data-value");
				//Get value 
				console.log(coord);
				var arrCoord = coord.split(',');
				let start = parseInt(arrCoord[0]);
				let end = parseInt(arrCoord[2]);

				let column = parseInt(arrCoord[1]);
				for (indexRow = start; indexRow <= end; indexRow++) 
				{
					console.log("Ind Rows" + indexRow + "Col:" + column);
					var cboxNow = $(".box[row=" + indexRow + "][col=" + column + "]").addClass("selVert");
				}

			});


			$("body").on("focusin", "#fdef input", function(arg) {

				$(".wr_box input").removeClass ("selHoriz selVert");
				let coord = $(this).attr("data-value");
				//Get value 
				console.log(coord);
				var arrCoord = coord.split(',');
				let start = parseInt(arrCoord[1]);
				let end = parseInt(arrCoord[3]);

				let row = parseInt(arrCoord[0]);
				for (indexCol = start; indexCol <= end; indexCol++) 
				{
					console.log("Ind Rows" + row + "Col:" + indexCol);
					var cboxNow = $(".box[row=" + row + "][col=" + indexCol + "]").addClass("selVert");
				}
			});




			function numberize() {
				var crow = 0;
				var totCols = $(".box[row=0]").length;
				var totRows = $(".box[col=0]").length;
				var curNumber = 1;
				arrHoriz = [] ;

				//reset
				$(".number").text("");
				//return false ;
				for (r = 0; r < totRows; r++) {
					for (c = 0; c < totCols; c++) {

						var cbox = $(".box[row=" + r + "][col=" + c + "]");
						var cboxRight = $(".box[row=" + r + "][col=" + (c + 1) + "]");
						var cboxLeft = $(".box[row=" + r + "][col=" + (c - 1) + "]");

						var cboxDown = $(".box[row=" + (r + 1) + "][col=" + (c) + "]");
						var cboxUp = $(".box[row=" + (r - 1) + "][col=" + (c) + "]");
						var found = 0;

						if (cbox.hasClass("disabled"))
							continue;

						//console.log(cboxLeft.text());
						if (!cboxRight.hasClass("disabled") && (c == 0 || cboxLeft.hasClass('disabled')) && c != (totCols - 1)) {

							//console.log ( "Current number :" + curNumber  ) ;
							//horizotal
							if (curNumber > 0)
							{
								found = 1;
								cbox.parent().find(".number").text(curNumber);
								cbox.attr("bh", 1);
								first = [ r , c  ] ;

								//Find end from here till right
								for (let indexCol = c; indexCol < totCols; indexCol++) {
									let now = [r, indexCol];
									var cboxNow = $(".box[row=" + now[0] + "][col=" + (now[1]) + "]");
									if ($(cboxNow).hasClass("disabled") || indexCol == (totCols - 1)) {
										if (now[1] > 0) {
											if (indexCol == (totCols - 1))
												end = [now[0], now[1]];
											else
												end = [now[0] , now[1] - 1 ];
											if (first[1] != end[1])
												arrHoriz[ parseInt(curNumber)] = [first, end];
											//	console.log(curNumber);
											//	arrHoriz.push(  { ["": curNumber] : {"first":first,"end":end} }  )   ;
											//return true;
											break;
										}
									}
								}
							
								//arrHoriz.push( { curNumber :  [ r , c  ]}   );
							}

						}

						//vertical trial
						if (!cboxDown.hasClass("disabled") && (r == 0 || cboxUp.hasClass('disabled')) && r != (totRows - 1)) {
							found = 1;
							cbox.attr("bv", 1);
							//vert
							cbox.parent().find(".number").text(curNumber);

						}
						if (found == 1) {
							curNumber++;
						}
						//$(cbox).css("background-color","red");
					}
				}
				//console.log ( arrHoriz );
				//console.log (arrHoriz);
			//	manDef();

				horizDef();
				vertDef();

			}

			function blink(cel) {

			}
			function horizDef() {

				let arrInput = [] ;

				$("#fdef input").each( function (index, inp) {
					let number =   $(inp).attr("data-number")	;
					let value =   $(inp).attr("data-value") 	;
					let text = $(inp).text();
					arrInput[number] = text ;

				}  );

				$("#fdef input").remove();

				$(arrHoriz).each(function(index, obj) {
				if ( obj != undefined )
				{

				//	console.log (obj);
					$("#fdef").append("<input placeholder='" + index + "' data-number='" + index + "' class='vInput ' type='text' data-value='" + obj[0][0] + "," + obj[0][1] + "," + obj[1][0] + "," + obj[1][1] + "'>");

				}
				});

				tinysort('#fdef>input', {
					selector: 'input',
					attr: 'data-number'
				});


			}
			function vertDef() {
				arrVert = [];
				var totCols = $(".box[row=0]").length;
				var totRows = $(".box[col=0]").length;


				$(".number").each(function() {
					let value = $(this).text();
					if (value) {
						//	console.log( "Vak is :" + value );
						let input = $(this).prev();
						//$(input).addClass("orange");


						var col = ($(input).attr("col"));
						var row = ($(input).attr("row"));

						let prev = [row - 1, col];
						var cboxPrev = $(".box[row=" + prev[0] + "][col=" + (prev[1]) + "]");

						let next = [row + 1, col];
						var cboxNext = $(".box[row=" + next[0] + "][col=" + (next[1]) + "]");

						/* if (value == 15)
							$(cboxPrev).fadeTo(100, 0.1).fadeTo(200, 1.0); */
						let first = null;
						let end = null;

						if (prev[0] < 0 || $(cboxPrev).hasClass("disabled")) {
							let isvalid = 1;
							if (!$(cboxNext).hasClass("disabled")) {
								first = [row, col];
								//console.log(first);

								for (let indexRow = row; indexRow < totRows; indexRow++) {
									let now = [indexRow, col];
									//console.log (now);
									var cboxNow = $(".box[row=" + now[0] + "][col=" + (now[1]) + "]");



									if ($(cboxNow).hasClass("disabled") || indexRow == (totRows - 1)) {
										if (now[0] > 0) {
											if (indexRow == (totRows - 1))
												end = [now[0], now[1]];
											else
												end = [now[0] - 1, now[1]];

											//$(".box[row=" + end[0] + "][col=" + (end[1] ) + "]").addClass("yellow");
											if (first[0] != end[0])
												arrVert.push([first, end, parseInt(value)]);
											return true;
											break;
										}

									}

								}

							}
						}

						//	console.log(prev[0]);
						//Move vertically


					}


				});

				/* console.log(arrVert); */

				$("#vfdef input").remove();

				$(arrVert).each(function(index, obj) {
					$("#vfdef").append("<input placeholder='" + obj[2] + "' data-number='" + obj[2] + "' class='vInput ' type='text' data-value='" + obj[0][0] + "," + obj[0][1] + "," + obj[1][0] + "," + obj[1][1] + "'>");
				});

				tinysort('#vfdef>input', {
					selector: 'input',
					attr: 'data-number'
				});



			}


			function manDef() {
				$("#fdef input").hide();

				$(".box[bh=1]").each(function() {
					var col = ($(this).attr("col"));
					var row = ($(this).attr("row"));
					var number = $(this).parent().find(".number").text();
					//console.log(number);
					var nameInput = "h_" + number;
					//	console.log(nameInput);


					if (number>0)
					{
						if ($("#fdef").find("input[name=" + nameInput + "]").length == 0) {
							$("#fdef").append("<input placeholder='" +  number + "' row='" + row + "' col='" + col + "' type='text' name='" + nameInput + "' />");
						} else {
							$("#fdef").find("input[name=" + nameInput + "]").attr("col", col);
							$("#fdef").find("input[name=" + nameInput + "]").attr("row", row);
						}

						$("#fdef").find("input[name=" + nameInput + "]").show();
					}

				});

				tinysort('#fdef>input', {
					selector: 'input',
					attr: 'row'
				});

			}



			$(".wr_box .box").on("keyup", function(event) {
				this.value = "";
				//$(this).parent().addClass("horiz");
				


				event.preventDefault();
				this.value = String.fromCharCode(event.which);

				$(this).parent().next().find("input").focus();


				$(this).parent().nextAll().each(function(index, val) {
					if ($(this).find(".disabled").length > 0) return false;
					if ($(this).hasClass("nl") || $(this).find(".disabled").length > 0) return false;;

				//	$(val).addClass("horiz");
				});
				//.find("input").css("background-color","red");

			});



			$(".wr_box").on("mouseenter", function() {

				$(this).find(".actions").css("visibility", "visible");

			});
			$(".wr_box").on("mouseleave", function() {

				$(this).find(".actions").css("visibility", "hidden");

			});


			$(".actions").on("click",
				function(event) {
					$(this).parent().find("input").toggleClass("disabled");
					$(this).attr("bh", 0).attr("bv", 0);
					numberize();
				});

				$("body").on("focusin", ".box", function(arg) {

					$(".wr_box input").removeClass ("selHoriz selVert");

				});
		});
	</script>

	<style>
		.selHoriz {
			background-color: #add9e4;
		}

		.maincont{
			display: flex;
		width: 100%;
		max-width: 80vw;
		flex-direction: row;
		margin: 0 auto;

		}
		.selVert {
			background: linear-gradient(to bottom, #f7fbfc 0%, #d9edf2 40%, #add9e4 100%);
		}


		#vdef {
			/* position: absolute; */
			top: 10vh;
			left: 2vw;
			max-height: 250px;
			overflow: auto;
		}

		#def {

		/* 	position: fixed; */
			top: 10vh;
			right: 2vw;

			max-width: 250px;
			max-height: 250px;
			overflow: auto;
		}

		#vfdef , #fdef{
			display: flex;
			align-content: center;
			flex-direction: column;
			max-width: 159px;
		}

		.orange {
			background-color: #f50 !important;
		}

		.yellow {
			background-color: yellowgreen !important;
		}

		.horiz input {
			background-color: yellow;
		}



		#crossword {
			text-align: center;
			margin-right:3px;
		}

		#crossword .wr_box {
			position: relative;
			display: inline-block;
			margin-bottom: 2px;
		}

		#crossword .box {
			width: 30px;
			height: 30px;
			text-align: center;

		}

		/*
 #crossword .box:hover +.actions{
 	visibility: visible;
 }*/

		.cus-disabled {
			background-color: red;
		}

		.wr_box .disabled {
			background-color: black;
		}

		.ov-disabled {}

		#crossword .actions {
			visibility: hidden;
			width: 10px;
			height: 10px;
			cursor: pointer;
			background-color: grey;
			right: 0px;
			top: 0px;
			position: absolute;
		}

		#crossword .actions:hover {
			zoom: 2;
		}

		.number {
			visibility: visible;
			width: 10px;
			height: 10px;
			cursor: pointer;
			font-size: 8px;
			left: 0px;
			top: 0px;
			position: absolute;

		}

		.fixed {
			background: -webkit-linear-gradient(top, #ffffff, #d2d2d2);
			position: fixed;
			top: 0px;
			left: 0px;
			width: 30%;
			background-clip: 10px;
			min-height: 200px;
			background-color: red;
			z-index: 2;
			transition: opacity 300ms ease-out !important;

		}

		body {
			background: orange;
			background: linear-gradient(top, #fb0, #f50);
			background: -moz-linear-gradient(top, #fb0, #f50);
			background: -webkit-linear-gradient(top, #ffffff, #d2d2d2);
			background: -o-linear-gradient(top, #fb0, #f50);
			background: -ms-linear-gradient(top, #fb0, #f50);
		}


		div {

			animation: fontIncrease 2s 1;
		}


		@keyframes hiddenMenu {}

		@keyframes fontIncrease {
			0% {
				font-size: 10px;
				opacity: 0.4;
			}

			30% {
				font-size: 15px;
			}

			100% {
				font-size: 20px;
				opacity: 1;
			}
		}

		.wr_box input {
/*     padding:2px;
    width:100%;
    margin:0 -1px 0 -4px;
    float:left;
    clear:both */
}
	</style>
</body>

</html>
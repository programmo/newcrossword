<html>
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE" />
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<meta name="mobile-web-app-capable" content="yes">

	<script src='jquery/dist/jquery.min.js'></script>
</head>
<body>


<?php
$rows = isset($_GET["rows"]) ?$_GET["rows"]:12 ;
$cols = isset($_GET["cols"]) ? $_GET["cols"]:12 ;;



?>

<form name='inputs'>
	<label for="rows" >Rows</label>
	<input type="text" id='rows' name='rows'>
	
	<label for="cols" >Cols</label>	
	<input type="text" id='cols' name='cols'>
	<input type="submit" value="Send">
</form>

<form id='crossword' name="boxes">

<?php for ($r=0;$r<$rows;$r++):?>
	<?php for($c=0;$c<$cols;$c++):?>
		<div class='wr_box'>
			<input class='box' row="<?php echo $r?>" col="<?php echo $c?>" name="<?php echo "$r"."_" ."$c";?>" type="text">
			<span class='number'></span>
			<span class='actions'></span>
		</div>
	
	<?php endfor;?>
	<?php echo "<div class='nl'></div>";?>
<?php endfor;?>

</form>

<div class='fixed2'>
Menu left
</div>

<div>
Ciao IFIv


</div>
<script>
	
$(document).ready(function(){

		function numberize(){
			var crow = 0 ;
			var totCols = $(".box[row=0]").length;
			var totRows = $(".box[col=0]").length;
			var curNumber = 1 ;

			//reset
			$(".number").text("");

			for (r=0;r<totRows;r++)
			{			
				for (c=0;c<totCols;c++)
				{

					var cbox = $(".box[row="+r+"][col=" + c +"]");
					var cboxRight = $(".box[row="+ r +"][col=" + (c+1)+"]");
					var cboxLeft = $(".box[row="+ r +"][col=" + (c-1)+"]");

					var cboxDown = $(".box[row="+ (r+1) +"][col=" + (c)+"]");
					var cboxUp = $(".box[row="+ (r-1) +"][col=" + (c)+"]");
					var found = 0 ;

					if ( cbox.hasClass("disabled") )
						continue;

					//console.log(cboxLeft.text());
					if ( !cboxRight.hasClass("disabled") &&  ( c==0 || cboxLeft.hasClass('disabled') )  && c!=(totCols-1)  )
					{
						//horizotal
						found = 1 ;
						cbox.parent().find(".number").text(curNumber);
						
					}
					
					//vertical trial
					if ( !cboxDown.hasClass("disabled") &&  ( r==0 || cboxUp.hasClass('disabled') )  && r!=(totRows-1)  )
					{
						found = 1 ;
						//vert
						cbox.parent().find(".number").text(curNumber);
						


					}	
					if(found == 1 )
						{
							curNumber++;
						}
					//$(cbox).css("background-color","red");
				}
			}	

		}

		$(".wr_box").on("mouseenter",function(){
			
			$(this).find(".actions").css("visibility","visible");

		}  );
		$(".wr_box").on("mouseleave",function(){
			
			$(this).find(".actions").css("visibility","hidden");

		}  );


		$(".actions").on("click",
			function(event){
			$(this).parent().find("input").toggleClass("disabled");
			numberize();
		} );

	
});

</script>

<style>
 #crossword{
 	text-align: center;
 }

 #crossword .wr_box{
 	position: relative;
 	display: inline-block;
 }
 #crossword .box{
 	width:30px;
 	height:30px;
 	text-align: center;
 	
 }

/*
 #crossword .box:hover +.actions{
 	visibility: visible;
 }*/

 .disabled{
 	background-color:black;
 }
 #crossword .actions{
 	visibility: hidden;
 	width: 10px;
 	height: 10px;
 	cursor: pointer;
 	background-color: grey;
 	right:0px;
 	top:0px;
 	position: absolute;
 }
 #crossword .actions:hover{
 	zoom:2;
 }
 .number{
 	visibility: visible;
 	width: 10px;
 	height: 10px;
 	cursor: pointer;
 	font-size:8px;
 	left:0px;
 	top:0px;
 	position: absolute;

 }

.fixed{
background:-webkit-linear-gradient(top, #ffffff, #d2d2d2);
position:fixed;
top:0px;
left:0px;
width:30%;
background-clip: 10px;
min-height: 200px;
background-color: red;
z-index: 2;
transition:opacity 300ms ease-out !important;	

}

	body{
			background:orange;
			background:linear-gradient(top, #fb0, #f50);
			background:-moz-linear-gradient(top, #fb0, #f50);
			background:-webkit-linear-gradient(top, #ffffff, #d2d2d2);
			background:-o-linear-gradient(top, #fb0, #f50);
			background:-ms-linear-gradient(top, #fb0, #f50); 
		}


		div{
			
			animation : fontIncrease 2s 1 ;
}


@keyframes hiddenMenu {


}

@keyframes fontIncrease{
	0% {
		font-size: 10px ;
		opacity: 0.4;
	}
	30%{
		font-size: 15px ;
	}
	100%{
		font-size: 20px ;
		opacity: 1 ; 
	}
}

	</style>
</body>
</html>

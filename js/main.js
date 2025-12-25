var modality = 'h';
let arrVert = [];
let arrHoriz = [];

let dir = 0;


function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function numberize() {
    var crow = 0;
    var totCols = $(".box[row=0]").length;
    var totRows = $(".box[col=0]").length;
    var curNumber = 1;
    arrHoriz = [];

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
                if (curNumber > 0) {
                    found = 1;
                    cbox.parent().find(".number").text(curNumber);
                    cbox.attr("bh", 1);
                    first = [r, c];

                    //Find end from here till right
                    for (let indexCol = c; indexCol < totCols; indexCol++) {
                        let now = [r, indexCol];
                        var cboxNow = $(".box[row=" + now[0] + "][col=" + (now[1]) + "]");
                        if ($(cboxNow).hasClass("disabled") || indexCol == (totCols - 1)) {
                            if (now[1] > 0) {
                                if (indexCol == (totCols - 1))
                                    end = [now[0], now[1]];
                                else
                                    end = [now[0], now[1] - 1];
                                if (first[1] != end[1])
                                    arrHoriz[parseInt(curNumber)] = [first, end];
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
    setupVertInput();
    /* console.log ( arrHoriz );
    console.log ( arrVert ); */


}

function setupVertInput() {

    $(".box").attr("data-v", "");
    $(arrVert).each(function (index, obj) {
        if (obj != undefined) {
            let counter = obj[2];
            let col = obj[0][1];
            let first = obj[0][0];
            let end = obj[1][0];
            let range = [first, end];

            for (let indexRow = first; indexRow <= end; indexRow++) {
                let now = [indexRow, col];
                var cboxNow = $(".box[row=" + now[0] + "][col=" + (now[1]) + "]");
                $(cboxNow).attr("data-v", counter);
            }

        }
    });


}
function blink(cel) {

}
function horizDef() {

    let arrInput = [];

    $("#fdef input").each(function (index, inp) {
        let number = $(inp).attr("data-number");
        let value = $(inp).attr("data-value");
        let text = $(inp).text();
        arrInput[number] = text;

    });

    $("#fdef input").remove();

    $(".box").attr("data-h", "");
    $(arrHoriz).each(function (index, obj) {
        if (obj != undefined) {

            //	console.log (obj);
            $("#fdef").append("<input placeholder='" + index + "' data-number='" + index + "' class='vInput ' type='text' data-value='" + obj[0][0] + "," + obj[0][1] + "," + obj[1][0] + "," + obj[1][1] + "'>");

            //From left to right
            let row = obj[0][0];

            let first = obj[0][1];
            let end = obj[1][1];
            let range = [first, end];
            //console.log (obj);
            for (let indexCol = first; indexCol <= end; indexCol++) {
                let now = [row, indexCol];
                var cboxNow = $(".box[row=" + now[0] + "][col=" + (now[1]) + "]");
                $(cboxNow).attr("data-h", index);
            }

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


    $(".number").each(function () {
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
                                if (first[0] != end[0]) {

                                    arrVert.push([first, end, parseInt(value)]);




                                }
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

    $(arrVert).each(function (index, obj) {
        $("#vfdef").append("<input placeholder='" + obj[2] + "' data-number='" + obj[2] + "' class='vInput ' type='text' data-value='" + obj[0][0] + "," + obj[0][1] + "," + obj[1][0] + "," + obj[1][1] + "'>");
    });

    tinysort('#vfdef>input', {
        selector: 'input',
        attr: 'data-number'
    });



}


function manDef() {
    $("#fdef input").hide();

    $(".box[bh=1]").each(function () {
        var col = ($(this).attr("col"));
        var row = ($(this).attr("row"));
        var number = $(this).parent().find(".number").text();
        //console.log(number);
        var nameInput = "h_" + number;
        //	console.log(nameInput);


        if (number > 0) {
            if ($("#fdef").find("input[name=" + nameInput + "]").length == 0) {
                $("#fdef").append("<input placeholder='" + number + "' row='" + row + "' col='" + col + "' type='text' name='" + nameInput + "' />");
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

$(document).ready(function () {
    $("body").on("change", "[name='color']", function () {

        var color = $(this).val();
        var style = '.box.disabled { background-color: ' + color + '!important; }';
        //	$('head').find("style").replace(style);
        $('html > head style').empty().append(style);
    });


    $("body").on("focusout", ".vInput", function () {
        //$("#crossword input").removeClass("selVert");
        $(".wr_box input").removeClass("selHoriz selVert");
    });

    $("body").on("focus", "#vfdef .vInput", function () {

        $(".wr_box input").removeClass("selHoriz selVert genSel");
        let coord = $(this).attr("data-value");
        //Get value 
        console.log(coord);
        var arrCoord = coord.split(',');
        let start = parseInt(arrCoord[0]);
        let end = parseInt(arrCoord[2]);

        let column = parseInt(arrCoord[1]);
        for (indexRow = start; indexRow <= end; indexRow++) {
            console.log("Ind Rows" + indexRow + "Col:" + column);
            var cboxNow = $(".box[row=" + indexRow + "][col=" + column + "]").addClass("selVert");
        }

    });


    $("body").on("focusin", "#fdef input", function (arg) {

        $(".wr_box input").removeClass("selHoriz selVert genSel");
        let coord = $(this).attr("data-value");
        //Get value 
        console.log(coord);
        var arrCoord = coord.split(',');
        let start = parseInt(arrCoord[1]);
        let end = parseInt(arrCoord[3]);

        let row = parseInt(arrCoord[0]);
        for (indexCol = start; indexCol <= end; indexCol++) {
            console.log("Ind Rows" + row + "Col:" + indexCol);
            var cboxNow = $(".box[row=" + row + "][col=" + indexCol + "]").addClass("selVert");
        }
    });






    var times = 0;
    $("body").on("click", ".wr_box .box", function (event) {
        let datav = $(this).attr("data-v");
        let datah = $(this).attr("data-h");
        times++;
        if (times == 2) {
            times = 0;
            dir = !dir;
        }

        $(".box").removeClass("genSel");
        if (dir) {
            var cboxNow = $(".box[data-v=" + datav + "]").addClass("genSel");
        }
        else {
            var cboxNow = $(".box[data-h=" + datah + "]").addClass("genSel");
        }
    });


    $("body").on("focus", ".wr_box .box", function (event) {

        $(".box").removeClass("activeCell");
        $(this).addClass("activeCell");
    });



    $("body").on("keyup", ".wr_box .box", function (event) {
        this.value = "";
        //$(this).parent().addClass("horiz");



        event.preventDefault();
        let insertedChar = String.fromCharCode(event.which);;

        if (isLetter(insertedChar)) {
            this.value = insertedChar;
            $(this).closest('.wr_box').nextAll(':has(.genSel):first').find('.genSel').focus();

        }



        //	$(this).nextAll().focus();
        //$cur = 

        //$(this).parent().next().find("input").focus();


        /* 	$(this).parent().nextAll().each(function(index, val) {
                if ($(this).find(".disabled").length > 0) return false;
                if ($(this).hasClass("nl") || $(this).find(".disabled").length > 0) return false;;
    
            //	$(val).addClass("horiz");
            }); */
        //.find("input").css("background-color","red");

    });



    $("body").on("mouseenter", ".wr_box", function () {
        console.log(1);
        $(this).find(".actions").css("visibility", "visible");

    });


    $("body").on("mouseleave", ".wr_box", function () {

        $(this).find(".actions").css("visibility", "hidden");

    });


    $("body").on("click", ".actions",
        function (event) {
            $(this).parent().find("input").toggleClass("disabled").val("");
            $(this).attr("bh", 0).attr("bv", 0);

            $("body").hide();
            numberize();
            $("body").show();
        });

    $("body").on("focusin", ".box", function (arg) {

        $(".wr_box input").removeClass("selHoriz selVert");

    });
});
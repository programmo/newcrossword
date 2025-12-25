// ===================================
// OVERRIDE CLICK BEHAVIOR - MUST LOAD AFTER main.js
// ===================================

// Wait for DOM to be ready
$(document).ready(function () {
    console.log('Click override loaded');

    // Remove ALL previous click handlers
    $("body").off("click", ".wr_box .box");

    var times = 0;
    $("body").on("click", ".wr_box .box", function (event) {
        console.log('New click handler triggered');

        let datav = $(this).attr("data-v");
        let datah = $(this).attr("data-h");
        times++;
        if (times == 2) {
            times = 0;
            dir = !dir;
        }

        $(".box").removeClass("genSel");

        // Get clue text from the input value
        let clueNumber, clueText, direction;

        if (dir) {
            var cboxNow = $(".box[data-v=" + datav + "]").addClass("genSel");
            // Update current clue display for vertical (DOWN)
            if (datav) {
                clueNumber = datav;
                direction = 'd'; // 'd' for DOWN
                const clueInput = $("#vfdef input[data-number='" + datav + "']");
                clueText = clueInput.val() || 'No clue available';

                console.log('Updating clue:', clueNumber, direction, clueText);

                // Update the display instead of focusing
                if (typeof updateCurrentClue === 'function') {
                    updateCurrentClue(clueNumber, direction, clueText);
                } else {
                    console.error('updateCurrentClue function not found');
                }
            }
        }
        else {
            var cboxNow = $(".box[data-h=" + datah + "]").addClass("genSel");
            // Update current clue display for horizontal (ACROSS)
            if (datah) {
                clueNumber = datah;
                direction = 'h'; // 'h' for ACROSS
                const clueInput = $("#fdef input[data-number='" + datah + "']");
                clueText = clueInput.val() || 'No clue available';

                console.log('Updating clue:', clueNumber, direction, clueText);

                // Update the display instead of focusing
                if (typeof updateCurrentClue === 'function') {
                    updateCurrentClue(clueNumber, direction, clueText);
                } else {
                    console.error('updateCurrentClue function not found');
                }
            }
        }

        // Keep focus on the crossword cell, not the definition input
        event.stopPropagation();
        $(this).focus();
    });

    // Also remove focus handlers from definition inputs
    $("body").off("focusin", "#fdef input");
    $("body").off("focus", "#vfdef .vInput");
    $("body").off("focusout", ".vInput");
});

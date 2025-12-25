// ===================================
// CURRENT CLUE DISPLAY & REVEAL BUTTONS
// ===================================

// Update current clue display - GLOBAL FUNCTION
window.updateCurrentClue = function (number, direction, clueText) {
    console.log('updateCurrentClue called:', number, direction, clueText);

    const directionText = direction === 'h' ? 'ACROSS' : 'DOWN';
    const directionSymbol = direction === 'h' ? '→' : '↓';

    $('#currentClueNumber').text(`${directionSymbol} ${number} ${directionText}`);
    $('#currentClueText').text(clueText || 'Click on a cell to see the clue');

    // Update the Clue Bar above the crossword
    if (number) {
        $('#clueBarNumber').text(number);
        $('#clueBarType').text(directionText);
        $('#clueBarText').text(clueText || 'Click on a cell to see the clue');

        // Update icon
        if (direction === 'h') {
            $('#clueBarIcon').removeClass('fa-arrow-down down').addClass('fa-arrow-right');
        } else {
            $('#clueBarIcon').removeClass('fa-arrow-right').addClass('fa-arrow-down down');
        }
    }

    // Remove previous highlight
    $('#fdef input, #vfdef input').removeClass('current-clue');

    // Highlight current clue in the list
    if (direction === 'h') {
        $(`#fdef input[data-number='${number}']`).addClass('current-clue');
    } else {
        $(`#vfdef input[data-number='${number}']`).addClass('current-clue');
    }
};

// Get current word cells
function getCurrentWordCells() {
    return $('.genSel');
}

// Get current active cell
function getCurrentCell() {
    return $('.activeCell');
}

// Reveal Letter - shows the correct letter in the current cell
function revealLetter() {
    const currentCell = getCurrentCell();
    if (currentCell.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Warning',
            text: 'Please select a cell first',
            timer: 2000,
            showConfirmButton: false
        });
        return;
    }

    const correctLetter = currentCell.attr('data-correct');
    if (correctLetter) {
        currentCell.val(correctLetter.toUpperCase());
        currentCell.addClass('revealed');
        Swal.fire({
            icon: 'success',
            title: 'Letter Revealed!',
            timer: 1500,
            showConfirmButton: false
        });
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Info',
            text: 'No correct answer data available for this cell',
            timer: 2000,
            showConfirmButton: false
        });
    }
}

// Reveal Word - shows all letters in the current word
function revealWord() {
    const wordCells = getCurrentWordCells();
    if (wordCells.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Warning',
            text: 'Please select a word first',
            timer: 2000,
            showConfirmButton: false
        });
        return;
    }

    let revealed = false;
    wordCells.each(function () {
        const correctLetter = $(this).attr('data-correct');
        if (correctLetter) {
            $(this).val(correctLetter.toUpperCase());
            $(this).addClass('revealed');
            revealed = true;
        }
    });

    if (!revealed) {
        Swal.fire({
            icon: 'info',
            title: 'Info',
            text: 'No correct answer data available for this word',
            timer: 2000,
            showConfirmButton: false
        });
    } else {
        Swal.fire({
            icon: 'success',
            title: 'Word Revealed!',
            timer: 1500,
            showConfirmButton: false
        });
    }
}

// Reveal All - shows all letters in the entire puzzle
function revealAll() {
    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to reveal the entire puzzle?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, reveal all!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            let revealed = false;
            $('.box:not(.disabled)').each(function () {
                const correctLetter = $(this).attr('data-correct');
                if (correctLetter) {
                    $(this).val(correctLetter.toUpperCase());
                    $(this).addClass('revealed');
                    revealed = true;
                }
            });

            if (!revealed) {
                Swal.fire({
                    icon: 'info',
                    title: 'Info',
                    text: 'No correct answer data available for this puzzle',
                    timer: 2000,
                    showConfirmButton: false
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Puzzle Revealed!',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        }
    });
}

// Initialize reveal buttons
$(document).ready(function () {
    console.log('Clue display initialized');

    $('#revealLetter').on('click', function (e) {
        e.preventDefault();
        console.log('Reveal letter clicked');
        revealLetter();
    });

    $('#revealWord').on('click', function (e) {
        e.preventDefault();
        console.log('Reveal word clicked');
        revealWord();
    });

    $('#revealAll').on('click', function (e) {
        e.preventDefault();
        console.log('Reveal all clicked');
        revealAll();
    });

    // Initialize with default message
    updateCurrentClue('', '', 'Click on a cell to see the clue');
});

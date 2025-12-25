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

    // Highlight current clue in the list and scroll to it
    let targetInput;
    if (direction === 'h') {
        targetInput = $(`#fdef input[data-number='${number}']`);
        targetInput.addClass('current-clue');
    } else {
        targetInput = $(`#vfdef input[data-number='${number}']`);
        targetInput.addClass('current-clue');
    }

    // Auto-scroll to the current clue in the definitions panel
    if (targetInput && targetInput.length > 0) {
        const container = targetInput.closest('#fdef, #vfdef');
        if (container.length > 0) {
            const inputTop = targetInput.position().top;
            const containerScrollTop = container.scrollTop();
            const containerHeight = container.height();

            // Check if the input is not visible
            if (inputTop < 0 || inputTop > containerHeight - 50) {
                container.animate({
                    scrollTop: containerScrollTop + inputTop - 50
                }, 300);
            }
        }
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

    // Single click on definition - select corresponding cells in crossword
    $(document).on('click', '#fdef input, #vfdef input', function (e) {
        if ($(this).hasClass('editing')) return; // Don't interfere with editing

        e.preventDefault();
        const dataValue = $(this).attr('data-value');
        const dataNumber = $(this).attr('data-number');
        const isDown = $(this).closest('#vfdef').length > 0;

        console.log('Definition clicked:', dataNumber, isDown ? 'DOWN' : 'ACROSS');

        // Remove previous selection
        $('.box').removeClass('genSel');
        $('#fdef input, #vfdef input').removeClass('current-clue');

        // Add current-clue class to this input
        $(this).addClass('current-clue');

        if (dataValue) {
            const coords = dataValue.split(',');

            if (isDown) {
                // DOWN - vertical selection
                const col = parseInt(coords[1]);
                const startRow = parseInt(coords[0]);
                const endRow = parseInt(coords[2]);

                for (let row = startRow; row <= endRow; row++) {
                    $(`.box[row="${row}"][col="${col}"]`).addClass('genSel');
                }

                // Update clue bar
                updateCurrentClue(dataNumber, 'd', $(this).val());
            } else {
                // ACROSS - horizontal selection
                const row = parseInt(coords[0]);
                const startCol = parseInt(coords[1]);
                const endCol = parseInt(coords[3]);

                for (let col = startCol; col <= endCol; col++) {
                    $(`.box[row="${row}"][col="${col}"]`).addClass('genSel');
                }

                // Update clue bar
                updateCurrentClue(dataNumber, 'h', $(this).val());
            }

            // Focus the first cell of the selection
            $('.genSel').first().focus();
        }
    });

    // Double click on definition - enable editing mode
    $(document).on('dblclick', '#fdef input, #vfdef input', function (e) {
        e.preventDefault();
        e.stopPropagation();

        // Remove editing class from all other inputs
        $('#fdef input, #vfdef input').removeClass('editing');

        // Add editing class to this input
        $(this).addClass('editing');
        $(this).focus();
        $(this).select();

        console.log('Editing mode enabled for:', $(this).attr('data-number'));
    });

    // Click outside to exit editing mode
    $(document).on('click', function (e) {
        if (!$(e.target).is('#fdef input, #vfdef input')) {
            $('#fdef input, #vfdef input').removeClass('editing');
        }
    });

    // Exit editing mode on Enter key
    $(document).on('keydown', '#fdef input.editing, #vfdef input.editing', function (e) {
        if (e.key === 'Enter') {
            $(this).removeClass('editing');
            $(this).blur();
        }
    });

    // Touch support - double tap for mobile
    let lastTap = 0;
    $(document).on('touchend', '#fdef input, #vfdef input', function (e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;

        if (tapLength < 300 && tapLength > 0) {
            // Double tap detected
            e.preventDefault();
            $('#fdef input, #vfdef input').removeClass('editing');
            $(this).addClass('editing');
            $(this).focus();
            $(this).select();
        }
        lastTap = currentTime;
    });
});

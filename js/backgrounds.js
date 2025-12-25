// ===================================
// CROSSWORD BACKGROUNDS
// ===================================

// Array of beautiful background images from Unsplash (free, no API key needed)
const crosswordBackgrounds = [
    // Abstract & Patterns
    "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800",
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800",
    "https://images.unsplash.com/photo-1557683316-973673baf926?w=800",
    "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
    "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=800",
    "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=800",
    "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=800",
    "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800",
    "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800",

    // Nature
    "https://images.unsplash.com/photo-1518173946687-a4c036bc3f01?w=800",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800",
    "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800",
    "https://images.unsplash.com/photo-1431794062232-2a99a5431c6c?w=800",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800",
    "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",

    // Ocean & Water
    "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800",
    "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=800",
    "https://images.unsplash.com/photo-1439405326854-014607f694d7?w=800",
    "https://images.unsplash.com/photo-1468581264429-2548ef9eb732?w=800",
    "https://images.unsplash.com/photo-1520942702018-0862200e6873?w=800",
    "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=800",
    "https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800",
    "https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?w=800",

    // Sky & Clouds
    "https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?w=800",
    "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800",
    "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800",
    "https://images.unsplash.com/photo-1464618663641-bbdd760ae84a?w=800",
    "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=800",
    "https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?w=800",
    "https://images.unsplash.com/photo-1536244636800-a3f74db0f3cf?w=800",
    "https://images.unsplash.com/photo-1505497619427-93b2c27ac6ca?w=800",
    "https://images.unsplash.com/photo-1502200120-42b0f20e45ba?w=800",
    "https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?w=800",

    // Textures
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    "https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=800",
    "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?w=800",
    "https://images.unsplash.com/photo-1483000805330-4eaf0a0d82da?w=800",
    "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=800",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800",
    "https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?w=800",
    "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800",
    "https://images.unsplash.com/photo-1557683311-eac922347aa1?w=800",
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800"
];

let currentBackgroundIndex = 0;

// Set crossword background
window.setCrosswordBackground = function (imageUrl) {
    const crossword = document.getElementById('crossword');
    if (crossword) {
        crossword.style.backgroundImage = `url(${imageUrl})`;
        crossword.style.backgroundSize = 'cover';
        crossword.style.backgroundPosition = 'center';
        crossword.style.backgroundRepeat = 'no-repeat';
    }
};

// Next background
window.nextBackground = function () {
    currentBackgroundIndex = (currentBackgroundIndex + 1) % crosswordBackgrounds.length;
    setCrosswordBackground(crosswordBackgrounds[currentBackgroundIndex]);

    // Update disabled cells to be semi-transparent
    updateDisabledCellsStyle();

    Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'success',
        title: `Background ${currentBackgroundIndex + 1} of ${crosswordBackgrounds.length}`,
        showConfirmButton: false,
        timer: 1500
    });
};

// Random background
window.randomBackground = function () {
    currentBackgroundIndex = Math.floor(Math.random() * crosswordBackgrounds.length);
    setCrosswordBackground(crosswordBackgrounds[currentBackgroundIndex]);
    updateDisabledCellsStyle();

    Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'success',
        title: 'Random background applied!',
        showConfirmButton: false,
        timer: 1500
    });
};

// Update disabled cells to show background
function updateDisabledCellsStyle() {
    // Make cells semi-transparent to show background
    const style = document.getElementById('dynamic-bg-style') || document.createElement('style');
    style.id = 'dynamic-bg-style';
    style.textContent = `
        /* Black cells - more transparent to show background */
        .wr_box .disabled {
            background-color: rgba(0, 0, 0, 0.4) !important;
        }
        
        /* White cells - semi-transparent to show background */
        .wr_box .box:not(.disabled) {
            background-color: rgba(255, 255, 255, 0.5) !important;
        }
        
        /* Selected cells - slightly more opaque */
        .wr_box .box.genSel {
            background-color: rgba(173, 217, 228, 0.7) !important;
        }
        
        /* Crossword container styling */
        #crossword {
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }
        
        /* Make text more visible on semi-transparent background */
        .wr_box .box:not(.disabled) {
            color: #000 !important;
            font-weight: bold !important;
            text-shadow: 0 0 3px white, 0 0 5px white !important;
        }
        
        /* Cell numbers more visible */
        .number {
            color: #333 !important;
            font-weight: bold !important;
            text-shadow: 0 0 2px white !important;
        }
    `;
    if (!document.getElementById('dynamic-bg-style')) {
        document.head.appendChild(style);
    }
}

// Toggle background mode (solid black vs image)
let backgroundModeEnabled = false;
window.toggleBackgroundMode = function () {
    backgroundModeEnabled = !backgroundModeEnabled;

    if (backgroundModeEnabled) {
        randomBackground();
    } else {
        // Reset to solid black
        const crossword = document.getElementById('crossword');
        if (crossword) {
            crossword.style.backgroundImage = 'none';
        }

        const style = document.getElementById('dynamic-bg-style');
        if (style) {
            style.textContent = `
                .wr_box .disabled {
                    background-color: black !important;
                }
            `;
        }

        Swal.fire({
            toast: true,
            position: 'bottom-end',
            icon: 'info',
            title: 'Background mode disabled',
            showConfirmButton: false,
            timer: 1500
        });
    }
};

console.log('Backgrounds loaded:', crosswordBackgrounds.length, 'images');

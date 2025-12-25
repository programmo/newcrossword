// ===================================
// MOBILE RESPONSIVE HANDLER
// ===================================

// Simple handler - CSS does the work, we just ensure scroll starts at top-left

document.addEventListener('DOMContentLoaded', function () {
    resetScroll();
});

window.addEventListener('load', function () {
    resetScroll();
});

function resetScroll() {
    const container = document.getElementById('crosswordContainer');
    if (container) {
        container.scrollLeft = 0;
        container.scrollTop = 0;
    }
}

console.log('Mobile responsive v4 loaded - scroll enabled');

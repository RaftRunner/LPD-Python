// Select all sections in the document and store them in the 'sections' variable
let sections = document.querySelectorAll('section');

// Add a scroll event listener to the window
window.onscroll = () => {
    // Iterate over each section
    sections.forEach(sec => {
        // Get the current vertical scroll position
        let top = window.scrollY;
        // Calculate the offset position of the section
        let offset = sec.offsetTop - 150;
        // Get the height of the section
        let height = sec.offsetHeight;

        // Check if the current scroll position is within the section's range
        if (top >= offset && top < offset + height) {
            // If within the range, add the 'animation' class to the section
            sec.classList.add('animation');
        } else {
            // If not within the range, remove the 'animation' class from the section
            sec.classList.remove('animation');
        }
    });
};
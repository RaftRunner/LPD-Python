// Select all elements with class 'welcome-effect' and store them in loaders
let loaders = document.querySelectorAll('.welcome-effect');

// Iterate over each loader element
loaders.forEach(loader => {
    // Generate 20 span elements
    for (let i = 1; i <= 20; i++) {
        let span = document.createElement('span');
        // Set CSS custom property '--i' with value of current iteration index
        span.style.setProperty("--i", String(i));
        // Append the span element to the loader element
        loader.appendChild(span);
    }
});

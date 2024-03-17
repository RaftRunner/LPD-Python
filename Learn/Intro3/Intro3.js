// Select all elements with class 'accordion' and store them in the 'acc' variable
var acc = document.getElementsByClassName("accordion");

// Iterate over each 'accordion' element
for (var i = 0; i < acc.length; i++) {
  // Add a click event listener to toggle the active class and expand/collapse the panel
  acc[i].addEventListener("click", function() {
    // Toggle the 'active' class for the clicked accordion element
    this.classList.toggle("active");
    // Select the next sibling element, which represents the panel content
    var panel = this.nextElementSibling;
    // Check if the panel is currently expanded
    if (panel.style.maxHeight) {
      // If expanded, collapse the panel by setting maxHeight to null
      panel.style.maxHeight = null;
    } else {
      // If collapsed, expand the panel by setting maxHeight to its scroll height
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

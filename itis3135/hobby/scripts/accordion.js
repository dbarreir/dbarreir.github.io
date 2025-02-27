// Get all the nav links
const navLinks = document.querySelectorAll("header nav ul li a");

// Get all sections
const sections = document.querySelectorAll("section");

// Function to hide all sections
function hideAllSections() {
    sections.forEach((section) => {
        section.style.display = 'none';
    });
}

// Function to show the selected section
function showSection(id) {
    const sectionToShow = document.getElementById(id);
    if (sectionToShow) {
        sectionToShow.style.display = 'block';
    }
}

// Set up event listeners for each link
navLinks.forEach((link) => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        const targetId = link.getAttribute('data-target'); // Get the target section ID
        hideAllSections(); // Hide all sections
        showSection(targetId); // Show the selected section
    });
});

// Show the home section by default when the page loads
window.addEventListener('load', () => {
    hideAllSections(); // Hide all sections
    showSection('home'); // Show the home section by default
});
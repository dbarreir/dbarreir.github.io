const navLinks = document.querySelectorAll("header nav ul li a");
const sections = document.querySelectorAll("section");

function hideAllSections() {
    sections.forEach((section) => {
        section.style.display = 'none';
    });
}

function showSection(id) {
    const sectionToShow = document.getElementById(id);
    if (sectionToShow) {
        sectionToShow.style.display = 'block';
    }
}

navLinks.forEach((link) => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        const targetId = link.getAttribute('data-target'); // Get the target section ID
        hideAllSections();
        showSection(targetId);
    });
});

// Show the home section by default when the page loads
window.addEventListener('load', () => {
    hideAllSections();
    showSection('home');
});
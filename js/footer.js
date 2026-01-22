// Global footer component
const footerHTML = `
    <footer class="main-footer">
        <div class="footer-content">
            <div class="footer-section">
                <h4>Contact</h4>
                <p>info@egelhulp.nl</p>
                <a href="https://instagram.com/egelhulp" target="_blank">@egelhulp</a>
            </div>

            <div class="footer-section">
                <h4>Egelhulp</h4>
                <p>Hulp voor egels in Nederland</p>
            </div>

            <div class="footer-section">
                <h4>Info</h4>
                <a href="index.html#over-ons">Over Egelhulp</a>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} Egelhulp. Alle rechten voorbehouden.</p>
        </div>
    </footer>
`;

// Insert footer into the page
document.addEventListener('DOMContentLoaded', function() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.outerHTML = footerHTML;
    }
});

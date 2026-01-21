// Simple password protection for preview site
const SITE_PASSWORD = "egelhulp"; // Change this to your desired password
const AUTH_KEY = "egelhulp_authenticated";

function createAuthModal() {
    // Check if already authenticated in this session
    if (sessionStorage.getItem(AUTH_KEY) === "true") {
        return;
    }

    // Create modal HTML
    const modalHTML = `
        <div id="auth-overlay" class="auth-overlay">
            <div class="auth-modal">
                <div class="auth-logo">
                    <img src="images/egelhulp_logo_cropped_1.svg" alt="Egelhulp Logo">
                </div>
                <form id="auth-form" class="auth-form">
                    <input 
                        type="password" 
                        id="auth-password" 
                        placeholder="Wachtwoord"
                        autocomplete="off"
                        autofocus
                    >
                    <p id="auth-error" class="auth-error"></p>
                </form>
            </div>
        </div>
    `;

    // Insert modal at the start of body
    document.body.insertAdjacentHTML('afterbegin', modalHTML);

    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';

    // Handle form submission
    const form = document.getElementById('auth-form');
    const passwordInput = document.getElementById('auth-password');
    const errorMsg = document.getElementById('auth-error');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (passwordInput.value === SITE_PASSWORD) {
            // Success - store in session and remove modal
            sessionStorage.setItem(AUTH_KEY, "true");
            const overlay = document.getElementById('auth-overlay');
            overlay.classList.add('auth-fade-out');
            
            setTimeout(() => {
                overlay.remove();
                document.body.style.overflow = '';
            }, 300);
        } else {
            // Wrong password
            errorMsg.textContent = 'Onjuist wachtwoord';
            passwordInput.value = '';
            passwordInput.focus();
            
            // Shake animation
            const modal = document.querySelector('.auth-modal');
            modal.classList.add('auth-shake');
            setTimeout(() => modal.classList.remove('auth-shake'), 500);
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', createAuthModal);

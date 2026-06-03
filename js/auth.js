// Simple password protection for preview site
const SITE_PASSWORD = "egelhulp";
const AUTH_KEY = "egelhulp_authenticated";

function createAuthModal() {
    if (sessionStorage.getItem(AUTH_KEY) === "true") {
        return;
    }

    const modalHTML = `
        <div id="auth-overlay" class="fixed inset-0 w-full h-full bg-[rgba(26,20,17,0.85)] backdrop-blur-[8px] flex items-center justify-center z-[10000] opacity-100 transition-opacity duration-300">
            <div class="auth-modal bg-cream px-10 py-6 rounded-[50px] text-center shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                <div class="mb-3">
                    <img src="images/egelhulp-favicon.svg" alt="Egelhulp Logo" class="h-[55px] mix-blend-multiply">
                </div>
                <form id="auth-form" class="flex flex-col gap-2">
                    <input
                        type="password"
                        id="auth-password"
                        placeholder="Wachtwoord"
                        autocomplete="off"
                        autofocus
                        class="font-serif text-sm px-5 py-2.5 border-[1.5px] border-border-medium rounded-[25px] bg-white text-[#1A1411] text-center transition-colors w-[180px] focus:outline-none focus:border-orange placeholder:text-gray-400"
                    >
                    <p id="auth-error" class="text-red-700 text-[13px] m-0 min-h-[18px]"></p>
                </form>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', modalHTML);
    document.body.style.overflow = 'hidden';

    const form = document.getElementById('auth-form');
    const passwordInput = document.getElementById('auth-password');
    const errorMsg = document.getElementById('auth-error');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (passwordInput.value === SITE_PASSWORD) {
            sessionStorage.setItem(AUTH_KEY, "true");
            const overlay = document.getElementById('auth-overlay');
            overlay.classList.add('opacity-0');

            setTimeout(() => {
                overlay.remove();
                document.body.style.overflow = '';
            }, 300);
        } else {
            errorMsg.textContent = 'Onjuist wachtwoord';
            passwordInput.value = '';
            passwordInput.focus();

            const modal = document.querySelector('.auth-modal');
            modal.classList.add('auth-shake');
            setTimeout(() => modal.classList.remove('auth-shake'), 500);
        }
    });
}

document.addEventListener('DOMContentLoaded', createAuthModal);

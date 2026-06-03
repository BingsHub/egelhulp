
// ========================================
// Egelhulp Products
// ========================================

const products = [
  {
    id: 1001,
    name: "Logo Totebag",
    price: "14,85",
    image: "images/egelhulp-logo-tote.png",
    description: "Draag je steun voor egels met trots! Deze stevige katoenen tas is perfect voor boodschappen of dagelijks gebruik.",
    specs: ['100% Katoen', 'Duurzaam', 'Egelhulp logo'],
    alt: "Egelhulp Logo Tote Bag",
  },
  {
    id: 1002,
    name: "Verjaardagskaart",
    price: "3,85",
    image: "images/hedgehog-birthday-card.png",
    description: "Verras iemand met deze schattige handgetekende egelkaart. Inclusief kraft envelop.",
    specs: ['Handgetekend', 'Inclusief envelop', 'FSC Papier'],
    alt: "Hedgehog Birthday Card",
  },
  {
    id: 1003,
    name: "Egelhanger",
    price: "8,85",
    image: "images/hedgehog-felt-hanger.png",
    description: "Handgemaakte vilten egelhanger, perfect voor aan de muur of als decoratie in huis.",
    specs: ['Handgemaakt vilt', 'Fair trade', 'Decoratief'],
    alt: "Hedgehog Felt Hanger",
  },
  {
    id: 1004,
    name: "Bloemzaden",
    price: "12,85",
    image: "images/native-flower-seeds.png",
    description: "Maak je tuin egelvriendelijk met deze mix van inheemse bloemen. Trekt insecten aan waar egels dol op zijn.",
    specs: ['Inheemse mix', 'Trekt insecten', 'Egelvriendelijk'],
    alt: "Native Flower Seeds",
  },
  {
    id: 1005,
    name: "Egel Totebag",
    price: "16,85",
    image: "images/egelhulp-egel-tote.png",
    description: "Prachtige totebag met unieke egelillustratie. Stevig katoen voor jarenlang gebruik.",
    specs: ['Stevig katoen', 'Unieke print', 'Ruim vak'],
    alt: "Egelhulp Egel Tote Bag",
  },
  {
    id: 1006,
    name: "Egelbrokjes 1kg",
    price: "9,85",
    image: "images/egelhulp-egelbrokjes.png",
    description: "Speciaal samengesteld egelvoer, rijk aan eiwitten. Ideaal om tuintegels bij te voeren.",
    specs: ['Rijk aan eiwit', 'Natuurlijke ingrediënten', 'Voor tuinegels'],
    alt: "Egelbrokjes Egelvoer",
  },
  {
    id: 1007,
    name: "Egelkalender 2026",
    price: "11,85",
    image: "images/egelhulp-egelkalender.png",
    description: "Twaalf maanden lang genieten van prachtige egelfoto's. Met ruimte voor notities.",
    specs: ['12 Egel foto\'s', 'Ruime notitie', 'A4 formaat'],
    alt: "Egelhulp Egelkalender",
  },
  {
    id: 1008,
    name: "De Egelsteen",
    price: "7,85",
    image: "images/egelhulp-egelsteen-kinderboekje.png",
    description: "Een hartverwarmend kinderboek over een avontuurlijke egel. Prachtig geïllustreerd voor kleintjes van 4-8 jaar.",
    specs: ['Hardcover', 'Voor 4-8 jaar', 'Educatief verhaal'],
    alt: "Het Egelsteen Kinderboekje",
  },
];

const paymentLinks = {
  1001: 'https://buy.stripe.com/test_cNicN51YPdGHdJ6bbI0Ba00',
  1002: 'https://buy.stripe.com/test_fZu5kD32T46734s5Ro0Ba03',
  1003: 'https://buy.stripe.com/test_dRm4gz6f56ef48wenU0Ba02',
  1004: 'https://buy.stripe.com/test_00w6oHeLBbyz34sfrY0Ba01',
};

// ========================================
// Cart
// ========================================

let cart = [];

function addToCart(product) {
  const existing = cart.find(item => item.product.id === product.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ product, quantity: 1 });
  }
  updateCartIcon();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.product.id !== productId);
  updateCartIcon();
}

function updateQuantity(productId, delta) {
  const item = cart.find(item => item.product.id === productId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) removeFromCart(productId);
  else updateCartIcon();
}

function cartItemCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function cartTotal() {
  return cart.reduce((sum, { product, quantity }) => {
    return sum + parseFloat(product.price.replace(',', '.')) * quantity;
  }, 0);
}

function formatPrice(amount) {
  return amount.toFixed(2).replace('.', ',');
}

function updateCartIcon() {
  const btn = document.getElementById('cart-btn');
  if (!btn) return;
  const count = cartItemCount();
  let badge = btn.querySelector('.cart-badge');

  if (count > 0) {
    btn.classList.remove('text-[#1A1411]');
    btn.classList.add('text-orange');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'cart-badge absolute -top-1.5 -right-1.5 bg-orange text-cream text-[10px] font-sans font-bold min-w-[16px] h-4 rounded-full flex items-center justify-center leading-none px-0.5 pointer-events-none';
      btn.appendChild(badge);
    }
    badge.textContent = count;
  } else {
    btn.classList.remove('text-orange');
    btn.classList.add('text-[#1A1411]');
    if (badge) badge.remove();
  }

  if (cartModal.classList.contains('visible')) renderCartModal();
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1A1411] text-cream font-sans text-sm px-5 py-3 rounded-lg z-[2000] shadow-lg opacity-100 transition-opacity duration-300 whitespace-nowrap';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ========================================
// Product Modal
// ========================================

const productModal = document.createElement('div');
productModal.className = 'fixed inset-0 z-[1000] flex items-center justify-center opacity-0 invisible transition-all duration-[250ms]';
productModal.innerHTML = `
  <div class="modal-backdrop absolute inset-0 bg-[rgba(26,20,17,0.8)] backdrop-blur-sm"></div>
  <div class="modal-content relative bg-cream rounded-[10px] max-w-[500px] w-[calc(100%-32px)] max-h-[calc(100vh-80px)] overflow-y-auto scale-95 translate-y-2.5 transition-transform duration-[250ms] shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
    <button class="modal-close absolute top-3 right-3 w-9 h-9 border-none bg-white rounded-full cursor-pointer flex items-center justify-center text-brown transition-all z-10 hover:bg-border-light hover:text-[#1A1411]" aria-label="Sluiten">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
    <div class="modal-image w-full aspect-square flex items-center justify-center bg-white rounded-t-[10px] p-10">
      <img class="max-w-[80%] max-h-[80%] object-contain" src="" alt="">
    </div>
    <div class="modal-info p-6">
      <h2 class="modal-name font-serif text-2xl font-semibold text-[#1A1411] m-0 mb-1"></h2>
      <p class="modal-price font-sans text-lg font-semibold text-orange m-0 mb-3"></p>
      <p class="modal-description font-serif text-[15px] leading-relaxed text-[#2D2320] m-0 mb-4"></p>
      <ul class="modal-specs list-none p-0 m-0 mb-6 flex flex-wrap gap-2"></ul>
      <button class="modal-add-btn w-full py-3.5 px-6 bg-orange text-cream border-none rounded-[10px] font-sans text-[15px] font-semibold cursor-pointer transition-colors hover:bg-orange-dark disabled:bg-border-medium disabled:text-brown disabled:cursor-not-allowed">In de mand</button>
    </div>
  </div>
`;
document.body.appendChild(productModal);

const modalBackdrop = productModal.querySelector('.modal-backdrop');
const modalCloseBtn = productModal.querySelector('.modal-close');
const modalImage = productModal.querySelector('.modal-image img');
const modalName = productModal.querySelector('.modal-name');
const modalPrice = productModal.querySelector('.modal-price');
const modalDescription = productModal.querySelector('.modal-description');
const modalSpecs = productModal.querySelector('.modal-specs');
const modalAddBtn = productModal.querySelector('.modal-add-btn');
const modalContent = productModal.querySelector('.modal-content');

let currentProduct = null;

function openProductModal(product) {
  currentProduct = product;
  modalImage.src = product.image;
  modalImage.alt = product.alt || product.name;
  modalName.textContent = product.name;
  modalPrice.textContent = `€${product.price}`;
  modalDescription.textContent = product.description;
  modalSpecs.innerHTML = product.specs
    .map(s => `<li class="font-sans text-xs text-brown bg-white border border-border-light px-2.5 py-1 rounded-full">${s}</li>`)
    .join('');

  productModal.querySelector('.modal-image').classList.remove('hidden');
  modalPrice.classList.remove('hidden');
  modalAddBtn.classList.remove('hidden');

  const available = !!paymentLinks[product.id];
  modalAddBtn.textContent = available ? 'In de mand' : 'Binnenkort beschikbaar';
  modalAddBtn.disabled = !available;

  showProductModal();
}

function openDonateModal() {
  currentProduct = null;
  productModal.querySelector('.modal-image').classList.add('hidden');
  modalName.textContent = 'Direct doneren';
  modalPrice.classList.add('hidden');
  modalDescription.textContent = 'Informatie over direct doneren wordt binnenkort toegevoegd.';
  modalSpecs.innerHTML = '';
  modalAddBtn.classList.add('hidden');
  showProductModal();
}

function showProductModal() {
  productModal.classList.remove('opacity-0', 'invisible');
  productModal.classList.add('opacity-100', 'visible');
  modalContent.classList.remove('scale-95', 'translate-y-2.5');
  modalContent.classList.add('scale-100', 'translate-y-0');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  productModal.classList.add('opacity-0', 'invisible');
  productModal.classList.remove('opacity-100', 'visible');
  modalContent.classList.add('scale-95', 'translate-y-2.5');
  modalContent.classList.remove('scale-100', 'translate-y-0');
  document.body.style.overflow = '';
  currentProduct = null;
}

modalBackdrop.addEventListener('click', closeProductModal);
modalCloseBtn.addEventListener('click', closeProductModal);

modalAddBtn.addEventListener('click', () => {
  if (!currentProduct) return;
  addToCart(currentProduct);
  modalAddBtn.textContent = 'Toegevoegd ✓';
  setTimeout(() => {
    closeProductModal();
    modalAddBtn.textContent = 'In de mand';
  }, 700);
});

// ========================================
// Cart Modal
// ========================================

const cartModal = document.createElement('div');
cartModal.className = 'fixed inset-0 z-[1000] flex items-center justify-center opacity-0 invisible transition-all duration-[250ms]';
cartModal.innerHTML = `
  <div class="cart-backdrop absolute inset-0 bg-[rgba(26,20,17,0.8)] backdrop-blur-sm"></div>
  <div class="cart-content relative bg-cream rounded-[10px] max-w-[480px] w-[calc(100%-32px)] max-h-[calc(100vh-80px)] overflow-y-auto scale-95 translate-y-2.5 transition-transform duration-[250ms] shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
    <div class="flex items-center justify-between px-6 py-4 border-b border-border-light">
      <h2 class="font-serif text-xl font-semibold text-[#1A1411] m-0">Jouw mand</h2>
      <button class="cart-close w-9 h-9 border-none bg-transparent rounded-full cursor-pointer flex items-center justify-center text-brown transition-all hover:bg-border-light hover:text-[#1A1411]" aria-label="Sluiten">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="cart-items px-6 py-2"></div>
    <div class="cart-footer px-6 pb-6 hidden">
      <div class="flex justify-between items-center py-4 border-t border-border-light">
        <span class="font-serif text-base font-semibold text-[#1A1411]">Totaal</span>
        <span class="cart-total font-sans text-base font-bold text-orange"></span>
      </div>
      <button class="cart-checkout-btn w-full py-3.5 px-6 bg-orange text-cream border-none rounded-[10px] font-sans text-[15px] font-semibold cursor-pointer transition-colors hover:bg-orange-dark">Afrekenen</button>
    </div>
  </div>
`;
document.body.appendChild(cartModal);

const cartContent = cartModal.querySelector('.cart-content');

cartModal.querySelector('.cart-backdrop').addEventListener('click', closeCartModal);
cartModal.querySelector('.cart-close').addEventListener('click', closeCartModal);
cartModal.querySelector('.cart-checkout-btn').addEventListener('click', () => {
  showToast('Online afrekenen komt binnenkort beschikbaar.');
});

function openCartModal() {
  renderCartModal();
  cartModal.classList.remove('opacity-0', 'invisible');
  cartModal.classList.add('opacity-100', 'visible');
  cartContent.classList.remove('scale-95', 'translate-y-2.5');
  cartContent.classList.add('scale-100', 'translate-y-0');
  document.body.style.overflow = 'hidden';
}

function closeCartModal() {
  cartModal.classList.add('opacity-0', 'invisible');
  cartModal.classList.remove('opacity-100', 'visible');
  cartContent.classList.add('scale-95', 'translate-y-2.5');
  cartContent.classList.remove('scale-100', 'translate-y-0');
  document.body.style.overflow = '';
}

function renderCartModal() {
  const itemsEl = cartModal.querySelector('.cart-items');
  const footer = cartModal.querySelector('.cart-footer');
  const totalEl = cartModal.querySelector('.cart-total');

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="text-center py-10">
        <p class="font-serif text-[#2D2320] mb-4">Je mand is leeg.</p>
        <button class="browse-btn font-sans text-sm font-medium text-orange underline-offset-4 hover:underline bg-transparent border-none cursor-pointer p-0">Bekijk de spulletjes →</button>
      </div>
    `;
    itemsEl.querySelector('.browse-btn').addEventListener('click', () => {
      closeCartModal();
      document.getElementById('producten')?.scrollIntoView({ behavior: 'smooth' });
    });
    footer.classList.add('hidden');
    return;
  }

  itemsEl.innerHTML = cart.map(({ product, quantity }) => `
    <div class="flex items-center gap-4 py-4 border-b border-border-light last:border-0">
      <img src="${product.image}" alt="${product.alt || product.name}"
           class="w-16 h-16 object-contain bg-white rounded-md p-1.5 shrink-0 border border-border-light">
      <div class="flex-1 min-w-0">
        <p class="font-serif text-sm font-semibold text-[#1A1411] m-0 mb-0.5 leading-tight">${product.name}</p>
        <p class="font-sans text-sm font-semibold text-orange m-0">€${product.price}</p>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <button class="qty-btn w-7 h-7 rounded-full border border-border-medium bg-transparent text-brown font-sans text-sm font-semibold flex items-center justify-center hover:border-orange hover:text-orange transition-colors cursor-pointer"
                data-id="${product.id}" data-delta="-1">−</button>
        <span class="font-sans text-sm font-semibold text-[#1A1411] w-4 text-center">${quantity}</span>
        <button class="qty-btn w-7 h-7 rounded-full border border-border-medium bg-transparent text-brown font-sans text-sm font-semibold flex items-center justify-center hover:border-orange hover:text-orange transition-colors cursor-pointer"
                data-id="${product.id}" data-delta="1">+</button>
      </div>
    </div>
  `).join('');

  itemsEl.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      updateQuantity(parseInt(btn.dataset.id), parseInt(btn.dataset.delta));
      renderCartModal();
    });
  });

  totalEl.textContent = `€${formatPrice(cartTotal())}`;
  footer.classList.remove('hidden');
}

// ========================================
// Keyboard
// ========================================

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (productModal.classList.contains('visible')) closeProductModal();
  else if (cartModal.classList.contains('visible')) closeCartModal();
});

// ========================================
// Product Grid
// ========================================

const grid = document.querySelector('.product-grid');

if (grid) {
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'cursor-pointer transition-all group hover:-translate-y-1';
    card.dataset.id = product.id;

    card.innerHTML = `
      <div class="w-full aspect-square flex items-center justify-center overflow-hidden mb-3">
        <img src="${product.image}" alt="${product.alt || product.name}"
             class="max-w-[85%] max-h-[85%] object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105">
      </div>
      <div class="text-center">
        <h3 class="font-serif font-medium text-[15px] m-0 mb-1 text-[#2D2320] leading-tight">${product.name}</h3>
        <p class="font-sans font-semibold text-sm m-0 text-brown">&euro;${product.price}</p>
      </div>
    `;

    card.addEventListener('click', () => openProductModal(product));
    grid.appendChild(card);
  });
}

// ========================================
// Donate Link
// ========================================

const donateLink = document.getElementById('donate-link');
if (donateLink) {
  donateLink.addEventListener('click', (e) => {
    e.preventDefault();
    openDonateModal();
  });
}

// ========================================
// Nav cart button
// ========================================

const cartBtn = document.getElementById('cart-btn');
if (cartBtn) {
  cartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openCartModal();
  });
}

// ========================================
// Shrink logo on scroll
// ========================================

const navLogo = document.querySelector('.logo img');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navLogo.classList.add('scrolled');
  } else {
    navLogo.classList.remove('scrolled');
  }
}, { passive: true });

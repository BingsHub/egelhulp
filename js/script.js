
// ========================================
// Egelhulp Product Grid & Modal
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

// Stripe Payment Links (test mode)
const paymentLinks = {
  1001: 'https://buy.stripe.com/test_cNicN51YPdGHdJ6bbI0Ba00',
  1002: 'https://buy.stripe.com/test_fZu5kD32T46734s5Ro0Ba03',
  1003: 'https://buy.stripe.com/test_dRm4gz6f56ef48wenU0Ba02',
  1004: 'https://buy.stripe.com/test_00w6oHeLBbyz34sfrY0Ba01',
};

// ========================================
// Shared Modal
// ========================================

const modal = document.createElement('div');
modal.className = 'fixed inset-0 z-[1000] flex items-center justify-center opacity-0 invisible transition-all duration-[250ms]';
modal.innerHTML = `
  <div class="modal-backdrop absolute inset-0 bg-[rgba(26,20,17,0.8)] backdrop-blur-sm"></div>
  <div class="modal-content relative bg-white rounded-[10px] max-w-[500px] w-[calc(100%-32px)] max-h-[calc(100vh-80px)] overflow-y-auto scale-95 translate-y-2.5 transition-transform duration-[250ms] shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
    <button class="modal-close absolute top-3 right-3 w-9 h-9 border-none bg-cream rounded-full cursor-pointer flex items-center justify-center text-brown transition-all z-10 hover:bg-border-light hover:text-[#1A1411]" aria-label="Sluiten">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
    <div class="modal-image w-full aspect-square flex items-center justify-center bg-cream p-10">
      <img class="max-w-[80%] max-h-[80%] object-contain" src="" alt="">
    </div>
    <div class="modal-info p-6">
      <h2 class="modal-name font-serif text-2xl font-semibold text-[#1A1411] m-0 mb-1"></h2>
      <p class="modal-price font-sans text-lg font-semibold text-orange m-0 mb-4"></p>
      <p class="modal-description font-serif text-[15px] leading-relaxed text-[#2D2320] m-0 mb-4"></p>
      <ul class="modal-specs list-none p-0 m-0 mb-6 flex flex-wrap gap-2"></ul>
      <button class="modal-buy-btn w-full py-3.5 px-6 bg-orange text-cream border-none rounded-sm font-sans text-[15px] font-semibold cursor-pointer transition-colors hover:bg-orange-dark disabled:bg-border-medium disabled:text-brown disabled:cursor-not-allowed">Bestel</button>
    </div>
  </div>
`;
document.body.appendChild(modal);

const backdrop = modal.querySelector('.modal-backdrop');
const closeBtn = modal.querySelector('.modal-close');
const modalImage = modal.querySelector('.modal-image img');
const modalName = modal.querySelector('.modal-name');
const modalPrice = modal.querySelector('.modal-price');
const modalDescription = modal.querySelector('.modal-description');
const modalSpecs = modal.querySelector('.modal-specs');
const modalBuyBtn = modal.querySelector('.modal-buy-btn');
const modalContent = modal.querySelector('.modal-content');

let currentProduct = null;

function openModal(product) {
  currentProduct = product;

  modalImage.src = product.image;
  modalImage.alt = product.alt || product.name;
  modalName.textContent = product.name;
  modalPrice.textContent = `€${product.price}`;
  modalDescription.textContent = product.description;
  modalSpecs.innerHTML = product.specs
    .map(spec => `<li class="font-sans text-xs text-brown bg-cream px-2.5 py-1 rounded-full">${spec}</li>`)
    .join('');

  // Show image section and price
  modal.querySelector('.modal-image').classList.remove('hidden');
  modalPrice.classList.remove('hidden');

  const hasLink = paymentLinks[product.id];
  modalBuyBtn.textContent = hasLink ? 'Bestel' : 'Binnenkort beschikbaar';
  modalBuyBtn.disabled = !hasLink;
  modalBuyBtn.classList.remove('hidden');

  showModal();
}

function openDonateModal() {
  currentProduct = null;

  modal.querySelector('.modal-image').classList.add('hidden');
  modalName.textContent = 'Direct doneren';
  modalPrice.classList.add('hidden');
  modalDescription.textContent = 'Informatie over direct doneren wordt binnenkort toegevoegd.';
  modalSpecs.innerHTML = '';
  modalBuyBtn.classList.add('hidden');

  showModal();
}

function showModal() {
  modal.classList.remove('opacity-0', 'invisible');
  modal.classList.add('opacity-100', 'visible');
  modalContent.classList.remove('scale-95', 'translate-y-2.5');
  modalContent.classList.add('scale-100', 'translate-y-0');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.add('opacity-0', 'invisible');
  modal.classList.remove('opacity-100', 'visible');
  modalContent.classList.add('scale-95', 'translate-y-2.5');
  modalContent.classList.remove('scale-100', 'translate-y-0');
  document.body.style.overflow = '';
  currentProduct = null;
}

backdrop.addEventListener('click', closeModal);
closeBtn.addEventListener('click', closeModal);

modalBuyBtn.addEventListener('click', () => {
  if (currentProduct && paymentLinks[currentProduct.id]) {
    window.location.href = paymentLinks[currentProduct.id];
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('opacity-100')) {
    closeModal();
  }
});

// ========================================
// Product Grid
// ========================================

const grid = document.querySelector('.product-grid');

if (grid) {
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-md overflow-hidden cursor-pointer transition-all outline outline-2 outline-border-light outline-offset-4 hover:outline-orange-light hover:-translate-y-0.5';
    card.dataset.id = product.id;

    card.innerHTML = `
      <div class="w-full aspect-[4/3] flex items-center justify-center overflow-hidden bg-white p-4">
        <img src="${product.image}" alt="${product.alt || product.name}" class="max-w-[85%] max-h-[85%] object-contain transition-transform group-hover:scale-105">
      </div>
      <div class="px-4 pb-4 pt-2 text-center">
        <h3 class="font-serif font-medium text-[15px] m-0 mb-1 text-[#2D2320] leading-tight">${product.name}</h3>
        <p class="font-sans font-semibold text-sm m-0 text-brown">&euro;${product.price}</p>
      </div>
    `;

    card.addEventListener('click', () => openModal(product));
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

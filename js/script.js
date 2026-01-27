
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

const grid = document.querySelector('.product-grid');

if (grid) {
  // Create product cards
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product.id;

    card.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.alt || product.name}">
      </div>
      <div class="card-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">€${product.price}</p>
      </div>
    `;

    card.addEventListener('click', () => openModal(product));
    grid.appendChild(card);
  });

  // Create modal (once)
  const modal = document.createElement('div');
  modal.className = 'product-modal';
  modal.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-content">
      <button class="modal-close" aria-label="Sluiten">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div class="modal-image">
        <img src="" alt="">
      </div>
      <div class="modal-info">
        <h2 class="modal-name"></h2>
        <p class="modal-price"></p>
        <p class="modal-description"></p>
        <ul class="modal-specs"></ul>
        <button class="modal-buy-btn">Bestel</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // Modal elements
  const backdrop = modal.querySelector('.modal-backdrop');
  const closeBtn = modal.querySelector('.modal-close');
  const modalImage = modal.querySelector('.modal-image img');
  const modalName = modal.querySelector('.modal-name');
  const modalPrice = modal.querySelector('.modal-price');
  const modalDescription = modal.querySelector('.modal-description');
  const modalSpecs = modal.querySelector('.modal-specs');
  const modalBuyBtn = modal.querySelector('.modal-buy-btn');

  let currentProduct = null;

  function openModal(product) {
    currentProduct = product;

    modalImage.src = product.image;
    modalImage.alt = product.alt || product.name;
    modalName.textContent = product.name;
    modalPrice.textContent = `€${product.price}`;
    modalDescription.textContent = product.description;
    modalSpecs.innerHTML = product.specs.map(spec => `<li>${spec}</li>`).join('');

    // Update buy button
    const hasLink = paymentLinks[product.id];
    modalBuyBtn.textContent = hasLink ? 'Bestel' : 'Binnenkort beschikbaar';
    modalBuyBtn.disabled = !hasLink;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    currentProduct = null;
  }

  // Event listeners
  backdrop.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);

  modalBuyBtn.addEventListener('click', () => {
    if (currentProduct && paymentLinks[currentProduct.id]) {
      window.location.href = paymentLinks[currentProduct.id];
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

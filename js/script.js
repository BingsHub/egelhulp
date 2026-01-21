const products = [
  {
    id: 1001,
    name: "Egelhulp 'Logo' Totebag",
    price: "14,85",
    image: "images/egelhulp-logo-tote.png",
    alt: "Egelhulp Logo Tote Bag",
  },
  {
    id: 1002,
    name: "Verjaardagskaart",
    price: "3,85",
    image: "images/hedgehog-birthday-card.png",
    alt: "Hedgehog Birthday Card",
  },
  {
    id: 1003,
    name: "Egelhanger",
    price: "8,85",
    image: "images/hedgehog-felt-hanger.png",
    alt: "Hedgehog Felt Hanger",
  },
  {
    id: 1004,
    name: "Vergeten Bloemzaden",
    price: "12,85",
    image: "images/native-flower-seeds.png",
    alt: "Native Flower Seeds",
  },
  {
    id: 1005,
    name: "Egelhulp 'Egel' Totebag",
    price: "16,85",
    image: "images/egelhulp-egel-tote.png",
    alt: "Egelhulp Egel Tote Bag",
  },
  {
    id: 1006,
    name: "Egelbrokjes 1kg",
    price: "9,85",
    image: "images/egelhulp-egelbrokjes.png",
    alt: "Egelbrokjes Egelvoer",
  },
  {
    id: 1007,
    name: "Egelkalender 2026",
    price: "11,85",
    image: "images/egelhulp-egelkalender.png",
    alt: "Egelhulp Egelkalender",
  },
  {
    id: 1008,
    name: "Kinderboekje Egelsteen",
    price: "7,85",
    image: "images/egelhulp-egelsteen-kinderboekje.png",
    alt: "Het Egelsteen Kinderboekje",
  },
];

function renderProducts() {
  const productGrid = document.querySelector(".product-grid");

  productGrid.innerHTML = '';

  products.forEach(product => {
    const productCard = `<div class="product-card" data-product-id="${product.id}">
      <img src="${product.image}" alt="${product.alt}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="price">${product.price}</p>
      </div>
    </div>`;
    
    productGrid.innerHTML += productCard;
  });

  // Add click handlers after rendering
  document.querySelectorAll('.product-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function() {
      const productId = this.getAttribute('data-product-id');
      window.location.href = `product.html?id=${productId}`;
    });
  });
}

renderProducts();

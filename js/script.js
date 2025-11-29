const products = [
  {
    id: 1001,
    name: "Egelhulp Totebag",
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
    name: "Inheemse Bloemzaden",
    price: "12,85",
    image: "images/native-flower-seeds.png",
    alt: "Native Flower Seeds",
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

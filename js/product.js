// Get product ID from URL parameter
function getProductIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

// Find product by ID
function findProductById(id) {
  return products.find(product => product.id == id);
}

// Render product details
function renderProductDetail() {
  const productId = getProductIdFromURL();
  
  if (!productId) {
    window.location.href = 'winkel.html';
    return;
  }

  const product = findProductById(productId);
  
  if (!product) {
    alert('Product niet gevonden!');
    window.location.href = 'winkel.html';
    return;
  }

  // Update page title
  document.title = `${product.name} - Egelhulp`;

  // Populate product details
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-price').textContent = product.price;
  document.getElementById('product-image').src = product.image;
  document.getElementById('product-image').alt = product.alt;

  // Add product-specific descriptions
  const descriptions = {
    1001: 'Een duurzame katoenen totebag met het Egelhulp logo. Perfect voor boodschappen en draagt bij aan de bescherming van egels.',
    1002: 'Een schattige verjaardagskaart met een egel erop. Ideaal om iemand een glimlach te bezorgen en tegelijkertijd egels te helpen.',
    1003: 'Een handgemaakte vilten egelhanger. Leuk als decoratie en steunt het werk van Egelhulp.',
    1004: 'Inheemse bloemzaden die egels aantrekken en helpen. Creëer een egelvriendelijke tuin!'
  };

  const descriptionElement = document.getElementById('product-description');
  if (descriptions[product.id]) {
    descriptionElement.textContent = descriptions[product.id];
  }
}

// Stripe Payment Links for each product (test mode)
const paymentLinks = {
  1001: 'https://buy.stripe.com/test_cNicN51YPdGHdJ6bbI0Ba00', // Egelhulp Totebag
  1002: 'https://buy.stripe.com/test_fZu5kD32T46734s5Ro0Ba03', // Verjaardagskaart
  1003: 'https://buy.stripe.com/test_dRm4gz6f56ef48wenU0Ba02', // Egelhanger
  1004: 'https://buy.stripe.com/test_00w6oHeLBbyz34sfrY0Ba01', // Inheemse Bloemzaden
};

// Add to cart - redirects to Stripe Checkout
document.addEventListener('DOMContentLoaded', function() {
  renderProductDetail();

  const addToCartBtn = document.querySelector('.add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
      const productId = getProductIdFromURL();
      const paymentLink = paymentLinks[productId];
      
      if (paymentLink) {
        // Redirect to Stripe Checkout
        window.location.href = paymentLink;
      } else {
        alert('Dit product is nog niet beschikbaar voor aankoop. Probeer het later opnieuw.');
      }
    });
  }
});

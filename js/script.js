
// ========================================
// Egelhulp Data & Smart Sticky Logic
// ========================================

const products = [
  {
    id: 1001,
    name: "Logo Totebag",
    price: "14,85",
    image: "images/egelhulp-logo-tote.png",
    description: ['100% Katoen', 'Duurzaam', 'Egelhulp logo'],
    alt: "Egelhulp Logo Tote Bag",
  },
  {
    id: 1002,
    name: "Verjaardagskaart",
    price: "3,85",
    image: "images/hedgehog-birthday-card.png",
    description: ['Handgetekend', 'Inclusief envelop', 'FSC Papier'],
    alt: "Hedgehog Birthday Card",
  },
  {
    id: 1003,
    name: "Egelhanger",
    price: "8,85",
    image: "images/hedgehog-felt-hanger.png",
    description: ['Handgemaakt vilt', 'Fair trade', 'Decoratief'],
    alt: "Hedgehog Felt Hanger",
  },
  {
    id: 1004,
    name: "Bloemzaden",
    price: "12,85",
    image: "images/native-flower-seeds.png",
    description: ['Inheemse mix', 'Trekt insecten', 'Egelvriendelijk'],
    alt: "Native Flower Seeds",
  },
  {
    id: 1005,
    name: "Egel Totebag",
    price: "16,85",
    image: "images/egelhulp-egel-tote.png",
    description: ['Stevig katoen', 'Unieke print', 'Ruim vak'],
    alt: "Egelhulp Egel Tote Bag",
  },
  {
    id: 1006,
    name: "Egelbrokjes 1kg",
    price: "9,85",
    image: "images/egelhulp-egelbrokjes.png",
    description: ['Rijk aan eiwit', 'Natuurlijke ingrediënten', 'Voor tuinegels'],
    alt: "Egelbrokjes Egelvoer",
  },
  {
    id: 1007,
    name: "Egelkalender 2026",
    price: "11,85",
    image: "images/egelhulp-egelkalender.png",
    description: ['12 Egel foto\'s', 'Ruime notitie', 'A4 formaat'],
    alt: "Egelhulp Egelkalender",
  },
  {
    id: 1008,
    name: "De Egelsteen",
    price: "7,85",
    image: "images/egelhulp-egelsteen-kinderboekje.png",
    description: ['Hardcover', 'Voor 4-8 jaar', 'Educatief verhaal'],
    alt: "Het Egelsteen Kinderboekje",
  },
];

const grid = document.querySelector('.product-grid');
// If grid is null (on wrong page), we exit gracefully
if (grid) {

  let expandedCard = null;
  let isAnimating = false;

  // Stripe Payment Links for each product (test mode) - Integrated from product.js
  const paymentLinks = {
    1001: 'https://buy.stripe.com/test_cNicN51YPdGHdJ6bbI0Ba00', 
    1002: 'https://buy.stripe.com/test_fZu5kD32T46734s5Ro0Ba03', 
    1003: 'https://buy.stripe.com/test_dRm4gz6f56ef48wenU0Ba02', 
    1004: 'https://buy.stripe.com/test_00w6oHeLBbyz34sfrY0Ba01', 
  };

  function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product.id;

    // Generate bullets HTML
    const specsHtml = product.description.map(spec => `<li>${spec}</li>`).join('');

    card.innerHTML = `
      <button class="close-btn" aria-label="Sluiten">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="1" y1="1" x2="13" y2="13"></line>
            <line x1="13" y1="1" x2="1" y2="13"></line>
        </svg>
      </button>
      <div class="card-content">
        <div class="product-image">
          <img src="${product.image}" alt="${product.alt || product.name}">
        </div>
        <div class="card-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">€${product.price}</p>
          <div class="product-details">
            <ul class="product-specs">
              ${specsHtml}
            </ul>
            <div class="product-actions">
              <button class="btn btn-primary buy-btn" aria-label="Bestel dit product">
                Bestel
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Click Handlers
    card.addEventListener('click', (e) => {
      // 1. Close button
      if (e.target.closest('.close-btn')) {
        collapseCard(card);
        e.stopPropagation();
        return;
      }
      // 2. Buy button
      if (e.target.closest('.buy-btn')) {
        const link = paymentLinks[product.id];
        if (link) {
          window.location.href = link;
        } else {
          alert("Binnenkort beschikbaar!");
        }
        e.stopPropagation();
        return;
      }
      
      // 3. Card toggle
      // If expanding, do toggle
      toggleCard(card);
    });

    return card;
  }

  // --- LOGIC FUNCTIONS (Ported from prototype) ---

  function getColumnCount() {
    const gridStyle = window.getComputedStyle(grid);
    const columns = gridStyle.gridTemplateColumns.split(' ').length;
    return columns;
  }

  function getGridPos(card) {
    return {
      row: parseInt(card.style.gridRowStart) || 0,
      col: parseInt(card.style.gridColumnStart) || 0
    };
  }

  function getCardAt(row, col) {
    const cards = Array.from(grid.querySelectorAll('.product-card'));
    return cards.find(c => {
      if (c.classList.contains('expanded')) return false;
      const pos = getGridPos(c);
      return pos.row === row && pos.col === col;
    });
  }

  function setCardPosition(card, row, col) {
    card.style.gridRowStart = row;
    card.style.gridRowEnd = row + 1;
    card.style.gridColumnStart = col;
    card.style.gridColumnEnd = col + 1;
  }

  function animateCards(oldPositions, onComplete) {
    const cards = Array.from(grid.querySelectorAll('.product-card'));
    const nextSection = document.getElementById('over-ons');
    
    // Capture new positions
    let animatingCount = 0;

    // Helper to animate an element (card or section)
    const animateElement = (el, oldRect, newRect) => {
        if (!oldRect || !newRect) return;
        const deltaX = oldRect.left - newRect.left;
        const deltaY = oldRect.top - newRect.top;

        if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
            animatingCount++;
            el.style.transition = 'none';
            el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            
            // For cards, we add the class. For sections, just transform.
            if (el.classList.contains('product-card')) {
                el.classList.add('animating');
            }

            el.offsetHeight; // Force reflow

            requestAnimationFrame(() => {
                el.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                el.style.transform = '';

                el.addEventListener('transitionend', function handler() {
                    if (el.classList.contains('product-card')) {
                        el.classList.remove('animating');
                    }
                    el.style.transition = '';
                    el.removeEventListener('transitionend', handler);
                    animatingCount--;
                    if (animatingCount === 0 && onComplete) {
                        onComplete();
                    }
                });
            });
        }
    };

    // 1. Animate Cards
    cards.forEach(card => {
      const oldPos = oldPositions.get(card);
      const newRect = card.getBoundingClientRect();
      animateElement(card, oldPos, newRect);
    });

    // 2. Animate Layout Shift (Over Ons)
    if (nextSection) {
        const oldPos = oldPositions.get(nextSection);
        const newRect = nextSection.getBoundingClientRect();
        animateElement(nextSection, oldPos, newRect);
    }
    
    // Safety check if nothing animated
    if (animatingCount === 0 && onComplete) {
      onComplete();
    }
  }

  function getCardPositions() {
    const cards = Array.from(grid.querySelectorAll('.product-card'));
    const positions = new Map();
    
    // Track cards
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      positions.set(card, { left: rect.left, top: rect.top, width: rect.width, height: rect.height });
    });
    
    // Track next section for layout smoothing
    const nextSection = document.getElementById('over-ons');
    if (nextSection) {
        const rect = nextSection.getBoundingClientRect();
        positions.set(nextSection, { left: rect.left, top: rect.top });
    }
    
    return positions;
  }

  // --- SMART POSITIONING LOGIC ---

  function optimizeBottomRow(avoidCol = -1, expandingCard = null) {
    const cols = getColumnCount();
    const cards = Array.from(grid.querySelectorAll('.product-card'));
    
    // Identify bottom cards (Row 2+) not currently expanding
    const bottomCards = cards.filter(c => {
      if (c === expandingCard) return false;
      const pos = getGridPos(c);
      return pos.row >= 2 && !c.classList.contains('expanded');
    });

    if (bottomCards.length === 0) return;

    // Sort by visual order (col)
    bottomCards.sort((a, b) => getGridPos(a).col - getGridPos(b).col);

    // Identify available slots in Row 2
    const availableCols = [];
    for (let i = 1; i <= cols; i++) {
      if (i !== avoidCol) availableCols.push(i);
    }

    // Find best fit (Least Displacement)
    let minDistance = Infinity;
    let bestAssignment = [];
    let currentAssignment = [];

    function search(cardIdx, slotIdx, currentDist) {
      if (currentDist >= minDistance) return;

      if (cardIdx === bottomCards.length) {
        minDistance = currentDist;
        bestAssignment = [...currentAssignment];
        return;
      }

      const remainingCards = bottomCards.length - 1 - cardIdx;
      const maxSlotIdx = availableCols.length - 1 - remainingCards;

      for (let i = slotIdx; i <= maxSlotIdx; i++) {
        const slot = availableCols[i];
        const dist = Math.abs(slot - getGridPos(bottomCards[cardIdx]).col);
        
        currentAssignment.push(slot);
        search(cardIdx + 1, i + 1, currentDist + dist);
        currentAssignment.pop();
      }
    }

    search(0, 0, 0);

    // Apply
    if (bestAssignment.length === bottomCards.length) {
      bottomCards.forEach((c, idx) => {
        setCardPosition(c, 2, bestAssignment[idx]);
      });
    }
  }

  function moveCardsForExpand(card) {
    const pos = getGridPos(card);
    if (pos.row === 1) {
      optimizeBottomRow(pos.col, card);
    }
  }

  function finalizeExpand(card) {
    const pos = getGridPos(card);
    card.classList.add('expanded');

    const cols = getColumnCount();
    const isMobile = cols === 2;

    if (isMobile) {
      card.style.gridRowStart = pos.row;
      card.style.gridRowEnd = pos.row + 1;
      card.style.gridColumnStart = 1;
      card.style.gridColumnEnd = 3;
    } else {
      card.style.gridRowStart = pos.row;
      card.style.gridRowEnd = pos.row + 2;
      card.style.gridColumnStart = pos.col;
      card.style.gridColumnEnd = pos.col + 1;
    }

    expandedCard = card;
  }

  function collapseCard(card, nextCard, onComplete) {
    const oldPositions = getCardPositions();

    card.classList.remove('expanded', 'expand-up');

    const pos = getGridPos(card);
    card.style.gridRowEnd = pos.row + 1;

    let avoidCol = -1;
    if (nextCard) {
      const nextPos = getGridPos(nextCard);
      if (nextPos.row === 1) {
        avoidCol = nextPos.col;
      }
    }
    
    optimizeBottomRow(avoidCol, nextCard);

    if (expandedCard === card) {
      expandedCard = null;
    }

    animateCards(oldPositions, onComplete);
  }

  function toggleCard(card) {
    if (isAnimating) return;
    
    if (card.classList.contains('expanded')) {
      isAnimating = true;
      collapseCard(card, null, () => {
        isAnimating = false;
      });
    } else if (expandedCard && expandedCard !== card) {
      isAnimating = true;
      const cardToExpand = card;
      
      collapseCard(expandedCard, cardToExpand, () => {
        const oldPositions = getCardPositions();
        finalizeExpand(cardToExpand);
        animateCards(oldPositions, () => {
          isAnimating = false;
        });
      });
    } else {
      isAnimating = true;
      const oldPositions = getCardPositions();
      moveCardsForExpand(card);
      
      animateCards(oldPositions, () => {
        const oldPositions2 = getCardPositions();
        finalizeExpand(card);
        animateCards(oldPositions2, () => {
          isAnimating = false;
        });
      });
    }
  }

  function positionAllCards() {
    const cards = Array.from(grid.querySelectorAll('.product-card'));
    const cols = getColumnCount();

    cards.forEach((card, index) => {
      const row = Math.floor(index / cols) + 1;
      const col = (index % cols) + 1;

      if (!card.classList.contains('expanded')) {
        setCardPosition(card, row, col);
      }
    });
  }

  // --- INITIALIZATION ---

  // Render cards
  products.forEach(product => {
    grid.appendChild(createProductCard(product));
  });

  // Initial layout
  positionAllCards();

  // Resize handler
  window.addEventListener('resize', () => {
    positionAllCards();
    if (expandedCard) {
       const card = expandedCard;
       collapseCard(card);
       // Optional: re-expand? Or just collapse to safe state.
       // Re-expanding can be glitchy during resize, safer to just collapse.
    }
  });

  // Outside click handler
  document.addEventListener('click', (e) => {
    if (expandedCard && !e.target.closest('.product-card')) {
      collapseCard(expandedCard);
    }
  });

} // End Grid Check

// scripts/script.js

// Global variables
let products = []; // Will load from product.json
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
let wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || {};
const ACCENT_COLOR = '#4CAF50'; // Green theme

document.addEventListener('DOMContentLoaded', async () => {
    await loadProducts();
    renderProductsGrid();
    setupFilters();
    updateCartCount();
    updateWishlistCount();
    setupEventListeners();
});

// Load products from product.json
async function loadProducts() {
    try {
        const res = await fetch('data/product.json');
        products = await res.json();
    } catch (err) {
        console.error('Failed to load products.json', err);
    }
}

// Render products in shop page
function renderProductsGrid(filterCategory = 'All Plants') {
    const grid = document.querySelector('.products-grid');
    if (!grid) return;
    let filtered = products;

    if (filterCategory && filterCategory !== 'All Plants') {
        filtered = products.filter(p => p.category === filterCategory);
    }

    const html = filtered.map(p => `
        <div class="product-card" data-product-id="${p.id}">
            <div class="image-wrapper">
                ${p.discount ? `<div class="discount-badge">${p.discount}% OFF</div>` : ''}
                <img src="${p.imageUrl}" alt="${p.name}" class="product-image">
            </div>
            <div class="product-info">
                <h3 class="product-title">${p.name}</h3>
                <p class="product-description">${p.description}</p>
                <div class="product-price">$${p.price.toFixed(2)}${p.originalPrice && p.originalPrice !== p.price ? `<span class="original-price">$${p.originalPrice.toFixed(2)}</span>` : ''}</div>
                <div class="product-actions">
                    <button class="btn-primary btn-add-cart">Add to Cart</button>
                    <button class="btn-secondary btn-wishlist">❤️</button>
                </div>
            </div>
        </div>
    `).join('');

    grid.innerHTML = html;
}

// Setup filter buttons
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProductsGrid(btn.textContent);
        });
    });
}

// Event delegation for cart and wishlist buttons
function setupEventListeners() {
    document.addEventListener('click', e => {
        const card = e.target.closest('.product-card');
        if (!card) return;
        const productId = card.dataset.productId;
        const product = products.find(p => p.id === productId);
        if (!product) return;

        if (e.target.classList.contains('btn-add-cart')) {
            addToCart(product);
        }

        if (e.target.classList.contains('btn-wishlist')) {
            toggleWishlist(product);
        }
    });
}

// Cart functions
function addToCart(product) {
    if (cartItems[product.id]) {
        cartItems[product.id].quantity += 1;
    } else {
        cartItems[product.id] = { ...product, quantity: 1 };
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
    showNotification('Added to cart!');
}

// Wishlist functions
function toggleWishlist(product) {
    if (wishlistItems[product.id]) {
        delete wishlistItems[product.id];
        showNotification('Removed from wishlist');
    } else {
        wishlistItems[product.id] = { ...product };
        showNotification('Added to wishlist!');
    }
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    updateWishlistCount();
}

// Update badges
function updateCartCount() {
    const badge = document.getElementById('cart-badge');
    if (badge) badge.textContent = Object.values(cartItems).reduce((sum, item) => sum + item.quantity, 0);
}

function updateWishlistCount() {
    const badge = document.getElementById('wishlist-badge');
    if (badge) badge.textContent = Object.keys(wishlistItems).length;
}

// Simple notifications
function showNotification(message) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed; top: 20px; right: 20px; background: ${ACCENT_COLOR}; color: white;
        padding: 1rem 2rem; border-radius: 10px; z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notif.textContent = message;
    document.body.appendChild(notif);
    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);

    // Add keyframes if not already present
    if (!document.querySelector('#notif-styles')) {
        const style = document.createElement('style');
        style.id = 'notif-styles';
        style.textContent = `
            @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
        `;
        document.head.appendChild(style);
    }
}

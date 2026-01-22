// Get product ID from URL
function getProductId() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id')) || 1;
}

// Load product details
async function loadProductDetails() {
    try {
        const productId = getProductId();
        const response = await fetch('./data/product.json');
        const data = await response.json();
        
        // Find the product with the given ID
        const product = data.products.find(p => p.id === productId);
        
        if (!product) {
            document.body.innerHTML = '<div style="text-align:center; padding:50px;"><h1>Product not found</h1><a href="shop.html">Back to Shop</a></div>';
            return;
        }

        // Update page title
        document.title = `${product.name} - BloomLeaf`;

        // Update product images
        document.getElementById('mainImage').src = product.image;
        document.getElementById('mainImage').alt = product.name;
        
        // Update thumbnails
        const thumbnailGallery = document.querySelector('.thumbnail-gallery');
        thumbnailGallery.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="thumbnail active" onclick="changeImage(this.src)">
            <img src="${product.image}" alt="${product.name}" class="thumbnail" onclick="changeImage(this.src)">
            <img src="${product.image}" alt="${product.name}" class="thumbnail" onclick="changeImage(this.src)">
        `;

        // Update product info
        document.querySelector('.product-title').textContent = product.name;
        document.querySelector('.product-price').textContent = `$${product.currentPrice.toFixed(2)}`;
        
        // Create detailed description based on plant type
        const detailedDescription = getDetailedDescription(product);
        document.querySelector('.product-description').textContent = detailedDescription;

        // Update features based on product
        const features = getProductFeatures(product);
        const featuresList = document.querySelector('.product-features');
        featuresList.innerHTML = '';
        features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });

        // Store current product ID for cart/wishlist functions
        window.currentProductId = productId;
        window.currentProduct = product;

        // Update related products
        loadRelatedProducts(data.products, productId);

    } catch (error) {
        console.error('Error loading product details:', error);
    }
}

// Get detailed description based on product data
function getDetailedDescription(product) {
    const descriptions = {
        default: product.description + ` This ${product.category} plant is carefully selected and nurtured to ensure it arrives healthy and vibrant. Perfect for adding natural beauty and freshness to any space.`,
        indoor: product.description + ` This indoor plant thrives in household conditions and is perfect for desks, shelves, and living spaces. It helps purify the air while adding aesthetic appeal to your home.`,
        outdoor: product.description + ` This outdoor plant is bred for durability and vibrant growth in natural sunlight. Perfect for gardens, patios, and outdoor spaces throughout the growing season.`,
        succulents: product.description + ` These succulents are extremely low-maintenance and require minimal watering. Perfect for those who want the beauty of plants without constant care.`,
        flowering: product.description + ` This beautiful flowering plant produces stunning blooms that add color and fragrance to any space. Regular care ensures continuous blooms throughout the season.`,
        special: product.description + ` This special plant is a unique addition to any collection. It offers distinctive characteristics and makes an excellent statement piece for plant enthusiasts.`,
        herb: product.description + ` This aromatic herb is perfect for culinary use and adds freshness to your kitchen. Easy to maintain and provides practical benefits for cooking.`,
        accessories: product.description
    };
    return descriptions[product.category] || descriptions.default;
}

// Get product-specific features
function getProductFeatures(product) {
    const features = {
        'Monstera Deliciosa': [
            'Mature size: 6-8 feet tall indoors',
            'Light requirements: Bright, indirect light',
            'Watering: Every 1-2 weeks',
            'Pet friendly: No (toxic to pets)',
            'Air purifying: Yes',
            'Difficulty level: Easy'
        ],
        'Snake Plant': [
            'Mature size: 2-3 feet tall',
            'Light requirements: Low to bright, indirect light',
            'Watering: Every 2-3 weeks',
            'Pet friendly: No (mildly toxic)',
            'Air purifying: Yes',
            'Difficulty level: Very Easy'
        ],
        'Peace Lily': [
            'Mature size: 3-4 feet tall',
            'Light requirements: Low to moderate light',
            'Watering: Once a week',
            'Pet friendly: No (mildly toxic)',
            'Air purifying: Yes',
            'Difficulty level: Easy'
        ],
        'Spider Plant': [
            'Mature size: 2-3 feet tall and wide',
            'Light requirements: Bright, indirect light',
            'Watering: Once or twice weekly',
            'Pet friendly: Yes',
            'Air purifying: Yes',
            'Difficulty level: Very Easy'
        ]
    };

    // Return specific features if available, otherwise generate generic ones
    if (features[product.name]) {
        return features[product.name];
    }

    // Generate generic features based on category
    const genericFeatures = [];
    genericFeatures.push(`Price: $${product.currentPrice.toFixed(2)} (Save ${product.discount}%)`);
    genericFeatures.push(`Category: ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}`);
    genericFeatures.push('Light requirements: Depends on specific variety');
    genericFeatures.push('Watering: Follow specific plant care instructions');
    genericFeatures.push('Difficulty level: Varies');
    genericFeatures.push(`Stock: Available for immediate shipment`);

    return genericFeatures;
}

// Load related products
async function loadRelatedProducts(allProducts, currentId) {
    const relatedProductsContainer = document.querySelector('.products-grid');
    if (!relatedProductsContainer) return;

    relatedProductsContainer.innerHTML = '';

    // Get 3 random products that aren't the current one
    const related = allProducts
        .filter(p => p.id !== currentId)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    related.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.style.cursor = 'pointer';
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info-small">
                <h3 class="product-title-small">${product.name}</h3>
                <p class="product-price-small">$${product.currentPrice.toFixed(2)}</p>
            </div>
        `;
        
        productCard.onclick = function() {
            window.location.href = `product-details.html?id=${product.id}`;
        };
        
        relatedProductsContainer.appendChild(productCard);
    });
}

// Product image gallery functionality
function changeImage(src) {
    document.getElementById('mainImage').src = src;
    document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
    event.target.classList.add('active');
}

// Quantity selector functionality
function increaseQuantity() {
    const input = document.getElementById('quantity');
    if (parseInt(input.value) < 10) {
        input.value = parseInt(input.value) + 1;
    }
}

function decreaseQuantity() {
    const input = document.getElementById('quantity');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

// Add to cart functionality
function addToCart() {
    const quantity = parseInt(document.getElementById('quantity').value);
    const productId = window.currentProductId;
    const productName = window.currentProduct.name;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id: productId, quantity: quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Added ${quantity} ${productName}(s) to cart!`);
}

// Add to wishlist functionality
function addToWishlist() {
    const productId = window.currentProductId;
    const productName = window.currentProduct.name;
    
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert(`Added ${productName} to wishlist!`);
    } else {
        alert(`${productName} is already in your wishlist!`);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function () {
    loadProductDetails();
});

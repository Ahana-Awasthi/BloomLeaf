 async function loadProducts() {
      try {
        const response = await fetch('../data/product.json');
        const data = await response.json();
        const products = data.products;
        const container = document.getElementById('product-list');
        container.innerHTML = '';

        products.forEach(product => {
          const card = document.createElement('div');
          card.classList.add('product-card');

          card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>
              <span class="price">$${product.currentPrice.toFixed(2)}</span>
              <span class="old-price">$${product.originalPrice.toFixed(2)}</span>
            </p>
            <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
            <button class="btn" onclick="addToWishlist(${product.id})">Wishlist</button>
          `;
          container.appendChild(card);
        });
      } catch (error) {
        console.error('Error loading products:', error);
      }
    }

    function addToCart(id) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (!cart.includes(id)) cart.push(id);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Added to cart!');
    }

    function addToWishlist(id) {
      let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      if (!wishlist.includes(id)) wishlist.push(id);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      alert('Added to wishlist!');
    }

    loadProducts();
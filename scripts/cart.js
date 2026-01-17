// Update quantity
function updateQuantity(itemId, change) {
    const quantity = document.getElementById(`quantity-${itemId}`);
    let currentQty = parseInt(quantity.textContent);
    
    if (currentQty + change < 1) {
        return;
    }
    
    currentQty += change;
    quantity.textContent = currentQty;
    
    // Update the item total
    updateItemTotal(itemId);
}

// Update item total
function updateItemTotal(itemId) {
    const cartItem = document.querySelector(`[data-item-id="${itemId}"]`);
    const quantityElement = cartItem.querySelector('.quantity');
    const priceText = cartItem.querySelector('.item-price').textContent;
    const price = parseFloat(priceText.replace('$', ''));
    const quantity = parseInt(quantityElement.textContent);
    
    const itemTotal = (price * quantity).toFixed(2);
    cartItem.querySelector('.item-total').textContent = `$${itemTotal}`;
    
    updateCartTotal();
}

// Update cart total
function updateCartTotal() {
    const allTotals = document.querySelectorAll('.item-total');
    let subtotal = 0;
    
    allTotals.forEach(element => {
        const price = parseFloat(element.textContent.replace('$', ''));
        subtotal += price;
    });
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    
    const shipping = 9.99;
    const total = (subtotal + shipping).toFixed(2);
    document.getElementById('total').textContent = `$${total}`;
}

// Remove item
function removeItem(itemId) {
    const cartItem = document.querySelector(`[data-item-id="${itemId}"]`);
    cartItem.remove();
    
    updateCartTotal();
    
    const itemsContainer = document.querySelector('.cart-items');
    if (itemsContainer.children.length === 0) {
        itemsContainer.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Your cart is empty. <a href="shop.html">Continue shopping</a></p>';
    }
}

// Checkout
function proceedToCheckout() {
    alert('Proceeding to checkout');
}

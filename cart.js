document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
    updateTotal();
});

function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        updateTotal(); // Ensure total is updated when cart is empty
        return;
    }

    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
                <h2>${item.title}</h2>
                <p><strong>$${item.price}</strong></p>
            </div>
            <button onclick="removeFromCart('${item.id}', this)">Remove</button>
        `;
        cartContainer.appendChild(cartItemElement);
    });

    updateTotal(); // Update total after displaying items
}

function removeFromCart(itemId, button) {
    const cartItemElement = button.closest('.cart-item');
    cartItemElement.classList.add('rotate-out');
    setTimeout(() => {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems = cartItems.filter(item => item.id !== parseInt(itemId)); // Convert itemId to a number
        localStorage.setItem('cart', JSON.stringify(cartItems));
        cartItemElement.remove(); // Remove the item from the DOM
        updateTotal();
    }, 500); 
}

function updateTotal() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('total').textContent = total.toFixed(2);
}

function clearCart() {
    localStorage.removeItem('cart');
    displayCartItems();
}
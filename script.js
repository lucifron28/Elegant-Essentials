document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('products-page')) {
        prefetchProducts();
        setupFilters();
    }
});

function prefetchProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            localStorage.setItem('products', JSON.stringify(products));
            displayProducts(products);
        })
        .catch(error => console.error('Error prefetching products:', error));
}

function fetchProducts(category = '') {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const filteredProducts = category ? products.filter(product => product.category === category) : products;
    displayProducts(filteredProducts);
}

function displayProducts(products) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}" onclick="showModal(${product.id})">
            <h2>${product.title}</h2>
            <p><strong>$${product.price}</strong></p>
        `;
        productsContainer.appendChild(productElement);
    });
}

function setupFilters() {
    const categories = ['All', 'electronics', 'jewelery', "men's clothing", "women's clothing"];
    const nav = document.querySelector('nav');
    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.onclick = () => fetchProducts(category === 'All' ? '' : category);
        nav.appendChild(button);
    });
}

function showModal(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('product-modal');
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
        <span class="close" onclick="closeModal()">&times;</span>
        <img src="${product.image}" alt="${product.title}">
        <div class="modal-text">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p><strong>$${product.price}</strong></p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `;
    modal.classList.add('show');
}

function closeModal() {
    const modal = document.getElementById('product-modal');
    modal.classList.remove('show');
}

function addToCart(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    closeModal();
}

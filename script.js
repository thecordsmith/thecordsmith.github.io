const products = [
    { id: 1, name: 'Keychain 1', price: 10.00, image: 'https://via.placeholder.com/200', description: 'A durable, handwoven keychain with a rustic charm.' },
    { id: 2, name: 'Monkey Fist 1', price: 15.00, image: 'https://via.placeholder.com/200', description: 'A classic monkey fist knot, perfect as a decorative piece.' },
    { id: 3, name: 'Keychain 2', price: 12.00, image: 'https://via.placeholder.com/200', description: 'A sleek keychain with intricate cord patterns.' },
    { id: 4, name: 'Woven Bracelet', price: 18.00, image: 'https://via.placeholder.com/200', description: 'A stylish bracelet crafted with premium cords.' },
    { id: 5, name: 'Cord Necklace', price: 25.00, image: 'https://via.placeholder.com/200', description: 'An elegant necklace with a handwoven pendant.' }
];

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

document.addEventListener('DOMContentLoaded', updateCartCount);

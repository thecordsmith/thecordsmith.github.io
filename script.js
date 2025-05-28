const products = [
    { id: 1, name: 'Keychain', price: 2.99, image: 'https://thekidshouldseethis.com/wp-content/uploads/2024/01/rattlesnake-knot-key-chain-000.jpeg', description: 'A durable, handwoven keychain with a rustic charm.' },
    { id: 2, name: 'Monkey Fist', price: 3.99, image: 'https://static.wixstatic.com/media/bf98e5_24a18a541ab6412b8e8de8d2f0348938~mv2.jpg/v1/fill/w_280,h_280,fp_0.48_0.41,q_90,enc_avif,quality_auto/bf98e5_24a18a541ab6412b8e8de8d2f0348938~mv2.jpg', description: 'A classic monkey fist knot, perfect as a decorative piece.' },
    { id: 3, name: 'Begleri', price: 2.99, image: 'https://paracordweavers.com/cdn/shop/articles/Screenshot_2024-06-16_141257.png?v=1718650951&width=616', description: 'A sleek keychain with intricate cord patterns.' },
    { id: 4, name: 'Bracelet', price: 4.99, image: 'https://www.patreon.com/media-u/v3/52945265', description: 'A stylish bracelet crafted with premium cords.' },
    { id: 5, name: 'Lanyard', price: 5.99, image: 'https://i.ytimg.com/vi/QIDGapDjMU8/sddefault.jpg', description: 'An elegant necklace with a handwoven pendant.' }
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

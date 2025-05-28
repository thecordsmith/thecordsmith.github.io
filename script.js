const products = [
    { id: 1, name: 'Keychain', price: 2.99, image: 'https://thekidshouldseethis.com/wp-content/uploads/2024/01/rattlesnake-knot-key-chain-000.jpeg', description: 'A durable, handwoven keychain with a rustic charm.' },
    { id: 2, name: 'Monkey Fist', price: 3.99, image: 'https://static.wixstatic.com/media/bf98e5_24a18a541ab6412b8e8de8d2f0348938~mv2.jpg/v1/fill/w_280,h_280,fp_0.48_0.41,q_90,enc_avif,quality_auto/bf98e5_24a18a541ab6412b8e8de8d2f0348938~mv2.jpg', description: 'A classic monkey fist knot, perfect as a decorative piece.' },
    { id: 3, name: 'Begleri', price: 2.99, image: 'https://paracordweavers.com/cdn/shop/articles/Screenshot_2024-06-16_141257.png?v=1718650951&width=616', description: 'A sleek keychain with intricate cord patterns.' },
    { id: 4, name: 'Bracelet', price: 4.99, image: 'https://www.patreon.com/media-u/v3/52945265', description: 'A stylish bracelet crafted with premium cords.' },
    { id: 5, name: 'Lanyard', price: 5.99, image: 'https://i.ytimg.com/vi/QIDGapDjMU8/sddefault.jpg', description: 'An elegant necklace with a handwoven pendant.' }
];

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Populate featured products
    const grid = document.getElementById('featured-products');
    const loader = document.getElementById('loader');
    console.log('Products:', products);
    console.log('Grid element:', grid);

    if (grid) {
        try {
            const featuredProducts = products.slice(0, 5);
            featuredProducts.forEach((product, index) => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product', 'slide-in');
                productDiv.style.animationDelay = `${index * 0.2}s`;
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <h3>${product.name}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                    <a href="product.html?id=${product.id}" class="btn">View Details</a>
                `;
                grid.appendChild(productDiv);
            });
        } catch (error) {
            console.error('Error rendering products:', error);
        }
        // Hide loader after rendering
        if (loader) {
            loader.style.display = 'none';
        }
    } else {
        console.error('Featured products grid not found');
        if (loader) {
            loader.style.display = 'none';
        }
    }

    // Back to top button
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

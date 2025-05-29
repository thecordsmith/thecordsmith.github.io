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
    if (cartCount) cartCount.textContent = totalItems;
}

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: id, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    if (!cartItems || !totalPriceElement) return;

    cartItems.innerHTML = cart.length === 0 ? '<tr><td colspan="5">Your cart is empty.</td></tr>' : '';
    let total = 0;
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><span class="cart-icon">🛒</span> ${product.name}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <button class="qty-btn minus" data-id="${item.id}">-</button>
                    ${item.quantity}
                    <button class="qty-btn plus" data-id="${item.id}">+</button>
                </td>
                <td>$${(product.price * item.quantity).toFixed(2)}</td>
                <td><button class="remove-btn" data-id="${item.id}"><span class="trash-icon">🗑️</span> Remove</button></td>
            `;
            cartItems.appendChild(row);
            total += product.price * item.quantity;
        }
    });
    totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
}

function renderOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItems = document.getElementById('order-items');
    const orderTotal = document.getElementById('order-total');
    if (!orderItems || !orderTotal) return;

    orderItems.innerHTML = cart.length === 0 ? '<div>Your cart is empty.</div>' : '';
    let total = 0;
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `<span class="cart-icon">🛒</span> ${product.name} x ${item.quantity} - $${(product.price * item.quantity).toFixed(2)}`;
            orderItems.appendChild(itemDiv);
            total += product.price * item.quantity;
        }
    });
    orderTotal.textContent = `Total: $${total.toFixed(2)}`;
    return cart.map(item => {
        const product = products.find(p => p.id === item.id);
        return `${product.name} x ${item.quantity}`;
    }).join(', ');
}

function renderProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);
    if (product) {
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('product-image').src = product.image;
        document.getElementById('product-image').alt = product.name;
        document.getElementById('add-to-cart').dataset.id = product.id;
    } else {
        document.querySelector('.product-content').innerHTML = '<p>Product not found.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Populate featured products on index.html
    const grid = document.getElementById('featured-products');
    if (grid) {
        const featuredProducts = products.slice(0, 5);
        featuredProducts.forEach((product, index) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product', 'slide-in');
            productDiv.style.animationDelay = `${index * 0.2}s`;
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <a href="product.html?id=${product.id}" class="btn"><span class="view-icon">👀</span> View Details</a>
            `;
            grid.appendChild(productDiv);
        });
    }

    // Render product details on product.html
    if (document.getElementById('product-name')) {
        renderProductDetails();
    }

    // Handle add to cart on product.html
    const addToCartBtn = document.getElementById('add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            addToCart(id);
            const confirmation = document.getElementById('cart-confirmation');
            confirmation.style.display = 'block';
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        });
    }

    // Render cart on cart.html
    const cartItems = document.getElementById('cart-items');
    if (cartItems) {
        renderCart();
        cartItems.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id) || parseInt(e.target.parentElement.dataset.id);
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const item = cart.find(item => item.id === id);

            if (e.target.classList.contains('qty-btn') && item) {
                if (e.target.classList.contains('plus')) {
                    item.quantity += 1;
                } else if (e.target.classList.contains('minus')) {
                    if (item.quantity > 1) {
                        item.quantity -= 1;
                    } else {
                        removeFromCart(id);
                        renderCart();
                        return;
                    }
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
                updateCartCount();
            } else if (e.target.classList.contains('remove-btn') || e.target.classList.contains('trash-icon')) {
                removeFromCart(id);
                renderCart();
                updateCartCount();
            }
        });
    }

    // Render order summary on checkout.html
    if (document.getElementById('order-items')) {
        const orderDetails = renderOrderSummary();
        document.getElementById('order-details').value = orderDetails;
    }

    // Handle payment method toggle
    const paymentMethod = document.getElementById('payment-method');
    if (paymentMethod) {
        paymentMethod.addEventListener('change', (e) => {
            const creditCardDetails = document.getElementById('credit-card-details');
            const paypalDetails = document.getElementById('paypal-details');
            if (e.target.value === '7317f0a8-4b43-4f1b-b77e-3b4d5d4e3b6b') {
                creditCardDetails.style.display = 'block';
                paypalDetails.style.display = 'none';
            } else {
                creditCardDetails.style.display = 'none';
                paypalDetails.style.display = 'block';
            }
        });
    }

    // Handle checkout form submission
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const paymentMethod = document.getElementById('payment-method').value;
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Validate required fields and cart
            let isValid = true;
            let errorMessage = '';

            if (!name) {
                isValid = false;
                errorMessage = 'Please fill out the Full Name field.';
            } else if (!email) {
                isValid = false;
                errorMessage = 'Please fill out the Email field.';
            } else if (cart.length === 0) {
                isValid = false;
                errorMessage = 'Your cart is empty.';
            } else if (paymentMethod === '7317f0a8-4b43-4f1b-b77e-3b4d5d4e3b6b') {
                const cardNumber = document.getElementById('card-number').value;
                const cardExpiry = document.getElementById('card-expiry').value;
                const cardCvc = document.getElementById('card-cvc').value;
                if (!cardNumber || !cardExpiry || !cardCvc) {
                    isValid = false;
                    errorMessage = 'Please fill out all credit card details.';
                }
            } else if (paymentMethod === 'paypal') {
                const paypalEmail = document.getElementById('paypal-email').value;
                if (!paypalEmail) {
                    isValid = false;
                    errorMessage = 'Please fill out the PayPal Email field.';
                }
            }

            const confirmation = document.getElementById('delivery-confirmation');
            if (isValid) {
                fetch(checkoutForm.action, {
                    method: 'POST',
                    body: new FormData(checkoutForm),
                    headers: { 'Accept': 'application/json' }
                }).then(response => {
                    if (response.ok) {
                        // Hide checkout form and show confirmation
                        document.getElementById('checkout-section').style.display = 'none';
                        confirmation.style.display = 'flex';
                        localStorage.removeItem('cart');
                        updateCartCount();
                        renderOrderSummary();
                        checkoutForm.reset();
                        setTimeout(() => {
                            window.location.href = 'index.html';
                        }, 3000);
                    } else {
                        confirmation.innerHTML = '<h3>Error</h3><p>Something went wrong. Please try again.</p>';
                        confirmation.style.display = 'flex';
                    }
                }).catch(error => {
                    confirmation.innerHTML = '<h3>Error</h3><p>Network error occurred. Please try again.</p>';
                    confirmation.style.display = 'flex';
                });
            } else {
                confirmation.innerHTML = `<h3>Error</h3><p>${errorMessage}</p>`;
                confirmation.style.display = 'flex';
                setTimeout(() => {
                    confirmation.style.display = 'none';
                }, 3000);
            }
        });
    }

    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            if (name && email && message) {
                fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                }).then(response => {
                    if (response.ok) {
                        const confirmation = document.getElementById('contact-confirmation');
                        confirmation.style.display = 'block';
                        contactForm.reset();
                        setTimeout(() => {
                            confirmation.style.display = 'none';
                        }, 3000);
                    } else {
                        const confirmation = document.getElementById('contact-confirmation');
                        confirmation.innerHTML = '<h3>Error</h3><p>Something went wrong. Please try again.</p>';
                        confirmation.style.display = 'block';
                    }
                });
            } else {
                const confirmation = document.getElementById('contact-confirmation');
                confirmation.innerHTML = '<h3>Error</h3><p>Please fill out all fields.</p>';
                confirmation.style.display = 'block';
            }
        });
    }

    // Handle loader and back-to-top globally
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'none';
    });

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

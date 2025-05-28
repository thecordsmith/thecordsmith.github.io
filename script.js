const products = [
    { id: 1, name: 'Keychain', price: 2.99, image: 'https://thekidshouldseethis.com/wp-content/uploads/2024/01/rattlesnake-knot-key-chain-000.jpeg', description: 'A durable, handwoven keychain with a rustic charm.' },
    { id: 2, name: 'Monkey Fist', price: 3.99, image: 'https://static.wixstatic.com/media/bf98e5_24a18a541ab6412b8e8de8d2f0348938~mv2.jpg/v1/fill/w_280,h_280,fp_0.48_0.41,q_80,enc_auto/bf98e5_24a18a541ab6412b8e8de8d2f0348938~mv2.jpg', description: 'A classic monkey fist knot, perfect as a decorative piece.' }
    { id: 3, name: 'Begleri', price: 2.99, image: 'https://paracordweavers.com/cdn/shop/articles/Screenshot_2024-06-16_141257.png?v=1718650951&width=616', description: 'A sleek keychain with intricate cord patterns.' },
        { id: 4, name: 'Bracelet', price: 4.99, image: 'https://www.patreon.com/media-u/v3/52945265', description: 'A stylish bracelet crafted with premium cords.' },
        { id: 5, name: 'Lanyard', price: 5.99, image: 'https://i.ytimg.com/vi/QIDGapDjMU8/sddefault.jpg', description: 'An elegant necklace with a handwoven pendant.' }
];

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

function updateCartQuantity(productId, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, parseInt(quantity));
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCartItems();
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsDiv = document.getElementById('cart-items');
    const totalPriceDiv = document.getElementById('total-price');
    const orderItemsDiv = document.getElementById('order-items');
    const orderTotalDiv = document.getElementById('order-total');
    let total = 0;

    if (cartItemsDiv) {
        cartItemsDiv.innerHTML = '';
        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<tr><td colspan="5" class="fade-in">Your cart is empty.</td></tr>';
        } else {
            cart.forEach((item, index) => {
                const product = products.find(p => p.id === item.id);
                if (product) {
                    const itemTotal = product.price * item.quantity;
                    total += itemTotal;
                    const row = document.createElement('tr');
                    row.classList.add('slide-in');
                    row.style.animationDelay = `${index * 0.1}s`;
                    row.innerHTML = `
                        <td><img src="${product.image}" alt="${product.name}" width="60">${product.name}</td>
                        <td>$${product.price.toFixed(2)}</td>
                        <td><input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="updateCartQuantity(${product.id}, this.value)"></td>
                        <td>$${itemTotal.toFixed(2)}</td>
                        <td><button class="remove-btn" onclick="removeFromCart(${product.id})">Remove</button></td>
                    `;
                    cartItemsDiv.appendChild(row);
                }
            });
        }
        if (totalPriceDiv) {
            totalPriceDiv.textContent = `Total: $${total.toFixed(2)}`;
        }
    }

    if (orderItemsDiv && orderTotalDiv) {
        orderItemsDiv.innerHTML = '';
        if (cart.length === 0) {
            orderItemsDiv.innerHTML = '<p class="fade-in">Your cart is empty.</p>';
        } else {
            cart.forEach((item, index) => {
                const product = products.find(p => p.id === item.id);
                if (product) {
                    const itemTotal = product.price * item.quantity;
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('cart-item', 'slide-in');
                    itemDiv.style.animationDelay = `${index * 0.1}s`;
                    itemDiv.innerHTML = `
                        <img src="${product.image}" alt="${product.name}" width="60">
                        <span>${product.name} (x${item.quantity}) - $${itemTotal.toFixed(2)}</span>
                    `;
                    orderItemsDiv.appendChild(itemDiv);
                }
            });
            orderTotalDiv.textContent = `Total: $${total.toFixed(2)}`;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCartItems();
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            let total = 0;
            let orderDetails = 'Order Details:\n';
            cart.forEach(item => {
                const product = products.find(p => p.id === item.id);
                if (product) {
                    const itemTotal = product.price * item.quantity;
                    total += itemTotal;
                    orderDetails += `${product.name} (x${item.quantity}) - $${itemTotal.toFixed(2)}\n`;
                }
            });
            orderDetails += `\nTotal: $${total.toFixed(2)}`;
            document.getElementById('order-details').value = orderDetails;

            // Submit form to Formspree
            fetch(checkoutForm.action, {
                method: 'POST',
                body: new FormData(checkoutForm),
                headers: { 'Accept': 'application/json' }
            }).then(() => {
                const checkoutContainer = document.querySelector('.checkout');
                checkoutContainer.innerHTML = `
                    <div class="checkout-success">
                        <h2>Thank You for Your Order!</h2>
                        <p>Your order totaling $${total.toFixed(2)} has been placed successfully.</p>
                        <p>A confirmation email has been sent to your email address.</p>
                        <a href="index.html" class="btn">Shop More</a>
                    </div>
                `;
                localStorage.removeItem('cart');
                updateCartCount();
            });
        });
    }

    // Close modal on click outside
    const modal = document.getElementById('cart-modal');
    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});
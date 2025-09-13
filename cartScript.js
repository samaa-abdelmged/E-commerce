// Load cart items from localStorage and display them
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cart");
    container.innerHTML = ""; // Clear previous items

    cart.forEach((product, index) => {
        const item = document.createElement("div");
        item.className = "cart-item";

        // Set inner HTML for each cart item
        item.innerHTML = `
            <h3>${product.title}</h3>
            <div class="price">$${product.price.toFixed(2)}</div>
            <div class="quantity">
                <button class="btn blue minus" data-index="${index}">−</button>
                <span>${product.quantity}</span>
                <button class="btn blue plus" data-index="${index}">+</button>
            </div>
            <div class="price">$${(product.price * product.quantity).toFixed(2)}</div>
            <button class="btn red delete" data-index="${index}">Remove</button>
        `;

        container.appendChild(item);
    });

    updateTotal(); // Update total price after rendering cart
}

// Calculate and display the total price
function updateTotal() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
    document.getElementById("total").textContent = "Total: $" + total.toFixed(2);
}

// Event delegation for cart buttons: plus, minus, delete
document.addEventListener("click", function (e) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Increase quantity
    if (e.target.classList.contains("plus")) {
        let i = e.target.dataset.index;
        cart[i].quantity += 1;
    }

    // Decrease quantity (minimum 1)
    if (e.target.classList.contains("minus")) {
        let i = e.target.dataset.index;
        if (cart[i].quantity > 1) {
            cart[i].quantity -= 1;
        }
    }

    // Remove product from cart
    if (e.target.classList.contains("delete")) {
        let i = e.target.dataset.index;
        cart.splice(i, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart
    loadCart(); // Re-render cart items
});

// Checkout button: clears cart and shows confirmation
document.getElementById("checkout").addEventListener("click", () => {
    localStorage.clear(); // Clear all cart data
    alert("✅ Order confirmed! Total: " + document.getElementById("total").textContent);
});

// Initial load of cart on page load
loadCart();

// Fetch products from the API and display them
async function getProducts() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const products = await response.json();
        const container = document.getElementById("container");

        products.forEach(product => {
            // Create a card for each product
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <div class="price">$${product.price}</div>
                <div class="rating">⭐ ${product.rating.rate} (${product.rating.count} reviews)</div>
                <a href="cart.html" class="btn add-to-cart">Add to Cart</a>
            `;
            container.appendChild(card);

            // Add event listener to "Add to Cart" button
            const btn = card.querySelector(".add-to-cart");
            btn.addEventListener("click", function (e) {
                e.preventDefault();
                addToCart(product);
                window.location.href = "cart.html"; // Redirect to cart page
            });
        });

    } catch (error) {
        console.error("Error loading products:", error);
    }
}

// Function to add product to the cart
function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(p => p.id === product.id);

    if (existing) {
        existing.quantity += 1; // Increase quantity if product already exists
    } else {
        cart.push({ ...product, quantity: 1 }); // Add new product with quantity 1
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage
    alert(`${product.title} added to cart!`); // Notify user
}

// Call the function to load products
getProducts();

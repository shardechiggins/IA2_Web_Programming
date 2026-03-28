// Cart setup

// Get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Navigation
function goToShop() {
    window.location.href = "products.html";
}

// Add to cart
function addToCart(name, price) {
    let cart = getCart();

    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart(cart);

    alert(name + " added to cart!");
}

// Display cart
function displayCart() {
    let cart = getCart();
    let cartContainer = document.getElementById("cart-items");
    let total = 0;

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    cart.forEach(item => {
        let subtotal = item.price * item.quantity;
        total += subtotal;

        cartContainer.innerHTML += `
            <p>${item.name} - $${item.price} x ${item.quantity} = $${subtotal.toFixed(2)}</p>
        `;
    });

    let tax = total * 0.15;
    let finalTotal = total + tax;

    let totalElement = document.getElementById("total");

    if (totalElement) {
        totalElement.innerHTML = `
            Subtotal: $${total.toFixed(2)} <br>
            Tax (15%): $${tax.toFixed(2)} <br>
            Total: $${finalTotal.toFixed(2)}
        `;
    }
}

// Checkout total
function displayCheckoutTotal() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    let tax = total * 0.15;
    let finalTotal = total + tax;

    let el = document.getElementById("checkoutTotal");

    if (el) {
        el.innerHTML = `Total: $${finalTotal.toFixed(2)}`;
    }
}

// Clear cart
function clearCart() {
    localStorage.setItem("cart", JSON.stringify([]));
    alert("Cart cleared!");

    displayCart();            
    displayCheckoutTotal(); 
}
// Order confirmation
function confirmOrder() {
    alert("Order confirmed!");
    localStorage.removeItem("cart");
}

// Login validation
function validateLogin() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
        alert("All fields are required!");
        return false;
    }

    alert("Login successful!");
    return true;
}

// Registration
function validateRegister() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (name === "" || email === "" || password === "") {
        alert("All fields are required!");
        return false;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Invalid email format!");
        return false;
    }

    alert("Registration successful!");
    return true;
}

// Checkout
function validateCheckout() {
    let name = document.getElementById("custName").value.trim();
    let address = document.getElementById("address").value.trim();

    if (name === "" || address === "") {
        alert("Please fill in all checkout fields!");
        return false;
    }

    confirmOrder();
    return true;
}

// Event listener
document.addEventListener("DOMContentLoaded", function () {

    // Display cart if on cart page
    displayCart();

    // Display checkout total if on checkout page
    displayCheckoutTotal();

});

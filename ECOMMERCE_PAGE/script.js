let cart = [];

document.addEventListener('DOMContentLoaded', function() {
    loadCartFromStorage();
    updateCart();
    updateCartItemCount();
    calculateTotalCost(); 
    updateFavoritesPage();
});

function calculateTotalCost() {
    let totalCost = 0;
    for (const item of cart) {
        totalCost += item.price;
    }
    displayTotalCost(totalCost);
}

function displayTotalCost(totalCost) {
    const totalAmountElement = document.getElementById('totalAmount');
    totalAmountElement.textContent = 'R' + totalCost.toFixed(2);
}

function loadCartFromStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}

function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    saveCartToStorage();
    updateCartItemCount();
}


function updateCartItemCount() {
    const cartItemCountSpan = document.getElementById('cartItemCount');
    cartItemCountSpan.textContent = cart.length;

    // Store cart items in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

const video = document.getElementById("myVideo");
const soundIcon = document.getElementById("soundIcon");

function toggleSound() {
    if (video.muted) {
        video.muted = false;
        soundIcon.classList.remove("fa-volume-off");
        soundIcon.classList.add("fa-volume-up");
    } else {
        video.muted = true;
        soundIcon.classList.remove("fa-volume-up");
        soundIcon.classList.add("fa-volume-off");
    }
}





function removeFromCart(productName) {
    const index = cart.findIndex(item => item.name === productName);
    if (index !== -1) {
        cart.splice(index, 1);
        saveCartToStorage();
        updateCart();
        if (window.location.pathname.includes('checkout.html')) {
            calculateTotalCost(); // Recalculate total cost after item removal
        }
    }
}

function updateCart() {
    const cartElement = document.getElementById('cart');
    cartElement.innerHTML = '<h2>Shopping Cart</h2>';

    let total = 0;

    for (const item of cart) {
        total += item.price;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            <span>${item.name} - R${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartElement.appendChild(itemDiv);
    }
    
    cartElement.innerHTML += `<strong>Total: R${total.toFixed(2)}</strong>`;
}


function checkout() {
    const cardNumber = document.getElementById('cardNumber').value;
    const expiration = document.getElementById('expiration').value;
    const cvv = document.getElementById('cvv').value;

    if (cardNumber && expiration && cvv) {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add items before checking out.");
        } else {
            alert("Checkout successful. Thank you for shopping with us!");
            cart = []; // Clear cart after checkout
            saveCartToStorage();
            updateCart();   
            if (window.location.pathname.includes('checkout.html')) {
                calculateTotalCost(); // Recalculate total cost after checkout
            }
        }
    } else {
        alert("Please enter the card details before checking out!");
    }
}

function toggleFavorite(buttonId) {
    const favoriteButton = document.getElementById(`favoriteButton${buttonId}`);
    const favoriteIcon = favoriteButton.querySelector('i');

    if (favoriteButton.classList.contains('favoriteActive')) {
        // Remove active class and change color to white
        favoriteButton.classList.remove('favoriteActive');
        favoriteIcon.classList.remove('fa-heart');
        favoriteIcon.classList.add('far', 'fa-heart'); // Change to regular heart outline
    } else {
        // Add active class and change color to red
        favoriteButton.classList.add('favoriteActive');
        favoriteIcon.classList.remove('far', 'fa-heart'); // Change to solid heart
        favoriteIcon.classList.add('fas', 'fa-heart');
    }
}

// Function to update favorites page
function updateFavoritesPage() {
    const favoriteItems = getFavoriteItems();
    const favoriteContainer = document.getElementById('favoriteItems');

    // Clear previous content
    favoriteContainer.innerHTML = '';

    if (favoriteItems.length === 0) {
        favoriteContainer.innerHTML = '<p>No favorite items found.</p>';
    } else {
        // Display favorite items
        favoriteItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            itemDiv.innerHTML = `
                <span>${item.name} - R${item.price.toFixed(2)}</span>
                <button onclick="removeFromFavorites('${item.name}')">Remove</button>
            `;
            favoriteContainer.appendChild(itemDiv);
        });
    }
}

// Function to remove item from favorites
function removeFromFavorites(productName) {
    const index = cart.findIndex(item => item.name === productName);
    if (index !== -1) {
        cart[index].favorite = false; // Update favorite status
        saveCartToStorage();
        updateFavoritesPage(); // Update favorites page
    }
}






function goToAbout() {
    window.location.href = 'about.html';
}

function goToCart() {
    window.location.href = 'cart.html';
}

function goToCheckout() {
    window.location.href = 'checkout.html';
}

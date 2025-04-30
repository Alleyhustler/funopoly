// Initialize variables
let initialAmount = 86460650;
let currentBalance = initialAmount;
const incrementPerSecond = 10;
const receipt = {};

// Function to format currency amounts
function formatAmount(amount) {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

// Load initial amount and update display
function loadInitialAmount() {
    currentBalance = initialAmount;
    document.getElementById('amount').innerText = formatAmount(currentBalance);
}

// Update balance every second
function updateAmount() {
    currentBalance += incrementPerSecond;
    document.getElementById('amount').innerText = formatAmount(currentBalance);
}

// Buy item function
function buyItem(name, price) {
    const quantityElement = document.querySelector(`.item-quantity[data-item="${name}"]`);
    let quantity = parseInt(quantityElement.innerText);

    const totalPrice = price;

    if (currentBalance >= totalPrice) {
        currentBalance -= totalPrice;
        document.getElementById('amount').innerText = formatAmount(currentBalance);

        if (!receipt[name]) {
            receipt[name] = { quantity: 0, price: price };
        }
        receipt[name].quantity += 1;
        quantityElement.innerText = receipt[name].quantity;

        updateReceipt();
        updateItemButtons(name);
    } else {
        alert("Not enough money!");
    }
}

// Sell item function
function sellItem(name, price) {
    const quantityElement = document.querySelector(`.item-quantity[data-item="${name}"]`);
    let quantity = parseInt(quantityElement.innerText);

    if (receipt[name] && receipt[name].quantity > 0) {
        const totalPrice = price;
        currentBalance += totalPrice;
        document.getElementById('amount').innerText = formatAmount(currentBalance);
        receipt[name].quantity -= 1;
        quantityElement.innerText = receipt[name].quantity;

        if (receipt[name].quantity === 0) {
            delete receipt[name];
        }

        updateReceipt();
        updateItemButtons(name);
    } else {
        alert("Not enough items to sell!");
    }
}

// Update receipt display
function updateReceipt() {
    const receiptItems = document.getElementById('receipt-items');
    receiptItems.innerHTML = '';
    let total = 0;

    for (const item in receipt) {
        const itemTotal = receipt[item].quantity * receipt[item].price;
        total += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.innerText = `${item} x${receipt[item].quantity} $${itemTotal.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
        receiptItems.appendChild(itemElement);
    }

    document.getElementById('total').innerText = `Total: $${total.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

// Update button states
function updateItemButtons(name) {
    const itemElements = document.getElementsByClassName('item');

    for (let itemElement of itemElements) {
        const itemName = itemElement.querySelector('.item-name').innerText;
        if (itemName === name) {
            const sellButton = itemElement.querySelector('.sell-button');
            const quantityElement = itemElement.querySelector('.item-quantity');

            if (receipt[name] && receipt[name].quantity > 0) {
                sellButton.disabled = false;
                quantityElement.innerText = receipt[name].quantity;
            } else {
                sellButton.disabled = true;
                quantityElement.innerText = 0;
            }
        }
    }
}

// Popup functions
function openPopup() {
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Close popup when clicking outside
window.onclick = function(event) {
    const popup = document.getElementById('popup');
    if (event.target === popup) {
        popup.style.display = 'none';
    }
};

// Function to handle Matrix background effect
function setupMatrixBackground() {
    const canvas = document.getElementById("background");
    if (!canvas) return; // Skip if canvas doesn't exist
    
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const fontSize = 14;
    let columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(0);

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0F0";
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }

        requestAnimationFrame(draw);
    }

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = canvas.width / fontSize;
        drops.length = Math.floor(columns);
        drops.fill(0);
    });

    draw();
}

// Function to immediately show main content and hide preloader
function skipPreloader() {
    const preloader = document.getElementById('preloader');
    const mainSite = document.getElementById('main-site');
    
    if (preloader) {
        preloader.classList.add('hidden');
        preloader.style.display = 'none';
    }
    
    if (mainSite) {
        mainSite.classList.remove('hidden');
        mainSite.style.display = 'block';
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Skip the preloader and show main content immediately
    skipPreloader();
    
    // Initialize the website functionality
    loadInitialAmount();
    setInterval(updateAmount, 1000);
    
    // Setup Matrix background if it exists
    setupMatrixBackground();
});

// If the DOM is already loaded, run initialization immediately
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    skipPreloader();
    loadInitialAmount();
    setInterval(updateAmount, 1000);
    setupMatrixBackground();
}
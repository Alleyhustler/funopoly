let initialAmount = 86460650;
let currentBalance = initialAmount;
const incrementPerSecond = 10;
const receipt = {};

// Функция для загрузки начального баланса
function loadInitialAmount() {
    currentBalance = initialAmount;
    document.getElementById('amount').innerText = formatAmount(currentBalance);
}

function formatAmount(amount) {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function updateAmount() {
    currentBalance += incrementPerSecond;
    document.getElementById('amount').innerText = formatAmount(currentBalance);
}


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

// Functions for popup
function openPopup() {
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

window.onclick = function(event) {
    const popup = document.getElementById('popup');
    if (event.target === popup) {
        popup.style.display = 'none';
    }
}

loadInitialAmount();
setInterval(updateAmount, 1000);

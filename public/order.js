// NOT WORKING YET!!


// Load the pizzas from the same directory where the HTML file is located
fetch('/pizzas.json') // Updated to match the same directory
    .then(response => response.json())
    .then(data => {
        const pizzaSelect = document.getElementById('pizza');
        
        // Check if data is loaded properly
        if (data && Array.isArray(data)) {
            data.forEach(pizza => {
                let option = document.createElement('option');
                option.value = pizza.value;
                option.textContent = pizza.label;
                pizzaSelect.appendChild(option);
            });
        } else {
            console.error("Pizza data is not loaded properly.");
        }
    })
    .catch(error => console.error("Error loading pizzas:", error));

// Fixed shipping cost
const shippingCost = 5.00;

// Calculate total price dynamically
function calculateTotal() {
    const pizzaSelect = document.getElementById('pizza');
    const selectedPizzaValue = pizzaSelect.value;

    // Get pizza price
    fetch('/pizzas.json') // Updated to match the same directory
        .then(response => response.json())
        .then(data => {
            const pizza = data.find(pizza => pizza.value === selectedPizzaValue);
            let total = pizza ? pizza.price : 0;

            // Check for add-ons
            const addOns = document.querySelectorAll('input[name="add-ons"]:checked');
            addOns.forEach(addOn => {
                switch (addOn.value) {
                    case 'extra_cheese':
                        total += 2.00;
                        break;
                    case 'garlic_bread':
                        total += 1.50;
                        break;
                    case 'extra_pepper':
                        total += 1.00;
                        break;
                    case 'olives':
                        total += 1.50;
                        break;
                }
            });

            // Add shipping cost
            total += shippingCost;

            // Update total price
            document.getElementById('total-price').textContent = total.toFixed(2);
        })
        .catch(error => console.error("Error calculating total:", error));
}

// Update total price when the pizza or add-ons change
document.getElementById('pizza').addEventListener('change', calculateTotal);
document.querySelectorAll('input[name="add-ons"]').forEach(checkbox => {
    checkbox.addEventListener('change', calculateTotal);
});

// Place order function (just for demonstration)
document.getElementById('place-order').addEventListener('click', () => {
    const pizzaSelect = document.getElementById('pizza');
    const addressInput = document.getElementById('address');
    const selectedPizza = pizzaSelect.options[pizzaSelect.selectedIndex].text;
    const address = addressInput.value;
    const totalPrice = document.getElementById('total-price').textContent;

    if (!address) {
        alert('Please enter your delivery address.');
        return;
    }

    alert(`Order Placed!\nPizza: ${selectedPizza}\nDelivery Address: ${address}\nTotal Price: $${totalPrice}`);
});

// // Fetch pizza options and populate the dropdown
// fetch('/pizzas.json')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`Failed to fetch pizzas.json: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(data => {
//         const pizzaSelect = document.getElementById('pizza');

//         // Verify data structure
//         if (data && Array.isArray(data)) {
//             data.forEach(pizza => {
//                 const option = document.createElement('option');
//                 option.value = pizza.name; // Use pizza name as the value
//                 option.textContent = `${pizza.name} - $${pizza.price.toFixed(2)}`;
//                 pizzaSelect.appendChild(option);
//             });
//         } else {
//             console.error('Pizza data is invalid or not an array.');
//         }
//     })
//     .catch(error => {
//         console.error('Error loading pizzas:', error);
//         alert('Failed to load pizzas. Please try again later.');
//     });

// // Fixed shipping cost
// const shippingCost = 5.0;

// // Function to calculate the total price
// function calculateTotal() {
//     const pizzaSelect = document.getElementById('pizza');
//     const selectedPizzaName = pizzaSelect.value;

//     // Fetch pizza price
//     fetch('/pizzas.json')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`Failed to fetch pizzas.json: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(data => {
//             const pizza = data.find(p => p.name === selectedPizzaName); // Find selected pizza
//             let total = pizza ? pizza.price : 0;

//             // Add add-ons prices
//             const addOns = document.querySelectorAll('input[name="add-ons"]:checked');
//             addOns.forEach(addOn => {
//                 switch (addOn.value) {
//                     case 'extra_cheese':
//                         total += 2.0;
//                         break;
//                     case 'garlic_bread':
//                         total += 1.5;
//                         break;
//                     case 'extra_pepper':
//                         total += 1.0;
//                         break;
//                     case 'olives':
//                         total += 1.5;
//                         break;
//                     default:
//                         console.warn(`Unknown add-on: ${addOn.value}`);
//                 }
//             });

//             // Add shipping cost
//             total += shippingCost;

//             // Update the total price in the DOM
//             document.getElementById('total-price').textContent = `$${total.toFixed(2)}`;
//         })
//         .catch(error => {
//             console.error('Error calculating total:', error);
//         });
// }

// // Event listeners for dropdown and add-ons
// document.getElementById('pizza').addEventListener('change', calculateTotal);
// document.querySelectorAll('input[name="add-ons"]').forEach(checkbox => {
//     checkbox.addEventListener('change', calculateTotal);
// });

// // Place order function
// document.getElementById('place-order').addEventListener('click', () => {
//     const pizzaSelect = document.getElementById('pizza');
//     const addressInput = document.getElementById('address');
//     const selectedPizza = pizzaSelect.options[pizzaSelect.selectedIndex].text;
//     const address = addressInput.value;
//     const totalPrice = document.getElementById('total-price').textContent;

//     if (!address) {
//         alert('Please enter your delivery address.');
//         return;
//     }

//     alert(`Order Placed!\nPizza: ${selectedPizza}\nDelivery Address: ${address}\nTotal Price: ${totalPrice}`);
// });

// Fetch pizza options and populate the dropdown
fetch('/pizzas.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch pizzas.json: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const pizzaSelect = document.getElementById('pizza');

        // Verify data structure
        if (data && Array.isArray(data)) {
            data.forEach(pizza => {
                const option = document.createElement('option');
                option.value = pizza.value; // Use pizza value as the key
                option.textContent = `${pizza.label} - $${pizza.price.toFixed(2)}`;
                pizzaSelect.appendChild(option);
            });
        } else {
            console.error('Pizza data is invalid or not an array.');
        }
    })
    .catch(error => {
        console.error('Error loading pizzas:', error);
        alert('Failed to load pizzas. Please try again later.');
    });

// Fixed shipping cost
const shippingCost = 5.0;

// Function to calculate the total price
function calculateTotal() {
    const pizzaSelect = document.getElementById('pizza');
    const selectedPizzaValue = pizzaSelect.value;

    // Fetch pizza price
    fetch('/pizzas.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch pizzas.json: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const pizza = data.find(p => p.value === selectedPizzaValue); // Find selected pizza
            let total = pizza ? pizza.price : 0;

            // Add add-ons prices
            const addOns = document.querySelectorAll('input[name="add-ons"]:checked');
            addOns.forEach(addOn => {
                switch (addOn.value) {
                    case 'extra_cheese':
                        total += 2.0;
                        break;
                    case 'garlic_bread':
                        total += 1.5;
                        break;
                    case 'extra_pepper':
                        total += 1.0;
                        break;
                    case 'olives':
                        total += 1.5;
                        break;
                    default:
                        console.warn(`Unknown add-on: ${addOn.value}`);
                }
            });

            // Add shipping cost
            total += shippingCost;

            // Update the total price in the DOM
            document.getElementById('total-price').textContent = `$${total.toFixed(2)}`;
        })
        .catch(error => {
            console.error('Error calculating total:', error);
        });
}

// Event listeners for dropdown and add-ons
document.getElementById('pizza').addEventListener('change', calculateTotal);
document.querySelectorAll('input[name="add-ons"]').forEach(checkbox => {
    checkbox.addEventListener('change', calculateTotal);
});

// Place order function
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

    alert(`Order Placed!\nPizza: ${selectedPizza}\nDelivery Address: ${address}\nTotal Price: ${totalPrice}`);
});

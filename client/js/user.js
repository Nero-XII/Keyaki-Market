window.userId = null;
window.cartId = null;

function userSession() {
    fetch('http://localhost:3000/auth/user', {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('No user logged in');
            }
            return response.json();
        })
        .then(user => {
            document.getElementById('uname').textContent = user.name;
            userId = user.id;
            showHistory();
            showCart();
        })
        .catch(error => console.error('Error:', error));
}

function logOut() {
    if (!userId) {
        window.location.href = 'index.html';
    } else {
        const confirmLogout = confirm("Do you want to log out?");
        if (confirmLogout) {
            fetch('http://localhost:3000/auth/logout', {
                method: 'POST',
                credentials: 'include'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error trying to log out');
                    }
                    window.location.href = 'index.html';
                })
                .catch(error => console.error('Error:', error));
        }
    }
}

function showHistory() {
    const historyDiv = document.getElementById('history');
    historyDiv.innerHTML = '';

    fetch(`http://localhost:3000/orders/${userId}`)
        .then(response => {
            if (!response.ok) {
                if (response.status == 404) {
                    throw new Error('No orders found');
                }
                throw new Error('Failed to fetch order history');
            }
            return response.json();
        })
        .then(orders => {
            orders.forEach(order => {
                const orderDiv = document.createElement('div');
                orderDiv.classList.add('order');

                const date = new Date(order.date);
                const formattedDate = date.toLocaleDateString('en-GB');
                const formattedTime = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

                const dateTime = document.createElement('div');
                const dateElement = document.createElement('span');
                const timeElement = document.createElement('span');
                dateTime.classList.add('date-time');
                dateElement.classList.add('order-date');
                timeElement.classList.add('order-time');
                dateElement.textContent = formattedDate;
                timeElement.textContent = formattedTime;
                dateTime.appendChild(dateElement);
                dateTime.appendChild(timeElement);
                orderDiv.appendChild(dateTime);

                const productPromises = order.details.map(detail => {
                    return fetch(`http://localhost:3000/products/${detail.product_id}`)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error('Failed to fetch product');
                            }
                            return response.json();
                        })
                        .then((product) => {
                            const detailDiv = document.createElement('div');
                            detailDiv.classList.add('order-detail');

                            const productInfo = document.createElement('div');
                            productInfo.innerHTML = `
                                <span class="product-name">${product.name}</span>
                                <span class="product-desc">- ${product.description}</span>
                            `;

                            const qsline = document.createElement('div');
                            qsline.classList.add('qs-line');
                            qsline.innerHTML = `
                                <span class="quantity">x${detail.quantity}</span>
                                <span class="dots"></span>
                                <span class="subtotal">${product.price.toFixed(2)} €</span>
                                <span class="dots"></span>
                                <span class="subtotal">${detail.subtotal.toFixed(2)} €</span>
                                `;

                            detailDiv.appendChild(productInfo);
                            detailDiv.appendChild(qsline);

                            return detailDiv;
                        })
                        .catch((error) => {
                            console.error("Error fetching product:", error);
                        });
                });

                Promise.all(productPromises)
                    .then(productDetails => {
                        productDetails.forEach(detailDiv => {
                            if (detailDiv) {
                                orderDiv.appendChild(detailDiv);
                            }
                        });

                        const totalDiv = document.createElement('div');
                        totalDiv.classList.add('order-total');
                        totalDiv.innerHTML = `
                            <span class="total-final">Total</span>
                            <span class="total-final">${order.total.toFixed(2)} €</span>
                        `;

                        orderDiv.appendChild(totalDiv);
                        historyDiv.appendChild(orderDiv);

                        const hr = document.createElement('hr');
                        hr.classList.add('order-separator');
                        orderDiv.appendChild(hr);
                    })
                    .catch(error => {
                        console.error("Error fetching product details:", error);
                    });
            });
        })
        .catch(error => {
            console.error('Error:', error);
            const historyDiv = document.getElementById('history');
            historyDiv.innerHTML = `<p class="text-danger">${error.message}</p>`;
        });
}

function showCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';

    fetch(`http://localhost:3000/orders/cart/${userId}`)
        .then(response => {
            if (!response.ok) {
                if (response.status == 404) {
                    throw new Error('Cart is empty');
                }
                throw new Error('Failed to fetch cart');
            }
            return response.json();
        })
        .then(order => {
            order = order[0];
            cartId = order._id;

            const productPromises = order.details.map(detail => {
                return fetch(`http://localhost:3000/products/${detail.product_id}`)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Failed to fetch product');
                        }
                        return response.json();
                    })
                    .then((product) => {
                        const detailDiv = document.createElement('div');
                        detailDiv.classList.add('cart-detail');

                        const productInfo = document.createElement('div');
                        productInfo.classList.add('cart-detail')
                        productInfo.innerHTML = `
                            <img src="http://localhost:3000/${product.img}" class="cart-det-img" alt="${product.name}">
                            <div class="infoProd">
                                <span class="product-name">${product.name}</span>
                                <span class="product-desc">${product.description}</span>
                            </div>
                        `;

                        const prodGest = document.createElement('div');
                        prodGest.classList.add('prod-gest');

                        const minMax = document.createElement('div');
                        minMax.classList.add('min-max');
                        minMax.innerHTML = `
                            <button class="btn sub-add" data-action="subtract" data-product-id="${product._id}" data-product-price="${product.price}">&nbsp;&nbsp;-&nbsp;&nbsp;</button>
                            <span class="d-quant">&nbsp;&nbsp;${detail.quantity}&nbsp;&nbsp;</span>
                            <button class="btn sub-add" data-action="add" data-product-id="${product._id}" data-product-price="${product.price}">&nbsp;&nbsp;+&nbsp;&nbsp;</button>
                        `;

                        const subTot = document.createElement('span');
                        subTot.classList.add('subtotal-r');
                        subTot.innerHTML = `${product.price.toFixed(2)} €`;

                        prodGest.appendChild(minMax);
                        prodGest.appendChild(subTot);
                        detailDiv.appendChild(productInfo);
                        detailDiv.appendChild(prodGest);

                        return detailDiv;
                    })
                    .catch((error) => {
                        console.error("Error fetching product:", error);
                    });
            });

            Promise.all(productPromises)
                .then(productDetails => {
                    productDetails.forEach(detailDiv => {
                        if (detailDiv) {
                            cartDiv.appendChild(detailDiv);
                        }
                    });

                    const totalDiv = document.createElement('div');
                    totalDiv.classList.add('order-total');
                    totalDiv.innerHTML = `
                        <span class="total-final">Total</span>
                        <span class="total-final">${order.total.toFixed(2)} €</span>
                    `;

                    cartDiv.appendChild(totalDiv);

                    const hr = document.createElement('hr');
                    hr.classList.add('order-separator');
                    cartDiv.appendChild(hr);

                    const checkout = document.createElement('div');
                    checkout.classList.add('btn', 'checkout');
                    checkout.id = 'checkout';
                    checkout.textContent = "Checkout";
                    cartDiv.appendChild(checkout);
                })
                .catch(error => {
                    console.error("Error fetching product details:", error);
                });
        })
        .catch(error => {
            console.error('Error:', error);
            const cartDiv = document.getElementById('cart');
            cartDiv.innerHTML = `<p class="text-danger">${error.message}</p>`;
        });
}
window.showCart = showCart;

function checkout() {
    const confirmCheckout = confirm("Proceed to checkout?");
    if (confirmCheckout) {
        fetch(`http://localhost:3000/orders/${cartId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to checkout');
                }
                cartId = null;
                showHistory();
                showCart();
            })
            .catch(error => console.error('Error:', error));
    }
}

function handleQuantityChange(event) {
    const button = event.target;
    const action = button.dataset.action;
    const productId = button.dataset.productId;
    const productPrice = parseFloat(button.dataset.productPrice);

    fetch(`http://localhost:3000/orders/details/${cartId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            product_id: productId,
            price: productPrice,
            action: action
        })
    })
        .then(response => {
            if (response.status === 201) {
                cartId = null;
            } else if (!response.ok) {
                throw new Error('Failed to update product quantity');
            }
            return response.json();
        })
        .then(() => {
            showCart();
        })
        .catch(error => {
            console.error('Error updating product quantity:', error);
        });
}

document.addEventListener('DOMContentLoaded', userSession());
document.getElementById('right-cont').addEventListener('click', logOut);
document.getElementById('cart').addEventListener('click', function (event) {
    if (event.target.classList.contains('checkout')) {
        checkout();
    }
});
document.getElementById('cart').addEventListener('click', function (event) {
    if (event.target.classList.contains('sub-add')) {
        handleQuantityChange(event);
    }
});
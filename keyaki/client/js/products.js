function createProductElement(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card', 'mb-4');

    const imgPath = `http://localhost:3000/${product.img}`;

    productCard.innerHTML = `
        <img src="${imgPath}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-desc">${product.description}</p>
            <p class="card-price"><strong>${product.price.toFixed(2)} €</strong>/ud</p>
            <button class="btn add-to-cart" data-product-id="${product._id}" data-product-price="${product.price}">Add to Cart</button>
        </div>
    `;
    return productCard;
}

function filterProducts(searchTerm, products) {
    return products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

function loadProducts() {
    const productsContainer = document.getElementById('products');
    fetch('http://localhost:3000/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            return response.json();
        })
        .then(products => {
            renderProducts(products);

            document.getElementById('search-bar').addEventListener('input', function (event) {
                const searchTerm = event.target.value;
                const filteredProducts = filterProducts(searchTerm, products);
                renderProducts(filteredProducts);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            productsContainer.innerHTML = `<p class="text-danger">Failed to load products. Please try again later.</p>`;
        });
}

function renderProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = createProductElement(product);
        productsContainer.appendChild(productElement);
    });
}

function addToCart(event) {
    if (window.userId) {
        const button = event.target;
        const productId = button.dataset.productId;
        const productPrice = parseFloat(button.dataset.productPrice);

        if (window.cartId === null) {
            fetch('http://localhost:3000/orders')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch orders');
                    }
                    return response.json();
                })
                .then(orders => {
                    const nextOrderId = orders.length + 1;

                    fetch('http://localhost:3000/orders', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            _id: nextOrderId.toString(),
                            customer_id: window.userId,
                            total: productPrice,
                            date: "",
                            status: "in_cart",
                            details: [
                                {
                                    product_id: productId,
                                    quantity: 1,
                                    subtotal: productPrice,
                                }
                            ]
                        })
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Error trying to create new order');
                            }
                            return response.json();
                        })
                        .then(order => {
                            window.cartId = order._id;
                            window.showCart();
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            fetch(`http://localhost:3000/orders/details/add/${window.cartId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product_id: productId,
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error adding product to cart');
                    }
                    fetch(`http://localhost:3000/orders/details/${window.cartId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            product_id: productId,
                            price: productPrice,
                            action: 'add'
                        })
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Error adding product details to cart');
                            }
                            window.showCart();
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }
}

document.addEventListener('DOMContentLoaded', loadProducts);
document.getElementById('products').addEventListener('click', function (event) {
    if (event.target.classList.contains('add-to-cart')) {
        addToCart(event);
    }
});

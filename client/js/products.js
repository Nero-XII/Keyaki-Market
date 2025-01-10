const productsContainer = document.getElementById('products');

function createProductElement(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card', 'mb-4');
    
    const imgPath = "https://prod-mercadona.imgix.net/images/0daf43fb5761b823ce83c985930c97c9.jpg?fit=crop&h=300&w=300";

    productCard.innerHTML = `
        <img src="${imgPath}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-desc">${product.description}</p>
            <p class="card-price"><strong>${product.price.toFixed(2)} €</strong>/ud</p>
            <button class="btn add-to-cart">Add to Cart</button>
        </div>
    `;
    return productCard;
}

function loadProducts() {
    fetch('http://localhost:3000/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            return response.json();
        })
        .then(products => {
            products.forEach(product => {
                const productElement = createProductElement(product);
                productsContainer.appendChild(productElement);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            productsContainer.innerHTML = `<p class="text-danger">Failed to load products. Please try again later.</p>`;
        });
}

document.addEventListener('DOMContentLoaded', loadProducts);

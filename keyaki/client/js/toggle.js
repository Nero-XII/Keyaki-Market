const toggleHist = document.getElementById('toggle-hist');
const toggleCart = document.getElementById('toggle-cart');
const oHistory = document.querySelector('.o-history');
const shopCart = document.querySelector('.shop-cart');

function toggleElement(element, direction) {
    if (direction === 'left') {
        if (element.style.left === '0px' || element.style.left === '') {
            element.style.left = '-320px'; 
        } else {
            element.style.left = '0'; 
        }
    } else if (direction === 'right') {
        if (element.style.right === '0px' || element.style.right === '') {
            element.style.right = '-320px'; 
        } else {
            element.style.right = '0'; 
        }
    }
}

toggleHist.addEventListener('click', () => {
    toggleElement(oHistory, 'left');
});

toggleCart.addEventListener('click', () => {
    toggleElement(shopCart, 'right');
});
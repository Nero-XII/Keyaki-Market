document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/customers')
        .then(response => response.json())
        .then(customers => {
            const customer = customers.find(c => c.name === username && c.password === password);
            if (customer) {
                window.location.href = 'market.html';
            } else {
                alert('Invalid credentials!');
            }
        })
        .catch(error => console.error('Error:', error));
});
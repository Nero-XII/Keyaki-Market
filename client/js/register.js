document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    fetch('http://localhost:3000/customers')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error trying to get customer');
            }
            return response.json();
        })
        .then(customers => {
            const customerExists = customers.some(c => c.name === username);

            if (customerExists) {
                alert('Username already exists. Please choose another one.');
            } else {
                const newCustomer = { _id: customers.length.toString(), name: username, password: password };

                fetch('http://localhost:3000/customers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newCustomer),
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error trying to create customer');
                        }
                        alert('Registration successful! Redirecting to login...');
                        window.location.href = 'login.html';
                    })
                    .catch(error => console.error('Error:', error));
            }
        })
        .catch(error => console.error('Error:', error));
});

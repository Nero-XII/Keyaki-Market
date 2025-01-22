document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
    })
        .then(response => {
            if (response.ok) {
                window.location.href = 'market.html';
            } else if (response.status == 401) {
                alert('Invalid credentials!');
            } else {
                throw new Error('Error during login')
            }
        })
        .catch(error => console.error('Error:', error));
});

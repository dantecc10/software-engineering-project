function createUser(name, email, password) {
    return fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, password_hash: password })
    }).then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw err; });
        }
        return response.json();
    });
}

document.getElementById('user-registration-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const passwordRepeat = document.getElementById('password-repeat').value;

    if (!name || !email || !password || !passwordRepeat) {
        alert("Todos los campos son obligatorios");
        return;
    }

    if (password !== passwordRepeat) {
        alert("Las contraseñas no coinciden");
        return;
    }

    createUser(name, email, password)
        .then(response => {
            alert('Usuario registrado con éxito');
            document.getElementById('user-registration-form').reset();
        })
        .catch(error => {
            let msg = 'Error al registrar usuario';
            if (error && error.message) msg += ': ' + error.message;
            alert(msg);
        });
});

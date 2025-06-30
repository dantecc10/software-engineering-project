function getCsrfToken() {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute('content') : '';
}

function createUser(name, email, password_hash) {
    return fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': getCsrfToken()
        },
        body: JSON.stringify({ name, email, password_hash })
    }).then(response => response.json());
}

document.getElementById('user-registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que recargue la página

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (password != document.getElementById('password-repeat').value) {
        alert("Las contraseñas no coinciden");
        return null;
    }

    createUser(name, email, password)
        .then(response => {
            console.log('Usuario creado:', response);
            alert('Usuario registrado con éxito');
        })
        .catch(error => {
            console.error('Error al crear usuario:', error);
            alert('Error al registrar usuario');
        });
});

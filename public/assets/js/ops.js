function createUser(name, email, password_hash) {
    return fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, password_hash })
    }).then(response => response.json());
}

function getHeaders() {
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-TOKEN': getCsrfToken()
    };
}

document.getElementById('user-registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que recargue la página

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordRepeat = document.getElementById('password-repeat').value;

    // Mostrar el objeto que se enviará
    console.log({
        name,
        email,
        password,
        password_repeat: passwordRepeat
    });

    if (password != passwordRepeat) {
        alert("Las contraseñas no coinciden");
        return null;
    }

    createUser(name, email, password)
        .then(response => {
            if (response && response.user_id) {
                alert('Usuario registrado con éxito');
                window.location.href = '/login';
            } else if (response && response.errors) {
                alert('Error: ' + JSON.stringify(response.errors));
            } else {
                alert('Error al registrar usuario');
            }
        })
        .catch(error => {
            console.error('Error al crear usuario:', error);
            alert('Error al registrar usuario');
        });
});

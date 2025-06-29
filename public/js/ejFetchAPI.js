// ===================== USER =====================
// Obtener todos los usuarios
function fetchUsers() {
    fetch('/api/users')
        .then(response => response.json())
        .then(data => {
            console.log('Usuarios:', data);
        })
        .catch(error => console.error('Error:', error));
}

// Crear un usuario nuevo
function createUser(name, email, password_hash) {
    fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, password_hash })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Usuario creado:', data);
    })
    .catch(error => console.error('Error:', error));
}

// ===================== CATEGORY =====================
// Obtener todas las categorías
function fetchCategories() {
    fetch('/api/categories')
        .then(response => response.json())
        .then(data => {
            console.log('Categorías:', data);
        })
        .catch(error => console.error('Error:', error));
}

// Crear una categoría nueva
function createCategory(category_name) {
    fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ category_name })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Categoría creada:', data);
    })
    .catch(error => console.error('Error:', error));
}

// ===================== FREQUENCY =====================
// Obtener todas las frecuencias
function fetchFrequencies() {
    fetch('/api/frequencies')
        .then(response => response.json())
        .then(data => {
            console.log('Frecuencias:', data);
        })
        .catch(error => console.error('Error:', error));
}

// Crear una frecuencia nueva
function createFrequency(frequency_name) {
    fetch('/api/frequencies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ frequency_name })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Frecuencia creada:', data);
    })
    .catch(error => console.error('Error:', error));
}

// ===================== INCOME =====================
// Obtener todos los ingresos
function fetchIncomes() {
    fetch('/api/incomes')
        .then(response => response.json())
        .then(data => {
            console.log('Ingresos:', data);
        })
        .catch(error => console.error('Error:', error));
}

// Crear un ingreso nuevo
function createIncome(user_id, date, type, amount) {
    fetch('/api/incomes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ user_id, date, type, amount })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Ingreso creado:', data);
    })
    .catch(error => console.error('Error:', error));
}

// ===================== EXPENSE =====================
// Obtener todos los gastos
function fetchExpenses() {
    fetch('/api/expenses')
        .then(response => response.json())
        .then(data => {
            console.log('Gastos:', data);
        })
        .catch(error => console.error('Error:', error));
}

// Crear un gasto nuevo
function createExpense(user_id, category_id, description, date, amount, frequency_id, next_date) {
    fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ user_id, category_id, description, date, amount, frequency_id, next_date })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Gasto creado:', data);
    })
    .catch(error => console.error('Error:', error));
}

// ===================== ALERT =====================
// Obtener todas las alertas
function fetchAlerts() {
    fetch('/api/alerts')
        .then(response => response.json())
        .then(data => {
            console.log('Alertas:', data);
        })
        .catch(error => console.error('Error:', error));
}

// Crear una alerta nueva
function createAlert(user_id, message, scheduled_date, active) {
    fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ user_id, message, scheduled_date, active })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Alerta creada:', data);
    })
    .catch(error => console.error('Error:', error));
}

// ===================== NOTAS =====================
// Para actualizar, obtener por ID o eliminar, puedes agregar funciones similares usando los endpoints REST de cada controlador.
// Ejemplo para obtener por ID:
// fetch('/api/users/1').then(...)
// Ejemplo para actualizar:
// fetch('/api/users/1', { method: 'PUT', ... })
// Ejemplo para eliminar:
// fetch('/api/users/1', { method: 'DELETE' })

// ===================== USO DE FUNCIONES =====================
// Descomenta para probar cada función según la tabla que quieras consultar o modificar:

// fetchUsers();
// createUser('Juan', 'juan@ejemplo.com', 'hash123');

// fetchCategories();
// createCategory('Alimentos');

// fetchFrequencies();
// createFrequency('Mensual');

// fetchIncomes();
// createIncome(1, '2024-06-01', 'Salario', 1000.00);

// fetchExpenses();
// createExpense(1, 1, 'Supermercado', '2024-06-01', 500.00, 1, '2024-07-01');

// fetchAlerts();
// createAlert(1, 'Pago de tarjeta', '2024-06-10 10:00:00', true);

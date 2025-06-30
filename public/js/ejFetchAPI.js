// Obtener el token CSRF del meta tag (asegúrate de tener <meta name="csrf-token" content="{{ csrf_token() }}"> en tu <head>)
function getCsrfToken() {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return meta ? meta.getAttribute('content') : '';
}

function getHeaders() {
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-TOKEN': getCsrfToken()
    };
}

// ===================== USER =====================
// Obtener todos los usuarios
function fetchUsers() {
    return fetch('/api/users')
        .then(response => response.json());
}

// Obtener un usuario por ID
function fetchUserById(id) {
    return fetch(`/api/users/${id}`)
        .then(response => response.json());
}

// Crear un usuario nuevo
function createUser(name, email, password_hash) {
    return fetch('/api/users', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ name, email, password_hash })
    }).then(response => response.json());
}

// Actualizar un usuario
function updateUser(id, name, email, password_hash) {
    return fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ name, email, password_hash })
    }).then(response => response.json());
}

// Eliminar un usuario
function deleteUser(id) {
    return fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    }).then(response => response.json());
}

// ===================== CATEGORY =====================
// Obtener todas las categorías
function fetchCategories() {
    return fetch('/api/categories')
        .then(response => response.json());
}

// Obtener una categoría por ID
function fetchCategoryById(id) {
    return fetch(`/api/categories/${id}`)
        .then(response => response.json());
}

// Crear una categoría nueva
function createCategory(category_name) {
    return fetch('/api/categories', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ category_name })
    }).then(response => response.json());
}

// Actualizar una categoría
function updateCategory(id, category_name) {
    return fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ category_name })
    }).then(response => response.json());
}

// Eliminar una categoría
function deleteCategory(id) {
    return fetch(`/api/categories/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    }).then(response => response.json());
}

// ===================== FREQUENCY =====================
// Obtener todas las frecuencias
function fetchFrequencies() {
    return fetch('/api/frequencies')
        .then(response => response.json());
}

// Obtener una frecuencia por ID
function fetchFrequencyById(id) {
    return fetch(`/api/frequencies/${id}`)
        .then(response => response.json());
}

// Crear una frecuencia nueva
function createFrequency(frequency_name) {
    return fetch('/api/frequencies', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ frequency_name })
    }).then(response => response.json());
}

// Actualizar una frecuencia
function updateFrequency(id, frequency_name) {
    return fetch(`/api/frequencies/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ frequency_name })
    }).then(response => response.json());
}

// Eliminar una frecuencia
function deleteFrequency(id) {
    return fetch(`/api/frequencies/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    }).then(response => response.json());
}

// ===================== INCOME =====================
// Obtener todos los ingresos
function fetchIncomes() {
    return fetch('/api/incomes')
        .then(response => response.json());
}

// Obtener un ingreso por ID
function fetchIncomeById(id) {
    return fetch(`/api/incomes/${id}`)
        .then(response => response.json());
}

// Crear un ingreso nuevo
function createIncome(user_id, date, type, amount) {
    return fetch('/api/incomes', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ user_id, date, type, amount })
    }).then(response => response.json());
}

// Actualizar un ingreso
function updateIncome(id, user_id, date, type, amount) {
    return fetch(`/api/incomes/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ user_id, date, type, amount })
    }).then(response => response.json());
}

// Eliminar un ingreso
function deleteIncome(id) {
    return fetch(`/api/incomes/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    }).then(response => response.json());
}

// ===================== EXPENSE =====================
// Obtener todos los gastos
function fetchExpenses() {
    return fetch('/api/expenses')
        .then(response => response.json());
}

// Obtener un gasto por ID
function fetchExpenseById(id) {
    return fetch(`/api/expenses/${id}`)
        .then(response => response.json());
}

// Crear un gasto nuevo
function createExpense(user_id, category_id, description, date, amount, frequency_id, next_date) {
    return fetch('/api/expenses', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ user_id, category_id, description, date, amount, frequency_id, next_date })
    }).then(response => response.json());
}

// Actualizar un gasto
function updateExpense(id, user_id, category_id, description, date, amount, frequency_id, next_date) {
    return fetch(`/api/expenses/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ user_id, category_id, description, date, amount, frequency_id, next_date })
    }).then(response => response.json());
}

// Eliminar un gasto
function deleteExpense(id) {
    return fetch(`/api/expenses/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    }).then(response => response.json());
}

// ===================== ALERT =====================
// Obtener todas las alertas
function fetchAlerts() {
    return fetch('/api/alerts')
        .then(response => response.json());
}

// Obtener una alerta por ID
function fetchAlertById(id) {
    return fetch(`/api/alerts/${id}`)
        .then(response => response.json());
}

// Crear una alerta nueva
function createAlert(user_id, message, scheduled_date, active) {
    return fetch('/api/alerts', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ user_id, message, scheduled_date, active })
    }).then(response => response.json());
}

// Actualizar una alerta
function updateAlert(id, user_id, message, scheduled_date, active) {
    return fetch(`/api/alerts/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ user_id, message, scheduled_date, active })
    }).then(response => response.json());
}

// Eliminar una alerta
function deleteAlert(id) {
    return fetch(`/api/alerts/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    }).then(response => response.json());
}

// ===================== USO DE FUNCIONES (EJEMPLOS) =====================

// ----------- USER -----------
// Obtener todos los usuarios
// fetchUsers().then(console.log);

// Obtener usuario por ID
// fetchUserById(1).then(console.log);

// Crear usuario
// createUser('Juan', 'juan@ejemplo.com', 'hash123').then(console.log);

// Actualizar usuario
// updateUser(1, 'Juan Actualizado', 'juan@ejemplo.com', 'hash123').then(console.log);

// Eliminar usuario
// deleteUser(1).then(console.log);

// ----------- CATEGORY -----------
// Obtener todas las categorías
// fetchCategories().then(console.log);

// Obtener categoría por ID
// fetchCategoryById(1).then(console.log);

// Crear categoría
// createCategory('Alimentos').then(console.log);

// Actualizar categoría
// updateCategory(1, 'Transporte').then(console.log);

// Eliminar categoría
// deleteCategory(1).then(console.log);

// ----------- FREQUENCY -----------
// Obtener todas las frecuencias
// fetchFrequencies().then(console.log);

// Obtener frecuencia por ID
// fetchFrequencyById(1).then(console.log);

// Crear frecuencia
// createFrequency('Mensual').then(console.log);

// Actualizar frecuencia
// updateFrequency(1, 'Semanal').then(console.log);

// Eliminar frecuencia
// deleteFrequency(1).then(console.log);

// ----------- INCOME -----------
// Obtener todos los ingresos
// fetchIncomes().then(console.log);

// Obtener ingreso por ID
// fetchIncomeById(1).then(console.log);

// Crear ingreso
// createIncome(1, '2024-06-01', 'Salario', 1000.00).then(console.log);

// Actualizar ingreso
// updateIncome(1, 1, '2024-06-01', 'Bono', 1200.00).then(console.log);

// Eliminar ingreso
// deleteIncome(1).then(console.log);

// ----------- EXPENSE -----------
// Obtener todos los gastos
// fetchExpenses().then(console.log);

// Obtener gasto por ID
// fetchExpenseById(1).then(console.log);

// Crear gasto
// createExpense(1, 1, 'Supermercado', '2024-06-01', 500.00, 1, '2024-07-01').then(console.log);

// Actualizar gasto
// updateExpense(1, 1, 1, 'Supermercado actualizado', '2024-06-01', 600.00, 1, '2024-07-01').then(console.log);

// Eliminar gasto
// deleteExpense(1).then(console.log);

// ----------- ALERT -----------
// Obtener todas las alertas
// fetchAlerts().then(console.log);

// Obtener alerta por ID
// fetchAlertById(1).then(console.log);

// Crear alerta
// createAlert(1, 'Pago de tarjeta', '2024-06-10 10:00:00', true).then(console.log);

// Actualizar alerta
// updateAlert(1, 1, 'Pago actualizado', '2024-06-11 10:00:00', false).then(console.log);

// Eliminar alerta
// deleteAlert(1).then(console.log);
// deleteAlert(1).then(console.log);

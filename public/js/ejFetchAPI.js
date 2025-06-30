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
    console.log('GET /users');
    return fetch('/users')
        .then(response => response.json());
}

// Obtener un usuario por ID
function fetchUserById(id) {
    console.log(`GET /users/${id}`);
    return fetch(`/users/${id}`)
        .then(response => response.json());
}

// Crear un usuario nuevo
function createUser(name, email, password_hash) {
    const data = { name, email, password_hash };
    console.log('POST /users:', JSON.stringify(data));
    return fetch('/users', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    }).then(response => response.json());
}

// Actualizar un usuario
function updateUser(id, name, email, password_hash) {
    const data = { name, email, password_hash };
    console.log(`PUT /users/${id}:`, JSON.stringify(data));
    return fetch(`/users/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data)
    }).then(response => response.json());
}

// Eliminar un usuario
function deleteUser(id) {
    console.log(`DELETE /users/${id}`);
    return fetch(`/users/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    }).then(response => response.json());
}

// ===================== CATEGORY =====================
// Obtener todas las categorías
function fetchCategories() {
    console.log('GET /categories');
    return fetch('/categories')
        .then(response => response.json());
}

// Obtener una categoría por ID
function fetchCategoryById(id) {
    console.log(`GET /categories/${id}`);
    return fetch(`/categories/${id}`)
        .then(response => response.json());
}

// Crear una categoría nueva
function createCategory(category_name) {
    const data = { category_name };
    console.log('POST /categories:', JSON.stringify(data));
    return fetch('/categories', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    }).then(response => response.json());
}

// Actualizar una categoría
function updateCategory(id, category_name) {
    const data = { category_name };
    console.log(`PUT /categories/${id}:`, JSON.stringify(data));
    return fetch(`/categories/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data)
    }).then(response => response.json());
}

// Eliminar una categoría
function deleteCategory(id) {
    console.log(`DELETE /categories/${id}`);
    return fetch(`/categories/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    }).then(response => response.json());
}

// ===================== FREQUENCY =====================
// Obtener todas las frecuencias
function fetchFrequencies() {
    console.log('GET /frequencies');
    return fetch('/frequencies')
        .then(response => response.json());
}

// Obtener una frecuencia por ID
function fetchFrequencyById(id) {
    console.log(`GET /frequencies/${id}`);
    return fetch(`/frequencies/${id}`)
        .then(response => response.json());
}

// Crear una frecuencia nueva
function createFrequency(frequency_name) {
    const data = { frequency_name };
    console.log('POST /frequencies:', JSON.stringify(data));
    return fetch('/frequencies', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    }).then(response => response.json());
}

// Actualizar una frecuencia
function updateFrequency(id, frequency_name) {
    const data = { frequency_name };
    console.log(`PUT /frequencies/${id}:`, JSON.stringify(data));
    return fetch(`/frequencies/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data)
    }).then(response => response.json());
}

// Eliminar una frecuencia
function deleteFrequency(id) {
    console.log(`DELETE /frequencies/${id}`);
    return fetch(`/frequencies/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    }).then(response => response.json());
}

// ===================== INCOME =====================
// Obtener todos los ingresos
function fetchIncomes() {
    console.log('GET /incomes');
    return fetch('/incomes')
        .then(response => response.json());
}

// Obtener un ingreso por ID
function fetchIncomeById(id) {
    console.log(`GET /incomes/${id}`);
    return fetch(`/incomes/${id}`)
        .then(response => response.json());
}

// Crear un ingreso nuevo
function createIncome(user_id, date, type, amount) {
    const data = { user_id, date, type, amount };
    console.log('POST /incomes:', JSON.stringify(data));
    return fetch('/incomes', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    }).then(response => response.json());
}

// Actualizar un ingreso
function updateIncome(id, user_id, date, type, amount) {
    const data = { user_id, date, type, amount };
    console.log(`PUT /incomes/${id}:`, JSON.stringify(data));
    return fetch(`/incomes/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data)
    }).then(response => response.json());
}

// Eliminar un ingreso
function deleteIncome(id) {
    console.log(`DELETE /incomes/${id}`);
    return fetch(`/incomes/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    }).then(response => response.json());
}

// ===================== EXPENSE =====================
// Obtener todos los gastos
function fetchExpenses() {
    console.log('GET /expenses');
    return fetch('/expenses')
        .then(response => response.json());
}

// Obtener un gasto por ID
function fetchExpenseById(id) {
    console.log(`GET /expenses/${id}`);
    return fetch(`/expenses/${id}`)
        .then(response => response.json());
}

// Crear un gasto nuevo
function createExpense(user_id, category_id, description, date, amount, frequency_id, next_date) {
    const data = { user_id, category_id, description, date, amount, frequency_id, next_date };
    console.log('POST /expenses:', JSON.stringify(data));
    return fetch('/expenses', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    }).then(response => response.json());
}

// Actualizar un gasto
function updateExpense(id, user_id, category_id, description, date, amount, frequency_id, next_date) {
    const data = { user_id, category_id, description, date, amount, frequency_id, next_date };
    console.log(`PUT /expenses/${id}:`, JSON.stringify(data));
    return fetch(`/expenses/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data)
    }).then(response => response.json());
}

// Eliminar un gasto
function deleteExpense(id) {
    console.log(`DELETE /expenses/${id}`);
    return fetch(`/expenses/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    }).then(response => response.json());
}

// ===================== ALERT =====================
// Obtener todas las alertas
function fetchAlerts() {
    console.log('GET /alerts');
    return fetch('/alerts')
        .then(response => response.json());
}

// Obtener una alerta por ID
function fetchAlertById(id) {
    console.log(`GET /alerts/${id}`);
    return fetch(`/alerts/${id}`)
        .then(response => response.json());
}

// Crear una alerta nueva
function createAlert(user_id, message, scheduled_date, active) {
    const data = { user_id, message, scheduled_date, active };
    console.log('POST /alerts:', JSON.stringify(data));
    return fetch('/alerts', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    }).then(response => response.json());
}

// Actualizar una alerta
function updateAlert(id, user_id, message, scheduled_date, active) {
    const data = { user_id, message, scheduled_date, active };
    console.log(`PUT /alerts/${id}:`, JSON.stringify(data));
    return fetch(`/alerts/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data)
    }).then(response => response.json());
}

// Eliminar una alerta
function deleteAlert(id) {
    console.log(`DELETE /alerts/${id}`);
    return fetch(`/alerts/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    }).then(response => response.json());
}

// ===================== DOCUMENT =====================
// Obtener todos los documentos
function fetchDocuments() {
    console.log('GET /documents');
    return fetch('/documents')
        .then(response => response.json());
}

// Obtener un documento por ID
function fetchDocumentById(id) {
    console.log(`GET /documents/${id}`);
    return fetch(`/documents/${id}`)
        .then(response => response.json());
}

// Crear un documento nuevo
function createDocument(user_id, title, content, created_at) {
    const data = { user_id, title, content, created_at };
    console.log('POST /documents:', JSON.stringify(data));
    return fetch('/documents', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    }).then(response => response.json());
}

// Actualizar un documento
function updateDocument(id, user_id, title, content, created_at) {
    const data = { user_id, title, content, created_at };
    console.log(`PUT /documents/${id}:`, JSON.stringify(data));
    return fetch(`/documents/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data)
    }).then(response => response.json());
}

// Eliminar un documento
function deleteDocument(id) {
    console.log(`DELETE /documents/${id}`);
    return fetch(`/documents/${id}`, {
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

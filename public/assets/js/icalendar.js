// Función para añadir indicadores al calendario
function addCalendarIndicators(financialData) {
    window.financialData = financialData;
    // financialData debe tener la estructura:
    // {
    //   incomes: [{ date: "YYYY-MM-DD", amount: 100.50, type: "salary" }, ...],
    //   expenses: [{ date: "YYYY-MM-DD", amount: 50.25, description: "food" }, ...]
    // }
    
    if (!financialData || (!financialData.incomes && !financialData.expenses)) {
        console.warn('No se proporcionaron datos financieros válidos');
        return;
    }

    // Procesar datos para agrupar por fecha
    const dateIndicators = processFinancialData(financialData);
    
    // Aplicar indicadores a las celdas del calendario
    applyIndicatorsToCalendar(dateIndicators);
}

// Función auxiliar para procesar los datos financieros
function processFinancialData(data) {
    const dateMap = {};
    // Helper para obtener la fecha relevante de un registro
    function getRelevantDate(obj, ...fields) {
        for (let f of fields) {
            if (obj[f]) return obj[f].toString().substring(0, 10);
        }
        return null;
    }
    // Procesar ingresos
    if (data.incomes && Array.isArray(data.incomes)) {
        data.incomes.forEach(income => {
            const dateKey = getRelevantDate(income, 'date', 'income_date', 'created_at');
            if (!dateKey) return;
            if (!dateMap[dateKey]) {
                dateMap[dateKey] = { hasIncome: false, hasExpense: false };
            }
            dateMap[dateKey].hasIncome = true;
        });
    }
    // Procesar gastos
    if (data.expenses && Array.isArray(data.expenses)) {
        data.expenses.forEach(expense => {
            const dateKey = getRelevantDate(expense, 'date', 'next_date', 'created_at');
            if (!dateKey) return;
            if (!dateMap[dateKey]) {
                dateMap[dateKey] = { hasIncome: false, hasExpense: false };
            }
            dateMap[dateKey].hasExpense = true;
        });
    }
    return dateMap;
}

// Dibuja triángulos SVG en las celdas según el tipo
function decorateCellWithIndicator(cell, indicators) {
    // Limpia decoraciones previas
    let deco = cell.querySelector('.indicator-svg');
    if (deco) deco.remove();

    if (!indicators) return;

    // SVG triángulo arriba-izquierda (ingreso: verde), arriba-derecha (egreso: rojo)
    if (indicators.hasIncome) {
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "16"); svg.setAttribute("height", "16");
        svg.setAttribute("class", "indicator-svg");
        svg.style.position = "absolute";
        svg.style.left = "2px";
        svg.style.top = "2px";
        svg.innerHTML = `<polygon points="0,0 16,0 0,16" fill="#28a745"/>`;
        cell.style.position = "relative";
        cell.appendChild(svg);
    }
    if (indicators.hasExpense) {
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "16"); svg.setAttribute("height", "16");
        svg.setAttribute("class", "indicator-svg");
        svg.style.position = "absolute";
        svg.style.right = "2px";
        svg.style.top = "2px";
        svg.innerHTML = `<polygon points="16,0 16,16 0,0" fill="#dc3545"/>`;
        cell.style.position = "relative";
        cell.appendChild(svg);
    }
}

// Función auxiliar para aplicar los indicadores a las celdas
function applyIndicatorsToCalendar(dateIndicators) {
    // Selector para los días del calendario
    const calendarCells = document.querySelectorAll('.calendar-wrap td, #calendar tbody td');
    calendarCells.forEach(cell => {
        // Limpia decoraciones previas
        let deco = cell.querySelector('.indicator-svg');
        if (deco) deco.remove();

        // Obtén el día
        let dayText = cell.textContent.trim();
        if (!dayText || isNaN(dayText) || cell.id === 'disabled') return;

        // Calcula la fecha
        const currentDate = getCurrentCalendarDate(parseInt(dayText));
        if (!currentDate) return;
        const dateKey = formatDateForComparison(currentDate);
        const indicators = dateIndicators[dateKey];

        decorateCellWithIndicator(cell, indicators);

        // NO pongas aquí: cell.onclick = ...;
    });
}

// Función auxiliar para obtener la fecha actual del calendario
function getCurrentCalendarDate(day) {
    // Usar las variables globales del calendario existente
    if (typeof year === 'undefined' || typeof month === 'undefined') {
        console.error('Variables de calendario no disponibles');
        return null;
    }
    
    return new Date(year, month, day);
}

// Función auxiliar para formatear fecha para comparación
function formatDateForComparison(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Función simplificada para usar datos de ejemplo
function loadExampleFinancialData() {
    addCalendarIndicators(exampleFinancialData);
}

// Función para usar datos JSON locales (para pruebas)
function loadFinancialDataFromJSON(jsonData) {
    try {
        const financialData = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
        addCalendarIndicators(financialData);
    } catch (error) {
        console.error('Error al procesar datos JSON:', error);
    }
}

// Integración simplificada con el calendario existente
function enhanceCalendarWithIndicators() {
    if (typeof Calendar === "undefined") return; // Evita error si no está definido
    const originalDrawDays = Calendar.prototype.drawDays;
    Calendar.prototype.drawDays = function() {
        originalDrawDays.call(this);
        setTimeout(() => {
            loadExampleFinancialData();
        }, 50);
    };
}

// Ejemplo de uso con datos JSON estáticos (para pruebas)
const exampleFinancialData = {
    incomes: [
        { date: "2025-06-15", amount: 1500.00, type: "salary" },
        { date: "2025-06-25", amount: 200.00, type: "freelance" }
    ],
    expenses: [
        { date: "2025-06-10", amount: 50.25, description: "groceries" },
        { date: "2025-06-15", amount: 30.00, description: "lunch" },
        { date: "2025-06-20", amount: 100.00, description: "utilities" }
    ]
};

// Inicializar con datos de ejemplo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Esperar un poco para que el calendario original se inicialice
    setTimeout(() => {
        enhanceCalendarWithIndicators();
        
        // Cargar datos de ejemplo al inicializar
        loadExampleFinancialData();
    }, 100);
});

// Cargar ingresos y egresos del usuario autenticado desde la API
async function fetchFinancialData() {
    try {
        const [incomesRes, expensesRes] = await Promise.all([
            fetch('/incomes?user_id=' + (window.userId || 1)),
            fetch('/expenses?user_id=' + (window.userId || 1))
        ]);
        const incomes = await incomesRes.json();
        const expenses = await expensesRes.json();
        window.financialData = { incomes, expenses };
        addCalendarIndicators(window.financialData);
    } catch (e) {
        console.error('Error al cargar ingresos/egresos:', e);
    }
}

// Sobrescribe showDetailModal para recargar datos antes de mostrar el modal
async function showDetailModal(dateKey, indicators) {
    await fetchFinancialData();

    // Helper para comparar solo la parte de la fecha
    function matchDate(obj, ...fields) {
        return fields.some(f => obj[f] && obj[f].toString().substring(0, 10) === dateKey);
    }

    // Ingresos: busca por .date, .income_date, .created_at, y convierte a string por si viene como Date
    const incomes = (window.financialData?.incomes || []).filter(i =>
        matchDate(i, 'date', 'income_date', 'created_at')
    );
    // Egresos: busca por .date, .next_date, .created_at
    const expenses = (window.financialData?.expenses || []).filter(e =>
        matchDate(e, 'date', 'next_date', 'created_at')
    );

    // DEBUG: muestra en consola los ingresos filtrados y los originales
    // console.log('dateKey:', dateKey, 'incomes:', window.financialData?.incomes, 'filtered:', incomes);

    const modal = new bootstrap.Modal(document.getElementById('detailModal'));
    // Balance
    const totalIncomes = incomes.reduce((a, b) => a + Number(b.amount), 0);
    const totalExpenses = expenses.reduce((a, b) => a + Number(b.amount), 0);
    // Mensaje balance
    let msg = '';
    if (totalIncomes > totalExpenses) {
        msg = '<span class="text-success">Tienes más ingresos que gastos... ¡genial!</span>';
    } else if (totalExpenses > totalIncomes) {
        msg = '<span class="text-danger">Tienes más gastos que ingresos. Hay que trabajar en eso...</span>';
    } else {
        msg = 'Tus gastos e ingresos son iguales. Lo ideal es gastar menos de lo que se recibe para ahorrar un poco.';
    }
    document.getElementById('balanceMessage').innerHTML = msg;

    // Título explicativo arriba de la gráfica
    const chartContainer = document.getElementById('detailPieChart').parentElement;
    let chartTitle = chartContainer.querySelector('.chart-title');
    if (!chartTitle) {
        chartTitle = document.createElement('div');
        chartTitle.className = 'chart-title fw-bold mb-2';
        chartContainer.prepend(chartTitle);
    }
    chartTitle.innerText = 'Distribución de ingresos y egresos para el día seleccionado';

    // Gráfico de pastel
    drawPieChart(document.getElementById('detailPieChart'), {
        labels: ['Ingresos', 'Gastos'],
        data: [totalIncomes, totalExpenses],
        colors: ['#28a745', '#dc3545']
    });

    // Ingresos
    const incomesList = document.getElementById('incomesList');
    incomesList.innerHTML = incomes.length
        ? incomes.map(i => {
            let amt = Number(i.amount);
            return `<li>${i.type || 'Ingreso'}: $${isNaN(amt) ? '0.00' : amt.toFixed(2)}</li>`;
        }).join('')
        : '<li class="text-muted">Sin ingresos registrados</li>';
    // Egresos
    const expensesList = document.getElementById('expensesList');
    expensesList.innerHTML = expenses.length
        ? expenses.map(e => {
            let amt = Number(e.amount);
            return `<li>${e.description || 'Egreso'}: $${isNaN(amt) ? '0.00' : amt.toFixed(2)}</li>`;
        }).join('')
        : '<li class="text-muted">Sin egresos registrados</li>';
    // Añadir
    document.getElementById('addIncomeBtn').onclick = () => window.addIncomeForDate(dateKey);
    document.getElementById('addExpenseBtn').onclick = () => window.addExpenseForDate(dateKey);
    // Si no hay movimientos, activa pestaña "Añadir"
    if (incomes.length === 0 && expenses.length === 0) {
        new bootstrap.Tab(document.getElementById('tab-add')).show();
    } else {
        new bootstrap.Tab(document.getElementById('tab-balance')).show();
    }
    modal.show();
}

// Dibuja el gráfico de pastel usando Chart.js
function drawPieChart(canvas, chartData) {
    if (window.detailPieChartInstance) window.detailPieChartInstance.destroy();
    window.detailPieChartInstance = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: chartData.labels,
            datasets: [{
                data: chartData.data,
                backgroundColor: chartData.colors
            }]
        },
        options: {
            responsive: false,
            plugins: { legend: { display: true } }
        }
    });
}

// Hooks para añadir ingreso/egreso (puedes personalizar)
window.addIncomeForDate = function(dateKey) {
    // Rellena la fecha y muestra el modal
    document.getElementById('income-date').value = dateKey;
    var modal = new bootstrap.Modal(document.getElementById('addIncomeModal'));
    modal.show();
};
window.addExpenseForDate = function(dateKey) {
    // Rellena la fecha y muestra el modal
    document.getElementById('expense-date').value = dateKey;
    var modal = new bootstrap.Modal(document.getElementById('addExpenseModal'));
    modal.show();
};

// Envío AJAX para ingreso
document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    document.getElementById('addIncomeForm').onsubmit = function(e) {
        e.preventDefault();
        const data = {
            user_id: window.userId || 1,
            date: document.getElementById('income-date').value,
            type: document.getElementById('income-type').value,
            amount: parseFloat(document.getElementById('income-amount').value)
        };
        fetch('/incomes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(async res => {
            if (res.id || res.income_id) {
                alert('Ingreso registrado correctamente');
                bootstrap.Modal.getInstance(document.getElementById('addIncomeModal')).hide();
                await fetchFinancialData();
                setTimeout(() => showDetailModal(data.date), 200);
            } else {
                alert('Error al registrar ingreso');
            }
        })
            .catch(() => alert('Error al registrar ingreso'));
        };
    
        document.getElementById('addExpenseForm').onsubmit = function(e) {
            e.preventDefault();
            const freqSelect = document.getElementById('expense-frequency');
            const freqValue = freqSelect.value;
            const selectedFreqOption = freqSelect.options[freqSelect.selectedIndex];
            const freqName = selectedFreqOption ? selectedFreqOption.getAttribute('data-name') : '';
            const catSelect = document.getElementById('expense-category');
            const catValue = catSelect.value;

            // DEBUG extra: imprime typeof y valor real
            console.log('frequency_id:', freqValue, 'typeof:', typeof freqValue, 'frequency_name:', freqName);
            console.log('category_id:', catValue, 'typeof:', typeof catValue);

            // Validación robusta: asegúrate que freqValue no sea vacío ni "null" ni "undefined"
            if (!catValue || !freqValue || freqValue === "null" || freqValue === "undefined") {
                alert('Selecciona una categoría y una frecuencia.');
                return;
            }

            const nextDateValue = freqName === 'Única vez' ? null : document.getElementById('expense-next-date').value;
            const data = {
                user_id: window.userId || 1,
                date: document.getElementById('expense-date').value,
                category_id: catValue,
                description: document.getElementById('expense-description').value,
                amount: parseFloat(document.getElementById('expense-amount').value),
                frequency_id: freqValue,
                next_date: nextDateValue
            };
            fetch('/expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify(data)
            })
            .then(async res => {
                let json;
                try { json = await res.json(); } catch { json = {}; }
                if (res.ok && (json.id || json.expense_id)) {
                    alert('Egreso registrado correctamente');
                    bootstrap.Modal.getInstance(document.getElementById('addExpenseModal')).hide();
                    await fetchFinancialData();
                    setTimeout(() => showDetailModal(data.date), 200);
                } else {
                    alert('Error al registrar egreso: ' + (json.message || res.statusText));
                }
            })
            .catch(() => alert('Error al registrar egreso'));
        };
    });

// Al cargar la página, carga los datos reales del usuario
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (typeof Calendar !== "undefined") {
            enhanceCalendarWithIndicators();
        }
        fetchFinancialData();
    }, 100);
});

// No hay cambios necesarios aquí, solo asegúrate que el backend responde con los datos correctos.
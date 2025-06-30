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
    
    // Procesar ingresos
    if (data.incomes && Array.isArray(data.incomes)) {
        data.incomes.forEach(income => {
            const dateKey = income.date;
            if (!dateMap[dateKey]) {
                dateMap[dateKey] = { hasIncome: false, hasExpense: false };
            }
            dateMap[dateKey].hasIncome = true;
        });
    }
    
    // Procesar gastos
    if (data.expenses && Array.isArray(data.expenses)) {
        data.expenses.forEach(expense => {
            const dateKey = expense.date;
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
    // Guardar referencias a las funciones originales
    const originalDrawDays = Calendar.prototype.drawDays;
    
    // Sobrescribir drawDays para añadir indicadores después de dibujar
    Calendar.prototype.drawDays = function() {
        originalDrawDays.call(this);
        
        // Cargar datos de ejemplo después de dibujar el calendario
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

// Muestra el modal de detalle para el día seleccionado
function showDetailModal(dateKey, indicators) {
    const incomes = (window.financialData?.incomes || []).filter(i => i.date === dateKey);
    const expenses = (window.financialData?.expenses || []).filter(e => e.date === dateKey);
    const modal = new bootstrap.Modal(document.getElementById('detailModal'));
    // Balance
    const totalIncomes = incomes.reduce((a, b) => a + b.amount, 0);
    const totalExpenses = expenses.reduce((a, b) => a + b.amount, 0);
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
    // Gráfico
    drawPieChart(document.getElementById('detailPieChart'), {
        labels: ['Ingresos', 'Gastos'],
        data: [totalIncomes, totalExpenses],
        colors: ['#28a745', '#dc3545']
    });
    // Ingresos
    const incomesList = document.getElementById('incomesList');
    incomesList.innerHTML = incomes.length
        ? incomes.map(i => `<li>${i.type || 'Ingreso'}: $${i.amount.toFixed(2)}</li>`).join('')
        : '<li class="text-muted">Sin ingresos registrados</li>';
    // Egresos
    const expensesList = document.getElementById('expensesList');
    expensesList.innerHTML = expenses.length
        ? expenses.map(e => `<li>${e.description || 'Egreso'}: $${e.amount.toFixed(2)}</li>`).join('')
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
    alert('Redirigir a formulario de ingreso para ' + dateKey);
    // Aquí puedes abrir tu formulario real
};
window.addExpenseForDate = function(dateKey) {
    alert('Redirigir a formulario de egreso para ' + dateKey);
    // Aquí puedes abrir tu formulario real
};
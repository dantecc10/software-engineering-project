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
    const calendarCells = document.querySelectorAll('#calendar tbody td');
    
    calendarCells.forEach(cell => {
        cell.classList.remove('income-indicator', 'expense-indicator');
        // Limpiar indicadores previos
        // cell.classList.remove('income-indicator', 'expense-indicator');
        
        // Solo procesar celdas que tienen contenido numérico (días válidos)
        const dayText = cell.textContent.trim();
        if (!dayText || isNaN(dayText) || cell.id === 'disabled') return;
        
        // Obtener la fecha actual del calendario
        const currentDate = getCurrentCalendarDate(parseInt(dayText));
        if (!currentDate) return;
        
        const dateKey = formatDateForComparison(currentDate);
        const indicators = dateIndicators[dateKey];
        decorateCellWithIndicator(cell, indicators);
        // Añade evento click para mostrar modal de detalle
        cell.onclick = () => showDetailModal(dateKey, indicators);
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
    // Busca registros para ese día
    const incomes = (window.financialData?.incomes || []).filter(i => i.date === dateKey);
    const expenses = (window.financialData?.expenses || []).filter(e => e.date === dateKey);
    const modal = new bootstrap.Modal(document.getElementById('detailModal'));
    const contentDiv = document.getElementById('detailModalContent');
    const footerDiv = document.getElementById('detailModalFooter');
    const chartCanvas = document.getElementById('detailPieChart');
    let html = '';
    let footer = '';
    let chartData = null;

    if ((incomes.length + expenses.length) > 0) {
        html += `<p class="mb-2">Movimientos del <b>${dateKey}</b>:</p>`;
        if (incomes.length) {
            html += `<h6 class="text-success">Ingresos</h6><ul>`;
            incomes.forEach(i => html += `<li>${i.type || 'Ingreso'}: $${i.amount.toFixed(2)}</li>`);
            html += `</ul>`;
        }
        if (expenses.length) {
            html += `<h6 class="text-danger">Egresos</h6><ul>`;
            expenses.forEach(e => html += `<li>${e.description || 'Egreso'}: $${e.amount.toFixed(2)}</li>`);
            html += `</ul>`;
        }
        chartData = {
            labels: [],
            data: [],
            colors: []
        };
        if (incomes.length) {
            chartData.labels.push('Ingresos');
            chartData.data.push(incomes.reduce((a, b) => a + b.amount, 0));
            chartData.colors.push('#28a745');
        }
        if (expenses.length) {
            chartData.labels.push('Egresos');
            chartData.data.push(expenses.reduce((a, b) => a + b.amount, 0));
            chartData.colors.push('#dc3545');
        }
        chartCanvas.style.display = '';
        footer = `<button class="btn btn-light" data-bs-dismiss="modal">Cerrar</button>`;
    } else {
        html = `<p>No hay movimientos registrados para <b>${dateKey}</b>.</p>
                <p>¿Deseas añadir un ingreso o egreso?</p>`;
        chartCanvas.style.display = 'none';
        footer = `
            <button class="btn btn-success" onclick="addIncomeForDate('${dateKey}')">Añadir ingreso</button>
            <button class="btn btn-danger" onclick="addExpenseForDate('${dateKey}')">Añadir egreso</button>
            <button class="btn btn-light" data-bs-dismiss="modal">Cerrar</button>
        `;
    }
    contentDiv.innerHTML = html;
    footerDiv.innerHTML = footer;

    // Dibuja el gráfico si hay datos
    if (chartData) {
        drawPieChart(chartCanvas, chartData);
    } else if (window.detailPieChartInstance) {
        window.detailPieChartInstance.destroy();
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
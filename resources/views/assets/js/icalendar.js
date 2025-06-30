// Función para añadir indicadores al calendario
function addCalendarIndicators(financialData) {
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

// Función auxiliar para aplicar los indicadores a las celdas
function applyIndicatorsToCalendar(dateIndicators) {
    const calendarCells = document.querySelectorAll('#calendar tbody td');
    
    calendarCells.forEach(cell => {
        // Limpiar indicadores previos
        cell.classList.remove('income-indicator', 'expense-indicator');
        
        // Solo procesar celdas que tienen contenido numérico (días válidos)
        const dayText = cell.textContent.trim();
        if (!dayText || isNaN(dayText) || cell.id === 'disabled') {
            return;
        }
        
        // Obtener la fecha actual del calendario
        const currentDate = getCurrentCalendarDate(parseInt(dayText));
        if (!currentDate) return;
        
        const dateKey = formatDateForComparison(currentDate);
        const indicators = dateIndicators[dateKey];
        
        if (indicators) {
            // Aplicar clases según los datos
            if (indicators.hasIncome && indicators.hasExpense) {
                // Si hay ambos, aplicar ambas clases (o una clase especial)
                cell.classList.add('income-indicator', 'expense-indicator');
            } else if (indicators.hasIncome) {
                cell.classList.add('income-indicator');
            } else if (indicators.hasExpense) {
                cell.classList.add('expense-indicator');
            }
        }
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
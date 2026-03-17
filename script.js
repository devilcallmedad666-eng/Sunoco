// script.js

// Expense Tracking
let expenses = [];

function addExpense(amount, category) {
    const expense = { amount, category, date: new Date() };
    expenses.push(expense);
}

function getTotalExpenses() {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
}

// Income Tracking
let incomes = [];

function addIncome(amount, source) {
    const income = { amount, source, date: new Date() };
    incomes.push(income);
}

function getTotalIncome() {
    return incomes.reduce((total, income) => total + income.amount, 0);
}

// KPI Calculations
function calculateKPI() {
    const totalIncome = getTotalIncome();
    const totalExpenses = getTotalExpenses();
    const netIncome = totalIncome - totalExpenses;
    return { totalIncome, totalExpenses, netIncome };
}

// Project Management
let projects = [];

function addProject(name, budget) {
    const project = { name, budget, spent: 0 };
    projects.push(project);
}

function updateProjectSpent(name, amount) {
    const project = projects.find(p => p.name === name);
    if (project) {
        project.spent += amount;
    }
}

// Employee Timesheet Management
let timesheets = {};

function addTimesheet(employeeId, hours) {
    if (!timesheets[employeeId]) {
        timesheets[employeeId] = 0;
    }
    timesheets[employeeId] += hours;
}

// Local Storage
function saveToLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('incomes', JSON.stringify(incomes));
    localStorage.setItem('projects', JSON.stringify(projects));
    localStorage.setItem('timesheets', JSON.stringify(timesheets));
}

function loadFromLocalStorage() {
    expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    incomes = JSON.parse(localStorage.getItem('incomes')) || [];
    projects = JSON.parse(localStorage.getItem('projects')) || [];
    timesheets = JSON.parse(localStorage.getItem('timesheets')) || {};
}

// CSV Export
function exportToCSV() {
    const data = [...expenses, ...incomes, ...projects];
    const csvRows = [];

    // Headers
    const headers = ['Type', 'Amount', 'Date'];
    csvRows.push(headers.join(','));

    data.forEach(item => {
        const row = [item.type || 'ledger', item.amount, item.date].join(',');
        csvRows.push(row);
    });

    // Create CSV blob
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'data.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
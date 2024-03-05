let totalIncome = 0;
let initialBalanceSet = false;

document.addEventListener('DOMContentLoaded', function () {
    updateTotalIncome();
    updateTransactionList();
});

function setInitialBalance() {
    const initialBalanceInput = document.getElementById('initial-balance');
    const initialBalance = parseFloat(initialBalanceInput.value);

    if (isNaN(initialBalance) || initialBalance < 0) {
        alert('Please enter a valid initial balance.');
        return;
    }

    totalIncome = initialBalance;
    initialBalanceSet = true;

    updateTotalIncome();
    updateTransactionList();
}

function addTransaction() {
    if (!initialBalanceSet) {
        alert('Please set the initial balance first.');
        return;
    }

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (!description || isNaN(amount)) {
        alert('Please enter valid values for description and amount.');
        return;
    }

    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push({ description, amount });
    localStorage.setItem('transactions', JSON.stringify(transactions));

    updateTransactionList();
}

function removeTransaction(index) {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.splice(index, 1);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    updateTransactionList();
}

function updateTotalIncome() {
    const totalIncomeElement = document.getElementById('total-income');
    totalIncomeElement.textContent = `$${totalIncome.toFixed(2)}`;
}

function updateTransactionList() {
    const transactionList = document.getElementById('transaction-list');
    const totalExpensesElement = document.getElementById('total-expenses');
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    transactionList.innerHTML = '';
    let totalExpenses = 0;

    transactions.forEach((transaction, index) => {
        const transactionElement = document.createElement('div');
        transactionElement.classList.add('transaction');

        const descriptionElement = document.createElement('span');
        descriptionElement.textContent = transaction.description;

        const amountElement = document.createElement('span');
        amountElement.textContent = `$${transaction.amount.toFixed(2)}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeTransaction(index));

        transactionElement.appendChild(descriptionElement);
        transactionElement.appendChild(amountElement);
        transactionElement.appendChild(removeButton);
        transactionList.appendChild(transactionElement);

        totalExpenses += transaction.amount;
    });

    totalExpensesElement.textContent = `$${Math.abs(totalExpenses).toFixed(2)}`;

    updateBalance(totalExpenses);
}

function updateBalance(totalExpenses) {
    const availableBalance = totalIncome - totalExpenses;
    document.getElementById('available-balance').textContent = `$${availableBalance.toFixed(2)}`;
}

window.addEventListener('load', async () => {
    try {
        const response = await fetch('/api/v1/expenses');

        if (!response.ok) {
            throw new Error('Failed to fetch expenses');
        }

        const expenses = await response.json();

        const tbody = document.getElementById('expenseTableBody');
        let totalExpense = 0;

        expenses.forEach(expense => {
            totalExpense += expense.amount;

            const row = `
                <tr>
                    <td><a href="#">${expense.id} </a></td> 
                    <td>${expense.category}</td>
                    <td>${expense.amount}</td>
                    <td>${expense.date}</td>
                </tr>
            `;

            tbody.insertAdjacentHTML('beforeend', row);
        });

        document.getElementById('totalexpense').textContent = totalExpense;

    } catch (error) {
        console.error(error);
    }
});


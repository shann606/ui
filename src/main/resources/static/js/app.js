window.addEventListener('load', async () => {
    try {
        const response = await fetch('/api/expenses');

        if (!response.ok) {
            throw new Error('Failed to fetch expenses');
        }

        const expenses = await response.json();

        const tbody = document.getElementById('expenseTableBody');
        let total = 0;

        expenses.forEach(expense => {
            total += expense.amount;

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

        document.getElementById('totalExpense').textContent = total;

    } catch (error) {
        console.error(error);
    }
});
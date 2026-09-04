window.addEventListener('load', async () => {


    const userId = document.getElementById("userId").value;

    const month = new Date().toLocaleString('en-US', {
        month: 'long'
    });

    const title = document.getElementById("expense");

    title.innerHTML = `Total expense of ${month}`;


    try {
        let totalExpense = 0;
        const response = await fetch('/api/v1/expenses/dashboard/' + userId);



        if (!response.ok) {
            throw new Error('Failed to fetch expenses');
        }

        const expenses = await response.json();

        console.log(JSON.stringify(expenses));

        const tbody = document.getElementById('expenseTableBody');


        Object.keys(expenses).forEach((key) => {
            totalExpense = key;
            console.log(key);

            expenses[key].forEach((value) => {


                const row = `
			              <tr>
			                  <td><a href="/expenses/search">${value.categoryname} </a></td> 
			                  <td>${value.subCategoryName}</td>
			                  <td>${value.amount}</td>
							  <td>${value.payment}</td>
			                  <td>${new Date(value.spenton).toLocaleDateString("en-GB")}</td>
			              </tr>
			          `;

                tbody.insertAdjacentHTML('beforeend', row);



            });
        });





        document.getElementById('totalexpense').textContent = totalExpense;

    } catch (error) {
        console.error(error);
    }
});


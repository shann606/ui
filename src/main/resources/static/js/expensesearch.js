let currentPage = 0;
let totalPages = 0;
let reqFrom;
let userId;


document.addEventListener("DOMContentLoaded", () => {

	getBaseData('');
    userId = document.getElementById("userId").value;
    fetchData(0);

    const form = document.getElementById("expensesearch");

    const sTitle = document.getElementById("search");


    sTitle.innerHTML = "Search Your Expenses";

    form.addEventListener("submit", expensesearch);





});

async function getBaseData(selectedId) {

    try {

        const response = await fetch(`http://localhost:1000/api/v1/expenses/categories`, {

            method: "GET",
        });

        if (response.ok) {

            const category = await response.json();
            console.log(JSON.stringify(category));

            renderCategoryDropDown(category, selectedId);

        } else {

            const error = await response.json();

            if (error.reason === undefined) {
                error.reason = "DownStream might be down please try later";
                throw error;

            } else {

                throw error;

            }
        }



    } catch (err) {

        console.log(err);
        responseError.textContent = err.reason;
        responseError.classList.remove("d-none");

    }




}

async function expensesearch(event) {



    event.preventDefault();

    fetchData(0);


}

async function fetchData(page) {
    let result = "";
	

    const fieldDetails = new URLSearchParams({

        fromdate: document.getElementById("fromdate").value,
        todate: document.getElementById("todate").value,
        payment: document.getElementById("status").value,
		categoryId : document.getElementById("categories").value
    });
	
    console.log("Search feilds "+fieldDetails.toString);
    try {
        const response = await fetch("http://localhost:1000/api/v1/expenses/search/" + userId + "?" + fieldDetails + "&pageNo=" + page, {

            method: "GET",
        });

        if (response.ok) {

            result = await response.json();

        } else if (response.status === 500) {
            const error = await response.json();
            throw error;

        }
        else {

            const error = await response.json();
            console.error(error.reason);
            responseError.textContent = error.reason;
            responseError.classList.remove("d-none");
        }

        console.log(JSON.stringify(result))


    } catch (err) {

        console.error(err);

        responseError.textContent = "Downstream application might be down";
        responseError.classList.remove("d-none");

    }

    renderTable(result.content);
    updatePagination(result);

    console.log("Current page ::" + currentPage);


}

async function deleteExpense(expenseId) {

    const confirmed = confirm("Are you sure you want to delete this category?");

    if (!confirmed) {
        return; // User clicked Cancel
    }


    try {
        const response = await fetch("http://localhost:1000/api/v1/expenses/" + expenseId, {

            method: "DELETE",
        });

        if (response.status == 204) {
            const successDiv = document.getElementById("responseSuccess");
            successDiv.textContent = "Expense is deleted Successfully.";
            successDiv.classList.remove("d-none");

        } else {

            const error = await response.json();
            responseError.textContent = result.reason;
            responseError.classList.remove("d-none");

            console.error(error.reason);
        }

    } catch (err) {

        console.error(err);
        responseError.textContent = "Downstream application might be down";
        responseError.classList.remove("d-none");

    }


    fetchData(currentPage);

}


function renderTable(content) {

    const tbody = document.getElementById("expenseresultbody");
    tbody.innerHTML = ""; // clear old rows

    content.forEach(item => {
        const created = new Date(item.spenton).toLocaleDateString("en-IN");
        const row = `
	  
	    <tr>
		  
	      <td><a href="/expenses/edit?expId=${item.expid}">${item.categoryname}</a></td>
	      <td>${item.subCategoryName}</td>
		  <td>${item.amount}</td>
		  <td>${item.payment}</td>
		  <td>${created}</td>
		  <td><a href="/expenses/edit?expId=${item.expid}">edit</a></td>
		
		  <td> <a href="#" onclick="deleteExpense('${item.expid}'); return false;">Delete</a></td>
		 
	    </tr>
	  `;
        tbody.innerHTML += row;
    });

}





function updatePagination(result) {

    currentPage = result.number;
    totalPages = result.totalPages - 1;


    document.getElementById("pageInfo").innerText = `Page ${currentPage} of ${totalPages}`;

    document.getElementById("prevBtn").disabled = currentPage === 0;
    document.getElementById("nextBtn").disabled = currentPage === totalPages;
}

// Button events
document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 0) {
        fetchData(currentPage - 1);
    }
});

document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentPage < totalPages) {
        fetchData(currentPage + 1);
    }
});


function renderCategoryDropDown(data, seletedId) {

    const categories = document.getElementById("categories");
    categories.innerHTML = '<option value="">Select Categories</option>';

    data.forEach(zone => {
        categories.add(new Option(zone.name, zone.id));
    });

    categories.value = seletedId;

}

document.getElementById("categories").addEventListener("change", async function(event) {
    getSubCategoryData(event.target.value, '');

});

// initial load
//fetchData(0);
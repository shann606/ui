let currentPage = 0;
let totalPages = 0;
let reqFrom;


document.addEventListener("DOMContentLoaded", () => {

    const queryId = window.location.search;
    reqFrom = new URLSearchParams(queryId).get("action");
    const form = document.getElementById("categorysearch");

    const sTitle = document.getElementById("search");

    if (reqFrom === "view") {
        sTitle.innerHTML = "Search Categories";
    } else {
        sTitle.innerHTML = "Add Sub Categories";
    }

    form.addEventListener("submit", categorysearch);



});



async function categorysearch(event) {



    event.preventDefault();

    fetchData(0);


}

async function fetchData(page) {


    let result = "";

    const fieldDetails = new URLSearchParams({

        name: document.getElementById("name").value,
        status: document.getElementById("status").value,
        fromdate: document.getElementById("fromdate").value,
        todate: document.getElementById("todate").value




    });
    console.log(fieldDetails.toString);
    try {
        const response = await fetch(`http://localhost:1000/api/v1/categories/search?${fieldDetails}&pageNo=${page}`, {

            method: "GET",
        });

        if (response.ok) {

            result = await response.json();

        } else {

            const error = await response.json();

            console.error(error.reason);
        }

        console.log(JSON.stringify(result))


    } catch (err) {

        console.error(err);

    }

    renderTable(result.content);
    updatePagination(result);


}

async function deleteCategory(categoryId) {

    const confirmed = confirm("Are you sure you want to delete this category?");

    if (!confirmed) {
        return; // User clicked Cancel
    }

    let result = "";
    try {
        const response = await fetch(`http://localhost:1000/api/v1/categories/` + categoryId, {

            method: "DELETE",
        });

        if (response.ok) {

            result = await response.json();
            const successDiv = document.getElementById("responseSuccess");

            successDiv.textContent = "Category is deleted Successfully.";
            successDiv.classList.remove("d-none");

        } else {

            const error = await response.json();
            responseError.textContent = result.reason;
            responseError.classList.remove("d-none");

            console.error(error.reason);
        }

        console.log(JSON.stringify(result))


    } catch (err) {

        console.error(err);
        responseError.textContent = "Downstream application might be down";
        responseError.classList.remove("d-none");

    }

    renderTable(result.content);
    updatePagination(result);


}


function renderTable(content) {

    const tbody = document.getElementById("categoryresultbody");
    tbody.innerHTML = ""; // clear old rows

    content.forEach(item => {
        const created = new Date(item.createdon).toLocaleDateString("en-IN");
        const row = `
	  
	    <tr>
		  
	      <td><a href="/categories/edit?id=${item.id}&name=${item.name}">${item.name}</a></td>
	      <td>${item.status}</td>
		
		  <td>
		              ${reqFrom === 'view' ?
                `<a href="/categories/subcategories?id=${item.id}&pageNo=0">view</a>` :
                `<a href="/categories/subcategories/add?id=${item.id}&name=${item.name}">add</a>`
            }
		  </td>
		  <td>${created}</td>
		  <td> <a href="#" onclick="deleteCategory('${item.id}'); return false;">Delete</a></td>
		 
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

// initial load
fetchData(0);
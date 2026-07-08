let currentPage = 0;
let totalPages =0;


document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("usersearch");

    form.addEventListener("submit", usersearch);



});



async function usersearch(event) {

    event.preventDefault();

    fetchData(0);


}

async function fetchData(page) {
    let result = "";

    const fieldDetails = new URLSearchParams({

        username: document.getElementById("username").value,
        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
        fromdate: document.getElementById("fromdate").value,
        todate: document.getElementById("todate").value
		
		


    });
	  try {
        const response = await fetch(`http://localhost:1000/api/v1/admin/usersearch?${fieldDetails}&pageNo=${page}`, {

            method: "GET",
        });

        if (response.ok) {

            result = await response.json();
          



        } else {

            const error = await response.json();

            console.error(error.reason);
        }


    } catch (err) {

        console.error(err);

    }

    renderTable(result.content);
    updatePagination(result.page);


}

function renderTable(content) {

    const tbody = document.getElementById("userresultbody");
    tbody.innerHTML = ""; // clear old rows

    content.forEach(item => {
        const created = new Date(item.createdon).toLocaleDateString("en-IN");
        const row = `
	  
	    <tr>
		  
	      <td><a href="/users/edit?id=${item.id}">${item.username} </a></td>
	      <td>${item.firstname}</td>
	      <td>${item.lastname}</td>
		  <td>${created}</td>
		  <td>${item.status}</td>
		  <td><a href="/dashboard?id=${item.id}">Delete</a></td>
	    </tr>
	  `;
        tbody.innerHTML += row;
    });

}

function updatePagination(result) {

    currentPage = result.number;
    totalPages = result.totalPages-1;

    document.getElementById("pageInfo").innerText = `Page ${currentPage} of ${totalPages}`;

    document.getElementById("prevBtn").disabled = currentPage === 0;
    document.getElementById("nextBtn").disabled = currentPage === totalPages;
}

// Button events
document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 0) {
        fetchData(currentPage-1);
    }
});

document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentPage < totalPages) {
        fetchData(currentPage + 1);
    }
});

// initial load
fetchData(0);
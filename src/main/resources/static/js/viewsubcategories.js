let currentPage = 0;
let totalPages = 0;
let id = null;

window.addEventListener("DOMContentLoaded", async () => {


    const queryId = window.location.search;
    id = new URLSearchParams(queryId).get("id");

    console.log("are getting the id ::" + id);
    if (id != null) { fetchData(0); }



})


async function deleteSubCategory(categoryId, subCategoryId) {

    const confirmed = confirm("Are you sure you want to delete this category?");

    if (!confirmed) {
        return; // User clicked Cancel
    }

    try {

        const subCatResponse = await fetch("http://localhost:1000/api/v1/categories/subcategories/" + subCategoryId + "?categoryId=" + categoryId, {
            method: 'DELETE'
        });



        if (subCatResponse.ok) {

            const result = await subCatResponse.json();
            console.log(JSON.stringify(result));

            const successDiv = document.getElementById("responseSuccess");

            successDiv.textContent = "Sub-Category deleted successfully.";
            successDiv.classList.remove("d-none");

            renderTable(result.content);
            updatePagination(result);
        } else {
            const error = await response.json();
            responseError.textContent = error.reason;
            responseError.classList.remove("d-none");
            console.log(error);

        }






    } catch (error) {
        console.error(error);
        responseError.textContent = "Downstream application might be down..";
        responseError.classList.remove("d-none");
    }
}




async function fetchData(page) {

    try {


        console.log("are getting the id ::" + id);


        const subCatResponse = await fetch("http://localhost:1000/api/v1/categories/" + id + "/subcategories?pageNo=" + page, {
            method: 'GET'
        });



        if (subCatResponse.ok) {

            const result = await subCatResponse.json();
            console.log(JSON.stringify(result));
            renderTable(result.content);
            updatePagination(result);
        } else {
            console.log("some error occured")
            throw new error("user data has not fetched");
        }






    } catch (error) {
        console.error(error);
    }

}


function renderTable(data) {

    const tbody = document.getElementById("subcategory");
    tbody.innerHTML = ""; // clear old rows
    let title = document.getElementById("title");
    let catName = "";



    data.forEach(item => {
        const created = new Date(item.createon).toLocaleDateString("en-IN");
        console.log(item.catname);
        catName = item.catname;
        const row = `
		 
	    <tr>
		  
	      <td><a href="/categories/subcategories/add?id=${item.subid}">${item.subname}</a></td>
	      <td>${item.status}</td>
	     <td>${created}</td>
		<td> <a href="#" onclick="deleteSubCategory('${item.catIi}', '${item.subid}'); return false;">
		             Delete
		         </a>
		</td>
	    </tr>
	  `;
        tbody.innerHTML += row;
    });

    title.innerHTML = " View/Edit Sub categories for " + catName;




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

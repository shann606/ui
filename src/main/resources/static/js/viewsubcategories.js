

window.addEventListener("DOMContentLoaded", async () => {


    try {

        const queryId = window.location.search;
        const id = new URLSearchParams(queryId).get("id");




        console.log(id);
        const subCatResponse = await fetch("http://localhost:1000/api/v1/categories/subcategory/" + id + "?pageNo=0", {
            method: 'GET'
        });



        if (subCatResponse.ok) {

            const result = await subCatResponse.json();
            console.log(JSON.stringify(result));
            renderTable(result.content);
        } else {
            console.log("some error occured")
            throw new error("user data has not fetched");
        }






    } catch (error) {
        console.error(error);
    }

})


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
		  
	      <td><a href="/edit?id=${item.subid}">${item.subname}</a></td>
	      <td>${item.status}</td>
	     <td>${created}</td>
		  <td><a href="/dashboard?id=${item.subid}">  Delete</a></td>
	    </tr>
	  `;
        tbody.innerHTML += row;
    });

    title.innerHTML = " View/Edit Sub categories for " + catName;
}

let id;


document.addEventListener("DOMContentLoaded", () => {

    const queryId = window.location.search;
    id = new URLSearchParams(queryId).get("id");
    const name = new URLSearchParams(queryId).get("name");


    const title = document.getElementById("title");
    title.innerHTML = "Add Sub Category for " + name;


    const form = document.getElementById("addsubcategory");
    form.addEventListener("submit", addsubcategory);
})


async function addsubcategory(event) {
    event.preventDefault();
    const responseError = document.getElementById("responseError");
 
    const data = {
        name: document.getElementById("subcatname").value,
        description: document.getElementById("description").value,
        status: document.getElementById("status").value,

    }

    console.log('data before send' + JSON.stringify(data));

    try {
        const response = await fetch("http://localhost:1000/api/v1/categories/" + id + "/subcategory", {
            method: "POST",
            headers: {

                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)

        });

        const result = await response.json();

        if (response.status == 201) {
            const successDiv = document.getElementById("responseSuccess");

            successDiv.textContent = "Sub Category added successfully.";
            successDiv.classList.remove("d-none");

            console.log("Success " + JSON.stringify(result));
            rendertable(result);

        } else {

            console.log("different status" + JSON.stringify(result.reason));
            responseError.textContent = result.reason;
			responseError.classList.remove("d-none");
			
        }



    } catch (err) {
        console.error(err);
        responseError.textContent = "Unable to connect to server...";
		responseError.classList.remove("d-none");
    }




}


function rendertable(data) {
    console.log("in render table " + JSON.stringify(data));

    document.getElementById("subcatname").value = data.name;
    document.getElementById("description").value = data.description;
    document.getElementById("status").value = data.status;
}
let id;
let subCategoryUpdate = false;
let url;


document.addEventListener("DOMContentLoaded", () => {

    const queryId = window.location.search;
    id = new URLSearchParams(queryId).get("id");
    const name = new URLSearchParams(queryId).get("name");




    const title = document.getElementById("title");
    const submit = document.getElementById("submitbutton");

    if (name == null) {
        subCategoryUpdate = true;
    }



    if (subCategoryUpdate) {
        title.innerHTML = "Edit Sub Category";
        submit.innerHTML = "Update Sub-Category";
        getSubCategoryData(id);
    } else {
        title.innerHTML = "Add Sub Category for " + name;
        submit.innerHTML = "Save Sub-Category";
    }





    const form = document.getElementById("addsubcategory");
    form.addEventListener("submit", addsubcategory);
	
	
})



async function getSubCategoryData(id) {

    try {

        const subCategory = await fetch("http://localhost:1000/api/v1/categories/subcategories/" + id, {
            method: 'GET'
        });





        if (subCategory.ok) {

            const result = await subCategory.json();
            rendertable(result);

        } else {

            console.log("different status" + JSON.stringify(result.reason));
            responseError.textContent = result.reason;
            responseError.classList.remove("d-none");
        }






    } catch (error) {
        console.error(error);

        responseError.textContent = "Issue occured in the down stream";
        responseError.classList.remove("d-none");
    }



}


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
        let response = null;

        console.log("update date call " + subCategoryUpdate);


        if (subCategoryUpdate) {

            response = await fetch("http://localhost:1000/api/v1/categories/subcategories/" + id, {
                method: "PUT",
                headers: {

                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)

            });



        } else {




            response = await fetch("http://localhost:1000/api/v1/categories/" + id + "/subcategory", {
                method: "POST",
                headers: {

                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)

            });

        }

        const result = await response.json();

        if (response.status == 200) {
            const successDiv = document.getElementById("responseSuccess");

            successDiv.textContent = subCategoryUpdate ? "Sub-Category updated successfully." : "Sub-Category added successfully.";
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
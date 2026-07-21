let currentPage = 0;
let totalPages = 0;
let newCategory = false;
let id = null;

document.addEventListener("DOMContentLoaded", () => {

    const queryId = window.location.search;
    id = new URLSearchParams(queryId).get("id");
    const name = new URLSearchParams(queryId).get("name");


    if (id == null) {
        newCategory = true;
    }

    const title = document.getElementById("title");
    const submit = document.getElementById("Submit");

    if (newCategory) {
        title.innerHTML = "Add New Category"
        submit.innerHTML = "Save Category"
    } else {
        title.innerHTML = "Update Category " + name;
        submit.innerHTML = "Update Category";

        getCategoryData(id);
    }




    const form = document.getElementById("addcategory");
    form.addEventListener("submit", addCategory);
})

async function getCategoryData(id) {

    try {

        const response = await fetch(`http://localhost:1000/api/v1/categories/` + id, {

            method: "GET",
        });

        if (response.ok) {

            const result = await response.json();

            rendertable(result);

        } else {

            const error = await response.json();
            responseError.textContent = error.reason;
            responseError.classList.remove("d-none");

            console.error(error.reason);
        }



    } catch (err) {

        console.log(err);
        responseError.textContent = "DownStream might be down please try later";
        responseError.classList.remove("d-none");

    }




}


async function addCategory(event) {
    event.preventDefault();
    const responseError = document.getElementById("responseError");

    let result = "";
    let response = "";

    const category = {
        name: document.getElementById("catname").value,
        description: document.getElementById("description").value,
        status: document.getElementById("status").value,
    }

    console.log('sending data ::' + category);
    try {

        if (newCategory) {
            response = await fetch("http://localhost:1000/api/v1/categories", {
                method: "POST",
                headers: {

                    "Content-Type": "application/json"
                },
                body: JSON.stringify(category)

            });

            result = await response.json();

            if (response.status == 201) {
                const successDiv = document.getElementById("responseSuccess");

                successDiv.textContent = "Category added successfully.";
                successDiv.classList.remove("d-none");

                console.log("Success " + JSON.stringify(result));
                rendertable(result);

            } else {

                console.log("different status" + JSON.stringify(result));
                responseError.textContent = result.reason;
                responseError.classList.remove("d-none");
            }
        } else {

            response = await fetch("http://localhost:1000/api/v1/categories/" + id, {
                method: "PUT",
                headers: {

                    "Content-Type": "application/json"
                },
                body: JSON.stringify(category)

            });

            result = await response.json();

            if (response.status == 200) {
                const successDiv = document.getElementById("responseSuccess");

                successDiv.textContent = "Category added successfully.";
                successDiv.classList.remove("d-none");

                console.log("Success " + JSON.stringify(result));
                rendertable(result);

            } else {

                console.log("different status" + JSON.stringify(result));
                responseError.textContent = result.reason;
                responseError.classList.remove("d-none");
            }




        }


    } catch (err) {
        console.error(err);
        responseError.textContent = result.reason;
        responseError.classList.remove("d-none");
    }

}

function rendertable(data) {
    console.log("in render table " + JSON.stringify(data));

    document.getElementById("catname").value = data.name;
    document.getElementById("description").value = data.description;
    document.getElementById("status").value = data.status;

    document.getElementById("addsubcategory").href =
        "/categories/subcategories/add?id=" + encodeURIComponent(data.id) + "&name=" + encodeURIComponent(data.name);

    document.getElementById("viewsubcategory").href =
        "/categories/subcategories?id=" + encodeURIComponent(data.id) + "&pageNo=0";

}
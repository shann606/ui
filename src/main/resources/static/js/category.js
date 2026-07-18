document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("addcategory");
    form.addEventListener("submit", addCategory);
})

async function addCategory(event) {
    event.preventDefault();
    const responseError = document.getElementById("responseError");

    let result = "";

    const category = {
        name: document.getElementById("catname").value,
        description: document.getElementById("description").value,
        status: document.getElementById("status").value,
    }

    console.log('sending data ::' + category);
    try {
        const response = await fetch("http://localhost:1000/api/v1/categories", {
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
        "/categories/subcategories/add?id="+encodeURIComponent(data.id)+"&name="+encodeURIComponent(data.name);
		
		document.getElementById("viewsubcategory").href =
		       "/categories/subcategories?id="+encodeURIComponent(data.id)+"&pageNo=0";

}
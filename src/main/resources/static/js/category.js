document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("addcategory");
    form.addEventListener("submit", addCategory);
})

async function addCategory(event) {
    event.preventDefault();
    const responseError = document.getElementById("responseError");
    responseError.innerHTML = "";
	let result="";

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
		
		result =await response.json();

        if (response.status == 201) {
		
            console.log("Success " + JSON.stringify(result));
            rendertable(result);

        } else {

            console.log("different status" + JSON.stringify(result));
            responseError.innerHTML = result.reason;
          //  throw new Error("Request failed");
        }



    } catch (err) {
        console.error(err);
        responseError.innerHTML = "Unable to connect to server...";
    }

}

function rendertable(data) {
    console.log("in render table " + JSON.stringify(data));

    document.getElementById("catname").value = data.name;
    document.getElementById("description").value = data.description;
    document.getElementById("status").value = data.status;
	
	document.getElementById("addsubcategory").href =
	    "/subcategory/add?id=" + encodeURIComponent(data.id);

}
let isNew = false;
let userId;
let expId;
let canCall = true;


document.addEventListener("DOMContentLoaded", () => {
    const queryId = window.location.search;
    expId = new URLSearchParams(queryId).get("expId");
    if (expId === null) {
        isNew = true;
    }

    const title = document.getElementById("title");
    const submit = document.getElementById("Submit");

    userId = document.getElementById("userId").value;

    if (isNew) {
        title.innerHTML = "Add your expenses"
        submit.innerHTML = "Submit"
        getBaseData('');

    } else {
        title.innerHTML = "Edit your expenses"
        submit.innerHTML = "Update"
        getExpenseData(expId);

    }


})

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

/**
 * getting sub-category data
 */

async function getSubCategoryData(id, selectedId) {

    try {

        const response = await fetch(`http://localhost:1000/api/v1/expenses/subcategories/` + id, {

            method: "GET",
        });

        if (response.ok) {

            const subCategory = await response.json();
            console.log(JSON.stringify("getting Sub-Categories" + subCategory));

            renderSubCategoryDropDown(subCategory, selectedId);

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




function renderSubCategoryDropDown(data, selectedId) {

    const categories = document.getElementById("subcategories");
    categories.innerHTML = '<option value="">Select Sub-Categories</option>';

    data.forEach(zone => {
        categories.add(new Option(zone.name, zone.id));
    });

    categories.value = selectedId;
}


document.getElementById("addexpense").addEventListener("submit", async function(event) {
    event.preventDefault();

    let response;

    const expesnses = {

        userid: document.getElementById("userId").value,

        categoryid: document.getElementById("categories").value,

        subcatgegoryid: document.getElementById("subcategories").value,

        amount: document.getElementById("amount").value,

        payment: document.getElementById("payment").value,

        comments: document.getElementById("comments").value,

        spenton: document.getElementById("spenton").value,


    };

    try {
        console.log(JSON.stringify(expesnses));

        if (isNew) {
            response = await fetch("http://localhost:1000/api/v1/expenses", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    //  [csrfHeader]: csrfToken
                },

                body: JSON.stringify(expesnses)

            });
        } else {

            response = await fetch("http://localhost:1000/api/v1/expenses/" + expId, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                    //  [csrfHeader]: csrfToken
                },

                body: JSON.stringify(expesnses)

            });

            canCall = false;
        }

        if (response.ok) {
            const result = await response.json()
            console.log(JSON.stringify(result));
            if (isNew) {
                window.location.href = "/expenses/edit?expId=" + result.id;
            } else {
                console.log("in update method");
                const successDiv = document.getElementById("responseSuccess");
                successDiv.textContent = "Expense is updated Successfully.";
                successDiv.classList.remove("d-none");
                renderForm(result);
            }


        } else {

            const error = await response.json();

            console.error(error.reason);
            if (!undefined) {
                responseError.innerHTML = error.reason;

                responseError.classList.add("text-danger", "fw-bold");
            }
        }




    } catch (err) {

        console.log(err);
        responseError.textContent = err.reason;
        responseError.classList.remove("d-none");

    }

});

async function getExpenseData(expId) {

    try {

        const response = await fetch(`http://localhost:1000/api/v1/expenses/` + expId, {

            method: "GET",
        });

        if (response.ok) {

            const result = await response.json();
            console.log("getting Expense Data" + JSON.stringify(result));

            renderForm(result);

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

function renderForm(data) {
    if (canCall) {
        getBaseData(data.categoryid);
        getSubCategoryData(data.categoryid, data.subcatgegoryid);
    }

    console.log(JSON.stringify(data));
    document.getElementById("expId").value = data.id;
    document.getElementById("categories").value = data.categoryid;
    document.getElementById("subcategories").value = data.subcatgegoryid;
    document.getElementById("amount").value = data.amount;
    document.getElementById("payment").value = data.payment;
    document.getElementById("comments").value = data.comments;
    document.getElementById("spenton").value = data.spenton.split('T')[0];



}

const loggedUserRole = document.getElementById("loggedinrole")
    .textContent
    .replace("[", "")
    .replace("]", "")
    .split(",")
    .map(r => r.trim());


let restrict = isUserRole(loggedUserRole);




window.addEventListener("DOMContentLoaded", async () => {


    try {

        const queryId = window.location.search;
        const id = new URLSearchParams(queryId).get("id");




        console.log(id);
        const userResponse = await fetch("http://localhost:1000/api/v1/admin/usersearch/" + id, {
            method: 'GET'
        });

        const response = await fetch("/api/v1/timezones");

        if (!response.ok) {
            throw new Error("Failed to fetch time zones");
        }

        const timeZones = await response.json();

        if (userResponse.ok) {

            const result = await userResponse.json();
            renderPage(result, timeZones);

        } else {

            throw new error("user data has not fetched");
        }






    } catch (error) {
        console.error(error);
    }

})




document.getElementById("updateuser").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent page reload

    const responseError = document.getElementById("responseError");
    responseError.innerHTML = "";

    var queryId = window.location.search;
    var id = new URLSearchParams(queryId).get("id");


    let user = "";

    if (restrict) {
        user = {
            username: document.getElementById("email").value,
            mobileno: document.getElementById("mobileno").value,
            timezone: document.getElementById("timeZone").value,


        }
    } else {
        user = {
            username: document.getElementById("email").value,
            mobileno: document.getElementById("mobileno").value,
            statusupdate: document.getElementById("changestatus").value,
            deleteroles: document.getElementById("userroles").value,
            addrole: document.getElementById("changerole").value,
            timezone: document.getElementById("timeZone").value,
            password: document.getElementById("password").value

        }


    }



    console.log(JSON.stringify(user));

    try {
        const response = await fetch("http://localhost:1000/api/v1/admin/users/" + id, {
            method: "PATCH",
            headers: {

                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)

        });

        if (!response.ok) {
            throw new Error("Request failed");
        }


        window.location.reload();
        //    const result =await response.json();
        //     console.log('after update' + JSON.stringify(result));
        //     renderPage(result)



    } catch (error) {
        console.error(error);
        responseError.innerHTML = " * Error in submitting the form , contact support team";
    }
});



function renderPage(data, timeZones) {

    console.log('user data' + JSON.stringify(data));

    document.getElementById("email").value = data.username;
    document.getElementById("firstname").value = data.firstname;
    document.getElementById("lastname").value = data.lastname;
    document.getElementById("mobileno").value = data.mobileno;
    document.getElementById("userstatus").value = data.userstatus;
    if (!restrict) {
        document.getElementById("password").value = data.password


        const status = data.status;
        const changestatus = document.getElementById("changestatus");

        changestatus.innerHTML = '<option value="">Select Status</option>';

        status.forEach(zone => {
            changestatus.add(new Option(zone, zone));
        });


        const userroles = data.userroles;
        const userrole = document.getElementById("userroles")

        userroles.forEach(zone => {
            userrole.add(new Option(zone, zone));
        });

        const roles = data.roles;
        const role = document.getElementById("changerole");

        role.innerHTML = '<option value="">Select role</option>';

        roles.forEach(zone => {
            role.add(new Option(zone, zone));
        });
    }
    const select = document.getElementById("timeZone");

    select.innerHTML = '<option value="">Select Time Zone</option>';

    timeZones.forEach(zone => {
        select.add(new Option(zone, zone));
    });

    select.value = data.timezone;

}



function isUserRole(roles) {

    if (roles.includes("ROLE_USER") && roles.length === 1) {
        return true;
    } else {
        return false;
    }
}

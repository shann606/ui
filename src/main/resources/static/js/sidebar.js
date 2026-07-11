function toggleCategoryMenu() {
	

    const submenu = document.getElementById("categorySubMenu");
    const arrow = document.getElementById("arrow");

    submenu.classList.toggle("show");

    if (submenu.classList.contains("show")) {
        arrow.textContent = "▲";
    } else {
        arrow.textContent = "▼";
    }
}

function toggleExpenseMenu() {
	
	
    const submenu = document.getElementById("expenseSubMenu");
    const arrow = document.getElementById("exparrow");

    submenu.classList.toggle("show");

    if (submenu.classList.contains("show")) {
        arrow.textContent = "▲";
    } else {
        arrow.textContent = "▼";
    }
}
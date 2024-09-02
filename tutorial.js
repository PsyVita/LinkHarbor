document.addEventListener("DOMContentLoaded", function() {
    const startOrganizingButton = document.getElementById("start__organizing__button");



    startOrganizingButton.addEventListener("click", function(event) {
        startOrganizingButton.style.backgroundColor = "#f57761";

    });


    if (localStorage.getItem("LHVisitedTimes") === "LHalreadyVisited") { 
        startOrganizingButton.innerText = "Back to Home";
    } else {
        localStorage.setItem("LHVisitedTimes", "LHalreadyVisited");
        startOrganizingButton.innerText = "Start Organizing!";
    }
    


});
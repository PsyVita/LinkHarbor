document.addEventListener("DOMContentLoaded", function() {
    const startOrganizingButton = document.getElementById("start__organizing__button");



    startOrganizingButton.addEventListener("click", function(event) {
        startOrganizingButton.style.backgroundColor = "#f57761";

    });


    chrome.storage.local.get(["LHVisitedTimes"], function(result) {
        if (result.LHVisitedTimes === undefined) {
            chrome.storage.local.set({ "LHVisitedTimes": "LHalreadyVisited" });
            startOrganizingButton.innerText = "Start Organizing!";
        } else if (result.LHVisitedTimes === "LHalreadyVisited") {
            startOrganizingButton.innerText = "Back to Home";
        }
    });

});
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

    const dontShowAgain = document.getElementById("dont__show__again");

    chrome.storage.local.get(["preferenceCheck"], function(result) {
        if (result.preferenceCheck === "wantStartPage") {
            dontShowAgain.checked = false;
        } else if (result.preferenceCheck === "wantHome") {
            dontShowAgain.checked = true;
        }
    });

    
    dontShowAgain.addEventListener("click", function(event) {
        if (dontShowAgain.checked) {
            chrome.storage.local.set({ "preferenceCheck": "wantHome" });
            chrome.action.setPopup({ popup: "home.html" });
        } else {
            chrome.storage.local.set({ "preferenceCheck": "wantStartPage" });
            chrome.action.setPopup({ popup: "startPage.html" });
        }
    });

});
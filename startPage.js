document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start__button");

    startButton.addEventListener("click", function(event) {
        startButton.style.backgroundColor = "#f57761";

    });

    startButton.addEventListener("mouseup", function(event) {
        
        chrome.storage.local.get(["LHVisitedTimes"], function(result) {
            if (result.LHVisitedTimes === "LHalreadyVisited") {
                window.location.href = "home.html";
            } else {
                window.location.href = "introduction.html";
            }
        });
    });


    chrome.storage.local.get(["preferenceCheck"], function(result) {
        if (result.preferenceCheck === "wantStartPage") {
            console.log("Still want start page");
        } else if (result.preferenceCheck === "wantHome") {
            window.location.href = "home.html";
        }
    });
});




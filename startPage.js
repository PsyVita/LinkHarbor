document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start__button");

    startButton.addEventListener("click", function(event) {
        startButton.style.backgroundColor = "#f57761";

    });

    startButton.addEventListener("mouseup", function(event) {
        chrome.storage.local.get(["LHVisitedTimes"], function(result) {
            if (result.LHVisitedTimes === undefined) {
                window.location.href = "introduction.html";
                chrome.storage.local.set({ "LHVisitedTimes": "LHalreadyVisited" });
            } else if (result.LHVisitedTimes === "LHalreadyVisited") {
                window.location.href = "home.html";
            }
        });
    });
});




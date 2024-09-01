document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start__button");

    startButton.addEventListener("click", function(event) {
        startButton.style.backgroundColor = "#f57761";

    });

    startButton.addEventListener("mouseup", function(event) {
        if (localStorage.getItem("LHVisitedTimes") === "LHalreadyVisited") { 
            window.location.href = "home.html";
        } else {
            window.location.href = "introduction.html";
            localStorage.setItem("LHVisitedTimes", "LHalreadyVisited");
        }
    
    });

});




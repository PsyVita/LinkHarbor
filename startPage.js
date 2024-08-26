document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start__button");

    startButton.addEventListener("click", function(event) {
        //change color to orange when clicked

    });

    startButton.addEventListener("mouseup", function(event) {
        if (localStorage.getItem("LHVisitedTimes") === "LHalreadyVisited") { 
            window.location.href = "home.html";
        } else if (localStorage.getItem("LHVisitedTimes") === null) {
            window.location.href = "introduction.html";
            localStorage.setItem("LHVisitedTimes", "LHalreadyVisited");
        }

    }

    );

});
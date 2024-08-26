document.addEventListener("DOMContentLoaded", function() {
    const project1 = document.getElementById("project1");
    const project2 = document.getElementById("project2");
    const project3 = document.getElementById("project3");
    const project4 = document.getElementById("project4");
    const project5 = document.getElementById("project5");
    const project6 = document.getElementById("project6");
    let clickTimeout;
   
    if (localStorage.selectedProject === "" || localStorage.selectedProject === null) {
        selectProject1();
    } else if (localStorage.selectedProject === "projectOneSelected" ){
        selectProject1();
    } else if (localStorage.selectedProject === "projectTwoSelected" ){
        selectProject2();
    } else if (localStorage.selectedProject === "projectThreeSelected" ){
        selectProject3();
    } else if (localStorage.selectedProject === "projectFourSelected" ){
        selectProject4();
    } else if (localStorage.selectedProject === "projectFiveSelected" ){
        selectProject5();
    } else if (localStorage.selectedProject === "projectSixSelected" ){
        selectProject6();
    }

    //project 1

    project1.addEventListener("click", function(event) {
        clearTimeout(clickTimeout); // Clear any previous timeout

        clickTimeout = setTimeout(function() {
            selectProject1(); // Handle single click
        }, 100); // 300ms delay to distinguish between single and double click
    });

    project1.addEventListener("dblclick", function(event) {
        clearTimeout(clickTimeout); // Cancel the single-click action
        window.location.href = "projectTemplate1.html"; // Navigate to the template page
    });

    function selectProject1() {
        localStorage.setItem("selectedProject", "projectOneSelected");
        project1.style.backgroundColor = "#f57761"; // Change button color
        project1.style.color = "aliceblue";
        document.querySelectorAll('.project__button').forEach(button => {
            if (button !== project1) {
                button.style.backgroundColor = "aliceblue";// Reset to original color
                button.style.color = "black";
            }
        });
    }

    //project 2

    project2.addEventListener("click", function(event) {
        clearTimeout(clickTimeout); // Clear any previous timeout

        clickTimeout = setTimeout(function() {
            selectProject2(); // Handle single click
        }, 100); // 300ms delay to distinguish between single and double click
    });

    project2.addEventListener("dblclick", function(event) {
        clearTimeout(clickTimeout); // Cancel the single-click action
        window.location.href = "projectTemplate2.html"; // Navigate to the template page
    });

    function selectProject2() {
        localStorage.setItem("selectedProject", "projectTwoSelected");
        project2.style.backgroundColor = "#f57761"; // Change button color
        project2.style.color = "aliceblue";
        document.querySelectorAll('.project__button').forEach(button => {
            if (button !== project2) {
                button.style.backgroundColor = "aliceblue";// Reset to original color
                button.style.color = "black";
            }
        });
    }

    //project 3

    project3.addEventListener("click", function(event) {
        clearTimeout(clickTimeout); // Clear any previous timeout

        clickTimeout = setTimeout(function() {
            selectProject3(); // Handle single click
        }, 100); // 300ms delay to distinguish between single and double click
    });

    project3.addEventListener("dblclick", function(event) {
        clearTimeout(clickTimeout); // Cancel the single-click action
        window.location.href = "projectTemplate3.html"; // Navigate to the template page
    });

    function selectProject3() {
        localStorage.setItem("selectedProject", "projectThreeSelected");
        project3.style.backgroundColor = "#f57761"; // Change button color
        project3.style.color = "aliceblue";
        document.querySelectorAll('.project__button').forEach(button => {
            if (button !== project3) {
                button.style.backgroundColor = "aliceblue";// Reset to original color
                button.style.color = "black";
            }
        });
    }

    //project 4

    project4.addEventListener("click", function(event) {
        clearTimeout(clickTimeout); // Clear any previous timeout

        clickTimeout = setTimeout(function() {
            selectProject4(); // Handle single click
        }, 100); // 300ms delay to distinguish between single and double click
    });

    project4.addEventListener("dblclick", function(event) {
        clearTimeout(clickTimeout); // Cancel the single-click action
        window.location.href = "projectTemplate4.html"; // Navigate to the template page
    });

    function selectProject4() {
        localStorage.setItem("selectedProject", "projectFourSelected");
        project4.style.backgroundColor = "#f57761"; // Change button color
        project4.style.color = "aliceblue";
        document.querySelectorAll('.project__button').forEach(button => {
            if (button !== project4) {
                button.style.backgroundColor = "aliceblue";// Reset to original color
                button.style.color = "black";
            }
        });
    }

    //project 5

    project5.addEventListener("click", function(event) {
        clearTimeout(clickTimeout); // Clear any previous timeout

        clickTimeout = setTimeout(function() {
            selectProject5(); // Handle single click
        }, 100); // 300ms delay to distinguish between single and double click
    });

    project5.addEventListener("dblclick", function(event) {
        clearTimeout(clickTimeout); // Cancel the single-click action
        window.location.href = "projectTemplate5.html"; // Navigate to the template page
    });

    function selectProject5() {
        localStorage.setItem("selectedProject", "projectFiveSelected");
        project5.style.backgroundColor = "#f57761"; // Change button color
        project5.style.color = "aliceblue";
        document.querySelectorAll('.project__button').forEach(button => {
            if (button !== project5) {
                button.style.backgroundColor = "aliceblue";// Reset to original color
                button.style.color = "black";
            }
        });
    }

    //project 6

    project6.addEventListener("click", function(event) {
        clearTimeout(clickTimeout); // Clear any previous timeout

        clickTimeout = setTimeout(function() {
            selectProject6(); // Handle single click
        }, 100); // 300ms delay to distinguish between single and double click
    });

    project6.addEventListener("dblclick", function(event) {
        clearTimeout(clickTimeout); // Cancel the single-click action
        window.location.href = "projectTemplate6.html"; // Navigate to the template page
    });

    function selectProject6() {
        localStorage.setItem("selectedProject", "projectSixSelected");
        project6.style.backgroundColor = "#f57761"; // Change button color
        project6.style.color = "aliceblue";
        document.querySelectorAll('.project__button').forEach(button => {
            if (button !== project6) {
                button.style.backgroundColor = "aliceblue";// Reset to original color
                button.style.color = "black";
            }
        });
    }

});


document.addEventListener("DOMContentLoaded", function() {
    const project1 = document.getElementById("project1");
    const project2 = document.getElementById("project2");
    const project3 = document.getElementById("project3");
    const project4 = document.getElementById("project4");
    const project5 = document.getElementById("project5");
    const project6 = document.getElementById("project6");
    let clickTimeout;

    // Check project name update using chrome.storage.local
    chrome.storage.local.get("LHproject1TitleStorage", function(result) {
        if (!result.LHproject1TitleStorage) {
            chrome.storage.local.set({ "LHproject1TitleStorage": "Project #1" });
            project1.innerHTML = "Project #1";
        } else {
            project1.innerHTML = result.LHproject1TitleStorage;
        }
    });

    chrome.storage.local.get("LHproject2TitleStorage", function(result) {
        if (!result.LHproject2TitleStorage) {
            chrome.storage.local.set({ "LHproject2TitleStorage": "Project #2" });
            project2.innerHTML = "Project #2";
        } else {
            project2.innerHTML = result.LHproject2TitleStorage;
        }
    });

    chrome.storage.local.get("LHproject3TitleStorage", function(result) {
        if (!result.LHproject3TitleStorage) {
            chrome.storage.local.set({ "LHproject3TitleStorage": "Project #3" });
            project3.innerHTML = "Project #3";
        } else {
            project3.innerHTML = result.LHproject3TitleStorage;
        }
    });

    chrome.storage.local.get("LHproject4TitleStorage", function(result) {
        if (!result.LHproject4TitleStorage) {
            chrome.storage.local.set({ "LHproject4TitleStorage": "Project #4" });
            project4.innerHTML = "Project #4";
        } else {
            project4.innerHTML = result.LHproject4TitleStorage;
        }
    });

    chrome.storage.local.get("LHproject5TitleStorage", function(result) {
        if (!result.LHproject5TitleStorage) {
            chrome.storage.local.set({ "LHproject5TitleStorage": "Project #5" });
            project5.innerHTML = "Project #5";
        } else {
            project5.innerHTML = result.LHproject5TitleStorage;
        }
    });

    chrome.storage.local.get("LHproject6TitleStorage", function(result) {
        if (!result.LHproject6TitleStorage) {
            chrome.storage.local.set({ "LHproject6TitleStorage": "Project #6" });
            project6.innerHTML = "Project #6";
        } else {
            project6.innerHTML = result.LHproject6TitleStorage;
        }
    });

    // Load selected project from chrome.storage.local and highlight
    chrome.storage.local.get("selectedProject", function(result) {
        if (!result.selectedProject) {
            selectProject1();
        } else if (result.selectedProject === "projectOneSelected") {
            selectProject1();
        } else if (result.selectedProject === "projectTwoSelected") {
            selectProject2();
        } else if (result.selectedProject === "projectThreeSelected") {
            selectProject3();
        } else if (result.selectedProject === "projectFourSelected") {
            selectProject4();
        } else if (result.selectedProject === "projectFiveSelected") {
            selectProject5();
        } else if (result.selectedProject === "projectSixSelected") {
            selectProject6();
        }
    });

    // Handle project 1 click and double-click
    project1.addEventListener("click", function(event) {
        clearTimeout(clickTimeout); // Clear any previous timeout

        clickTimeout = setTimeout(function() {
            selectProject1(); // Handle single click
        }, 100); // 100ms delay to distinguish between single and double click
    });

    project1.addEventListener("dblclick", function(event) {
        clearTimeout(clickTimeout); // Cancel the single-click action
        window.location.href = "projectTemplate1.html"; // Navigate to the template page
    });

    function selectProject1() {
        chrome.storage.local.set({ "selectedProject": "projectOneSelected" });
        project1.style.backgroundColor = "#f57761"; // Change button color
        project1.style.color = "aliceblue";
        document.querySelectorAll('.project__button').forEach(button => {
            if (button !== project1) {
                button.removeAttribute("style"); // Reset to original color
            }
        });
    }

    // Handle project 2 click and double-click
    project2.addEventListener("click", function(event) {
        clearTimeout(clickTimeout);

        clickTimeout = setTimeout(function() {
            selectProject2();
        }, 100);
    });

    project2.addEventListener("dblclick", function(event) {
        clearTimeout(clickTimeout);
        window.location.href = "projectTemplate2.html";
    });

    function selectProject2() {
        chrome.storage.local.set({ "selectedProject": "projectTwoSelected" });
        project2.style.backgroundColor = "#f57761";
        project2.style.color = "aliceblue";
        document.querySelectorAll('.project__button').forEach(button => {
            if (button !== project2) {
                button.removeAttribute("style");
            }
        });
    }

    // Handle project 3 click and double-click
    project3.addEventListener("click", function(event) {
        clearTimeout(clickTimeout);

        clickTimeout = setTimeout(function() {
            selectProject3();
        }, 100);
    });

    project3.addEventListener("dblclick", function(event) {
        clearTimeout(clickTimeout);
        window.location.href = "projectTemplate3.html";
    });

    function selectProject3() {
        chrome.storage.local.set({ "selectedProject": "projectThreeSelected" });
        project3.style.backgroundColor = "#f57761";
        project3.style.color = "aliceblue";
        document.querySelectorAll('.project__button').forEach(button => {
            if (button !== project3) {
                button.removeAttribute("style");
            }
        });
    }

    // Handle project 4 click and double-click
    project4.addEventListener("click", function(event) {
        clearTimeout(clickTimeout);

        clickTimeout = setTimeout(function() {
            selectProject4();
        }, 100);
    });

    project4.addEventListener("dblclick", function(event) {
        clearTimeout(clickTimeout);
        window.location.href = "projectTemplate4.html";
    });

    function selectProject4() {
        chrome.storage.local.set({ "selectedProject": "projectFourSelected" });
        project4.style.backgroundColor = "#f57761";
        project4.style.color = "aliceblue";
        document.querySelectorAll('.project__button').forEach(button => {
            if (button !== project4) {
                button.removeAttribute("style");
            }
        });
    }

    // Handle project 5 click and double-click
    project5.addEventListener("click", function(event) {
        clearTimeout(clickTimeout);

        clickTimeout = setTimeout(function() {
            selectProject5();
        }, 100);
    });

    project5.addEventListener("dblclick", function(event) {
        clearTimeout(clickTimeout);
        window.location.href = "projectTemplate5.html";
    });

    function selectProject5() {
        chrome.storage.local.set({ "selectedProject": "projectFiveSelected" });
        project5.style.backgroundColor = "#f57761";
        project5.style.color = "aliceblue";
        document.querySelectorAll('.project__button').forEach(button => {
            if (button !== project5) {
                button.removeAttribute("style");
            }
        });
    }

    // Handle project 6 click and double-click
    project6.addEventListener("click", function(event) {
        clearTimeout(clickTimeout);

        clickTimeout = setTimeout(function() {
            selectProject6();
        }, 100);
    });

    project6.addEventListener("dblclick", function(event) {
        clearTimeout(clickTimeout);
        window.location.href = "projectTemplate6.html";
    });

    function selectProject6() {
        chrome.storage.local.set({ "selectedProject": "projectSixSelected" });
        project6.style.backgroundColor = "#f57761";
        project6.style.color = "aliceblue";
        document.querySelectorAll('.project__button').forEach(button => {
            if (button !== project6) {
                button.removeAttribute("style");
            }
        });
    }

    clearAllStorage = document.getElementById("clearAllStorage");
    clearAllStorage.addEventListener("click", function() {
        const userConfirmed = confirm("Are you sure you want to reset everything? All saved work will be lost. Once cleared, the extension will close automatically.");

        if (userConfirmed) {
            chrome.storage.local.clear();
            window.close();
        }
    });
});

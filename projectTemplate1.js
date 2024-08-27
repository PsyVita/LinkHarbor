document.addEventListener("DOMContentLoaded", function() {
    
    const project1Title = document.getElementById("project1Title");
    const project1TitleValue = project1Title.value;

    project1Title.addEventListener("input", function(event) {
        console.log("Input changed to:", event.target.value); // Debugging statement
    });

    // Event listener for Enter key press
    project1Title.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            console.log("Enter key pressed. Final input value:", event.target.value); // Debugging statement
            // Perform any action you need here
        }
    });

});

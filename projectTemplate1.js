document.addEventListener("DOMContentLoaded", function() {
    
    const project1Title = document.getElementById("project1Title");
    

    if (project1Title.value !== localStorage.getItem("LHproject1TitleStorage"))
        project1Title.value = localStorage.getItem("LHproject1TitleStorage");


    // Event listener for Enter key press
    project1Title.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            const project1CurrentTitle = event.target.value;
            project1Title.value = project1CurrentTitle;
            project1Title.blur();
            localStorage.setItem("LHproject1TitleStorage", project1CurrentTitle);
        }
    });

});

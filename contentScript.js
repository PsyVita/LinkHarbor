



const floatingButton = document.createElement("button");
    floatingButton.id = "floatingButton";
    floatingButton.innerText = "+";
    document.body.appendChild(floatingButton);
    console.log("Floating button created");

  
    const project1port = chrome.runtime.connect({ name: "project1" });

    document.addEventListener('DOMContentLoaded', function() {
    
        // Add event listener for button click
        floatingButton.addEventListener("click", function() {
            if (selectedProject === "projectOneSelected" ){
                project1port.postMessage({ data: "savetheURL" });
                
                
            } 
            floatingButton.innerText = "Saved!";
            floatingButton.disabled = true;
            setTimeout(() => {
                floatingButton.style.opacity = "0"; // Hide the button
            }, 5000);
            setTimeout(() => {
                floatingButton.style.display = "none"; // Hide the button
            }, 6000);
                
            });

    });

        // Send a message to the background script
//check if project 1 is highlighted
//send array of local storage to project 1




const floatingButton = document.createElement("button");
    floatingButton.id = "floatingButton";
    floatingButton.innerText = "+";
    document.body.appendChild(floatingButton);
    console.log("Floating button created");

  
    

    
        // Add event listener for button click
        floatingButton.addEventListener("click", function() {
            if (localStorage.selectedProject === "projectOneSelected" ){
                chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                    chrome.runtime.sendMessage({ type: "saveURLto1" });
                });
            } 
  

        // Send a message to the background script
        chrome.runtime.sendMessage({ type: "buttonClicked" });
        floatingButton.innerText = "Saved!";
        floatingButton.disabled = true;
        setTimeout(() => {
            floatingButton.style.opacity = "0"; // Hide the button
        }, 5000);
        setTimeout(() => {
            floatingButton.style.display = "none"; // Hide the button
        }, 6000);
            
        });

//check if project 1 is highlighted
//send array of local storage to project 1
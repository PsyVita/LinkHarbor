



const floatingButton = document.createElement("button");
    floatingButton.id = "floatingButton";
    floatingButton.innerText = "+";
    document.body.appendChild(floatingButton);
    console.log("Floating button created");

    let Project1Article = [];
    let Project1URL = JSON.parse(localStorage.getItem("LHProject1URL")) || [];
    localStorage.setItem("LHProject1Article", JSON.stringify(Project1Article));
    
    
        // Add event listener for button click
        floatingButton.addEventListener("click", function() {
            if (localStorage.selectedProject === "projectOneSelected" ){
                chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                    const current_url = tabs[0].url;
                    Project1URL.push(current_url);
                    console.log(Project1URL);

                    const testing = document.createElement("p");
                    testing.textContent = Project1URL.join(", ");
                    document.body.appendChild(testing);

                    
                    localStorage.setItem("LHProject1URL", JSON.stringify(Project1URL));
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
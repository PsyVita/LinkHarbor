



const floatingButton = document.createElement("button");
    floatingButton.id = "floatingButton";
    floatingButton.innerText = "+";
    document.body.appendChild(floatingButton);
    console.log("Floating button created");

  
    var projectPort = chrome.runtime.connect({ name: "contentScript-background" });
 // Add event listener for button click
    floatingButton.addEventListener("click", function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const current_url = tabs[0].url;
            //project1port.postMessage({ WebsiteArticle: current_title });
            const websiteInfoSet = {
                URL: current_url
               // title: current_title
            };

            const websiteInfoSetString = JSON.stringify(websiteInfoSet);

            projectPort.postMessage({ articleDataSet: websiteInfoSetString });

            }
           
        );

    floatingButton.innerText = "Saved!";
    floatingButton.disabled = true;
    setTimeout(() => {
        floatingButton.style.opacity = "0"; // Hide the button
    }, 5000);
    setTimeout(() => {
        floatingButton.style.display = "none"; // Hide the button   
    }, 6000);
        
    });

    
       


        // Send a message to the background script
//check if project 1 is highlighted
//send array of local storage to project 1
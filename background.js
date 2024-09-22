


chrome.runtime.onConnect.addListener(function(port) {
    console.log("Connected port name:", port.name); // Log the port name for debugging
    console.assert(port.name === "contentScript-background");
    

    port.onMessage.addListener(function(message) {
        console.log("Message received from contentScript.js:", message);
        if (message.type === "normalSavingSignal") {
            console.log("Inside if statement");
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                
            
 

                        chrome.storage.local.get(["selectedProject", "LHProject1URL", "LHProject1Article", "websiteInfoSet"], function(result) {
                            console.log("Result:", result);
                            let Project1URL = result.LHProject1URL || [];
                            let Project1Article = result.LHProject1Article || [];

                            console.log("Project1URL:", Project1URL);

                            if (result.selectedProject === "projectOneSelected") {
                                Project1URL.push(result.websiteInfoSet.URL);
                                Project1Article.push(result.websiteInfoSet.title);

                                chrome.storage.local.set({
                                    LHProject1URL: Project1URL,
                                    LHProject1Article: Project1Article
                                }, function() {
                                    console.log("URLs and articles updated in storage");
                                });
                            }
                        }); 

                }); 
            } 
        }); 
    }); 
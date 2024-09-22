


chrome.runtime.onConnect.addListener(function(port) {
    console.log("Connected port name:", port.name); // Log the port name for debugging
    console.assert(port.name === "contentScript-background");

    port.onMessage.addListener(function(message) {
        console.log("Message received from contentScript.js:", message);
        if (message.type === "savingSignal") {
            console.log("Inside if statement");
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                const current_url = tabs[0].url;
                console.log("Current URL:", current_url);

                


                    const websiteInfoSet = {
                        URL: current_url,
                        title: current_title || "No title found",
                        author: current_author || "Anonymous",
                        published_date: current_published_date || "n.d.",
                        summary: current_summary || "No summary found"
                    };

                    console.log("Website Info Set:", websiteInfoSet);

                        chrome.storage.local.get(["selectedProject", "LHProject1URL", "LHProject1Article"], function(result) {
                            console.log("Result:", result);
                            let Project1URL = result.LHProject1URL || [];
                            let Project1Article = result.LHProject1Article || [];

                            console.log("Project1URL:", Project1URL);

                            if (result.selectedProject === "projectOneSelected") {
                                Project1URL.push(websiteInfoSet.URL);
                                // Assuming you want to save the title as well
                                Project1Article.push(websiteInfoSet.title);

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
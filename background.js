


chrome.runtime.onConnect.addListener(function(port) {
    console.log("Connected port name:", port.name); // Log the port name for debugging
   // console.assert(port.name === "contentScript-background");
    
    port.onDisconnect.addListener(() => {
        console.log("Port disconnected");
    });

  //  var port = chrome.runtime.connect({ name: "background-contentScript" });
/*
if (port.name === "project1-background") {
    port.onMessage.addListener(function(message) {
        console.log("Message received from project.js:", message);
        if (message.type === "bundleSavingSignal") {
            port.postmessage({ type: "backtoContentScript", current_url: message.current_url });
        }
    });
} */

if (port.name === "contentScript-background") {
    port.onMessage.addListener(function(message) {
        console.log("Message received from contentScript.js:", message);
        if (message.type === "normalSavingSignal") {
            console.log("Inside if statement");
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                
            
 

                        chrome.storage.local.get(["selectedProject", "LHProject1URL", "LHProject1Article", "LHProject1Author", "LHProject1PublishedDate", "LHProject1Summary", "websiteInfoSet"], function(result) {
                            console.log("Result:", result);
                            let Project1URL = result.LHProject1URL || [];
                            let Project1Article = result.LHProject1Article || [];
                            let Project1Author = result.LHProject1Author || [];
                            let Project1PublishedDate = result.LHProject1PublishedDate || [];
                            let Project1Summary = result.LHProject1Summary || [];


                            if (result.selectedProject === "projectOneSelected") {
                                Project1URL.push(result.websiteInfoSet.URL);
                                Project1Article.push(result.websiteInfoSet.title);
                                Project1Author.push(result.websiteInfoSet.author);
                                Project1PublishedDate.push(result.websiteInfoSet.published_date);
                                Project1Summary.push(result.websiteInfoSet.summary);

                                chrome.storage.local.set({
                                    LHProject1URL: Project1URL,
                                    LHProject1Article: Project1Article,
                                    LHProject1Author: Project1Author,
                                    LHProject1PublishedDate: Project1PublishedDate,
                                    LHProject1Summary: Project1Summary
                                }, function() {
                                    console.log("URLs and articles updated in storage");
                                });
                            }
                        }); 

                }); 
            } 
        }); 
    }; 
});

    async function createOffscreen() {
        await chrome.offscreen.createDocument({
          url: 'offscreen.html',
          reasons: ['BLOBS'],
          justification: 'keep service worker running',
        }).catch(() => {});
      }
      chrome.runtime.onStartup.addListener(createOffscreen);
      self.onmessage = e => {}; // keepAlive
      createOffscreen();
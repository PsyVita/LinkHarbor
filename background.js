
let statusSaved = false;

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

                                if (Project1URL.includes(result.websiteInfoSet.URL)) {
                                    setTimeout(() => {
                                        let current_tab_id;
                                        chrome.tabs.query({'active': true, 'lastFocusedWindow': true, 'currentWindow': true}, function (tabs) {
                                        current_tab_id = tabs[0].id;
                                        console.log("Last focused tab:", current_tab_id);
                                        chrome.tabs.sendMessage(Number(current_tab_id), { type: "alreadySavedOnce", repeated_URL: result.websiteInfoSet.URL });
                                    });
                                    }, 1000);
                                    
                                } else {
                                    Project1URL.push(result.websiteInfoSet.URL);
                                    Project1Article.push(result.websiteInfoSet.title);
                                    Project1Author.push(result.websiteInfoSet.author);
                                    Project1PublishedDate.push(result.websiteInfoSet.published_date);
                                    Project1Summary.push(result.websiteInfoSet.summary);

                                    
                                    setTimeout(() => {
                                        if (statusSaved === true) {
                                            let current_tab_id;
                                            chrome.tabs.query({'active': true, 'lastFocusedWindow': true, 'currentWindow': true}, function (tabs) {
                                                current_tab_id = tabs[0].id;
                                                chrome.tabs.sendMessage(Number(current_tab_id), { type: "singleImportComplete" });
                                                //var port = chrome.runtime.connect({ name: "background-project1" });
                                                //port.postMessage({ type: "singleImportComplete" });
                                                statusSaved = false;
                                            });
                                        }
                                    }, 30);
                                    

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

                                

                                
        
                            }
                        }); 

                }); 
           
        
            }
        }); 
    }; 



    function focusTab(tabId) {
        chrome.tabs.update(tabId, { active: true }, function(tab) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
            } else {
                console.log("Focused on tab:", tab);
            }
        });
    }


if (port.name === "import-project-background") {
    port.onMessage.addListener(function(message) {
        console.log("Message received from project.js:", message);
        let current_tab_id;
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true, 'currentWindow': true}, function (tabs) {
            current_tab_id = tabs[0].id;
            console.log("Last focused tab:", current_tab_id);
        });

        if (message.type === "importSavingSignal") {
            console.log(message.current_tab_id);
            focusTab(Number(message.current_tab_id));
            
            setTimeout(() => {
            chrome.tabs.sendMessage(Number(message.current_tab_id), { type: "importSavingSignal2", current_tab_id: message.current_tab_id });
            }, 10);


            setTimeout(() => {
                focusTab(Number(current_tab_id));
                
            }, 20);

            statusSaved = true;

            /*
            setTimeout(() => {
                chrome.windows.create({
                    url: chrome.runtime.getURL("projectTemplate1.html"), // Replace with your popup HTML file
                    type: "popup",
                    width: 600, // Optional: Specify dimensions
                    height: 400
                });
            }, 500);
            */
        
        /*    
            
            const targeturl = message.current_url;
            console.log("URL received from project.js:", targeturl);

            chrome.tabs.query({ url: targeturl }, function(tabs) {
                if (tabs.length > 0) {
                    const targetTab = tabs[0];
                    console.log("Target tab:", targetTab, targetTab.id);
                    
                    chrome.tabs.sendMessage(targetTab.id, { type: "importSavingSignal2" }, function(response) {
                        if (chrome.runtime.lastError) {
                            console.log("Error:", chrome.runtime.lastError);
                        } else if (response) {
                            console.error("Response from contentScript.js:", response);
                        }
                    
                    });


                } else {
                    console.log("No tabs found");
                }
            });
            */
        }

        if (message.type === "bundleSavingSignal") {
            console.log(message.bundle_tabs);
            
            for (let i = 0; i < message.bundle_tabs.length; i++) {
                setTimeout(() => {
                    focusTab(Number(message.bundle_tabs[i]));
                }, 10*i);
                setTimeout(() => {
                    chrome.tabs.sendMessage(Number(message.bundle_tabs[i]), { type: "importSavingSignal2", current_tab_id: message.bundle_tabs[i] });
                }, 20*i);
            }

            setTimeout(() => {
                focusTab(Number(current_tab_id));
                chrome.tabs.sendMessage(Number(current_tab_id), { type: "bundleImportComplete" });
            }, (message.bundle_tabs.length * 10)+10);

         
        }
    });
}


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
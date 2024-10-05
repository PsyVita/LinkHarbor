
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
                
            
 

                        chrome.storage.local.get(["selectedProject", "LHProject1URL", "LHProject1Article", "LHProject1Author", "LHProject1PublishedDate", "LHProject1Summary", "websiteInfoSet", 
                        "LHProject2URL", "LHProject2Article", "LHProject2Author", "LHProject2PublishedDate", "LHProject2Summary",
                        "LHProject3URL", "LHProject3Article", "LHProject3Author", "LHProject3PublishedDate", "LHProject3Summary",
                        "LHProject4URL", "LHProject4Article", "LHProject4Author", "LHProject4PublishedDate", "LHProject4Summary",
                        "LHProject5URL", "LHProject5Article", "LHProject5Author", "LHProject5PublishedDate", "LHProject5Summary",
                        "LHProject6URL", "LHProject6Article", "LHProject6Author", "LHProject6PublishedDate", "LHProject6Summary"
                        ], function(result) {
                            console.log("Result:", result);
                            let thisProjectURL = [];
                            let thisProjectArticle = [];
                            let thisProjectAuthor = [];
                            let thisProjectPublishedDate = [];
                            let thisProjectSummary = [];
                            

                            if (result.selectedProject === "projectOneSelected") {
                                thisProjectURL = result.LHProject1URL || [];
                                thisProjectArticle = result.LHProject1Article || [];
                                thisProjectAuthor = result.LHProject1Author || [];
                                thisProjectPublishedDate = result.LHProject1PublishedDate || [];
                                thisProjectSummary = result.LHProject1Summary || [];

                                savetoProject();

                                chrome.storage.local.set({
                                    LHProject1URL: thisProjectURL,
                                    LHProject1Article: thisProjectArticle,
                                    LHProject1Author: thisProjectAuthor,
                                    LHProject1PublishedDate: thisProjectPublishedDate,
                                    LHProject1Summary: thisProjectSummary
                                }, function() {
                                    console.log("URLs and articles updated in storage");
                                });

                                thisProjectURL = [];
                                thisProjectArticle = [];
                                thisProjectAuthor = [];
                                thisProjectPublishedDate = [];
                                thisProjectSummary = [];
                            }

                            if (result.selectedProject === "projectTwoSelected") {
                                thisProjectURL = result.LHProject2URL || [];
                                thisProjectArticle = result.LHProject2Article || [];
                                thisProjectAuthor = result.LHProject2Author || [];
                                thisProjectPublishedDate = result.LHProject2PublishedDate || [];
                                thisProjectSummary = result.LHProject2Summary || [];

                                savetoProject();

                                chrome.storage.local.set({
                                    LHProject2URL: thisProjectURL,
                                    LHProject2Article: thisProjectArticle,
                                    LHProject2Author: thisProjectAuthor,
                                    LHProject2PublishedDate: thisProjectPublishedDate,
                                    LHProject2Summary: thisProjectSummary
                                }, function() {
                                    console.log("URLs and articles updated in storage");
                                });

                                thisProjectURL = [];
                                thisProjectArticle = [];
                                thisProjectAuthor = [];
                                thisProjectPublishedDate = [];
                                thisProjectSummary = [];

                            }

                            if (result.selectedProject === "projectThreeSelected") {
                                thisProjectURL = result.LHProject3URL || [];
                                thisProjectArticle = result.LHProject3Article || [];
                                thisProjectAuthor = result.LHProject3Author || [];
                                thisProjectPublishedDate = result.LHProject3PublishedDate || [];
                                thisProjectSummary = result.LHProject3Summary || [];

                                savetoProject();

                                chrome.storage.local.set({
                                    LHProject3URL: thisProjectURL,
                                    LHProject3Article: thisProjectArticle,
                                    LHProject3Author: thisProjectAuthor,
                                    LHProject3PublishedDate: thisProjectPublishedDate,
                                    LHProject3Summary: thisProjectSummary
                                }, function() {
                                    console.log("URLs and articles updated in storage");
                                });

                                thisProjectURL = [];
                                thisProjectArticle = [];
                                thisProjectAuthor = [];
                                thisProjectPublishedDate = [];
                                thisProjectSummary = [];

                            }

                            if (result.selectedProject === "projectFourSelected") {
                                thisProjectURL = result.LHProject4URL || [];
                                thisProjectArticle = result.LHProject4Article || [];
                                thisProjectAuthor = result.LHProject4Author || [];
                                thisProjectPublishedDate = result.LHProject4PublishedDate || [];
                                thisProjectSummary = result.LHProject4Summary || [];

                                savetoProject();

                                chrome.storage.local.set({
                                    LHProject4URL: thisProjectURL,
                                    LHProject4Article: thisProjectArticle,
                                    LHProject4Author: thisProjectAuthor,
                                    LHProject4PublishedDate: thisProjectPublishedDate,
                                    LHProject4Summary: thisProjectSummary
                                }, function() {
                                    console.log("URLs and articles updated in storage");
                                });

                                thisProjectURL = [];
                                thisProjectArticle = [];
                                thisProjectAuthor = [];
                                thisProjectPublishedDate = [];
                                thisProjectSummary = [];

                            }

                            if (result.selectedProject === "projectFiveSelected") {
                                thisProjectURL = result.LHProject5URL || [];
                                thisProjectArticle = result.LHProject5Article || [];
                                thisProjectAuthor = result.LHProject5Author || [];
                                thisProjectPublishedDate = result.LHProject5PublishedDate || [];
                                thisProjectSummary = result.LHProject5Summary || [];

                                savetoProject();

                                chrome.storage.local.set({
                                    LHProject5URL: thisProjectURL,
                                    LHProject5Article: thisProjectArticle,
                                    LHProject5Author: thisProjectAuthor,
                                    LHProject5PublishedDate: thisProjectPublishedDate,
                                    LHProject5Summary: thisProjectSummary
                                }, function() {
                                    console.log("URLs and articles updated in storage");
                                });

                                thisProjectURL = [];
                                thisProjectArticle = [];
                                thisProjectAuthor = [];
                                thisProjectPublishedDate = [];
                                thisProjectSummary = [];

                            }

                            if (result.selectedProject === "projectSixSelected") {
                                thisProjectURL = result.LHProject6URL || [];
                                thisProjectArticle = result.LHProject6Article || [];
                                thisProjectAuthor = result.LHProject6Author || [];
                                thisProjectPublishedDate = result.LHProject6PublishedDate || [];
                                thisProjectSummary = result.LHProject6Summary || [];

                                savetoProject();

                                chrome.storage.local.set({
                                    LHProject6URL: thisProjectURL,
                                    LHProject6Article: thisProjectArticle,
                                    LHProject6Author: thisProjectAuthor,
                                    LHProject6PublishedDate: thisProjectPublishedDate,
                                    LHProject6Summary: thisProjectSummary
                                }, function() {
                                    console.log("URLs and articles updated in storage");
                                });

                                thisProjectURL = [];
                                thisProjectArticle = [];
                                thisProjectAuthor = [];
                                thisProjectPublishedDate = [];
                                thisProjectSummary = [];

                            }

                                
                                function savetoProject() {
                                    if (thisProjectURL.includes(result.websiteInfoSet.URL)) {
                                        setTimeout(() => {
                                            let current_tab_id;
                                            chrome.tabs.query({'active': true, 'lastFocusedWindow': true, 'currentWindow': true}, function (tabs) {
                                            current_tab_id = tabs[0].id;
                                            console.log("Last focused tab:", current_tab_id);
                                            chrome.tabs.sendMessage(Number(current_tab_id), { type: "alreadySavedOnce", repeated_URL: result.websiteInfoSet.URL });
                                        });
                                        }, 1000);
                                        
                                    } else {
                                        thisProjectURL.push(result.websiteInfoSet.URL);
                                        thisProjectArticle.push(result.websiteInfoSet.title);
                                        thisProjectAuthor.push(result.websiteInfoSet.author);
                                        thisProjectPublishedDate.push(result.websiteInfoSet.published_date);
                                        thisProjectSummary.push(result.websiteInfoSet.summary);
    
                                        
                                        setTimeout(() => {
                                            if (statusSaved === true) {
                                                let current_tab_id;
                                                console.log("Status saved now:", statusSaved);
                                                chrome.tabs.query({'active': true, 'lastFocusedWindow': true, 'currentWindow': true}, function (tabs) {
                                                    current_tab_id = tabs[0].id;
                                                    chrome.tabs.sendMessage(Number(current_tab_id), { type: "singleImportComplete" });
                                                    //var port = chrome.runtime.connect({ name: "background-project1" });
                                                    //port.postMessage({ type: "singleImportComplete" });
                                                    statusSaved = false;
                                                });
                                            }
                                        }, 30);
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
            console.log("Status saved:", statusSaved);

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
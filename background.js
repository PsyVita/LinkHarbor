import { MY_API_KEY } from "./config";

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

                const url = 'https://article-parser-and-summary-free-1000-requests.p.rapidapi.com/';
                const options = {
                    method: 'POST',
                    headers: {
                        'x-rapidapi-key': MY_API_KEY,
                        'x-rapidapi-host': 'article-parser-and-summary-free-1000-requests.p.rapidapi.com',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        url: current_url
                    })
                };
                
                (async () => {
                    try {
                        const response = await fetch(url, options);
                        const articleData = await response.json();
                        console.log(result);

                        const current_author = articleData.author || "Anonymous";
                        const current_title = articleData.title || "No title found";
                        const current_published_date = articleData.date || "n.d.";
                        const current_summary = articleData.summary || "No summary found";

                        const websiteInfoSet = {
                            URL: current_url,
                            title: current_title,
                            author: current_author,
                            published_date: current_published_date,
                            summary: current_summary
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
                    } catch (error) {
                        console.error(error);
                    }
                })();
            });
        }
    });
});
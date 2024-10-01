



const floatingButton = document.createElement("button");
    floatingButton.id = "floatingButton";
    floatingButton.innerText = "LH";
  // const imgElement = document.createElement("img");
  // imgElement.src = chrome.runtime.getURL("images/full anchor.png"); // Use chrome.runtime.getURL to get the correct path
  // imgElement.style.width = "30px"; // Set the width of the image
  // imgElement.style.height = "30px"; // Set the height of the image

// Append the img element to the button
 //  floatingButton.appendChild(imgElement);
    document.body.appendChild(floatingButton);
    console.log("Floating button created");

    if (window.location.href.startsWith("https://www.google.com/search?")) {
            floatingButton.style.display = "none"; }
    

  
    var projectPort = chrome.runtime.connect({ name: "contentScript-background" });
 // Add event listener for button click
    floatingButton.addEventListener("click", function() {

        console.log("clicked");

        const current_url = window.location.href;
        console.log("Current URL:", current_url);

        if (window.location.href.startsWith("https://www.youtube.com/watch?")) {
            chrome.storage.local.set({ "SavedType": "YouTube" });

            let current_author, current_published_date, current_title, shortenedPublishedDate;

            const metaInfo = document.getElementsByTagName("meta");
            for (let i = 0; i < metaInfo.length; i++) {
                if (metaInfo[i].getAttribute("itemprop") == null) {
                    continue;
                } else {
                    if (metaInfo[i].getAttribute("itemprop") === ("datePublished") ) {
                        current_published_date = metaInfo[i].getAttribute("content");
                        shortenedPublishedDate =  current_published_date.slice(0, 4);
                        console.log("Current Published Date:", shortenedPublishedDate);
                    } else if (metaInfo[i].getAttribute("itemprop") === ("name")) {
                        current_title = metaInfo[i].getAttribute("content");
                        console.log("Current Title:", current_title);
                    }
                }
            }

            const linkInfo = document.getElementsByTagName("link");
            for (let i = 0; i < linkInfo.length; i++) {
                if (linkInfo[i].getAttribute("itemprop") == null) {
                    continue;
                } else {
                    if (linkInfo[i].getAttribute("itemprop") === ("name")) {
                        current_author = linkInfo[i].getAttribute("content");
                        console.log("Current Author:", current_author);
                }
            }
                
            }

            
            
            
                
        const websiteInfoSet = {
            URL: current_url,
            title: current_title || "No title found",
            author: current_author || "Anonymous",
            published_date: shortenedPublishedDate || "n.d.",
            summary: "Summary not available for YouTube videos."
        };

        console.log("Website Info Set:", websiteInfoSet);



        chrome.storage.local.set({ "websiteInfoSet": websiteInfoSet });
    
        } else {
                chrome.storage.local.set({ "SavedType": "normal" });
                let current_author, current_published_date, current_summary, current_title;

                const metaInfo = document.getElementsByTagName("meta");
                for (let i = 0; i < metaInfo.length; i++) {
                    if (metaInfo[i].getAttribute("name") == null) {
                        continue;
                    } else {
                        if (metaInfo[i].getAttribute("name").toLowerCase().includes("author") 
                            || metaInfo[i].getAttribute("name").toLowerCase().includes("writer") 
                            || metaInfo[i].getAttribute("name").toLowerCase().includes("publisher")) {
                            current_author = metaInfo[i].getAttribute("content");
                            console.log("Current Author:", current_author);
                        } else if (metaInfo[i].getAttribute("name").includes("date") ) {
                            current_published_date = metaInfo[i].getAttribute("content");
                            console.log("Current Published Date:", current_published_date);
                        } else if (metaInfo[i].getAttribute("name").includes("description") 
                            || metaInfo[i].getAttribute("name").includes("summary")) {
                            current_summary = metaInfo[i].getAttribute("content");
                            console.log("Current Summary:", current_summary);
                        } else if (metaInfo[i].getAttribute("name").includes("title")) {
                            current_title = metaInfo[i].getAttribute("content");
                            console.log("Current Title:", current_title);
                        }
                    }

                
                }

                if (current_author == null) {
                    for (let i = 0; i < metaInfo.length; i++) {
                        if (metaInfo[i].getAttribute("property") == null) {
                            continue;
                        } else {
                            if (metaInfo[i].getAttribute("property").toLowerCase().includes("author") 
                            || metaInfo[i].getAttribute("property").toLowerCase().includes("writer") 
                            || metaInfo[i].getAttribute("property").toLowerCase().includes("publisher")) {
                                current_author = metaInfo[i].getAttribute("content");
                                console.log("Current Author:", current_author);
                            }
                        }
                    }

                }

                if (current_published_date == null) {
                    for (let i = 0; i < metaInfo.length; i++) {
                        if (metaInfo[i].getAttribute("property") == null) {
                            continue;
                        } else {
                            if (metaInfo[i].getAttribute("property").toLowerCase().includes("date") ) {
                                current_published_date = metaInfo[i].getAttribute("content");
                                console.log("Current Published Date:", current_published_date);
                            }
                        }
                    }

                }


                if (current_summary == null) {
                    for (let i = 0; i < metaInfo.length; i++) {
                        if (metaInfo[i].getAttribute("property") == null) {
                            continue;
                        } else {
                            if (metaInfo[i].getAttribute("property").toLowerCase().includes("description") 
                            || metaInfo[i].getAttribute("property").toLowerCase().includes("summary")) {
                                current_summary = metaInfo[i].getAttribute("content");
                                console.log("Current Summary:", current_summary);
                            }
                        }
                    }

                }

                if (current_title == null) {
                    for (let i = 0; i < metaInfo.length; i++) {
                        if (metaInfo[i].getAttribute("property") == null) {
                            continue;
                        } else {
                            if (metaInfo[i].getAttribute("property").toLowerCase().includes("title")) {
                                current_title = metaInfo[i].getAttribute("content");
                                console.log("Current Title:", current_title);
                            }
                        }
                    }

                }

                
                    
            const websiteInfoSet = {
                URL: current_url,
                title: current_title || "No title found",
                author: current_author || "Anonymous",
                published_date: current_published_date || "n.d.",
                summary: current_summary || "No summary found"
            };
    
            console.log("Website Info Set:", websiteInfoSet);
    
            chrome.storage.local.set({ "websiteInfoSet": websiteInfoSet });
    
            
        }
    
            projectPort.postMessage({ type: "normalSavingSignal" });
            console.log("Message sent to background.js");
            
            floatingButton.innerText = "Saved!";
            floatingButton.disabled = true;
            setTimeout(() => {
                floatingButton.style.opacity = "0"; // Hide the button
            }, 5000);
            setTimeout(() => {
                floatingButton.style.display = "none"; // Hide the button   
            }, 6000);
                           
        
        
    });



 
    
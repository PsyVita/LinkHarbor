



const floatingButton = document.createElement("button");
    floatingButton.id = "floatingButton";
    floatingButton.innerText = "+";
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
            projectPort.postMessage({ type: "YouTubeSavingSignal" });
        } else {

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
                    
            const websiteInfoSet = {
                URL: current_url,
                title: current_title || "No title found",
                author: current_author || "Anonymous",
                published_date: current_published_date || "n.d.",
                summary: current_summary || "No summary found"
            };
    
            console.log("Website Info Set:", websiteInfoSet);
    
            chrome.storage.local.set({ "websiteInfoSet": websiteInfoSet });
    
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
                           
            
        }

        
    });

    
    
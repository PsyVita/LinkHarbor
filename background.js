
chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name === "contentScript-background");
    port.onMessage.addListener(function(message) {

        if (message.type === "articleDataSet") {
            // Deserialize the JSON data
            const websiteInfoSet = JSON.parse(message.data);


            //change these
            // Push each piece of data into the respective arrays
            urls.push(websiteInfoSet.URL);
            titles.push(websiteInfoSet.title);

            // Optionally store arrays in localStorage
            localStorage.setItem("savedUrls", JSON.stringify(urls));
            localStorage.setItem("savedTitles", JSON.stringify(titles));
            localStorage.setItem("savedTimestamps", JSON.stringify(timestamps));

            // Optionally send a response back to the content script
            port.postMessage({ response: "Data saved successfully!" });
        }
    });

});
        
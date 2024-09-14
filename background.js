const project1port = chrome.runtime.connect({ name: "project1" });
        project1port.onMessage.addListener(function(message) {
            if (message.data === "savetheURL") {
                chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                    const current_url = tabs[0].url;
                    Project1URL.push(current_url);
                    console.log(Project1URL);


                    const testing = document.getElementById("testing");
                    testing.innerHTML = Project1URL.join(", ");

                    localStorage.setItem("LHProject1URL", JSON.stringify(Project1URL));
                });
            };
            project1port.postMessage({ data: "urlSaved" });
        });
        
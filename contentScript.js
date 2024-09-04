



const floatingButton = document.createElement("button");
    floatingButton.id = "floatingButton";
    floatingButton.innerText = "+";
    document.body.appendChild(floatingButton);
    console.log("Floating button created");

        // Add event listener for button click
    floatingButton.addEventListener("click", function() {
        // Send a message to the background script
        chrome.runtime.sendMessage({ type: "buttonClicked" });
        floatingButton.innerText = "Saved!";
        floatingButton.disabled = true;
        });
    

        // Ensure the button is always in focus
    floatingButton.addEventListener("focusout", function() {
        floatingButton.focus();
    });


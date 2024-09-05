



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
        setTimeout(() => {
            floatingButton.style.opacity = "0"; // Hide the button
        }, 5000);
        setTimeout(() => {
            floatingButton.style.display = none; // Hide the button
        }, 6000);
            
        });
    

        // Ensure the button is always in focus
    floatingButton.addEventListener("focusout", function() {
        floatingButton.focus();
    });


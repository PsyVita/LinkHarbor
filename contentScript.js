document.addEventListener("DOMContentLoaded", function() {
    console.log("Content script loaded");

    // Create the floating button
    const floatingButton = document.createElement("button");
    floatingButton.id = "floatingButton";
    floatingButton.innerText = "+";
    document.body.appendChild(floatingButton);
    console.log("Floating button created");

    // Add event listener for button click
    floatingButton.addEventListener("click", function() {
        alert("Floating button clicked!");
        // Send a message to the background script
        chrome.runtime.sendMessage({ type: "buttonClicked" });
    });

    // Ensure the button is always in focus
    floatingButton.addEventListener("focusout", function() {
        floatingButton.focus();
    });
});
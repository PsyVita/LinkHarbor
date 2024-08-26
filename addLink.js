document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('btn-add-link'); 

    button.addEventListener('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const current_url = tabs[0].url;
            const listItem = document.createElement('li');
            listItem.textContent = current_url;
            document.getElementById('thelist').appendChild(listItem);
        });
    });
});


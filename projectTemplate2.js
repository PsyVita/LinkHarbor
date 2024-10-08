document.addEventListener("DOMContentLoaded", function() {

    const savingSelect = document.getElementById("saving_select");
    let savableTabs = [];

    savingSelect.addEventListener("focus", function() {
        savableTabs = [];
        savableTabsURL = [];
        // Clear all options
        while (savingSelect.secondChild) {
            savingSelect.removeChild(savingSelect.secondChild);
        }

        chrome.tabs.query({}, function(tabs) {
            tabs.forEach(tab => { 
                if (tab.url.startsWith("https://www.google.com/search?")) {
                    console.log("Skip this google search tab")
                } else {
                    if (savableTabsURL.includes(tab.url)) {
                        console.log("Tab already saved:", tab.url, tab.id);
                    } else {
                        savableTabs.push(tab.id);
                        const option = document.createElement("option");
                        option.value = tab.id;
                        option.textContent = tab.title;
                        savingSelect.appendChild(option);
                        savableTabsURL.push(tab.url);
                    }
                }
                
            });
        });

        console.log("Savable Tabs:", savableTabs);

        
    });


   // var projectPort = chrome.runtime.connect({ name: "project1-background" });

  /*  savingSelect.addEventListener("change", function() {
        if (savingSelect.value === "Add All Tabs") {
            chrome.tabs.query({}, function(tabs) {
                tabs.forEach(tab => {
                    projectPort.postMessage({ type: "bundleSavingSignal", current_url: savingSelect.value });
                });
            });
        } else if (savableTabs.includes(savingSelect.value)) {
            projectPort.postMessage({ type: "bundleSavingSignal", current_url: savingSelect.value });
        }
      
    });
*/
    const importButton = document.getElementById("stamp__button__import");
     var port = chrome.runtime.connect({ name: "import-project-background" });
    
    importButton.addEventListener("click", function() {
        console.log(savingSelect.value);
        if (savingSelect.value === "Add All Tabs") {
            port.postMessage({ type: "bundleSavingSignal", bundle_tabs: savableTabs });
            /*
            chrome.tabs.query({}, function(tabs) {
                tabs.forEach(tab => {
                    projectPort.postMessage({ type: "bundleSavingSignal", current_url: savingSelect.value });
                });
            });
            */
        } else if (savableTabs.includes(Number(savingSelect.value))) {
            console.log(savingSelect.value);
            port.postMessage({ type: "importSavingSignal", current_tab_id: savingSelect.value });

           // chrome.tabs.sendMessage( { type: "importSavingSignal", current_tab_id: savingSelect.value });
            
            console.log("Sent message to background.js", savingSelect.value);
        }
    });


    function focusTab(tabId) {
        chrome.tabs.update(tabId, { active: true }, function(tab) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
            } else {
                console.log("Focused on tab:", tab);
            }
        });
    }

    const project2Title = document.getElementById("project2Title");
    let clickTimeout;

    // Set title value from localStorage or default to "Project #1"
    chrome.storage.local.get(["LHproject2TitleStorage"], function(result) {
        if (result.LHproject2TitleStorage === undefined) {
            chrome.storage.local.set({ "LHproject2TitleStorage": "Project #2" });
            project2Title.value = "Project #2";
        } else {
            project2Title.value = result.LHproject2TitleStorage;
        }

        project2Title.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                project2Title.blur();
            }
        });

        project2Title.addEventListener("blur", function(event) {
            const project2CurrentTitle = event.target.value;
            project2Title.value = project2CurrentTitle;
            chrome.storage.local.set({ "LHproject2TitleStorage": project2CurrentTitle });
        });
    });

    // Add more sources
    const addMoreSources = document.getElementById("add__more__sources");
    const deleteProject2URL = document.getElementById("deleteButton");
    deleteProject2URL.style.display = "none";

    const clearProject2URL = document.getElementById("clearButton");
    const changeBackground = document.getElementById("project__header");


    const toggleProject2 = document.getElementById("toggleProject2");

    let Project2URL, Project2Article, Project2Author, Project2PublishedDate, Project2Summary = [];

    updateStorageInformation();

    /*
    chrome.runtime.onConnect.addListener(function(port) {
        if (port.name === "background-project1") {
            if (port.type === "singleImportComplete") {
                updateStorageInformation();
            }
        }
    });
    */

    function updateStorageInformation () {
        chrome.storage.local.get(["selectedProject", "LHProject2URL", "LHProject2Article", "LHProject2Author", "LHProject2PublishedDate", "LHProject2Summary", "LHProject2"], function(result) {
            console.log("Result:", result);
            
            Project2URL = result.LHProject2URL || [];
            Project2Article = result.LHProject2Article || [];
            Project2Author = result.LHProject2Author || [];
            Project2PublishedDate = result.LHProject2PublishedDate || [];
            Project2Summary = result.LHProject2Summary || [];
    
            sourceDisplay();
            selectingSources();
        });
    }
    

        function sourceDisplay() {

            //deleteeverything in the article_complete div
            const articleComplete = document.getElementById("article_complete");
            while (articleComplete.firstChild) {
                articleComplete.removeChild(articleComplete.firstChild);
            }

            articleComplete.appendChild(addMoreSources);
            addMoreSources.style.display = "block";

            console.log("Project2URLlength:", Project2URL.length);
            if (Project2URL.length > 0) {
                addMoreSources.style.display = "none";
                for (let i = 0; i < Project2URL.length; i++) {
                    const numberCounter = document.createElement("span");
                    numberCounter.textContent = i + 1 + ".";
                    numberCounter.className = "numberCounter";
                    numberCounter.id = "numberCounter" + i;

                    const articleRow = document.createElement("div");
                    articleRow.className = "article_complete";
                    articleRow.id = "article_complete" + i;
                    articleRow.style.display = "flex";
                    articleRow.style.flexDirection = "row";

                    const articleButton = document.createElement("button");
                    articleButton.className = "sources__button";
                    articleButton.id = "sources__button" + i;

                    const articleSummary = document.createElement("button");
                    articleSummary.id = "article__summary" + i;
                    articleSummary.className = "article__summary";
                    articleSummary.textContent = "S";

                    const selectedButton = document.createElement("img");
                    selectedButton.src = "images/checked.png";
                    selectedButton.className = "selected__button";
                    selectedButton.id = "selected__button" + i;
                    selectedButton.style.display = "none";

                    document.getElementById('article_complete').appendChild(articleRow);
                    document.getElementById('article_complete' + i).appendChild(selectedButton);
                    document.getElementById('article_complete' + i).append(numberCounter);
                    document.getElementById('article_complete' + i).appendChild(articleButton);
                    document.getElementById('article_complete' + i).appendChild(articleSummary);


                    const articleTextSummary = document.createElement("p");
                    articleTextSummary.textContent = Project2Summary[i];
                    articleTextSummary.className = "article__text__summary";
                    articleTextSummary.id = "article__text__summary" + i;
                    document.getElementById('sources__button' + i).appendChild(articleTextSummary);
                    articleTextSummary.style.display = "none";

                    const articleTitle = document.createElement("h4");
                    articleTitle.textContent = Project2Article[i];
                    articleTitle.id = "article__title" + i;
                    articleTitle.className = "article__title";
                    document.getElementById('sources__button' + i).appendChild(articleTitle);

                    const articleURL = document.createElement("p");
                    articleURL.textContent = Project2URL[i];
                    articleURL.className = "article__URL";
                    articleURL.id = "article__URL" + i;
                    document.getElementById('sources__button' + i).appendChild(articleURL);

                    const APAformat = document.createElement("p");
                    APAformat.id = "APA__format" + i;
                    APAformat.className = "APA__format";
                    document.getElementById('sources__button' + i).appendChild(APAformat);


                    chrome.storage.local.get(["SavedType"], function(result) {
                        if (Project2URL[i].length > 32) {
                            const shortenedURL =  Project2URL[i].slice(0, 32) + '...';
                        
                        if (result.SavedType === "normal") {
                            APAformat.innerHTML = `${Project2Author[i]}. (${Project2PublishedDate[i]}). <i>${Project2Article[i]}. </i>${shortenedURL}\n\n`;
                        } else if (result.SavedType === "YouTube") {
                            APAformat.innerHTML = `${Project2Author[i]}. (${Project2PublishedDate[i]}). <i>${Project2Article[i]}. </i>[Video]. YouTube. ${shortenedURL}\n\n`;
                        }
                } else {
                    if (result.SavedType === "normal") {
                        APAformat.innerHTML = `${Project2Author[i]}. (${Project2PublishedDate[i]}). <i>${Project2Article[i]}. </i>${Project2URL[i]}\n\n`;
                    } else if (result.SavedType === "YouTube") {
                        APAformat.innerHTML = `${Project2Author[i]}. (${Project2PublishedDate[i]}). <i>${Project2Article[i]}. </i>[Video]. YouTube. ${shortenedURL}\n\n`;
                    }
                }
            });


            

               
                const normalFormatElements = document.querySelectorAll(".article__title, .article__URL");
                const APAFormatElements = document.querySelectorAll(".APA__format");
                const summaryElements = document.querySelectorAll(".article__text__summary");

                articleSummary.addEventListener("click", function() {
                    if (articleTextSummary.style.display === "none") {
                        APAformat.style.display = "none";
                        articleTitle.style.display = "none";
                        articleURL.style.display = "none";
                        articleTextSummary.style.display = "block";
                    } else if (articleTextSummary.style.display === "block" && !toggleProject2.checked) { 
                        APAformat.style.display = "none";
                        articleTitle.style.display = "block";
                        articleURL.style.display = "block";
                        articleTextSummary.style.display = "none";
                    } else if (articleTextSummary.style.display === "block" && toggleProject2.checked) {
                        APAformat.style.display = "block";
                        articleTitle.style.display = "none";
                        articleURL.style.display = "none";
                        articleTextSummary.style.display = "none";
                    }
                });

                toggleProject2.addEventListener("change", function() {
                    
                    if (!toggleProject2.checked) {
                        normalFormatElements.forEach(element => {
                            element.style.display = "block";
                        });
                        APAFormatElements.forEach(element => {
                            element.style.display = "none";
                        });
                        summaryElements.forEach(element => {
                            element.style.display = "none";
                        });
                    } else if (toggleProject2.checked) {
                        normalFormatElements.forEach(element => {
                            element.style.display = "none";
                        });
                        APAFormatElements.forEach(element => {
                            element.style.display = "block";
                        });
                        summaryElements.forEach(element => {
                            element.style.display = "none";
                        });
                    }
                    
                });
                toggleProject2.dispatchEvent(new Event("change"));
            }
        } else {
            addMoreSources.style.display = "block";
        }

    };

//const selectedButtons = document.querySelectorAll(".selected__button") || null;


        const cancelButton = document.getElementById("cancelButton");
        cancelButton.addEventListener("click", function() {
            clearProject2URL.style.display = "block";
            deleteProject2URL.style.display = "none";
            cancelButton.style.display = "none";
            changeBackground.style.backgroundColor = "#f0f8ff";
            project2Title.style.display = "block";
            /*
            if (selectedButtons && selectedButtons.length > 0) {
                selectedButtons.forEach(button => {
                    button.style.display = "none";
                });
            }
                */
            for (let i = 0; i < Project2URL.length; i++) {
                document.getElementById("sources__button" + i).style.color = "black";
                const selectedButton = document.getElementById("selected__button" + i);
                if (selectedButton) {
                    if (selectedButton.style.display === "block") {
                        document.getElementById("selected__button" + i).style.display = "none";
                        document.getElementById("numberCounter" + i).style.display = "block";
                    }
                }
            }
        });

        cancelButton.style.display = "none";
    
    let selectedURL, selectedArticle, selectedAuthor, selectedPublishedDate, selectedSummary;
    
    function selectingSources() {
        if (document.getElementById("sources__button" + "0") !== null) {
            // Selecting projects
            for (let i = 0; i < Project2URL.length; i++) {
                document.getElementById("sources__button" + i).addEventListener("click", function(event) {
                    clearTimeout(clickTimeout);

                        clickTimeout = setTimeout(function() {
                        clearProject2URL.style.display = "none";
                        deleteProject2URL.style.display = "block";

                        cancelButton.style.display = "block";
                        changeBackground.style.backgroundColor = "#a293ad";
                        project2Title.style.display = "none";

                        const selectedButton = document.querySelectorAll(".selected__button");

                        if (document.getElementById("sources__button" + i).style.color === "orange") {
                            document.getElementById("sources__button" + i).style.color = "black";
                            document.getElementById("selected__button" + i).style.display = "none";
                            document.getElementById("numberCounter" + i).style.display = "block";

                            
                            const allHidden = Array.from(selectedButton).every(button => button.style.display === "none");

                            if (allHidden) {
                                cancelButton.click();
                            } 

                        } else {
                            document.getElementById("sources__button" + i).style.color = "orange";
                            document.getElementById("selected__button" + i).style.display = "block";
                            document.getElementById("numberCounter" + i).style.display = "none";
                        }

                        selectedURL = [];
                        selectedArticle = [];
                        selectedAuthor = [];
                        selectedPublishedDate = [];
                        selectedSummary = [];

                        for (let i = 0; i < Project2URL.length; i++) {
                            if (selectedButton[i].style.display === "block") {
                                selectedURL.push(Project2URL[i]);
                                selectedArticle.push(Project2Article[i]);
                                selectedAuthor.push(Project2Author[i]);
                                selectedPublishedDate.push(Project2PublishedDate[i]);
                                selectedSummary.push(Project2Summary[i]);
                            }
                        }

                        console.log("Selected URL:", selectedURL);
                        console.log("Selected Article:", selectedArticle);
                        console.log("Selected Author:", selectedAuthor);
                        console.log("Selected Published Date:", selectedPublishedDate);
                        console.log("Selected Summary:", selectedSummary);

                    }, 100);
                });
            }
        }
    }

    // Clear Project1URL when the delete button is clicked
    clearProject2URL.addEventListener("click", function() {
        if (Project2URL) {
            if (Project2URL.length > 0) {
                const userConfirmed = confirm("Are you sure you want to reset the entire project? All saved URLs in this project will be permanently lost. This action cannot be undone.");
    
                if (userConfirmed) {
                    chrome.storage.local.set({
                        LHProject2URL: [],
                        LHProject2Article: [],
                        LHProject2Author: [],
                        LHProject2PublishedDate: [],
                        LHProject2Summary: [],
                        LHproject2TitleStorage: "Project #2"
                    }, function() {
                        console.log("URLs and articles are cleared.");
                        updateStorageInformation();
                    });
                }
            } else {
                alert("There are no sources to delete.");
            }
        } else {
            alert("There are no sources to delete.");
        }
    });

    // Delete individual sources
    deleteProject2URL.addEventListener("click", function() {
        if (Project2URL) {
            if (Project2URL.length > 0) {
                for (let i = 0; i < Project2URL.length; i++) {
                    if (document.getElementById("sources__button" + i).style.color === "orange") {
                        Project2URL.splice(i, 1);
                        Project2Article.splice(i, 1);
                        Project2Author.splice(i, 1);
                        Project2PublishedDate.splice(i, 1);
                        Project2Summary.splice(i, 1);
    
                        chrome.storage.local.set({ "LHProject2URL": Project2URL });
                        chrome.storage.local.set({ "LHProject2Article": Project2Article });
                        chrome.storage.local.set({ "LHProject2Author": Project2Author });
                        chrome.storage.local.set({ "LHProject2PublishedDate": Project2PublishedDate });
                        chrome.storage.local.set({ "LHProject2Summary": Project2Summary });
    
                        updateStorageInformation();
                        cancelButton.click();
                    }
                }
            } else {
                alert("There are no sources to delete.");
            }
        } else {
            alert("There are no sources to delete.");
        }
    });

    chrome.storage.local.get(["LHProject2URL", "LHProject2Article", "LHProject2Author", "LHProject2PublishedDate", "LHProject2Summary"], function(result) {
        const copyToClipboardButton = document.getElementById("copyToClipboard");
    
    
        Project2URL = result.LHProject2URL;
        Project2Article = result.LHProject2Article;
        Project2Author = result.LHProject2Author;
        Project2PublishedDate = result.LHProject2PublishedDate;
        Project2Summary = result.LHProject2Summary;

        selectedButtons = document.querySelectorAll(".selected__button");

        function exportingBasics() {
            let copiedPlainText = '';
            let copiedHTMLText = '';
            let copiedforPDF = '';
            let subject = "Sources for your project";
            const LHurl = "https://chrome.google.com/webstore/detail/linkharbor/";
            let advertisementHTML = `This source list was generated using the <strong>LinkHarbor</strong> Chrome Extension. <a href="${LHurl}"><br>Download the extension today</a> to save your sources and generate APA citations with ease!`;
            let advertisementPlainText = "This source list was generated using the LinkHarbor Chrome Extension.\nDownload the extension today to save your sources and generate APA citations with ease! Click the link below!\n" + LHurl;
            let entries;
            
            if (Project2URL.length > 0) {
                if (toggleProject2.checked) {
                    subject = project2Title.value + " [APA Citations]\n\n";
                } else if (!toggleProject2.checked) {
                    subject = project2Title.value + " [Sources]\n\n";
                }
            
                if (selectedURL) {
                    if (selectedURL.length > 0) {
                        entries = selectedURL.map((url, index) => ({
                            author: selectedAuthor[index],
                            publishedDate: selectedPublishedDate[index],
                            article: selectedArticle[index],
                            summary: selectedSummary[index],
                            url: url,
                            isYouTube: url.includes("https://youtube.com/watch?")
                        }));
                    }

                    selectedURL = [];
                } else {
                        
                        
        
                        entries = Project2URL.map((url, index) => ({
                            author: Project2Author[index],
                            publishedDate: Project2PublishedDate[index],
                            article: Project2Article[index],
                            summary: Project2Summary[index],
                            url: url,
                            isYouTube: url.includes("https://youtube.com/watch?")
                        }));
                
                }

                if (entries.length > 1) {
                    entries.sort((a, b) => a.author.localeCompare(b.author));
                }

                console.log("Entries:", entries);

                for (let i = 0; i < entries.length; i++) {
                    const entry = entries[i];
                    if (entry.isYouTube) {
                        if (toggleProject2.checked) {
                            copiedHTMLText += `<div style="margin-left: 0px; text-indent: -40px; line-height: 2;"><span style="color:black;">${entry.author}. (${entry.publishedDate}). <i>${entry.article}. </i>[Video]. YouTube. </span><a href="${entry.url}" style="text-decoration: none; color: black;">${entry.url}/</a><br></div>`;
                            copiedPlainText += `${entry.author}. (${entry.publishedDate}). ${entry.article}. [Video]. YouTube. ${entry.url}/\n\n`;
                            
                            copiedforPDF += `<div style="margin-left: 40px; text-indent: -40px; line-height: 2;"><span style="color:black;">${entry.author}. (${entry.publishedDate}). <i>${entry.article}. </i>[Video]. YouTube. </span>${entry.url}/<br></div>`;

                        } else if (!toggleProject2.checked) {
                            copiedPlainText += `${i+1}. ${entry.article}\n(${entry.summary})\n${entry.url}/\n\n`;
                            copiedHTMLText += `<span style="color:black;">${i+1}. <strong>${entry.article}</strong><br><i>${entry.summary}</i><br></span><a href="${entry.url}">${entry.url}/</a><br><br>`; 
                            copiedforPDF += `<span style="color:black;">${i+1}. <strong>${entry.article}</strong><br><i>${entry.summary}</i><br></span>${entry.url}/<br><br>`; 
                        }
                    } else {
                        if (toggleProject2.checked) {
                            copiedHTMLText += `<div style="margin-left: 0px; text-indent: -40px; line-height: 2;"><span style="color:black;">${entry.author}. (${entry.publishedDate}). <i>${entry.article}. </i></span><a href="${entry.url}" style="text-decoration: none; color: black;">${entry.url}/</a><br></div>`;
                            copiedPlainText += `${entry.author}. (${entry.publishedDate}). ${entry.article}. ${entry.url}/\n\n`;
                            copiedforPDF += `<div style="margin-left: 40px; text-indent: -40px; line-height: 2;"><span style="color:black;">${entry.author}. (${entry.publishedDate}). <i>${entry.article}. </i></span>${entry.url}/<br></div>`;
                        } else if (!toggleProject2.checked) {
                            copiedPlainText += `${i+1}. ${entry.article}\n(${entry.summary})\n${entry.url}/\n\n`;
                            copiedHTMLText += `<span style="color:black;">${i+1}. <strong>${entry.article}</strong><br><i>${entry.summary}</i><br></span><a href="${entry.url}">${entry.url}/</a><br><br>`; 
                            copiedforPDF += `<span style="color:black;">${i+1}. <strong>${entry.article}</strong><br><i>${entry.summary}</i><br></span>${entry.url}/<br><br>`; 
                        }
                    }
                    
                }
                const HTMLblob = new Blob([copiedHTMLText], { type: 'text/html' });
                const TEXTblob = new Blob([copiedPlainText], { type: 'text/plain' });

                return {
                    HTMLblob,
                    TEXTblob, 
                    subject, 
                    advertisementHTML,
                    advertisementPlainText, 
                    copiedforPDF
                };

            } else {
                alert("There are no sources to export.");

            }
        };
    
        


        copyToClipboardButton.addEventListener("click", function() {
            if (Project2URL) {
                if (Project2URL.length > 0) {
                    const blobs = exportingBasics();
    
                    const combinedHTMLblob = new Blob(
                        [
                            `<div style="text-align: center;"><strong>${blobs.subject}</strong></div><br>`, blobs.HTMLblob, `<i>${blobs.advertisementHTML}</i>`
                        ], 
                        {type: 'text/html'}
                    );
    
                    const combinedPlainTextBlob = new Blob(
                        [
                            blobs.subject, blobs.TEXTblob, blobs.advertisementPlainText
                        ],
                        {type: 'text/plain'}
                    );
    
                    const clipboardItem = new ClipboardItem({ 
                        'text/html': combinedHTMLblob, 
                        'text/plain': combinedPlainTextBlob
                    });
    
                    navigator.clipboard.write([clipboardItem]);
                    
                    copyToClipboardButton.textContent = "Copied!";
                    setTimeout(function() {
                        copyToClipboardButton.textContent = "Copy to Clipboard";
                    }, 2000);
    
                } else {
                    alert("There are no sources to copy.");
                }
            } else {
                alert("There are no sources to copy.");
            }
        });

        const emailButton = document.getElementById("emailButton");

        emailButton.addEventListener("click", function() {
            if (Project2URL) {
                if (Project2URL.length > 0) {
                    const blobs = exportingBasics();
    
                    const reader = new FileReader();
                    reader.readAsText(blobs.TEXTblob);
    
                    reader.onload = function() {
                        const emailBody = blobs.subject + reader.result + blobs.advertisementPlainText;
                        const emailSubject = blobs.subject;
    
                        if (emailBody.length > 380000 || emailSubject.length > 78) {
                            alert("The email body is too long. Please reduce the number of sources or export in separate groups.");
                        } else if (emailSubject.length > 78) {
                            alert("The project title is too long. Please shorten the title then export again.");
                        } else {
                            const emailURL = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                            window.open(emailURL);
                        }
                        
                    }
    
                    emailButton.textContent = "Opening Gmail...";
                    setTimeout(function() {
                        emailButton.textContent = "Share via Gmail";
                    }, 2000);
                } else {
                    alert("There are no sources to email.");
                }
            } else {
                alert("There are no sources to email.");
            }

        });

        const pdfButton = document.getElementById("pdfButton");
        const exportFooter = document.getElementById("export__footer");

        pdfButton.addEventListener("mouseenter", function() {
            exportFooter.innerHTML = "Choose your export option: A print window will be generated.<br>Please select the destination as 'Save as PDF'.";
        });

        pdfButton.addEventListener("mouseleave", function() {
            exportFooter.innerHTML = "Choose your export option:";
        });
        
        pdfButton.addEventListener("click", function() {
            if (Project2URL) {
                if (Project2URL.length > 0) {
                    const blobs = exportingBasics();
                    
    
                    const combinedHTML = `<div style="font-family: 'Times New Roman', Times, serif; margin: 40px; line-height: 2; font-size: 12pt; color: black;"><strong><div style="text-align: center; font-size: 16pt;">${blobs.subject}</div></strong><br>${blobs.copiedforPDF}</div>`;
    /*
                    const iframe = document.createElement("iframe");
                    iframe.style.display = "none";
                    document.body.appendChild(iframe);
                    
                    const iframeDoc = iframe.contentWindow.document;
                    iframeDoc.open();
                    iframeDoc.write(combinedHTML);
                    iframeDoc.close();
    
                    iframe.onload = function() {
                        iframe.contentWindow.focus();
                        iframe.contentWindow.print();
                    }
                
    */
                    
                    const printWindow = window.open('','_blank');
                    printWindow.document.open();
                    printWindow.document.write(combinedHTML);
    
                    printWindow.onload = function() {
                        printWindow.focus();
                    }
                    printWindow.print();
                    printWindow.close();
                    
                    
    
                    pdfButton.textContent = "Downloading PDF...";
                        setTimeout(function() {
                            pdfButton.textContent = "Export to PDF";
                        }, 2000);
                } else {
                    alert("There are no sources to export.");
                }
            } else {
                alert("There are no sources to export.");
            }
        });
    });
});

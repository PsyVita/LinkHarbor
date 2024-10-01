document.addEventListener("DOMContentLoaded", function() {
    const project1Title = document.getElementById("project1Title");
    let clickTimeout;

    // Set title value from localStorage or default to "Project #1"
    chrome.storage.local.get(["LHproject1TitleStorage"], function(result) {
        if (result.LHproject1TitleStorage === undefined) {
            chrome.storage.local.set({ "LHproject1TitleStorage": "Project #1" });
            project1Title.value = "Project #1";
        } else {
            project1Title.value = result.LHproject1TitleStorage;
        }

        project1Title.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                project1Title.blur();
            }
        });

        project1Title.addEventListener("blur", function(event) {
            const project1CurrentTitle = event.target.value;
            project1Title.value = project1CurrentTitle;
            chrome.storage.local.set({ "LHproject1TitleStorage": project1CurrentTitle });
        });
    });

    // Add more sources
    const addMoreSources = document.getElementById("add__more__sources");
    const deleteProject1URL = document.getElementById("deleteButton");
    deleteProject1URL.style.display = "none";

    const clearProject1URL = document.getElementById("clearButton");
    const changeBackground = document.getElementById("project__header");


    const toggleProject1 = document.getElementById("toggleProject1");

    chrome.storage.local.get(["selectedProject", "LHProject1URL", "LHProject1Article", "LHProject1Author", "LHProject1PublishedDate", "LHProject1Summary", "LHProject1"], function(result) {
        let Project1URL = result.LHProject1URL;
        let Project1Article = result.LHProject1Article;
        let Project1Author = result.LHProject1Author;
        let Project1PublishedDate = result.LHProject1PublishedDate;
        let Project1Summary = result.LHProject1Summary;

        

        if (Project1URL.length > 0 || Project1Article.length > 0) {
            addMoreSources.style.display = "none";

            

            for (let i = 0; i < Project1URL.length; i++) {
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
                articleTextSummary.textContent = Project1Summary[i];
                articleTextSummary.className = "article__text__summary";
                articleTextSummary.id = "article__text__summary" + i;
                document.getElementById('sources__button' + i).appendChild(articleTextSummary);
                articleTextSummary.style.display = "none";

                const articleTitle = document.createElement("h4");
                articleTitle.textContent = Project1Article[i];
                articleTitle.id = "article__title" + i;
                articleTitle.className = "article__title";
                document.getElementById('sources__button' + i).appendChild(articleTitle);

                const articleURL = document.createElement("p");
                articleURL.textContent = Project1URL[i];
                articleURL.className = "article__URL";
                articleURL.id = "article__URL" + i;
                document.getElementById('sources__button' + i).appendChild(articleURL);

                const APAformat = document.createElement("p");
                APAformat.id = "APA__format" + i;
                APAformat.className = "APA__format";
                document.getElementById('sources__button' + i).appendChild(APAformat);


                chrome.storage.local.get(["SavedType"], function(result) {
                    if (Project1URL[i].length > 32) {
                        const shortenedURL =  Project1URL[i].slice(0, 32) + '...';
                    
                    if (result.SavedType === "normal") {
                        APAformat.innerHTML = `${Project1Author[i]}. (${Project1PublishedDate[i]}). <i>${Project1Article[i]}. </i>${shortenedURL}\n\n`;
                    } else if (result.SavedType === "YouTube") {
                        APAformat.innerHTML = `${Project1Author[i]}. (${Project1PublishedDate[i]}). <i>${Project1Article[i]}. </i>[Video]. YouTube. ${shortenedURL}\n\n`;
                    }
                } else {
                    if (result.SavedType === "normal") {
                        APAformat.innerHTML = `${Project1Author[i]}. (${Project1PublishedDate[i]}). <i>${Project1Article[i]}. </i>${Project1URL[i]}\n\n`;
                    } else if (result.SavedType === "YouTube") {
                        APAformat.innerHTML = `${Project1Author[i]}. (${Project1PublishedDate[i]}). <i>${Project1Article[i]}. </i>[Video]. YouTube. ${shortenedURL}\n\n`;
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
                    } else if (articleTextSummary.style.display === "block" && !toggleProject1.checked) { 
                        APAformat.style.display = "none";
                        articleTitle.style.display = "block";
                        articleURL.style.display = "block";
                        articleTextSummary.style.display = "none";
                    } else if (articleTextSummary.style.display === "block" && toggleProject1.checked) {
                        APAformat.style.display = "block";
                        articleTitle.style.display = "none";
                        articleURL.style.display = "none";
                        articleTextSummary.style.display = "none";
                    }
                });

                toggleProject1.addEventListener("change", function() {
                    
                    if (!toggleProject1.checked) {
                        normalFormatElements.forEach(element => {
                            element.style.display = "block";
                        });
                        APAFormatElements.forEach(element => {
                            element.style.display = "none";
                        });
                        summaryElements.forEach(element => {
                            element.style.display = "none";
                        });
                    } else if (toggleProject1.checked) {
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
                toggleProject1.dispatchEvent(new Event("change"));
            }
        } else {
            addMoreSources.style.display = "visible";
        }

        const cancelButton = document.getElementById("cancelButton");
        cancelButton.addEventListener("click", function() {
            clearProject1URL.style.display = "block";
            deleteProject1URL.style.display = "none";
            cancelButton.style.display = "none";
            changeBackground.style.backgroundColor = "#f0f8ff";
            project1Title.style.display = "block";
            selectedButtons.style.display = "none";
            for (let i = 0; i < Project1URL.length; i++) {
                document.getElementById("sources__button" + i).style.color = "black";
            }
        });

        cancelButton.style.display = "none";

        if (document.getElementById("sources__button" + "0") !== null) {
            // Selecting projects
            for (let i = 0; i < Project1URL.length; i++) {
                document.getElementById("sources__button" + i).addEventListener("click", function(event) {
                    clearTimeout(clickTimeout);

                    clickTimeout = setTimeout(function() {
                        clearProject1URL.style.display = "none";
                        deleteProject1URL.style.display = "block";

                        cancelButton.style.display = "block";
                        changeBackground.style.backgroundColor = "#a293ad";
                        project1Title.style.display = "none";

                        if (document.getElementById("sources__button" + i).style.color === "orange") {
                            document.getElementById("sources__button" + i).style.color = "black";
                            document.getElementById("selected__button" + i).style.display = "none";
                            document.getElementById("numberCounter" + i).style.display = "block";

                            const selectedButtons = document.querySelectorAll(".selected__button");
                            const allHidden = Array.from(selectedButtons).every(button => button.style.display === "none");

                            if (allHidden) {
                                clearProject1URL.style.display = "block";
                                deleteProject1URL.style.display = "none";
                                cancelButton.style.display = "none";
                                changeBackground.style.backgroundColor = "#f0f8ff";
                                project1Title.style.display = "block";
                            }
                        } else {
                            document.getElementById("sources__button" + i).style.color = "orange";
                            document.getElementById("selected__button" + i).style.display = "block";
                            document.getElementById("numberCounter" + i).style.display = "none";
                        }

                        //const allSourcesButtons = document.querySelectorAll(".sources__button");

                    }, 100);
                });
            }
        }
    });

    // Clear Project1URL when the delete button is clicked
    clearProject1URL.addEventListener("click", function() {
        const userConfirmed = confirm("Are you sure you want to reset the entire project? All saved URLs in this project will be permanently lost. Once cleared, the extension will close automatically.");

        if (userConfirmed) {
            chrome.storage.local.set({
                LHProject1URL: [],
                LHProject1Article: [],
                LHProject1Author: [],
                LHProject1PublishedDate: [],
                LHProject1Summary: [],
                LHproject1TitleStorage: "Project #1"
            }, function() {
                console.log("URLs and articles are cleared.");
                chrome.runtime.sendMessage({ action: "closePopup" });
            });
        }
    });

    // Delete individual sources
    deleteProject1URL.addEventListener("click", function() {
        // Logic to delete individual sources
    });

    chrome.storage.local.get(["LHProject1URL", "LHProject1Article", "LHProject1Author", "LHProject1PublishedDate", "LHProject1Summary"], function(result) {
        const copyToClipboardButton = document.getElementById("copyToClipboard");
    
    
        Project1URL = result.LHProject1URL;
        Project1Article = result.LHProject1Article;
        Project1Author = result.LHProject1Author;
        Project1PublishedDate = result.LHProject1PublishedDate;
        Project1Summary = result.LHProject1Summary;

        function exportingBasics() {
            if (Project1URL.length > 0) {
                let copiedPlainText = '';
                let copiedHTMLText = '';
                let subject = "Sources for your project";
                const LHurl = "https://chrome.google.com/webstore/detail/linkharbor/";
                let advertisementHTML = `This source list was generated using the <strong>LinkHarbor</strong> Chrome Extension. <a href="${LHurl}"><br>Download the extension today</a> to save your sources and generate APA citations with ease!`;
                let advertisementPlainText = "This source list was generated using the LinkHarbor Chrome Extension.\nDownload the extension today to save your sources and generate APA citations with ease! Click the link below!\n" + LHurl;
                
                if (toggleProject1.checked) {
                    subject = project1Title.value + " [APA Citations]\n\n";
                } else if (!toggleProject1.checked) {
                    subject = project1Title.value + " [Sources]\n\n";
                }

                let entries = Project1URL.map((url, index) => ({
                    author: Project1Author[index],
                    publishedDate: Project1PublishedDate[index],
                    article: Project1Article[index],
                    summary: Project1Summary[index],
                    url: url,
                    isYouTube: url.includes("https://youtube.com/watch?")
                }));

                entries.sort((a, b) => a.author.localeCompare(b.author));

                for (let i = 0; i < entries.length; i++) {
                    const entry = entries[i];
                    if (entry.isYouTube) {
                        if (toggleProject1.checked) {
                            copiedHTMLText += `<div style="margin-left: 0px; text-indent: -40px; line-height: 2;"><span style="color:black;">${entry.author}. (${entry.publishedDate}). <i>${entry.article}. </i>[Video]. YouTube. </span><a href="${entry.url}">${entry.url}</a><br></div>`;
                            copiedPlainText += `${entry.author}. (${entry.publishedDate}). ${entry.url}. [Video]. YouTube. ${entry.url}\n\n`;
                        } else if (!toggleProject1.checked) {
                            copiedPlainText += `${i+1}. ${entry.article}\n(${entry.summary})\n${entry.url}/\n\n`;
                            copiedHTMLText += `<span style="color:black;">${i+1}. <strong>${entry.article}</strong><br><i>${entry.summary}</i><br></span><a href="${entry.url}">${entry.url}/</a><br><br>`; 
                        }
                    } else {
                        if (toggleProject1.checked) {
                            copiedHTMLText += `<div style="margin-left: 0px; text-indent: -40px; line-height: 2;"><span style="color:black;">${entry.author}. (${entry.publishedDate}). <i>${entry.article}. </i></span><a href="${entry.url}">${entry.url}</a><br></div>`;
                            copiedPlainText += `${entry.author}. (${entry.publishedDate}). ${entry.article}. ${entry.url}\n\n`;
                        } else if (!toggleProject1.checked) {
                            copiedPlainText += `${i+1}. ${entry.article}\n(${entry.summary})\n${entry.url}/\n\n`;
                            copiedHTMLText += `<span style="color:black;">${i+1}. <strong>${entry.article}</strong><br><i>${entry.summary}</i><br></span><a href="${entry.url}">${entry.url}/</a><br><br>`; 
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
                    advertisementPlainText
                };
            } else {
                alert("There are no sources to export.");

            }
        };
        


        copyToClipboardButton.addEventListener("click", function() {
            if (Project1URL.length > 0) {
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

            }
        });

        const emailButton = document.getElementById("emailButton");

        emailButton.addEventListener("click", function() {
            if (Project1URL.length > 0) {
                const blobs = exportingBasics();

                const reader = new FileReader();
                reader.readAsText(blobs.TEXTblob);

                reader.onload = function() {
                    const emailBody = blobs.subject + reader.result + blobs.advertisementPlainText;
                    const emailSubject = blobs.subject;

                    const emailURL = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

                    window.open(emailURL);
                }

                emailButton.textContent = "Opening Gmail...";
                setTimeout(function() {
                    emailButton.textContent = "Share via Gmail";
                }, 2000);
            }

        });
    });
});

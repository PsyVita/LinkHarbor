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

            project1Title.addEventListener("blur", function(event) {
                const project1CurrentTitle = event.target.value;
                project1Title.value = project1CurrentTitle;
                chrome.storage.local.set({ "LHproject1TitleStorage": project1CurrentTitle });
            });
        });

    });

    
    // Event listener for Enter key press to save the title to localStorage
    
    

    // Add more sources
    const addMoreSources = document.getElementById("add__more__sources");

    const deleteProject1URL = document.getElementById("deleteButton");
    deleteProject1URL.style.display = "none";

    const clearProject1URL = document.getElementById("clearButton");
    const changeBackground = document.getElementById("project__header");

    //const testing = document.getElementById("testing");
    //testing.innerHTML = "Saved!";
    //console.log("Saved!");
                
                chrome.storage.local.get(["selectedProject", "LHProject1URL", "LHProject1Article"], function(result) {
                    let Project1URL = result.LHProject1URL || [];
                    let Project1Article = result.LHProject1Article || [];

                    if (Project1URL.length > 0 || Project1Article.length > 0) {
                        addMoreSources.style.display = "none";

                        for (let i = 0; i < Project1URL.length; i++) {
                            const numberCounter = document.createElement("span");
                            numberCounter.textContent = i + 1 + ".";
                            numberCounter.className = "space";
                            numberCounter.id = "numberCounter";

                            const articleRow = document.createElement("div");
                            articleRow.className = "article_complete";
                            articleRow.id = "article_complete" + i;
                            articleRow.style.display = "flex";
                            articleRow.style.flexDirection = "row";

                            const articleButton = document.createElement("button");
                            articleButton.className = "sources__button";
                            articleButton.id = "sources__button" + i;
                            

                            const articleSummary = document.createElement("h4");
                            articleSummary.textContent = "Article Summary";
                            articleSummary.id = "article__summary" + i;
                            articleSummary.className = "article__summary";

                            const articleURL = document.createElement("p");
                            articleURL.textContent = Project1URL[i];
                            articleURL.className = "article__URL";
                            articleURL.id = "article__URL" + i;

                            localStorage.setItem("LHProject1ArticleReliability" + i, "reliable");

                            const articleReliability = document.createElement("img");
                            articleReliability.id = "article__reliability" + i;
                            articleReliability.className = "article__reliability";

                            if (localStorage.getItem("LHProject1ArticleReliability" + i) === "reliable") {
                                articleReliability.src = "images/checked.png";
                            } else {
                                articleReliability.src = "images/no.png";
                            }

                            document.getElementById('article_complete').appendChild(articleRow);
                            document.getElementById('article_complete' + i).append(numberCounter);
                            document.getElementById('article_complete' + i).appendChild(articleButton);
                            document.getElementById('sources__button' + i).appendChild(articleSummary);
                            document.getElementById('sources__button' + i).appendChild(articleURL);
                            document.getElementById('article_complete' + i).appendChild(articleReliability);
                            
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
                        for (let i = 0; i < Project1URL.length; i++) {
                            document.getElementById("sources__button" + i).style.color = "black";
                        }
                    });

                    cancelButton.style.display = "none";

                    //selecting projects
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
                                    
                                } else {
                                    document.getElementById("sources__button" + i).style.color = "orange";
                                }


                                for (let i = 0; i < Project1URL.length; i++) {
                                    if (document.getElementById("sources__button" + i).style.color === "orange") {
                                        //count the highlighted sources (if none then hide button)
                                    }
                                }
                                
                            }, 100);
                        });
                    }
                });
            

    
    // Clear Project1URL when the delete button is clicked
    clearProject1URL.addEventListener("click", function() {
        
        const userConfirmed = confirm("Are you sure you want to reset the entire project? All saved URLs in this project will be permanently lost. Once cleared, the extension will close automatically.");

        if (userConfirmed) {
            chrome.storage.local.set({
                LHProject1URL: [],
                LHProject1Article: []
            }, function() {
                console.log("URLs and articles are cleared.");
                chrome.runtime.reload();
            });
            

            chrome.storage.local.get(["LHProject1URL", "LHProject1Article"], function(result) {
                console.log(result.LHProject1URL);
                Project1URL = result.LHProject1URL;
                //the other two for articles
            });
        }
});

    
});
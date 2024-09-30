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

    const toggleProject1 = document.getElementById("switch");

   
                
                chrome.storage.local.get(["selectedProject", "LHProject1URL", "LHProject1Article", "LHProject1Author", "LHProject1PublishedDate", "LHProject1Summary", "LHProject1"], function(result) {
                    let Project1URL = result.LHProject1URL || [];
                    let Project1Article = result.LHProject1Article || [];
                    let Project1Author = result.LHProject1Author || [];
                    let Project1PublishedDate = result.LHProject1PublishedDate || [];
                    let Project1Summary = result.LHProject1Summary || [];

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
                            

                            const articleSummary = document.createElement("button");
                            articleSummary.id = "article__summary" + i;
                            articleSummary.className = "article__summary";
                            articleSummary.textContent = "S"
                            

                            
                            

                            document.getElementById('article_complete').appendChild(articleRow);
                            document.getElementById('article_complete' + i).append(numberCounter);
                            document.getElementById('article_complete' + i).appendChild(articleButton);
                            
                            
                            document.getElementById('article_complete' + i).appendChild(articleSummary);


                            articleSummary.addEventListener("click", function() {
                                if (articleTextSummary.style.display === "none") {
                                    articleTextSummary.style.display = "block";
                                    //APAformat.style.display = "none";
                                    articleTitle.style.display = "none";
                                    articleURL.style.display = "none";
                                    articleSummary.style.backgroundColor = "lightblue";
                                    articleSummary.style.color = "aliceblue";
                                   
                                    
                                } else { 
                                    articleTextSummary.style.display = "none";
                                    articleTitle.style.display = "block";
                                    articleURL.style.display = "block";
                                    
                                    articleSummary.style.backgroundColor = "aliceblue";
                                    articleSummary.style.color = "grey"


                                }
                            });

                            const articleTextSummary = document.createElement("p");
                            articleTextSummary.textContent = Project1Summary[i];
                            articleTextSummary.className = "article__text__summary";
                            articleTextSummary.id = "article__text__summary" + i;
                            document.getElementById('sources__button' + i).appendChild(articleTextSummary);
                            articleTextSummary.style.display = "none";


                            const articleTitle = document.createElement("h4");
                            articleTitle.textContent = Project1Article[i];;
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
                            document.getElementById('article_complete' + i).appendChild(APAformat);

                            if (toggleProject1.checked === true) {
                                articleTitle.style.display = "block";
                                articleURL.style.display = "block";
                                APAformat.style.display = "none";
                                articleTextSummary.style.display = "none";

                            } else if (toggleProject1.checked === false) {

                                chrome.storage.local.get(["SavedType"], function(result) {

                                    
                                    
                                    if (result.SavedType === "normal") {
                                        APAformat.innerHTML = Project1Author[i] + ". (" + Project1PublishedDate[i] + "). " + Project1Article[i] + ". " + Project1URL[i];
                                        
                                    } else if (result.SavedType === "YouTube") {
                                        APAformat.innerHTML = Project1Author[i] + ". (" + Project1PublishedDate[i] + "). <i>" + Project1Article[i] + "</i> [Video]. YouTube. " + Project1URL[i];
                                    
                                    }

                                 });

                                articleTitle.style.display = "none";
                                articleURL.style.display = "none";
                                APAformat.style.display = "block";
                                articleTextSummary.style.display = "none";
                                
                            }
                            
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

                    if (document.getElementById("sources__button" + "0") !== null) {
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
                    }
                });
            

    
    // Clear Project1URL when the delete button is clicked
    clearProject1URL.addEventListener("click", function() {
        
        const userConfirmed = confirm("Are you sure you want to reset the entire project? All saved URLs in this project will be permanently lost. Once cleared, the extension will close automatically.");

        if (userConfirmed) {
            chrome.storage.local.set({
                LHProject1URL: [],
                LHProject1Article: [],
                LHProjectAuthor: [],
                LHProjectPublishedDate: [],
                LHProjectSummary: []
                
            }, function() {
                console.log("URLs and articles are cleared.");
                chrome.runtime.reload();
            });
            

            chrome.storage.local.get(["LHProject1URL", "LHProject1Article", "LHProjectAuthor", "LHProjectPublishedDate", "LHProjectSummary"], function(result) {
                Project1URL = result.LHProject1URL;
                Project1Article = result.LHProject1Article;
                Project1Author = result.LHProjectAuthor;
                Project1PublishedDate = result.LHProjectPublishedDate;
                Project1Summary = result.LHProjectSummary;
            });
        }
});

    
});
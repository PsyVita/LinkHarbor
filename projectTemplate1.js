document.addEventListener("DOMContentLoaded", function() {
    const project1Title = document.getElementById("project1Title");

    // Set title value from localStorage or default to "Project #1"
    if (localStorage.getItem("LHproject1TitleStorage") === null) {
        project1Title.value = "Project #1";
    } else {
        project1Title.value = localStorage.getItem("LHproject1TitleStorage");
    }

    // Event listener for Enter key press to save the title to localStorage
    project1Title.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            const project1CurrentTitle = event.target.value;
            project1Title.value = project1CurrentTitle;
            project1Title.blur();
            localStorage.setItem("LHproject1TitleStorage", project1CurrentTitle);
        }
    });
    

    // Add more sources
    const addMoreSources = document.getElementById("add__more__sources");

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
                });
            
       

    // Clear Project1URL when the delete button is clicked
    const clearProject1URL = document.getElementById("clearButton");
    clearProject1URL.addEventListener("click", function() {
        
        const userConfirmed = confirm("Are you sure you want to reset the entire project? All saved URLs will be permanently lost. Once cleared, the extension will close automatically.");

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
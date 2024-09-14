document.addEventListener("DOMContentLoaded", function() {
    
    const project1Title = document.getElementById("project1Title");
    

    if (project1Title.value !== localStorage.getItem("LHproject1TitleStorage"))
        if (localStorage.getItem("LHproject1TitleStorage") === null) {
            project1Title.value = "Project #1";
        } else {
            project1Title.value = localStorage.getItem("LHproject1TitleStorage");
        }
        


    // Event listener for Enter key press
    project1Title.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            const project1CurrentTitle = event.target.value;
            project1Title.value = project1CurrentTitle;
            project1Title.blur();
            localStorage.setItem("LHproject1TitleStorage", project1CurrentTitle);
        }
    });


    //convert array to array length
    //extract array values into the code
    let Project1URL = JSON.parse(localStorage.getItem("LHProject1URL")) || [];
    let Project1URLNumber = Project1URL.length;

    localStorage.setItem("LHProject1URLNumber", "4");


    const addMoreSources = document.getElementById("add__more__sources");
0
    if (localStorage.getItem("LHProject1URLNumber") === null || (localStorage.getItem("LHProject1ArticleNumber") === "0")) {
        addMoreSources.style.display = "visible";
    } else {
            addMoreSources.style.display = "none";

            for (let i = 0; i < Project1URLNumber; i++) {
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

            //remove this later
            localStorage.setItem("LHProject1ArticleReliability" + 1,  "reliable");

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
        
    }



    
});

document.addEventListener("DOMContentLoaded", function() {
    const clearProject1URL = document.getElementById("delete");

    clearProject1URL.addEventListener("click", function(event) {
        localStorage.removeItem("LHProject1URL");
        console.log("Project 1 URL Cleared");
        console.log(localStorage.getItem("LHProject1URL"));
    });
});
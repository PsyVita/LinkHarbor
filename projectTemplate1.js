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
    localStorage.setItem("LHProject1ArticleNumber", 4);
    const Project1ArticleNumber = localStorage.getItem("LHProject1ArticleNumber");


    for (let i = 0; i < Project1ArticleNumber; i++) {
        const numberCounter = document.createElement("text");
        numberCounter.textContent = i + 1 + ".";
        numberCounter.class = "space";
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

        const articleURL = document.createElement("p");
        articleURL.textContent = "Article URL";

        document.getElementById('article_complete').appendChild(articleButton);
        document.getElementById('sources__button' + i).appendChild(articleSummary);
        document.getElementById('sources__button' + i).appendChild(articleURL);
        
        document.getElementById('main_container').appendChild(articleRow);
    }
    




});

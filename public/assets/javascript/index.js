$(document).ready(function(){
    var articleContainer = $(".article-container");
    $(document).on("click", ".btn-save" , handleArticleSave);
    $(document).on("click", ".scrape-new" , handleArticleScrape);

    initPage();

    function initPage(){
        articleContainer.empty();
        $.get("/api/headlines?saved = false").then(function(data){
            if(data && data.length){
                renderArticles(data);
            }else{
                renderEmpty();
            }
        });
    }
    function renderArticles(article){
        var articlePanels = [];
        for(var i = 0; i < article.length; i++){
            articlePanels.push(createPanel(article[i]));
        }
        articleContainer.append(articlePanels);
    };
    function createPanel(article){
        var panel = 
        $(["<div class='panel panel-default'>",
        "<div class='panel-heading'>",
        "<h3>",
        article.headline,
        "<a class='btn btn-danger delete'>",
        "Delete From Saved",
        "</a>",
        "<a class='btn btn-info notes'>Article Notes</a>",
        "</h3>",
        "</div>",
        "</div>"].join(" "));

        panel.data("_id", article._id);
        return panel;
    }
    function handleArticleSave(){
        var articleToSave = $(this).parents(".panel").data();
        articleToSave.saved = true;
        $.ajax({
            method: "PATCH",
            URL: "api/headlines",
            data: articleToSave
        }).then(function(data){
            if(data.ok){
                initPage();
            }
        });
    }
    function handleArticleScrape(){
        $.get("/api/fetch").then(function(data){
            initPage();
            bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "</h3>");
        });
    }
});
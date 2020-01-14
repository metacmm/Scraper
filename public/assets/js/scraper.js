$(function() {
    $("#btn-RefreshAll").on("click", function () {
        $.ajax("/scraper", {
            type: "GET",
        }).then(function () {
            console.log("Refresh scrape list");
        });
    });
    $("body").on("submit", ".create-form",function(event){
        event.preventDefault();
        var id = $(this).data("id");
        var notebody = $(this).children("textarea").val().trim();
        console.log(notebody);
        var noteObj = {
            body: notebody
        }
        $.ajax("/articles/" + id, {
            type: "POST",
            data: noteObj
        })
        .then(function(){
            location.reload();
        });
    });
});
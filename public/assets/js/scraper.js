$(function() {
    $("#btn-RefreshAll").on("click", function () {
        $.ajax("/scraper", {
            type: "GET",
        }).then(function () {
            console.log("Refresh scrape list");
        });
    });
    $("body").on("submit", ".create-form",function(event){
        console.log("call submit");
        event.preventDefault();
        var id = $(this).data("id");
        console.log(id);
        $.ajax("/articles/" + id, {
            type: "POST",
            data: $(this).val().trim()
        })
        .then(function(){
            location.reload();
        });
    });
});
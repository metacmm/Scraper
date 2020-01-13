$(function() {
    $("#btn-RefreshAll").on("click", function () {
        $.ajax("/scraper", {
            type: "GET",
        }).then(function () {
            console.log("Refresh scrape list");
        });
    });
});
$(function() {
    // refresh the scrape lists
    $("#btn-RefreshAll").on("click", function () {
        $.ajax("/scrape", {
            type: "GET",
        }).then(function () {
            location.reload();
            console.log("Refresh scrape list");
        });
    });

    //add notes
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

    //delete note
    $(".deletenote").on("click", function(){
        var id = $(this).data("id");
        $.ajax("/note/" + id, {
            type: "GET"
        }).then(function(){
            location.reload();
            console.log("Delete note " + id);
        });
    });

    //toggle favorite
    $(".checkfavorite").on("change", function(){
        var id = $(this).data("id");
        console.log(id);
        var checked = $(this).is(":checked");
        console.log(checked);
        $.ajax("/favorite/" + id, {
            type: "POST",
            data: {favorite: checked}
        }).then(function(){
            console.log("Favorite changed to " + checked);
        });
    });
});
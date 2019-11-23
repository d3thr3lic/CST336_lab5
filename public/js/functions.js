
$(document).ready(function(){
    $(".favoriteIcon").on("click", function(){
        //alert($(this).prev().attr("src"));
        
        var imageURL = $(this).prev().attr("src");
        if ($(this).attr("src") == "img/favorite.png") {
            $(this).attr("src","img/favorite_on.png");
            updateFavorite("add", imageURL);//inserts new record
        } else {
            $(this).attr("src","img/favorite.png");
            updateFavorite("delete", imageURL);//deletes record
        }
    });
    
    $(".keywordLink").on("click", function(){
        //alert($(this).text().trim());
        $.ajax({
            method: "get",
            url: "/api/displayFavorites",
            data: {"keyword": $(this).text().trim()
                    },
            success: function(rows, status) {
                $("#favorites").html("");
                rows.forEach(function(row, i){
                    if (i%4==0){
                        $("#favorites").append("<br />");
                    }
                    $("#favorites").append("<img class='image' src='"+row.imageURL + 
                    "' width='200' height='200'><img class='favoriteIcon' src='img/favorite_on.png' width='20'>");
                });
            }
        });//ajax
    });
    
    function updateFavorite(action, imageURL){
        $.ajax({
            method: "get",
            url: "/api/updateFavorites",
            data: {"imageURL" : imageURL,
                    "keyword": $("#keyword").val(),
                    "action": action
                    }
        });//ajax
    }
    
});
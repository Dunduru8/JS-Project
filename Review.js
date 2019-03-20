
function createReviews(){
    $.ajax({
        url: "http://localhost:3000/reviews",
        type: "GET", 
        success: function(reviews){
          $("#review_li").empty();   
          reviews.forEach(function(reviews){
             var $text = reviews.text
             var $p = $("<p/>").text($text).addClass("reviews_p");
             var $li = $("<div/>", {
                "data-id": reviews.id,
                class: reviews.approved == 1 ? "approved_div" : "non_approved",
             }).append($p).append($("<button/>", {
                  text: reviews.approved == 1 ? "approved" : "approve",
                  class: reviews.approved == 1 ? "approved" : "nonAproved_review"
             }))
             if(reviews.approved == 0){
                 $li.append($("<button/>", {
                    text: "remove",
                    class: "remove_review"
                }));
                  
             }
             $("#review_li").append($li);
        });
        }
    })
}


(function($) {
    $(function(){
      createReviews();
     $("#review_li").on("click", ".remove_review", function(){
         var $reviwID = $(this).parent().attr("data-id");
         $.ajax({
            url: "http://localhost:3000/reviews/" + $reviwID,
            type: "DELETE",
            success: function(){
            createReviews();  
            }
         }); 
     event.preventDefault();
     });
     $("#review_li").on("click", ".nonAproved_review", function(){
        var $reviwID = $(this).parent().attr("data-id");
        $.ajax({
           url: "http://localhost:3000/reviews/" + $reviwID,
           type: "PATCH",
           data:{ approved : 1},

           success: function(){
           createReviews();  
           }
        }); 
    event.preventDefault();
    });

    $("#review_send").on("click", function(){
      $.ajax({
         url: "http://localhost:3000/reviews",
         type: "POST",
         data: {
           text: $("#review").val(),
           approved: 0
         },
         success: function(){
             $("#review").val("");
            createReviews();  
         }
   });
   event.preventDefault();

   });
   createReviews();
 })
})(jQuery);
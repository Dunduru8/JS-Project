function buildCart() {
    $("#empty_Cart").empty();
    $.ajax({
      url: "http://localhost:3000/cart",
      dataType: "json",
      success: function(goods) {
        var sum = 0;
        
        goods.forEach(function(item) {
          var $itemInCart = $("<div/>").addClass("item_in_cart");
          var $aImg = $("<img/>").attr({
            src:  item.thumb,
            alt: "item_in_cart"
           }) ;
          $itemInCart.append($aImg);
            var $about_item = $("<div/>").addClass("about_item");
               var $h3 = $("<h3/>").addClass("name_item").text(item.Name)
               var $rewie = $("<div/>").addClass("stars");
               var $aRewie = $("<a/>").attr("href", "#")
                  var $imgRewie = $("<img/>").attr({
                      src:  "https://student-geekbrains.000webhostapp.com/img/stars.jpg",
                      alt: "stars"
                      });
                  $aRewie.append($imgRewie);
            $rewie.append($aRewie)
            var $price =  $("<div/>", {
              id: "cart-" + item.id
            }).addClass("item_price_cart").text(item.quantity + " x " + item.Price).data(item);
            sum += +item.Price * +item.quantity; 
            
            var $divDel = $("<div/>").addClass("delit_items").data(item);
            var $aDel =  $("<a/>").attr("href", "#");
            var $imgDel = $("<img/>").attr({
              src:  "https://student-geekbrains.000webhostapp.com/img/del.png",
              alt: "del",
              class: "del_item"
             }).data(item);
          
           $aDel.append($imgDel);
           $divDel.append($aDel);
  
           $about_item.append($h3);
           $about_item.append($rewie);
           $about_item.append($price);
           $itemInCart.append($about_item);
           $itemInCart.append($divDel);
           $("#empty_Cart").append($itemInCart);
  
          });
        $("#total_price").text("$" + sum);
      }
    });
  }
  buildCart();

  (function($){
    $(".shiping_adress_cap").on("click", function(event){

        $(this).next().toggleClass("checkout_buttonHide").removeClass("checkout_buttonHide");  
        var $toggleClass = $(this).parents("div").find("checkout_form_1").not($(this).next());
        $($toggleClass).eq($toggleClass.index()).toggleClass("checkout_buttonHide").addClass("checkout_buttonHide");
     });

     $(".button_checkout").on("click", function(event){

        $(this).next().toggleClass("checkout_buttonHide").removeClass("checkout_buttonHide");
        var $toggleClass = $(this).parents("div").find("div.checkout_form_1").not($(this).next());
        $($toggleClass).eq($toggleClass.index()).toggleClass("checkout_buttonHide").addClass("checkout_buttonHide");
  });

  })(jQuery);

  var $checkout = document.getElementById("send_button");
  $checkout.addEventListener("click", handleClickButtonChekout);
  $("#dialog").dialog({ autoOpen: false });

function handleClickButtonChekout(){
    var $true = true;
    var arrNameCheck = [document.getElementById("name"), document.getElementById("sername") ];
    var regexp = /^[a-zA-Zа-яА-ЯёЁ]+$/;
    for (var i = 0; i < arrNameCheck.length; i++){
        if (regexp.test(arrNameCheck[i].value) == true){
            $(arrNameCheck[i]).animate({
                color: "#222222",
                backgroundColor: "none"
          });
        }else{
            $(arrNameCheck[i]).animate({
                color: "#222222",
                backgroundColor: "#ebdedf"
          });
            $true = false;
        };
    };

    var $phoneChek = document.getElementById("phone").value;
    regexp = /^\+\d{1}\(\d{3}\)\d{3}-\d{4}$/;
    if (regexp.test($phoneChek) == true){
        $("#phone").animate({
            color: "#222222",
            backgroundColor: "none"
      });
    }else{
        $("#phone").animate({
            color: "#222222",
            backgroundColor: "#ebdedf"
      });
        $true = false;
    };

    var $mail = document.getElementById("email_adress_1").value;
     regexp = /^mymail\@mail\.ru$|^my-mail\@mail\.ru$|^my\.mail\@mail\.ru$/;
     if (regexp.test($mail) == true){
        $("#email_adress_1").animate({
            color: "#222222",
            backgroundColor: "none"
        });
    }else{
        $("#email_adress_1").animate({
              color: "#222222",
              backgroundColor: "#ebdedf"
        });
        $true = false;
    };
    if ($true == false){
    $( "#dialog" ).dialog( "open" );
   }
};


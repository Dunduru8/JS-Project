var $cart = $("#empty_Cart");

var $navigation = $("#navigation");

function buildCart() {
  $("#empty_Cart").empty();
  $.ajax({
    url: "http://localhost:3000/cart",
    dataType: "json",
    success: function(goods) {
      var sum = 0;
      
      goods.forEach(function(item) {
        var $itemCart = $("<div/>").addClass("item_cart");
        var $border = $("<div/>").addClass("border_line");
        $cart.append($itemCart);
        $cart.append($border);

        var $itemCartRight = $("<div/>").addClass("item_cart_right");
        var $itemCartLeft = $("<div/>").addClass("item_cart_left");
        $itemCart.append($itemCartRight);
        $itemCart.append($itemCartLeft);

        var $aSingl = $("<a/>").attr({
          href: "#"
         }) ;
        var $aImg = $("<img/>").attr({
          src:  item.thumb,
          alt: "item"
         }) ;
         $aSingl.append($aImg);
        

        var $ulItemText = $("<ul/>").addClass("item_cart_text");
        var $liSingl = $("<li/>");
        var $liSingl2 = $("<li/>");
        var $aName = $("<a/>").attr({
          href: "#"
         }) ;
        var $imgStar = $("<img/>").attr({
          src:  "https://student-geekbrains.000webhostapp.com/img/stars.jpg",
          alt: "stars"
         });
        $liSingl2.append($imgStar) 
        $liSingl.append($aName.text(item.Name)); 
        $ulItemText.append($liSingl);
        $ulItemText.append($liSingl2);
        $ulItemText.append($("<li/>").text("Color :" + " " + item.color));
        $ulItemText.append($("<li/>").text("Size :" + " " + "XL"));
        
        $itemCartRight.append($aSingl);
        $itemCartRight.append($ulItemText);

        var $ulItemTextLeft = $("<ul/>").addClass("cart_nav_text_left");
        var $price =  $("<li/>", {
          id: "cart-" + item.id
        }).text(item.Price).data(item);
        sum += +item.Price * +item.quantity; 

        var $aDel = $("<a/>").attr({
          href: "#"
         }) ;
        var $imgDel = $("<img/>").attr({
          src:  "https://student-geekbrains.000webhostapp.com/img/del.png",
          alt: "del",
          class: "del_item"
         }).data(item);
        $aDel.append($imgDel);
        var $LiDel = $("<li/>").addClass("delit_items_cart").data(item);
        $LiDel.append($aDel);

        $ulItemTextLeft.append($price);
        $ulItemTextLeft.append($("<li/>").text(item.quantity));
        $ulItemTextLeft.append($("<li/>").text("free"));
        $ulItemTextLeft.append($LiDel);

        $itemCartLeft.append($ulItemTextLeft);
         

        });
      $("#total_price").text("$" + sum);
    }
  });
};


(function($) {

  buildCart();
  
  $cart.on("click", ".delit_items_cart", function() {
    var good = $(this).data();
    console.log(good);
    if(good.quantity > 1){
      $.ajax({
        url: "http://localhost:3000/cart/" + good.id,
        type: "PATCH",
        dataType: "json",
        data: { quantity: good.quantity - 1 },
        success: function() {
          buildCart();
        }
      });
    }else{
    $.ajax({
      url: "http://localhost:3000/cart/" + good.id,
      type: "DELETE",
      success: function() {
        buildCart();
      }
    });
  }
  });
})(jQuery);






            
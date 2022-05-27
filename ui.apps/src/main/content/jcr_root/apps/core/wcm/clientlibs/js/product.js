var itemCarts = [];


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', readyProduct)

} else {

    readyProduct()

}

function readyProduct() {

    var readCookie = document.cookie;
    var cookieName = "products=";
    var cookieSplit = readCookie.split(';');
    for (var i = 0; i < cookieSplit.length; i++) {
        var cookieItem = cookieSplit[i];

        if (cookieItem.indexOf(cookieName) >= 0) {
            cookieItem=cookieItem.replace(/\s/g, '');
            var cookieValue = cookieItem.substring(cookieName.length, cookieItem.length);
            var parsedCookieValue = JSON.parse(cookieValue);
            for (var j = 0; j < parsedCookieValue.length; j++) {
                var productName = parsedCookieValue[j].name;
                var productPrice = parsedCookieValue[j].price;
                var productImage = parsedCookieValue[j].image;
                var productQuantity = parsedCookieValue[j].quantity;
				var productID = parsedCookieValue[j].id;
                var productItems = {
                    "name": productName,
                    "price": productPrice,
                    "image": productImage,
                    "quantity": productQuantity,
					"id": productID
					
                };
                
                itemCarts.push(productItems);




            }
        }
    }

    cartLength();


    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClickedProduct)
    }

}



function addToCartClickedProduct(event) {

   
    var enableFlag = "false";
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var productName = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var productPrice = shopItem.getElementsByClassName('shop-item-price')[0].innerText
	var productID = shopItem.getElementsByClassName('shop-item-id')[0].innerText
    var productImage = shopItem.getElementsByClassName('shop-item-image')[0].src
    var readCookie = document.cookie;
    var cookieName = "products=";
    var cookieSplit = readCookie.split(';');
    for (var i = 0; i < cookieSplit.length; i++) {
        var cookieItem = cookieSplit[i];

        if (cookieItem.indexOf(cookieName) >= 0) {
            cookieItem=cookieItem.replace(/\s/g, '');
            var cookieValue = cookieItem.substring(cookieName.length, cookieItem.length);
            var parsedCookieValue = JSON.parse(cookieValue);
            for (var j = 0; j < parsedCookieValue.length; j++) {
                var id = parsedCookieValue[j].id;
                if (id == productID) {
                    enableFlag = "true";
                    alert('This item is already added to the cart')

                }





            }
        }
    }
    if (enableFlag == "false") {
        var pushCookie = {
            "name": productName,
            "price": productPrice,
            "image": productImage,
            "quantity": "1",
			"id": productID
        };

        itemCarts.push(pushCookie);
        var pushCookie = JSON.stringify(itemCarts);
        document.cookie = "products=" + pushCookie + ";path=/";
    }


cartLength();

}

function cartLength() {

    var cookieData = document.cookie;
    var itemCookieName = "products=";
    var cookieDemiliter = cookieData.split(';');
    for (var i = 0; i < cookieDemiliter.length; i++) {
        var  storeCookie = cookieDemiliter[i];
        if (storeCookie.indexOf(itemCookieName) >= 0) {
            storeCookie=storeCookie.replace(/\s/g, '');
            var arrayItems = storeCookie.substring(itemCookieName.length, storeCookie.length);
            var cartItem = JSON.parse(arrayItems);
             if(cartItem.length>0){
            	document.getElementById('number-cart').innerHTML = cartItem.length;
             }
        }
    }

}




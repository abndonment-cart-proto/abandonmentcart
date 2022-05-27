if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', cartReady)



} else {

    cartReady()

}

function cartReady() {

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
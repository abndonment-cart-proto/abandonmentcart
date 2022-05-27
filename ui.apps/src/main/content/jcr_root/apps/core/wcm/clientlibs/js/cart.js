

var itemCart = [];


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)

} else {

    ready()

}

function ready() {

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
                addItemToCart(productName, productPrice, productImage, productQuantity, productID)
                itemCart.push(productItems);
                updateCartTotal()



            }
        }
    }




    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }


}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    var removeEntry = buttonClicked.parentElement.parentElement.children[0].firstElementChild.innerText
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
                if (id == removeEntry) {
                    itemCart.splice(j, 1);


                }

            }
        }
    }
    var pushCookie = JSON.stringify(itemCart);
    document.cookie = "products=" + pushCookie + ";path=/";
    buttonClicked.parentElement.parentElement.remove()
    itemCarts = itemCart
    updateCartTotal()

    //cartLength()

}

function quantityChanged(event) {
    var input = event.target
    var removeItem = input.parentElement.parentElement.children[0].firstElementChild.innerText;
    for (i = 0; i < itemCart.length; i++) {
        if (itemCart[i].id == removeItem) {
            if (isNaN(input.value) || input.value <= 0) {
                input.value = 1
            }
            itemCart[i].quantity = input.value;
        }

    }
    var pushCookie = JSON.stringify(itemCart);
    document.cookie = "products=" + pushCookie + ";path=/";

    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}



function addItemToCart(productName, productPrice, productImage, productQuantity, productID) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-id')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == productID) {
            alert('This item is already added to the cart')
            return;

        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <span class="cart-item-id">${productID}</span>
            <img class="cart-item-image" src="${productImage}" width="100" height="100">
            <span class="cart-item-title">${productName}</span>
        </div>
        <span class="cart-price cart-column">${productPrice}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="${productQuantity}">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)

}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var productPrice = parseFloat(priceElement.innerText.replace('₹', ''))
        var productQuantity = quantityElement.value
        total = total + (productPrice * productQuantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '₹' + total

}
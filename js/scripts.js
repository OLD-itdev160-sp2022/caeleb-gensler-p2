var objectArray = [
  {
    title: 'Hearts of Iron 4',
    price: '$39.99',
    cart: false
  },
  {
    title: 'Rimworld',
    price: '$34.99',
    cart: false
  },
  {
    title: 'Stellaris',
    price: '$39.99',
    cart: false
  },
  {
    title: 'Terraria',
    price: '$9.99',
    cart: false
  },
  {
    title: 'Squad',
    price: '$49.99',
    cart: false
  },
  {
    title: 'Civilization 5',
    price: '$29.99',
    cart: false
  }
];

function fillObjects(index){
  var gameObject = objectArray[index];

  var gameTitle = document.getElementById('title-'+index);
  var gamePrice = document.getElementById('price-'+index);

  var gameTitleText = document.createTextNode(gameObject.title);
  var gamePriceText = document.createTextNode(gameObject.price);

  gameTitle.appendChild(gameTitleText);
  gamePrice.appendChild(gamePriceText);
}

function CartItem(title, price, cart) {
  this.title = title;
  this.price = price;
  this.cart = cart;
}

function addCartElement(cartItem) {
  var cartContainer = document.getElementById('cart');

  var cartObjectOuter = document.createElement('div');
  var cartObjectTitle = document.createElement('span');
  var cartObjectPrice = document.createElement('p');
  var cartObjectDelete = document.createElement('button');

  cartObjectOuter.setAttribute('id', 'cart-outer-' + cartContainer.children.length);
  cartObjectOuter.setAttribute('class', 'cart-object-outer');

  cartObjectDelete.setAttribute('id', 'cart-delete-' + cartContainer.children.length);
  cartObjectDelete.setAttribute('class', 'cart-object-delete');
  cartObjectDelete.addEventListener('click', deleteCartElement);

  cartObjectTitle.setAttribute('class', 'cart-object-title');
  cartObjectPrice.setAttribute('class', 'cart-object-price');
  cartObjectTitle.setAttribute('id', 'cart-title-' + cartContainer.children.length);
  cartObjectPrice.setAttribute('id', 'cart-price-' + cartContainer.children.length);

  var titleText = document.createTextNode(cartItem.title);
  var priceText = document.createTextNode(cartItem.price);
  var deleteText = document.createTextNode('Remove From Cart');

  cartObjectTitle.appendChild(titleText);
  cartObjectPrice.appendChild(priceText);
  cartObjectDelete.appendChild(deleteText);

  cartObjectOuter.appendChild(cartObjectTitle);
  cartObjectOuter.appendChild(cartObjectPrice);
  cartObjectOuter.appendChild(cartObjectDelete);

  cartContainer.appendChild(cartObjectOuter);
}

function deleteCartElement(e) {
  var cartIndex = e.target.getAttribute('id').match(/(\d+)/)[0];
  var cartOuter = document.getElementById('cart-outer-' + cartIndex);
  cartOuter.remove();
  console.log('deleted the thing');
}

function addToCart(buttonPressed) {
  buttonPressed = buttonPressed.match(/(\d+)/)[0]; //filters out letters from button id to just get the index
  var gameInfo = getGameInfo(buttonPressed);
  var cartItem = new CartItem(gameInfo.title, gameInfo.price, gameInfo.cart);
  if(cartItem.cart === false) {//prevents item from being added more than once
    gameInfo = {};
    objectArray[buttonPressed].cart = true;
    addCartElement(cartItem);
  }
}

function getGameInfo(id) {
  var gameInfo = objectArray[id];
  return gameInfo;
}

function init(){
  for(i = 0; i<objectArray.length; i++) {
    fillObjects(i);
  }
}

init();

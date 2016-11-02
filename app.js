$(document).ready(function() {

  var apple = {
    type: 'apple',
    price: 0
  };

  var orange = {
    type: 'orange',
    price: 0
  };

  var banana = {
    type: 'banana',
    price: 0
  };

  var grape = {
    type: 'grape',
    price: 0
  };

  var fruits = [apple, orange, banana, grape];

  createFruits();

//function for putting fruits on the dom and in inventory
  function createFruits() {
  for(var i = 0; i < fruits.length; i++) {
    $("#container").append('<div class="fruit" id="' + fruits[i].type +
    '"><button class="sellButton">Buy</button><p class="price">Price</p></div>'
  );
    $("#inventory").append('<div class="fruit-basket"></div>');
    var $el = $("#inventory").children().last();
    $el.data('type', fruits[i].type);
  }
}

updatePrice();

function chooseNewPrice() {
  for (var i = 0; i < fruits.length; i++) {
    fruits[i].price = randomNumber(0, 999);
    return console.log(fruits[i].price);
  }
}

function updatePrice() {
  setInterval(chooseNewPrice, 1500);
}

function randomNumber(min, max){
    return Math.floor(Math.random() * (1 + max - min) + min) / 100;
}



})

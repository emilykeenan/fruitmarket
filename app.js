$(document).ready(function() {

  var apple = {
    type: 'apple',
    price: 3
  };

  var orange = {
    type: 'orange',
    price: 7
  };

  var banana = {
    type: 'banana',
    price: 2
  };

  var grape = {
    type: 'grape',
    price: 10
  };

  var fruits = [apple, orange, banana, grape];
  updatePrice();
  createFruits();

//function for putting fruits on the dom and in inventory
  function createFruits() {
  for(var i = 0; i < fruits.length; i++) {
    $("#container").append('<div class="fruit" id="' + fruits[i].type +
    '"><button class="sellButton">Buy</button><p class="price">Price: '+ fruits[i].price + '</p></div>'
  );
    $("#inventory").append('<div class="fruit-basket"></div>');
    var $el = $("#inventory").children().last();
    $el.data('type', fruits[i].type);
  }
}

function chooseNewPrice() {
  for (var i = 0; i < fruits.length; i++) {
    fruits[i].price += randomNumber(-50, 50);
    if(fruits[i].price <= 0) {
      fruits[i].price = 0.54;
    }
    if(fruits[i].price > 9.99) {
      fruits[i].price = 9.99;
    }

    var $price = $('#' + fruits[i].type)
      .find('.price')
      .html('Price: '+ fruits[i].price.toLocaleString('en-US', {style: 'currency', currency: 'USD'}));
  }
}

function updatePrice() {
  setInterval(chooseNewPrice, 1500);
}

function randomNumber(min, max){
    return Math.floor(Math.random() * (1 + max - min) + min) / 100;
}

})

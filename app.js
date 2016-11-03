$(document).ready(function() {

  var totalCash = 100;
  var intervalID;

  function Fruit(type, price) {
    this.type = type;
    this.price = price;
    this.count = function () {
      return this.bought - this.sold;
    };
    this.totalPaid = 0;
    this.bought = 0;
    this.sold = 0;
    this.avgPrice = function () {
      if (isNaN(this.totalPaid / this.bought)) {
        return '$0.00';
    } else {
      return (this.totalPaid / this.bought).toLocaleString('en-US', {style: 'currency', currency: 'USD'});
      }
    }
  }

  var apple = new Fruit( 'apple', 3 );

  var orange = new Fruit ( 'orange', 7 );

  var banana = new Fruit ( 'banana', 2);

  var pear = new Fruit ( 'pear', 10);

  var fruits = [apple, orange, banana, pear];
  updatePrice();
  createFruits();
  // setTimeout (timeLimit, 5000);

  $('#container').on('click', '.buyButton', addToInventory);
  $('#container').on('click', '.sellButton', sellInventory);



//function for putting fruits on the dom and in inventory
  function createFruits() {
  for(var i = 0; i < fruits.length; i++) {
    $("#container").append('<div class="fruit col-sm-3" id="' + fruits[i].type +
    '"><button class="buyButton">Buy</button><button class="sellButton">Sell</button><p class="price">Price: '+ fruits[i].price.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + '</p></div>'
  );
    $("#inventory").append('<div class="fruit-basket col-sm-3"><p>' + fruits[i].type + ' count:' + fruits[i].count() +'</p></div>');
    var $el = $("#inventory").children().last();
    $el.addClass(fruits[i].type);
    console.log($el);
    $el.append('<p class="averagePrice"> The average price is :' + fruits[i].avgPrice() + '</p>');

  }
    $('#inventory').append('<p class="totalCash"> Toast Cash :' + totalCash.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + '</p>');
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

    $('#' + fruits[i].type)
      .find('.price')
      .html('Price: '+ fruits[i].price.toLocaleString('en-US', {style: 'currency', currency: 'USD'}));
  }
}

function updatePrice() {
  intervalID = setInterval(chooseNewPrice, 150);
}

function randomNumber(min, max){
    return Math.floor(Math.random() * (1 + max - min) + min) / 100;
}

function addToInventory() {
  var fruit = $(this).parent().attr('id');
  for (var i = 0; i < fruits.length; i++) {
    if(fruits[i].type == fruit) {
      fruit = fruits[i];
    }
  }

  if(totalCash > fruit.price) {
  fruit.bought++;
  fruit.totalPaid += fruit.price;
  totalCash -= fruit.price;
  console.log(totalCash);
  $('#inventory').empty();
  $('#container').empty();
  createFruits();
} else {
  alert('YOU\'RE TOO POOR');
  }
}

function sellInventory () {
  var fruit = $(this).parent().attr('id');
  for (var i = 0; i < fruits.length; i++) {
    if(fruits[i].type == fruit) {
      fruit = fruits[i];
    }
  }
    if (fruit.count() > 0) {
      fruit.sold++;
      totalCash += fruit.price;
      $('#inventory').empty();
      $('#container').empty();
      createFruits();
    } else {
      alert('AIN\'T GOT NONE')
    }

    }

  function timeLimit() {
    clearInterval(intervalID);
    sellItAll();
    var endResult = totalCash - 100;
    if (endResult >= 0) {
      $('#inventory').empty().append('<p>You made ' + endResult.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + '</p>')
    } else {
    $('#inventory').empty().append('<p>You lost ' + Math.abs(endResult).toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + '</p>')
    }
  }

  function sellItAll () {
    for (var i = 0; i < fruits.length; i++) {
       totalCash += fruits[i].price * fruits[i].count();
       fruits[i].sold += fruits[i].count();
       console.log(fruits[i].count());
    }

  }

})

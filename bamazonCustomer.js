(function runBamazon() {

  //* Variables *//

  var mysql = require("mysql");
  var inquirer = require("inquirer");
  var asTable = require("as-table");
  var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "toto",
    database: "bamazon"
  });

  //* Functions *//

  // function :  show all items for sale and then do something
  function showInventory(func) {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, results) {
      if (err) throw err;
      console.log(asTable(results));
      func();
    });
  }


  function chooseProduct() {
    inquirer
      .prompt({
        name: "id",
        type: "input",
        message: "What is the ID of the item you would like to buy?",
        validate: function (value) {
          if (!isNaN(value)) {
            return true;
          }
          return "pick a number!";
        }
      })
      .then(function (answer) {
        var id = answer.id;
        //first make a function to check the quantity
        getProductInfo(id, selectQuantity);
      });
  }

  function getProductInfo(id, func) {
    var query = "SELECT * FROM products WHERE ?";
    connection.query(query, {
        item_id: id,
      },
      function (err, results) {
        if (err) throw err;
        //returns the product info as an object for the next function
        func(results[0]);
        //func();
      })
  }


  function selectQuantity(productObj) {

    var productName = productObj.product_name;
    var itemId = productObj.item_id;
    var stockQuantity = productObj.stock_quantity;

    inquirer
      .prompt({
        name: "quantity",
        type: "input",
        message: "How many " + productName + " do you want to buy?",
        validate: function (value) {
          if (!isNaN(value)) {
            if (value <= stockQuantity){
              return true;
            } else {
              return "pick a number that is less than the stock quantity of " + stockQuantity;
            }
          }
          return "pick a number!";
        }
      })
      .then(function (answer) {
        var quantity = answer.quantity;
        console.log(quantity);
        console.log(itemId);
        purchase(itemId, quantity, stockQuantity, productName);
      });
  }


  function purchase(id, quantity, stock, name) {
    //make the purchase and update quantities in the database
    var newQuantity = stock - quantity;
    var query = "UPDATE products SET ? WHERE ?";
    connection.query(query, [
    {
      stock_quantity: newQuantity
    },
    {
      item_id: id
    }
  ],
    function(err, results){
      if (err) throw err;
      console.log("you have purchased " + quantity + " from " + name);
      console.log("==================================");
    })
    showInventory(chooseProduct);
  }

  connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    showInventory(chooseProduct);
  });
})();
(function runBamazon() {
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

  // function :  show all items for sale
  function showInventory() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, results) {
      if (err) throw err;
      console.log(asTable(results));
    });
  }

  function start() {
    inquirer
      .prompt({
        name: "id",
        type: "input",
        message: "What is the ID of the item you would like to buy?"
      })
      .then(function(answer) {
        var id = answer.id;
        selectQuantity(id);
      });
  }
  
  function checkQuantity(id) {
    //check the availability of id and select it if available
  }
  
  function purchase(id, quantity) {
    //make the purchase and update quantities in the database
  }
  
  connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    showInventory();
  });






})();

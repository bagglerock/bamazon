(function runManager(){

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

    var choices = [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
    ];


    function start() {
        inquirer
          .prompt({
            name: "command",
            type: "rawlist",
            message: "What would you like to do?",
            choices: choices
          })
          .then(function(answer) {
            if (answer.command === "View Products for Sale") {
              //search by artist
              showInventory(start);
            } else if (answer.command === "View Low Inventory"){
                //display artists that have more than one hit
                viewLowInventory(start);
            } else if (answer.command === "Add to Inventory"){
                //display artists of a range
                addToInventory();
    
            } else if (answer.command === "Add New Product"){
                //search by song
                searchBySong();
            }
            else {
              //something wrong happened
            }
          });
      }

      function showInventory(func) {
        var query = "SELECT * FROM products";
        connection.query(query, function (err, results) {
          if (err) throw err;
          console.log(asTable(results));
          func();
        });
      }

      function viewLowInventory(func) {
        var query = "SELECT * FROM products WHERE stock_quantity < 6";
        connection.query(query, function (err, results) {
          if (err) throw err;
          console.log(asTable(results));
          func();
        });

      }









    connection.connect(function(err) {
        if (err) throw err;
        // run the start function after the connection is made to prompt the user
        start();
      });



})();

//add a parameter to showInventory to view low inventory to a number less than something
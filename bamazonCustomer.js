var mysql = require("mysql");
var inquirer = require("inquirer");

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
function showInventory(){
    //show inventory as a list
}

function start() {
    inquirer
      .prompt({
        name: "id",
        type: "input",
        message: "What is the ID of the item you would like to buy?",
      })
      .then(function(answer) {
          var id = answer.id;
          selectQuantity(id);
      });
  }

  function selectQuantity(id){
      console.log(id);
  }

  function checkQuantity(id){
      //check the availability of id

  }

  function purchase(id, quantity){
      //make the purchase and update quantities in the database
  }



connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });
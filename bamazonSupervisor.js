(function runSupervisor(){

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
        "View Product Sales by Department",
        "Create New Department"
      ];




    connection.connect(function(err) {
        if (err) throw err;
        // run the start function after the connection is made to prompt the user
        start();
      });

})();
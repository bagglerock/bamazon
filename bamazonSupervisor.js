(function runSupervisor() {
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

  var choices = ["View Product Sales by Department", "Create New Department"];

  function start() {
    inquirer
      .prompt({
        name: "command",
        type: "rawlist",
        message: "What would you like to do?",
        choices: choices
      })
      .then(function(answer) {
        if (answer.command === "View Product Sales by Department") {
          showSales(start);
        } else if (answer.command === "Create New Department") {
          createNewDepartment();
        } else {
          console.log("something happened");
          start();
          //something wrong happened
        }
      });
  }

  function showSales(func) {
    var query = "SELECT department_id AS ID, department_name AS Department, overhead_costs AS Overhead FROM departments";
    connection.query(query, function(err, results) {
      if (err) throw err;
      console.log(asTable(results));
      func();
    });
  }

  function createNewDepartment() {
    inquirer
      .prompt([
        {
          name: "name",
          type: "input",
          message: "What is the name of the department you would like to add?"
        },
        {
          name: "overhead",
          type: "input",
          message: "What are the overhead costs?",
          validate: function(value) {
            if (!isNaN(value)) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO departments SET ?",
          {
            department_name: answer.name,
            overhead_costs: answer.overhead
          },
          function(err) {
            if (err) throw err;
            console.log("Your department was added successfully!");
            // re-prompt the user for if they want to bid or post
            showSales(start);
          }
        );
      });
  }

  connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });
})();

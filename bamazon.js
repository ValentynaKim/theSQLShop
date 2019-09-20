var mysql = require("mysql");
var inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "bamazon_db"

});

connection.connect(function(err){
  if (err) throw err;
  console.log("Connected");
  productItems();
})

function productItems() {
    connection.query("SELECT * FROM products", function (err, res) {
      if (err) throw err
      else console.table(res);
      productId();
    });
}


function productId() {

  inquirer.prompt([

    {
      type: "input",
      name: "id",
      message: "Please enter the Item ID of the product you would like to buy.\n",
      validate: function (value) {
        if (!isNaN(value) && value < 11) {
          return true;
        }
        return false;
      }
    },

    {
      type: "input",
      name: "quant",
      message: "How many units of the product would you like to buy? \n",
      validate: function (value) {
        if (!isNaN(value)) {
          return true;
        }
        return false;
      }
    }

  ]).then(function (answer) {

    var userId = answer.id;
    console.log("Chosen item id: ", userId);

    var userQuant = answer.quant;
    console.log("Chosen quantity from stock: ", userQuant, "\n");

    connection.query("SELECT * FROM products WHERE id=?", [answer.id], function (err, res) {
      if (err) throw err;

      console.log(answer.id);
      console.log(answer.quant);
      var current_quantity = res[0].stock_quantity;
      console.log(res)
      console.log("Current quantity in stock: ", current_quantity);
      var price = res[0].price;
      var remaining_quantity = current_quantity - answer.quant;
      console.log("Remaining quantity in stock: ", remaining_quantity);

      if (current_quantity >= answer.quant) {

        console.log("Amount Remaining: " + remaining_quantity);
        console.log("Total Cost: " + (answer.quant * price) + "\n");

        updateProduct(remaining_quantity , answer.id);
        

      } else {
        console.log("Insufficient amounts, please edit your units!");
      }

    });
  })

}


function updateProduct(quantity, id){
  connection.query("UPDATE products SET stock_quantity=? WHERE id=?",[quantity, id], function (err, res){
    console.log("Updated");
    productItems();
  } 
  )}

//****  COPY THIS PART TO MAKE THE DATABASE AND INSERT 10 items **///


DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(150) NOT NULL,
  department_name VARCHAR(150) NULL,
  price DECIMAL(10,4) NULL,
  stock_quantity INT NULL,

  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("M&M's", "Candy", 2.50, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tissues", "Health & Beauty", 1.25, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Legos", "Toys", 15.75, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Crockpot", "Appliances", 39.99, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cotton Pillow", "Bedding", 19.99, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Down Pillow", "Bedding", 129.50, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("T-Shirt", "Clothing", 9.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jeans", "Clothing", 39.50, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bluetooth receiver", "Electronics", 49.99, 32);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("55-inch OLED TV", "Electronics", 499.99, 30);


CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(150) NULL,
  overhead_costs DECIMAL(10,4) NULL,

  PRIMARY KEY (department_id)
);

USE bamazon;

ALTER TABLE products
ADD product_sales DECIMAL(10,4);


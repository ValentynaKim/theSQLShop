DROP DATABASE bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT, 
    product_name VARCHAR(255),
    department_name VARCHAR(255) ,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY(id) 
);

SELECT * FROM products;

INSERT INTO products (product_name,department_name, price, stock_quantity) VALUES ("Plant", "Garden", 7, 80), ("iWatch", "Electronics", 550, 36), 
("Towell", "Home", 20, 55),
("FlowerQ", "Beauty", 120, 34),
("Chair", "Furniture", 55, 12),
("Cheese", "Food", 8, 45),
("Visine", "Farmacy", 4, 16),
("Refrigirator", "Apliances", 150, 32),
("Logics", "Books", 10, 7),
("Wheels", "Parts", 200, 15);


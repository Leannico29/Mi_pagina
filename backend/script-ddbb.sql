CREATE SCHEMA IF NOT EXISTS `keyboard_gaming`
DEFAULT CHARACTER SET utf8mb4
DEFAULT COLLATE utf8mb4_unicode_ci;

/*
ALTER SCHEMA `keyboard_gaming`
DEFAULT CHARACTER SET utf8mb4
DEFAULT COLLATE utf8mb4_unicode_ci;
*/

USE `keyboard_gaming`;

SET time_zone = '-03:00';

-- TABLAS

CREATE TABLE product_types (
	id INT AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
	CONSTRAINT pk_product_types PRIMARY KEY (id),
	CONSTRAINT uk_product_types_name UNIQUE (name),
	CONSTRAINT ck_product_types_name CHECK (name != '')
);

CREATE TABLE brands (
	id INT AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
	CONSTRAINT pk_brands PRIMARY KEY (id),
	CONSTRAINT uk_brands_name UNIQUE (name),
	CONSTRAINT ck_brands_name CHECK (name != '')
);

CREATE TABLE products (
	id INT AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
	price DECIMAL(10, 2) NOT NULL,
	stock INT NOT NULL DEFAULT 0,
	description VARCHAR(255) NOT NULL,
	product_type_id INT NOT NULL,
	brand_id INT NOT NULL,
	CONSTRAINT pk_products PRIMARY KEY (id),
	CONSTRAINT fk_products_type FOREIGN KEY (product_type_id) REFERENCES product_types (id),
	CONSTRAINT fk_products_brand FOREIGN KEY (brand_id) REFERENCES brands (id),
	CONSTRAINT uk_products_name UNIQUE (name),
	CONSTRAINT ck_products_name CHECK (name != ''),
	CONSTRAINT ck_products_price CHECK (price >= 0),
	CONSTRAINT ck_products_stock CHECK (stock >= 0),
	CONSTRAINT ck_products_description CHECK (description != ''),
	CONSTRAINT ck_products_description_length CHECK (LENGTH(description) > 5)
);

CREATE TABLE images (
	id INT AUTO_INCREMENT,
	image_url VARCHAR(255) NOT NULL,
	CONSTRAINT pk_images PRIMARY KEY (id),
	CONSTRAINT uk_images_url UNIQUE (image_url),
	CONSTRAINT ck_images_url CHECK (image_url != '')
);

CREATE TABLE products_images (
	product_id INT NOT NULL,
	image_id INT NOT NULL,
	CONSTRAINT pk_products_images PRIMARY KEY (product_id, image_id),
	CONSTRAINT fk_products_images_product_id FOREIGN KEY (product_id) REFERENCES products (id),
	CONSTRAINT fk_products_images_image_id FOREIGN KEY (image_id) REFERENCES images (id)
);

CREATE TABLE users (
	id INT AUTO_INCREMENT,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	email VARCHAR(100) NOT NULL,
	hashed_password VARCHAR(255) NOT NULL,
	username VARCHAR(30),
	address VARCHAR(50),
	role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
	CONSTRAINT pk_users PRIMARY KEY (id),
	CONSTRAINT ck_users_first_name CHECK (first_name != ''),
	CONSTRAINT ck_users_last_name CHECK (last_name != ''),
	CONSTRAINT ck_users_email CHECK (email != ''),
	CONSTRAINT ck_users_email_length CHECK (LENGTH(email) > 5),
	CONSTRAINT ck_users_password CHECK (hashed_password != ''),
	CONSTRAINT ck_users_address CHECK (address != ''),
	CONSTRAINT ck_users_role CHECK (role IN ('admin', 'user')),
	CONSTRAINT uk_users_email UNIQUE (email),
	CONSTRAINT uk_users_username UNIQUE (username)
);

CREATE TABLE users_interest_products (
	user_id INT NOT NULL,
	product_id INT NOT NULL,
	CONSTRAINT pk_users_interest_products PRIMARY KEY (user_id, product_id),
	CONSTRAINT fk_users_interest_products_user_id FOREIGN KEY (user_id) REFERENCES users (id),
	CONSTRAINT fk_users_interest_products_product_id FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE purchases (
	id INT AUTO_INCREMENT,
	purchase_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	total_price DECIMAL(15, 2) NOT NULL,
	CONSTRAINT pk_purchases PRIMARY KEY (id),
	CONSTRAINT ck_total_price CHECK (total_price >= 0)
);

CREATE TABLE purchases_details (
	purchase_id INT NOT NULL,
	product_id INT NOT NULL,
	product_quantity INT NOT NULL DEFAULT 1,
	CONSTRAINT pk_purchases_details PRIMARY KEY (purchase_id, product_id),
	CONSTRAINT fk_purchases_details_purchase_id FOREIGN KEY (purchase_id) REFERENCES purchases (id),
	CONSTRAINT fk_purchases_details_product_id FOREIGN KEY (product_id) REFERENCES products (id),
	CONSTRAINT ck_purchases_details_quantity CHECK (product_quantity > 0) 
);

CREATE TABLE purchase_history (
	purchase_id INT NOT NULL,
	user_id INT NOT NULL,
	CONSTRAINT pk_historial_compras PRIMARY KEY (purchase_id, user_id),
	CONSTRAINT fk_historial_compras_purchase_id FOREIGN KEY (purchase_id) REFERENCES purchases (id),
	CONSTRAINT fk_historial_compras_user_id FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE carts (
    id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    creation_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'paid', 'cancelled') NOT NULL DEFAULT 'pending',
    CONSTRAINT pk_carts PRIMARY KEY (id),
    CONSTRAINT fk_carts_user_id FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT ck_carts_status CHECK (status IN ('pending', 'paid', 'cancelled'))
);

CREATE TABLE carts_details (
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    product_quantity INT NOT NULL DEFAULT 1,
    CONSTRAINT pk_carts_details PRIMARY KEY (cart_id, product_id),
    CONSTRAINT fk_carts_details_cart_id FOREIGN KEY (cart_id) REFERENCES carts (id),
    CONSTRAINT fk_carts_details_product_id FOREIGN KEY (product_id) REFERENCES products (id),
	CONSTRAINT ck_carts_details_quantity CHECK (product_quantity > 0)
);


-- TRIGGERS

DELIMITER $$

CREATE TRIGGER products_update_stock 
AFTER INSERT ON purchases_details 
FOR EACH ROW 
BEGIN 
	UPDATE products 
	SET stock = stock - NEW.product_quantity 
	WHERE id = NEW.product_id; 
END$$

CREATE TRIGGER insert_purchase_and_delete_cart_when_paid 
AFTER UPDATE ON carts 
FOR EACH ROW 
BEGIN 
	IF NEW.status = 'paid' THEN
		INSERT INTO purchases (purchase_timestamp, total_price)
		VALUES (NOW(), (
			SELECT SUM(p.price * cd.product_quantity)
			FROM carts_details cd
			JOIN products p ON cd.product_id = p.id
			WHERE cd.cart_id = NEW.id
		));

		SET @purchase_id = LAST_INSERT_ID();

		INSERT INTO purchases_details (purchase_id, product_id, product_quantity)
		SELECT @purchase_id, product_id, product_quantity 
		FROM carts_details 
		WHERE cart_id = NEW.id;
        
		INSERT INTO purchase_history (purchase_id, user_id) 
		VALUES (@purchase_id, NEW.user_id);

		DELETE 
		FROM carts_details 
		WHERE cart_id = NEW.id;

		DELETE 
		FROM carts 
		WHERE id = NEW.id;
	END IF;
END$$

DELIMITER ;


-- INDICES

CREATE INDEX idx_products_name ON products (name);
CREATE INDEX idx_products_price ON products (price);
CREATE INDEX idx_users_username ON users (username);
CREATE INDEX idx_users_email ON users (email);

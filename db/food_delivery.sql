CREATE DATABASE IF NOT EXISTS food_delivery;
USE food_delivery;

-- ==========================================
-- 1. USERS
-- ==========================================
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    role ENUM('customer', 'restaurant_owner', 'admin') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Users (name, email, password_hash, role) VALUES ('Admin User', 'admin@example.com', 'hashed_password', 'admin');

-- ==========================================
-- 2. CATEGORIES
-- ==========================================
CREATE TABLE Categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    image VARCHAR(255)
);

INSERT INTO Categories (name, image) VALUES 
('Burger', 'https://img.icons8.com/color/96/hamburger.png'),
('Pizza', 'https://img.icons8.com/color/96/pizza.png'),
('Coffee', 'https://img.icons8.com/color/96/coffee.png'),
('Mexican', 'https://img.icons8.com/color/96/taco.png'),
('Asian', 'https://img.icons8.com/color/96/sushi.png'),
('Dessert', 'https://img.icons8.com/color/96/dessert.png'),
('Salad', 'https://img.icons8.com/color/96/salad.png');


-- ==========================================
-- 3. RESTAURANTS
-- ==========================================
CREATE TABLE Restaurants (
    restaurant_id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(20),
    opening_time TIME,
    closing_time TIME,
    rating DECIMAL(2,1) DEFAULT 0.0,
    image VARCHAR(255),
    description TEXT,
    delivery_fee DECIMAL(10,2),
    delivery_time VARCHAR(50),
    FOREIGN KEY (owner_id) REFERENCES Users(user_id)
        ON DELETE CASCADE
);

INSERT INTO Restaurants (owner_id, name, address, rating, image, description, delivery_fee, delivery_time) VALUES 
(1, 'Spicy Restaurant', '123 Main St', 4.7, 'https://images.unsplash.com/photo-1552526881-721ce8509ea2?w=500&q=80', 'Maecenas sed diam eget risus varius blandit sit amet non magna.', 0.00, '20 min'),
(1, 'Pizza Paradise', '456 Oak St', 4.5, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80', 'Best Pizza in town', 2.00, '30 min'),
(1, 'Taco Fiesta', '789 Spicy Ln', 4.8, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&q=80', 'Authentic Mexican Tacos', 1.50, '25 min'),
(1, 'Sushi Zen', '321 Ocean Dr', 4.9, 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80', 'Fresh Sushi & Sashimi', 2.50, '40 min'),
(1, 'Sweet Treats', '555 Sugar Ave', 4.6, 'https://images.unsplash.com/photo-1551024601-569d6f46319c?w=500&q=80', 'Delicious Desserts', 1.00, '15 min'),
(1, 'Green Garden', '999 Veggie Blvd', 4.5, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80', 'Healthy Salads & Wraps', 1.20, '20 min');

-- ==========================================
-- 4. RESTAURANT CATEGORIES
-- ==========================================
CREATE TABLE restaurant_categories (
    restaurant_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (restaurant_id, category_id),
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id) ON DELETE CASCADE
);

INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES 
(1, 1), -- Spicy -> Burger
(2, 2), -- Pizza -> Pizza
(3, 4), -- Taco Fiesta -> Mexican
(4, 5), -- Sushi Zen -> Asian
(5, 6), -- Sweet Treats -> Dessert
(6, 7); -- Green Garden -> Salad

-- ==========================================
-- 5. MENU ITEMS
-- ==========================================
CREATE TABLE Menu (
    menu_id INT PRIMARY KEY AUTO_INCREMENT,
    restaurant_id INT NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(255),
    is_available BOOLEAN DEFAULT TRUE,
    category VARCHAR(100),
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id)
        ON DELETE CASCADE
);

INSERT INTO Menu (restaurant_id, item_name, description, price, image_url, category) VALUES
(1, 'Burger Ferguson', 'Spicy Restaurant special', 40.00, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80', 'Burger'),
(1, 'Rockin Burgers', 'Cafecafachino', 40.00, 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80', 'Burger'),
(2, 'Margherita Pizza', 'Classic cheese and tomato', 12.00, 'https://images.unsplash.com/photo-1574071318500-d0d580426632?w=500&q=80', 'Pizza'),
(3, 'Beef Taco', 'Crispy beef taco with cheese', 3.50, 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&q=80', 'Mexican'),
(3, 'Chicken Burrito', 'Grilled chicken burrito', 8.00, 'https://images.unsplash.com/photo-1566740933430-b5e70b06d2d5?w=500&q=80', 'Mexican'),
(4, 'Salmon Nigiri', 'Fresh salmon on rice', 5.00, 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=500&q=80', 'Asian'),
(4, 'Tuna Roll', 'Spicy tuna roll', 6.50, 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&q=80', 'Asian'),
(5, 'Chocolate Cake', 'Rich chocolate layer cake', 6.00, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80', 'Dessert'),
(5, 'Cheesecake', 'Classic NY cheesecake', 7.00, 'https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=500&q=80', 'Dessert'),
(6, 'Caesar Salad', 'Fresh romaine with caesar dressing', 9.00, 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&q=80', 'Salad'),
(6, 'Greek Salad', 'Cucumber, tomato, feta, olives', 10.00, 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&q=80', 'Salad');

-- ==========================================
-- 6. CART 
-- ==========================================
CREATE TABLE Cart (
    cart_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE
);

CREATE TABLE CartItems (
    cart_item_id INT PRIMARY KEY AUTO_INCREMENT,
    cart_id INT NOT NULL,
    menu_id INT NOT NULL,
    quantity INT DEFAULT 1,
    FOREIGN KEY (cart_id) REFERENCES Cart(cart_id)
        ON DELETE CASCADE,
    FOREIGN KEY (menu_id) REFERENCES Menu(menu_id)
        ON DELETE CASCADE
);

-- ==========================================
-- 7. ORDERS
-- ==========================================
CREATE TABLE Orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    restaurant_id INT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'preparing', 'delivering', 'completed', 'cancelled') DEFAULT 'pending',
    order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivery_address TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE,
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id)
        ON DELETE CASCADE
);

-- ==========================================
-- 8. ORDER DETAILS
-- ==========================================
CREATE TABLE OrderItems (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    menu_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
        ON DELETE CASCADE,
    FOREIGN KEY (menu_id) REFERENCES Menu(menu_id)
        ON DELETE CASCADE
);

-- ==========================================
-- 9. PAYMENTS
-- ==========================================
CREATE TABLE Payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    payment_method ENUM('cash', 'credit_card', 'momo', 'paypal') DEFAULT 'cash',
    payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
        ON DELETE CASCADE
);

-- ==========================================
-- 10. REVIEWS
-- ==========================================
CREATE TABLE Reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    restaurant_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE,
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id)
        ON DELETE CASCADE
);

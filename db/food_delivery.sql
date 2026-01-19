DROP DATABASE IF EXISTS food_delivery;
CREATE DATABASE food_delivery;
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

-- Insert Admin User
INSERT INTO Users (name, email, password_hash, role)
VALUES ('Admin User', 'admin@example.com', '$10$WbrvPDVcbqJIU4LhfiLjJOcb26cPEBNsngvfF/ECI4UosQ8.6z/Q.', 'admin');

-- Insert Restaurant Owner (Pass: 123)
INSERT INTO Users (name, email, password_hash, phone, address, role, created_at)
VALUES (
  'John Restaurant',
  'owner@restaurant.com',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 
  '123-456-7890',
  '123 Restaurant Street, Food City',
  'restaurant_owner',
  NOW()
);

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
('Salad', 'https://img.icons8.com/color/96/salad.png'),
('Sides', 'https://img.icons8.com/color/96/fries.png'),
('Beverages', 'https://img.icons8.com/color/96/soda-cup.png');


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

-- Insert General Restaurants (Đã sửa ảnh Spicy & Sweet Treats)
INSERT INTO Restaurants (owner_id, name, address, rating, image, description, delivery_fee, delivery_time) VALUES
(1, 'Spicy Restaurant', '123 Main St', 4.7, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', 'Experience the heat of authentic spices.', 0.00, '20 min'),
(1, 'Pizza Paradise', '456 Oak St', 4.5, 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&q=80', 'Best Pizza in town.', 2.00, '30 min'),
(1, 'Taco Fiesta', '789 Spicy Ln', 4.8, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', 'Authentic Mexican Tacos.', 1.50, '25 min'),
(1, 'Sushi Zen', '321 Ocean Dr', 4.9, 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80', 'Fresh Sushi & Sashimi.', 2.50, '40 min'),
(1, 'Sweet Treats', '555 Sugar Ave', 4.6, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80', 'Delicious Desserts and Pastries.', 1.00, '15 min'),
(1, 'Green Garden', '999 Veggie Blvd', 4.5, 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80', 'Healthy Salads & Wraps.', 1.20, '20 min');

-- Insert Test Restaurant (John Restaurant Owner)
INSERT INTO Restaurants (owner_id, name, address, phone, opening_time, closing_time, rating, image, description, delivery_fee, delivery_time)
VALUES (
  (SELECT user_id FROM Users WHERE email = 'owner@restaurant.com' LIMIT 1),
  'Delicious Burger House',
  '456 Main Street, Food City',
  '555-1234',
  '10:00:00',
  '22:00:00',
  4.5,
  'https://images.unsplash.com/photo-1586190848861-99c8a3bd79a8?w=800&q=80',
  'Serve the best burgers in town with fresh ingredients.',
  5.00,
  '30-45 mins'
);

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

SET @new_restaurant_id = (SELECT restaurant_id FROM Restaurants WHERE name = 'Delicious Burger House' LIMIT 1);
INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES (@new_restaurant_id, 1);

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

-- General Menu Items
INSERT INTO Menu (restaurant_id, item_name, description, price, image_url, category) VALUES
(1, 'Double Beef Burger', 'Juicy double patty', 15.00, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', 'Burger'),
(1, 'Chicken Burger', 'Crispy chicken fillet', 12.00, 'https://images.unsplash.com/photo-1615297928064-24977384d0f9?w=600&q=80', 'Burger'),
(2, 'Margherita Pizza', 'Classic cheese and tomato', 12.00, 'https://images.unsplash.com/photo-1574071318500-d0d580426632?w=600&q=80', 'Pizza'),
(3, 'Beef Taco', 'Crispy beef taco with cheese', 3.50, 'https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=600&q=80', 'Mexican'),
(3, 'Chicken Burrito', 'Grilled chicken burrito', 8.00, 'https://images.unsplash.com/photo-1566740933430-b5e70b06d2d5?w=600&q=80', 'Mexican'),
(4, 'Salmon Nigiri', 'Fresh salmon on rice', 5.00, 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80', 'Asian'),
(4, 'Tuna Roll', 'Spicy tuna roll', 6.50, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80', 'Asian'),
(5, 'Chocolate Cake', 'Rich chocolate layer cake', 6.00, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80', 'Dessert'),
(5, 'Cheesecake', 'Classic NY cheesecake', 7.00, 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80', 'Dessert'),
(6, 'Caesar Salad', 'Fresh romaine with caesar dressing', 9.00, 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600&q=80', 'Salad'),
(6, 'Greek Salad', 'Cucumber, tomato, feta, olives', 10.00, 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80', 'Salad');

-- ======================================================================
-- !!! QUAN TRỌNG: ẢNH MỚI CHO 'DELICIOUS BURGER HOUSE' (MENU TEST) !!!
-- ======================================================================
SET @restaurant_id = (SELECT restaurant_id FROM Restaurants WHERE name = 'Delicious Burger House' LIMIT 1);

INSERT INTO Menu (item_name, price, description, image_url, category, restaurant_id) VALUES
('Classic Cheeseburger', 8.99, 'Juicy beef patty with melted cheddar', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', 'Burgers', @restaurant_id),
('Bacon Double Burger', 10.99, 'Two beef patties with crispy bacon', 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&q=80', 'Burgers', @restaurant_id),
('Mushroom Swiss Burger', 9.99, 'Beef patty topped with mushrooms', 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80', 'Burgers', @restaurant_id),
('Crispy Fries', 3.99, 'Golden fried potato fries with sea salt', 'https://images.unsplash.com/photo-1541592106381-b31e96716280?w=600&q=80', 'Sides', @restaurant_id),
('Onion Rings', 4.99, 'Crispy fried onion rings', 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=600&q=80', 'Sides', @restaurant_id),
('Caesar Salad', 7.99, 'Fresh romaine lettuce with parmesan', 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600&q=80', 'Salads', @restaurant_id),
('Grilled Chicken Salad', 8.99, 'Mixed greens with grilled chicken breast', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80', 'Salads', @restaurant_id),
('Coca-Cola', 2.49, 'Ice-cold Coca-Cola soft drink', 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&q=80', 'Beverages', @restaurant_id),
('Fresh Lemonade', 3.49, 'Freshly squeezed lemonade', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80', 'Beverages', @restaurant_id),
('Iced Tea', 2.99, 'Cold iced tea served with lemon', 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80', 'Beverages', @restaurant_id),
('Chocolate Cake', 4.99, 'Rich chocolate layer cake', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80', 'Desserts', @restaurant_id),
('Cheesecake', 5.99, 'Creamy New York style cheesecake', 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=600&q=80', 'Desserts', @restaurant_id);

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
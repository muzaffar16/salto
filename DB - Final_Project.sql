/*Customers Table:
	CustomerID (PK), Name, Email, PhoneNumber, DeliveryAddress, RegisteredDate, Status.

Menu Table:
	MenuID (PK), ItemName, CategoryID (FK), Price.

Categories Table:
	CategoryID (PK), CategoryName.

Products Table:
	ProductID (PK), ProductName, CategoryID (FK), Price, StockQuantity, ProductURL.

Orders Table:
	OrderID (PK), CustomerID (FK), OrderDate, TotalAmount, OrderStatus.

OrderDetails Table:
	OrderDetailID (PK), OrderID (FK), ProductID (FK), Quantity, Subtotal.

Payments Table:
	PaymentID (PK), OrderID (FK), PaymentDate, PaymentMethod, PaymentStatus.*/

-- Creating all Tables

CREATE TABLE Customers (
    CustomerID SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    PhoneNumber VARCHAR(15) UNIQUE NOT NULL,
    DeliveryAddress TEXT,
    RegisteredDate DATE NOT NULL,
    Status VARCHAR(50) NOT NULL
);

CREATE TABLE Categories (
    CategoryID SERIAL PRIMARY KEY,
    CategoryName VARCHAR(100) NOT NULL
);

CREATE TABLE Menu (
    MenuID SERIAL PRIMARY KEY,
    ItemName VARCHAR(100) NOT NULL,
    CategoryID INT NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);

CREATE TABLE Products (
    ProductID SERIAL PRIMARY KEY,
    ProductName VARCHAR(100) NOT NULL,
    CategoryID INT NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    StockQuantity INT NOT NULL,
    ProductURL VARCHAR(255),
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);

CREATE TABLE Orders (
    OrderID SERIAL PRIMARY KEY,
    CustomerID INT NOT NULL,
    OrderDate TIMESTAMP NOT NULL,
    TotalAmount DECIMAL(10, 2) NOT NULL,
    OrderStatus VARCHAR(50) NOT NULL,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

CREATE TABLE OrderDetails (
    OrderDetailID SERIAL PRIMARY KEY,
    OrderID INT NOT NULL,
    ProductID INT NOT NULL,
    Quantity INT NOT NULL,
    Subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

CREATE TABLE Payments (
    PaymentID SERIAL PRIMARY KEY,
    OrderID INT NOT NULL,
    PaymentDate TIMESTAMP NOT NULL,
    PaymentMethod VARCHAR(50) NOT NULL,
    PaymentStatus VARCHAR(50) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);



-- Inserting Values in  Categories Table

INSERT INTO Categories (CategoryID, CategoryName) VALUES (1, 'Mid Night Deals');
INSERT INTO Categories (CategoryID, CategoryName) VALUES (2, 'Cricket Deals');
INSERT INTO Categories (CategoryID, CategoryName) VALUES (3, 'BBQ Deals');
INSERT INTO Categories (CategoryID, CategoryName) VALUES (4, 'Ramadan Deals');
INSERT INTO Categories (CategoryID, CategoryName) VALUES (5, 'Pizza Deals');
INSERT INTO Categories (CategoryID, CategoryName) VALUES (6, 'Family Deal');
INSERT INTO Categories (CategoryID, CategoryName) VALUES (7, 'Burger Deal');
INSERT INTO Categories (CategoryID, CategoryName) VALUES (8, 'Kids Meal');
INSERT INTO Categories (CategoryID, CategoryName) VALUES (9, 'Starters');
INSERT INTO Categories (CategoryID, CategoryName) VALUES (10, 'Frango Chicken');
INSERT INTO Categories (CategoryID, CategoryName) VALUES (11, 'Crispy Chicken');
INSERT INTO Categories (CategoryID, CategoryName) VALUES (12, 'Rappa');
INSERT INTO Categories (CategoryID, CategoryName) VALUES (13, 'Chips');
INSERT INTO Categories (CategoryID, CategoryName) VALUES (14, 'Beverages');



--Inserting Values in Produts Table

INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (1, '2 Zinger Burgers with loaded Fries & 500ml Drink', 1, 799, 50, 'https://example.com/midnight_deal1');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (2, '4 Zinger Burgers with 12 PCS Chicken Hotshots, 2 Mini Cones Fries & 1 LTR Drink', 1, 1499, 30, 'https://example.com/midnight_deal2');

INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (3, '2 Zinger Burgers with Loaded Fries', 2, 799, 50, 'https://example.com/cricket_deal1');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (4, '4 Zinger Burgers, 10 Pcs Hotshots with 02 Regular Fries', 2, 1399, 30, 'https://example.com/cricket_deal2');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (5, 'Value Burger', 2, 270, 100, 'https://example.com/value_burger');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (6, '1 Small Pizza, 1 Value Burger with 04 Pcs Hot Wings', 2, 799, 40, 'https://example.com/cricket_deal3');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (7, '1 Regular Pizza, 2 Value Burgers with 1 Loaded Fries', 2, 1499, 20, 'https://example.com/cricket_deal4');

INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (8, 'Chicken Tikka', 3, 419, 50, 'https://example.com/chicken_tikka');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (9, 'Malai Boti', 3, 449, 50, 'https://example.com/malai_boti');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (10, 'ChatKhara Boti', 3, 449, 50, 'https://example.com/chatkhara_boti');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (11, 'Chicken Behari Boti', 3, 449, 50, 'https://example.com/chicken_behari_boti');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (12, 'Haryali Boti', 3, 499, 50, 'https://example.com/haryali_boti');

INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (13, '2 Zinger Burgers with 6 pcs Hot Wings & 1 500ml Drink', 4, 999, 40, 'https://example.com/ramadan_deal1');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (14, '2 Zinger Burgers, 1 Qtr Frango, 1 Pita Bread, Dip Sauce & 500ml Drink', 4, 1299, 30, 'https://example.com/ramadan_deal2');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (15, '4 Zinger Burgers, 4 Pcs Crispy Fried Chicken With 2 Mini Cone Fries & 1 LTR Soft Drink', 4, 2299, 20, 'https://example.com/ramadan_deal3');

INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (16, 'Small Pizza', 5, 499, 60, 'https://example.com/small_pizza');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (17, '8" Regular Pizza', 5, 799, 60, 'https://example.com/regular_pizza');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (18, '12" Large Pizza', 5, 1299, 60, 'https://example.com/large_pizza');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (19, '1 Small Pizza 1 345ml Drink', 5, 449, 50, 'https://example.com/deal_01');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (20, '1 Regular Pizza 1 500ml Drink', 5, 649, 50, 'https://example.com/deal_02');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (21, '1 Large Pizza 1 Liter Drink', 5, 1049, 50, 'https://example.com/deal_03');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (22, '2 Large Pizzas', 5, 1699, 40, 'https://example.com/classic_deal1');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (23, '1 Large Pizza 1 Small Pizza', 5, 1149, 40, 'https://example.com/classic_deal2');

INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (24, 'Super Combo', 6, 2000, 50, 'https://example.com/super_combo');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (25, 'Family Feast', 6, 2099, 50, 'https://example.com/family_feast');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (26, 'Super 4 Deal', 6, 1399, 50, 'https://example.com/super_4_deal');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (27, 'Mighty Deal', 6, 1599, 50, 'https://example.com/mighty_deal');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (28, 'Super Family Deal', 6, 1799, 50, 'https://example.com/super_family_deal');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (29, 'Sharing Combo 1', 6, 1399, 50, 'https://example.com/sharing_combo_1');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (30, 'Sharing Combo 2', 6, 1399, 50, 'https://example.com/sharing_combo_2');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (31, '4 Can Dine', 6, 1899, 50, 'https://example.com/4_can_dine');

INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (32, 'Beef Burger', 7, 399, 50, 'https://example.com/beef_burger');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (33, 'Double Decker', 7, 649, 50, 'https://example.com/double_decker');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (34, 'Chipotle Burger', 7, 449, 50, 'https://example.com/chipotle_burger');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (35, 'Crispy Burger', 7, 399, 50, 'https://example.com/crispy_burger');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (36, 'Tower Burger', 7, 499, 50, 'https://example.com/tower_burger');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (37, 'Crispy Straker Burger', 7, 549, 50, 'https://example.com/crispy_straker_burger');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (38, 'Chicken Burger', 7, 249, 50, 'https://example');

INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (1, 'Kids Meal Nuggets', 8, 399, 50, 'https://example.com/kids_meal_nuggets');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (2, 'Kids Meal Chicken Burger', 8, 399, 50, 'https://example.com/kids_meal_chicken_burger');

INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (3, 'Juicy Chicken Tender', 9, 349, 50, 'https://example.com/juicy_chicken_tender');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (4, 'Tempura Nuggets', 9, 349, 50, 'https://example.com/tempura_nuggets');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (5, 'Hot Wings', 9, 249, 50, 'https://example.com/hot_wings');

INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (6, 'Full Frango Chicken', 10, 1699, 50, 'https://example.com/full_frango_chicken');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (7, 'Half Frango Chicken', 10, 899, 50, 'https://example.com/half_frango_chicken');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (8, 'QTR Frango Chicken', 10, 499, 50, 'https://example.com/qtr_frango_chicken');

INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (9, '1 Pc Crispy Chicken', 11, 249, 50, 'https://example.com/1_pc_crispy_chicken');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (10, '2 Pcs Crispy Chicken', 11, 599, 50, 'https://example.com/2_pcs_crispy_chicken');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (11, '5 Pcs Crispy Chicken', 11, 1249, 50, 'https://example.com/5_pcs_crispy_chicken');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (12, '9 Pcs Crispy Chicken', 11, 1999, 50, 'https://example.com/9_pcs_crispy_chicken');

INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (13, 'Chicken Tikka Rappa', 12, 249, 50, 'https://example.com/chicken_tikka_rappa');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (14, 'Chicken Mughlai Rappa', 12, 249, 50, 'https://example.com/chicken_mughlai_rappa');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (15, 'Crispy Chicken Rappa', 12, 249, 50, 'https://example.com/crispy_chicken_rappa');

INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (16, 'Original Fries', 13, 199, 50, 'https://example.com/original_fries');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (17, 'Garlic Mayo Fries', 13, 249, 50, 'https://example.com/garlic_mayo_fries');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (18, 'Hot Shot Fries', 13, 249, 50, 'https://example.com/hot_shot_fries');

INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (19, '345 ML Drink', 14, 120, 50, 'https://example.com/345_ml_drink');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (20, '500 ML Drink', 14, 150, 50, 'https://example.com/500_ml_drink');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (21, '1 LTR Drink', 14, 200, 50, 'https://example.com/1_ltr_drink');
INSERT INTO Products (ProductID, ProductName, CategoryID, Price, StockQuantity, ProductURL) VALUES (22, 'Mineral Water', 14, 80, 50, 'https://example.com/mineral_water');



--Inserting Values in Menu Table

INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (1, 'Midnight Deal 1', 1, 799);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (2, 'Midnight Deal 2', 1, 1499);

INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (3, 'Flash Flavor Deal 1', 2, 799);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (4, 'Flash Flavor Deal 2', 2, 1399);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (5, 'Value Burger', 2, 270);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (6, 'Cricket Deal 01', 2, 799);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (7, 'Cricket Deal 02', 2, 1499);

INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (8, 'Chicken Tikka', 3, 419);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (9, 'Malai Boti', 3, 449);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (10, 'ChatKhara Boti', 3, 449);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (11, 'Chicken Behari Boti', 3, 449);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (12, 'Haryali Boti', 3, 499);

INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (13, 'Summer Feast 01', 4, 999);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (14, 'Summer Feast 02', 4, 1299);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (15, 'Summer Feast 03', 4, 2299);

INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (16, 'Small Pizza', 5, 499);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (17, 'Regular Pizza', 5, 799);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (18, 'Large Pizza', 5, 1299);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (19, 'Deal 01', 5, 449);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (20, 'Deal 02', 5, 649);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (21, 'Deal 03', 5, 1049);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (22, 'Classic Deal 1', 5, 1699);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (23, 'Classic Deal 2', 5, 1149);

INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (24, 'Super Combo', 6, 2000);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (25, 'Family Feast', 6, 2099);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (26, 'Super 4 Deal', 6, 1399);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (27, 'Mighty Deal', 6, 1599);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (28, 'Super Family Deal', 6, 1799);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (29, 'Sharing Combo 1', 6, 1399);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (30, 'Sharing Combo 2', 6, 1399);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (31, '4 Can Dine', 6, 1899);

INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (32, 'Beef Burger', 7, 399);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (33, 'Double Decker', 7, 649);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (34, 'Chipotle Burger', 7, 449);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (35, 'Crispy Burger', 7, 399);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (36, 'Tower Burger', 7, 499);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (37, 'Crispy Straker Burger', 7, 549);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (38, 'Chicken Burger', 7, 249);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (39, 'Zinger Burger', 7, 499);

INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (40, 'Kids Meal Nuggets', 8, 399);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (41, 'Kids Meal Chicken Burger', 8, 399);

INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (42, 'Juicy Chicken Tender', 9, 349);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (43, 'Tempura Nuggets', 9, 349);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (44, 'Hot Wings', 9, 249);

INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (45, 'Full Frango Chicken', 10, 1699);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (46, 'Half Frango Chicken', 10, 899);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (47, 'QTR Frango Chicken', 10, 499);

INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (48, '1 Pc Crispy Chicken', 11, 249);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (49, '2 Pcs Crispy Chicken', 11, 599);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (50, '5 Pcs Crispy Chicken', 11, 1249);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (51, '9 Pcs Crispy Chicken', 11, 1999);

INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (52, 'Chicken Tikka Rappa', 12, 249);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (53, 'Chicken Mughlai Rappa', 12, 249);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (54, 'Crispy Chicken Rappa', 12, 249);

INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (55, 'Original Fries', 13, 199);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (56, 'Garlic Mayo Fries', 13, 249);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (57, 'Hot Shot Fries', 13, 249);

INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (58, '345 ML Drink', 14, 120);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (59, '500 ML Drink', 14, 150);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (60, '1 LTR Drink', 14, 200);
INSERT INTO Menu (MenuID, ItemName, CategoryID, Price) VALUES (61, 'Mineral Water', 14, 80);



--Triggers & Transitions 

--Trigger to Validate Product Stock Before Adding an Order

CREATE OR REPLACE FUNCTION check_stock_before_order()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    stock_quantity INT;
BEGIN
    SELECT StockQuantity INTO stock_quantity 
    FROM Products 
    WHERE ProductID = NEW.ProductID;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Product with ID % does not exist.', NEW.ProductID;
    END IF;

    IF stock_quantity < NEW.Quantity THEN
        RAISE EXCEPTION 'Insufficient stock for the selected product.';
    END IF;

    RETURN NEW;
END;
$$;

-- Attach the trigger to the Orders table

DROP TRIGGER IF EXISTS validate_stock ON Orders;

CREATE TRIGGER validate_stock
BEFORE INSERT ON Orders
FOR EACH ROW
EXECUTE FUNCTION check_stock_before_order();



--Trigger to Update Stock After an Order is Placed
CREATE OR REPLACE FUNCTION update_stock_after_order()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE Products
    SET StockQuantity = StockQuantity - NEW.Quantity
    WHERE ProductID = NEW.ProductID;

    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_update_stock_after_order
AFTER INSERT ON OrderDetails
FOR EACH ROW
EXECUTE FUNCTION update_stock_after_order();



--Trigger to Revert Stock if an Order is Canceled

CREATE OR REPLACE FUNCTION revert_stock_on_order_cancel()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    IF NEW.OrderStatus = 'Canceled' THEN
        UPDATE Products
        SET StockQuantity = StockQuantity + od.Quantity
        FROM OrderDetails od
        WHERE Products.ProductID = od.ProductID
          AND od.OrderID = NEW.OrderID;
    END IF;

    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_revert_stock_on_order_cancel
AFTER UPDATE ON Orders
FOR EACH ROW
EXECUTE FUNCTION revert_stock_on_order_cancel();



--Trigger to Auto-Calculate Order Total

CREATE OR REPLACE FUNCTION calculate_order_total()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE Orders
    SET TotalAmount = (
        SELECT SUM(Subtotal)
        FROM OrderDetails
        WHERE OrderID = NEW.OrderID
    )
    WHERE OrderID = NEW.OrderID;

    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_calculate_order_total
AFTER INSERT ON OrderDetails
FOR EACH ROW
EXECUTE FUNCTION calculate_order_total();



--Trigger to Update Payment Status Based on Payment Amount

CREATE OR REPLACE FUNCTION update_payment_status()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    total_order_amount DECIMAL(10, 2);
    total_paid DECIMAL(10, 2);
BEGIN
    SELECT TotalAmount INTO total_order_amount 
    FROM Orders 
    WHERE OrderID = NEW.OrderID;

    SELECT SUM(PaymentAmount) INTO total_paid 
    FROM Payments 
    WHERE OrderID = NEW.OrderID;

    IF total_paid >= total_order_amount THEN
        UPDATE Payments
        SET PaymentStatus = 'Paid'
        WHERE PaymentID = NEW.PaymentID;
    END IF;

    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_update_payment_status
AFTER INSERT ON Payments
FOR EACH ROW
EXECUTE FUNCTION update_payment_status();



--Trigger to Prevent Negative Stock

CREATE OR REPLACE FUNCTION prevent_negative_stock()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    IF NEW.StockQuantity < 0 THEN
        RAISE EXCEPTION 'Stock cannot be negative.';
    END IF;

    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_prevent_negative_stock
BEFORE UPDATE ON Products
FOR EACH ROW
EXECUTE FUNCTION prevent_negative_stock();



--Trigger to Record Customer Registration Date

CREATE OR REPLACE FUNCTION set_registered_date()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.RegisteredDate := CURRENT_DATE;

    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_set_registered_date
BEFORE INSERT ON Customers
FOR EACH ROW
EXECUTE FUNCTION set_registered_date();



--Trigger to Log Order Status Changes

CREATE OR REPLACE FUNCTION log_order_status_change()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO OrderStatusLog (OrderID, OldStatus, NewStatus, ChangeDate)
    VALUES (OLD.OrderID, OLD.OrderStatus, NEW.OrderStatus, NOW());

    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_log_order_status_change
AFTER UPDATE ON Orders
FOR EACH ROW
EXECUTE FUNCTION log_order_status_change();



--Trigger to Default Payment Status to "Pending"

CREATE OR REPLACE FUNCTION set_default_payment_status()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    IF NEW.PaymentStatus IS NULL THEN
        NEW.PaymentStatus := 'Pending';
    END IF;

    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_set_default_payment_status
BEFORE INSERT ON Payments
FOR EACH ROW
EXECUTE FUNCTION set_default_payment_status();



--Trigger to Enforce Unique Emails for Customers

CREATE OR REPLACE FUNCTION prevent_duplicate_email()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM Customers WHERE Email = NEW.Email) THEN
        RAISE EXCEPTION 'Email address already exists.';
    END IF;

    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_prevent_duplicate_email
BEFORE INSERT ON Customers
FOR EACH ROW
EXECUTE FUNCTION prevent_duplicate_email();



-------------------------
select * from categories;
select * from menu;
select * from pg_tables;
import { sequelize } from "../Postgres/postgres.js";

// Placing user order for frontend
export const placeOrder = async (req, res) => {
    const { customerId, items, order_type, payment_type } = req.body; // Include order_type and payment_type
    let transaction;

    try {
        // Start a transaction
        transaction = await sequelize.transaction();

        // Step 1: Insert the order into the orders table
        const order = await sequelize.query(
            `INSERT INTO orders (customerid, totalamount, orderstatus, orderdate, order_type, payment_type)
             VALUES (:customerId, :totalAmount, :orderStatus, CURRENT_TIMESTAMP, :order_type, :payment_type)
             RETURNING *`,
            {
                replacements: {
                    customerId,
                    totalAmount: calculateTotalPrice(items),
                    orderStatus: 'Food Processing', // Default status for new orders
                    order_type,
                    payment_type
                },
                transaction,
            }
        );

        const orderId = order[0][0]?.orderid; // Retrieve the orderId from the inserted order
        if (!orderId) throw new Error("Failed to retrieve orderId from the inserted order");

        // Step 2: Insert each item into the order_items table
        const orderItemsPromises = items.map(async (item) => {
           
                // Query to get productid by productname directly
                const result = await sequelize.query(
                    `SELECT productid FROM products WHERE productname = :productName`,
                    {
                        replacements: { productName: item.title },
                        type: sequelize.QueryTypes.SELECT
                    }
                );

                if (result.length === 0) {
                    throw new Error(`Product not found for ${item.productname}`);
                }

                item.productid = result[0].productid; // Set the resolved productId
            

            await sequelize.query(
                `INSERT INTO order_items (orderid, quantity, price, productid)
                 VALUES (:orderId, :quantity, :price, :productId)`,
                {
                    replacements: {
                        orderId,
                        quantity: item.quantity,
                        price: item.price,
                        productId: item.productid, // Now using productId
                    },
                    transaction,
                }
            );
        });

        // Execute all promises
        await Promise.all(orderItemsPromises);

        // Commit the transaction
        await transaction.commit();

        res.status(200).json({ message: "Order placed successfully!" });
    } catch (error) {
        console.error("Error placing order:", error);

        if (transaction) await transaction.rollback();

        res.status(500).json({ message: "Database error", error: error.message || error });
    }
};

// Helper function to calculate the total price of the order
function calculateTotalPrice(items) {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
}







// Listing orders for admin panel
export const listOrders = async (req, res) => {
    try {
        const [orders] = await sequelize.query(`
            SELECT 
                o.orderid, 
                o.orderdate, 
                o.totalamount, 
                c.first_name || ' ' || c.last_name AS "customername",
                c.mobile_number,c.email,c.address,c.nearest_landmark,
                c.selected_area,
                c.delivery_instructions,o.order_type,o.payment_type,
                o.orderstatus,
                ARRAY_AGG(
                    JSON_BUILD_OBJECT(
                        'productid', p.productid,
                        'productname', p.productname,
                        'quantity', oi.quantity,
                        'price', oi.price
                    )
                ) AS order_items
            FROM 
                orders o
            JOIN 
                customers c ON o.customerid = c.customerid
            LEFT JOIN 
                order_items oi ON o.orderid = oi.orderid
            LEFT JOIN 
                products p ON oi.productid = p.productid
            WHERE 
                o.orderstatus NOT IN ('cancelled')
            GROUP BY 
                o.orderid, c.first_name, c.last_name,c.mobile_number,c.email,c.address,c.nearest_landmark,
                c.selected_area,
                c.delivery_instructions,
                o.orderstatus
            ORDER BY 
                o.orderid DESC;
        `);

        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch orders", 
            error: error.message 
        });
    }
};


export const updateStatus = async (req, res) => {
    const { orderid, orderstatus } = req.body;
  
    if (!orderid || !orderstatus) {
      return res.status(400).json({ success: false, message: "Missing parameters" });
    }
  
    try {
      const [result] = await sequelize.query(
        `UPDATE orders SET orderstatus = :orderstatus WHERE orderid = :orderid`,
        {
          replacements: { orderid, orderstatus },
        }
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ success: false, message: "Order not found or unchanged" });
      }
  
      res.status(200).json({ success: true, message: "Order status updated successfully" });
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ success: false, message: "Failed to update order status" });
    }
  };

  export const getMyOrder = async (req, res) => {
    try {
      const { customeremail } = req.body;
      if (!customeremail) {
        return res.status(400).json({ success: false, message: 'Email is required' });
      }
  
      const [orders] = await sequelize.query(
        `
          SELECT 
              o.orderid, 
              o.orderdate, 
              o.totalamount, 
              o.orderstatus,
              JSON_AGG(
                  JSON_BUILD_OBJECT(
                      'productid', p.productid,
                      'productname', p.productname,
                      'quantity', oi.quantity,
                      'price', oi.price
                  )
              ) AS order_items
          FROM 
              orders o
          JOIN 
              customers c ON o.customerid = c.customerid
          LEFT JOIN 
              order_items oi ON o.orderid = oi.orderid
          LEFT JOIN 
              products p ON oi.productid = p.productid
          WHERE 
              c.email = :customeremail
          GROUP BY 
              o.orderid, o.orderdate, o.totalamount, o.orderstatus
          ORDER BY 
              o.orderid DESC;
        `,
        {
          replacements: { customeremail },
          type: sequelize.QueryTypes.SELECT
        }
      );
  
    //   console.log("Query result:", orders);  // Debugging query results
  
      res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch orders", 
            error: error.message 
        });
    }
  };
  
import { sequelize } from "../Postgres/postgres.js";

// Placing user order for frontend
export const placeOrder = async (req, res) => {
  const { userid, items, order_type, payment_type } = req.body;
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const order = await sequelize.query(
      `INSERT INTO orders (totalamount, orderstatus, orderdate, order_type, payment_type, userid)
       VALUES (:totalAmount, :orderStatus, CURRENT_TIMESTAMP, :order_type, :payment_type, :userid)
       RETURNING *`,
      {
        replacements: {
          totalAmount: calculateTotalPrice(items),
          orderStatus: 'Food Processing',
          order_type,
          payment_type,
          userid
        },
        transaction,
      }
    );

    const orderId = order[0][0]?.orderid;
    if (!orderId) throw new Error("Order ID not returned after order insert");

    const orderItemsPromises = items.map(async (item) => {
      const { productid, quantity, price } = item;

      // Validate input
      if (!productid || !quantity || !price) {
        throw new Error(`Invalid item data: ${JSON.stringify(item)}`);
      }

      // Insert into order_items
      await sequelize.query(
        `INSERT INTO order_items (orderid, quantity, price, productid)
         VALUES (:orderId, :quantity, :price, :productId)`,
        {
          replacements: {
            orderId,
            quantity,
            price,
            productId: productid,
          },
          transaction,
        }
      );

      // Update product_monthly_order
      const currentMonthYear = new Date().toISOString().slice(0, 7);
      const [existing] = await sequelize.query(
        `SELECT * FROM product_monthly_order WHERE productid = :productId AND month_year = :monthYear`,
        {
          replacements: {
            productId: productid,
            monthYear: currentMonthYear,
          },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      if (existing) {
        await sequelize.query(
          `UPDATE product_monthly_order
           SET order_count = order_count + :quantity
           WHERE productid = :productId AND month_year = :monthYear`,
          {
            replacements: {
              productId: productid,
              quantity,
              monthYear: currentMonthYear,
            },
            transaction,
          }
        );
      } else {
        await sequelize.query(
          `INSERT INTO product_monthly_order (productid, order_count, month_year)
           VALUES (:productId, :quantity, :monthYear)`,
          {
            replacements: {
              productId: productid,
              quantity,
              monthYear: currentMonthYear,
            },
            transaction,
          }
        );
      }
    });

    await Promise.all(orderItemsPromises);
    await transaction.commit();

    res.status(200).json({ message: "Order placed successfully!" });

  } catch (error) {
    console.error("Order placement failed:", error);
    if (transaction) await transaction.rollback();
    res.status(500).json({ message: "Order failed", error: error.message });
  }
};

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
    u.name AS "customername",
    d.mobile_number, u.email, d.address, d.nearest_landmark,
    d.selected_area,
    d.delivery_instructions, o.order_type, o.payment_type,
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
    users u ON o.userid = u.userid
JOIN
    deliverydetails d ON o.userid = d.userid  -- Added missing JOIN for delivery table
LEFT JOIN 
    order_items oi ON o.orderid = oi.orderid
LEFT JOIN 
    products p ON oi.productid = p.productid
WHERE 
    o.orderstatus NOT IN ('cancelled')
GROUP BY 
    o.orderid, u.name, d.mobile_number, u.email, d.address, d.nearest_landmark,
    d.selected_area, d.delivery_instructions, o.orderstatus
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
      const { useremail } = req.body;
  
      if (!useremail) {
        return res.status(400).json({ success: false, message: 'Email is required' });
      }
  
      const orderRows = await sequelize.query(
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
            users u ON o.userid = u.userid
          LEFT JOIN 
            order_items oi ON o.orderid = oi.orderid
          LEFT JOIN 
            products p ON oi.productid = p.productid
          WHERE 
            u.email = :useremail
          GROUP BY 
            o.orderid, o.orderdate, o.totalamount, o.orderstatus
          ORDER BY 
            o.orderid DESC;
        `,
        {
          replacements: { useremail },
          type: sequelize.QueryTypes.SELECT,
        }
      );
  
      if (!orderRows || orderRows.length === 0) {
        return res.status(404).json({ success: false, message: 'No orders found for this user.' });
      }
  
      res.status(200).json({ success: true, data: orderRows });
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch orders", 
        error: error.message,
      });
    }
  };
  
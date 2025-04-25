import { sequelize } from "../Postgres/postgres.js"; // Import Sequelize instance
import { Op } from "sequelize";
import fs from 'fs'





// add food item
export const addFood = async (req, res) => {
    // console.log(req.file); // Debugging
    let producturl = req.file?.filename; // File name from multer

    if (!req.file) {
        return res.status(400).json({ message: "Image file is required" });
    }

    const { productname, price, categoryname } = req.body;

    if (!productname || !price || !categoryname) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // Fetch category ID from category name
        const [categoryResult] = await sequelize.query(
            `SELECT categoryid FROM categories WHERE categoryname = :categoryname`,
            { replacements: { categoryname } }
        );

        if (!categoryResult.length) {
            return res.status(404).json({ message: "Category not found" });
        }

        const categoryid = categoryResult[0].categoryid;
        const stockquantity = 0;

        // Insert new product
        await sequelize.query(
            `INSERT INTO products (productname, categoryid, price, stockquantity, producturl)
             VALUES (:productname, :categoryid, :price, :stockquantity, :producturl)`,
            {
                replacements: {
                    productname,
                    categoryid,
                    price,
                    stockquantity,
                    producturl,
                },
            }
        );

        res.status(200).json({ message: "Product added successfully!" });
    } catch (error) {
        console.error("Database error:", error.message);
        res.status(500).json({ message: "Database error", error });
    }
};




// List food by category

export const listFood = async (req, res) => {
    const { categoryname } = req.query;

    // Validate `categoryname` if provided
    if (categoryname && typeof categoryname !== 'string') {
        return res.status(400).json({ message: "Invalid category name" });
    }

    // SQL query with conditional filtering
    const query = `
        SELECT p.productid, p.productname, p.price, p.producturl, c.categoryname
        FROM products p
        JOIN categories c ON p.categoryid = c.categoryid
        ${categoryname ? "WHERE c.categoryname = :categoryname" : ""}
        ORDER BY p.productid DESC
    `;

    try {
        const [results] = await sequelize.query(query, {
            replacements: categoryname ? { categoryname } : {},
        });

        if (results.length === 0) {
            return res.status(404).json({ message: "No products found for the given category" });
        }

        res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "An error occurred while fetching products", error });
    }
};


// Remove food items
export const removeFood = async (req, res) => {
    const { productid } = req.body; // Extract productid from the request body

    // Validate productid
    if (!productid || isNaN(productid) || productid <= 0) {
        return res.status(400).json({ message: "Invalid or missing productid" });
    }

    try {
        // Retrieve product details to get the image name
        const [product] = await sequelize.query(
            `SELECT producturl FROM products WHERE productid = :productid`,
            { replacements: { productid } }
        );

        if (!product.length) {
            return res.status(404).json({ message: "Product not found" });
        }

        const imageName = product[0].producturl;

        // Delete the image file from the server
        fs.unlink(`uploads/${imageName}`, (err) => {
            if (err) {
                console.error("Failed to delete image:", err);
            }
        });

        // Delete the product from the database
        await sequelize.query(
            `DELETE FROM products WHERE productid = :productid`,
            { replacements: { productid } }
        );

        res.status(200).json({ message: "Product removed successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred", error });
    }
};

export const listCategories = async (req, res) => {
    try {
        const query = `
        SELECT categoryid, categoryname 
        FROM categories 
      `;
        const [results] = await sequelize.query(query);

        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).json({ message: "No categories found" });
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "An error occurred", error });
    }
};

// get popular Products
export const getPopularProducts = async (req, res) => {
    try {
        const currentMonthYear = new Date().toISOString().slice(0, 7); // Format: YYYY-MM

        const query = `
           SELECT p.productid, p.productname, p.price, p.producturl, 
       COALESCE(po.order_count, 0) AS order_count  -- Default to 0 if no sales data
FROM products p
LEFT JOIN product_monthly_orders po 
    ON p.productid = po.productid 
    AND po.month_year = :month_year
ORDER BY order_count DESC NULLS LAST, p.productname ASC
LIMIT 10

        `;

        const [popularProducts] = await sequelize.query(query, {
            replacements: { month_year: currentMonthYear },
        });

        res.status(200).json(popularProducts);
    } catch (error) {
        console.error("Error fetching popular products:", error);
        res.status(500).json({ message: "An error occurred", error });
    }
};


// Get recommended food by checking user order

export const getRecommendFood = async (req, res) => {
    const { items } = req.body; // Expect an array of items in the request body

    if (!items || items.length === 0) {
        return res.status(400).json({ message: "No items provided for recommendations." });
    }

    try {
        // Step 1: Extract unique product names or titles from the user's order
        const titles = [...new Set(items.map(item => item.title.toLowerCase()))];

        // Step 2: Retrieve the category IDs for each ordered product
        const categoryIds = [];
        for (let title of titles) {
            const result = await sequelize.query(
                `SELECT categoryid 
                 FROM products 
                 WHERE productname = :title`, 
                {
                    replacements: { title: title },
                    type: sequelize.QueryTypes.SELECT,
                }
            );

            if (result.length > 0) {
                categoryIds.push(result[0].categoryid);
            }
        }

        // Step 3: Fetch the top 5 most popular products for each category (unique categoryId)
        const recommendations = await Promise.all(
            [...new Set(categoryIds)].map(async (categoryId) => {
                const result = await sequelize.query(
                    `SELECT p.productid, p.productname, p.price, p.producturl, 
                            COALESCE(po.order_count, 0) AS order_count
                     FROM products p
                     LEFT JOIN product_monthly_orders po 
                        ON p.productid = po.productid
                     WHERE p.categoryid = :categoryId
                     ORDER BY po.order_count DESC, p.productname ASC
                     LIMIT 5`,
                    {
                        replacements: { categoryId: categoryId },
                        type: sequelize.QueryTypes.SELECT,
                    }
                );
                return { categoryId, recommendations: result };
            })
        );

        // Step 4: Filter out empty recommendations
        const filteredRecommendations = recommendations.filter(r => r.recommendations.length > 0);

        if (filteredRecommendations.length === 0) {
            return res.status(404).json({ message: "No recommendations available." });
        }

        res.status(200).json({ recommendations: filteredRecommendations });
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        res.status(500).json({ message: "Error fetching recommendations", error: error.message });
    }
};

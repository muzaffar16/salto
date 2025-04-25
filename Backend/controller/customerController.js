import { sequelize } from "../Postgres/postgres.js"; // Import Sequelize instance

export const addCustomer = async (req, res) => {
    const { title, firstName, lastName, mobileNumber, alternateMobileNumber, address, nearestLandmark, email, deliveryInstructions, selectedArea } = req.body;

    try {
        // Check if email already exists
        const [checkEmail] = await sequelize.query(
            `SELECT customerid FROM customers WHERE email = :email`,
            { replacements: { email } }
        );

        // If email exists, return customerId
        if (checkEmail.length > 0) {
            return res.status(200).json({ customerId: checkEmail[0].customerid, email });
        }

        // Insert new customer into the database
        const [newCustomer] = await sequelize.query(
            `INSERT INTO customers (title, first_name, last_name, mobile_number, alternate_mobile_number, address, nearest_landmark, email, delivery_instructions, selected_area)
             VALUES (:title, :firstName, :lastName, :mobileNumber, :alternateMobileNumber, :address, :nearestLandmark, :email, :deliveryInstructions, :selectedArea)
             RETURNING customerid`,
            {
                replacements: {
                    title,
                    firstName,
                    lastName,
                    mobileNumber,
                    alternateMobileNumber,
                    address,
                    nearestLandmark,
                    email,
                    deliveryInstructions,
                    selectedArea
                },
            }
        );

        const customerId = newCustomer[0].customerid;  // Get the customerId of the newly inserted customer

        // Return customerId and email in the response
        res.status(200).json({ customerId, email });
    } catch (error) {
        console.error("Error adding customer:", error);
        res.status(500).json({ message: "Error adding customer", error });
    }
};


// update customer details
export const updateCustomer = async (req, res) => {}
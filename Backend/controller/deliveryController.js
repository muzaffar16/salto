import { sequelize } from "../Postgres/postgres.js";

export const addDeliveryDetails = async (req, res) => {
    const {
      mobileNumber,
      alternateMobileNumber,
      address,
      nearestLandmark,
      email,
      deliveryInstructions,
      selectedArea,
      userid
    } = req.body;
  
    try {
      // Step 1: Get userid from users table using email
      const [user] = await sequelize.query(
        `SELECT userid FROM users WHERE email = :email`,
        { replacements: { email } }
      );
  
      if (user.length === 0) {
        return res.status(404).json({ message: "User not found with this email." });
      }
  
      const userid = user[0].userid;
  
      // Step 2: Check if delivery details already exist
      const [existing] = await sequelize.query(
        `SELECT * FROM deliveryDetails WHERE userid = :userid`,
        { replacements: { userid } }
      );
  
      if (existing.length > 0) {
        const current = existing[0];
  
        // Step 3: Check if any field has changed
        const hasChanges =
          current.mobile_number !== mobileNumber ||
          current.alternate_mobile_number !== alternateMobileNumber ||
          current.address !== address ||
          current.nearest_landmark !== nearestLandmark ||
          current.delivery_instructions !== deliveryInstructions ||
          current.selected_area !== selectedArea;
  
        if (!hasChanges) {
          return res.status(200).json({
            message: "No changes detected. Delivery details are up-to-date.",
            userid,
            email
          });
        }
  
        // Step 4: Update only if something has changed
        await sequelize.query(
          `UPDATE deliveryDetails
           SET 
             mobile_number = :mobileNumber,
             alternate_mobile_number = :alternateMobileNumber,
             address = :address,
             nearest_landmark = :nearestLandmark,
             delivery_instructions = :deliveryInstructions,
             selected_area = :selectedArea
           WHERE userid = :userid`,
          {
            replacements: {
              mobileNumber,
              alternateMobileNumber,
              address,
              nearestLandmark,
              deliveryInstructions,
              selectedArea,
              userid
            }
          }
        );
  
        return res.status(200).json({
          message: "Delivery details updated successfully.",
          userid,
          email
        });
      }
  
      // Step 5: Insert new delivery details if not found
      const [inserted] = await sequelize.query(
        `INSERT INTO deliveryDetails (
          mobile_number,
          alternate_mobile_number,
          address,
          nearest_landmark,
          delivery_instructions,
          selected_area,
          userid
        ) VALUES (
          :mobileNumber,
          :alternateMobileNumber,
          :address,
          :nearestLandmark,
          :deliveryInstructions,
          :selectedArea,
          :userid
        ) RETURNING id`,
        {
          replacements: {
            mobileNumber,
            alternateMobileNumber,
            address,
            nearestLandmark,
            deliveryInstructions,
            selectedArea,
            userid
          }
        }
      );
  
      return res.status(200).json({
        message: "Delivery details added successfully.",
        deliveryId: inserted[0].id,
        userid,
        email
      });
  
    } catch (error) {
      console.error("Error handling delivery details:", error);
      return res.status(500).json({ message: "Server error", error });
    }
  };
  
  

export const getDeliveryDetailsByEmail = async (req, res) => {
    const { email } = req.query;
  
    try {
      // Step 1: Get userid and full name from users table
      const [user] = await sequelize.query(
        `SELECT userid, name FROM users WHERE email = :email`,
        { replacements: { email } }
      );
  
      if (user.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const { userid, name } = user[0];
  
      // Step 2: Split name into first and last names
      const nameParts = name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
  
      // Step 3: Get delivery details from deliveryDetails table
      const [deliveryDetails] = await sequelize.query(
        `SELECT * FROM deliveryDetails WHERE userid = :userid`,
        { replacements: { userid } }
      );
  
      if (deliveryDetails.length === 0) {
        return res.status(404).json({ message: "No delivery details found" });
      }
  
      // Include firstName and lastName in the response
      return res.status(200).json({
        ...deliveryDetails[0],
        firstName,
        lastName
      });
  
    } catch (error) {
      console.error("Error fetching delivery details:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };
  
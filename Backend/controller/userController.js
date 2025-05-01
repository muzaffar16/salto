import { sequelize } from "../Postgres/postgres.js"; // Import Sequelize instance
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { validator } from "sequelize/lib/utils/validator-extras";
import { log } from "console";
 
//login user

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await sequelize.query(
            `SELECT userid, email, password FROM users WHERE email = :email`,
            { replacements: { email } }
        );

        if (user[0].length === 0) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const userData = user[0][0]; // This is { id, email, password }

        const isMatch = await bcrypt.compare(password, userData.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const token = createToken(userData.id);

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register user
export const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const exists = await sequelize.query(
            `SELECT email FROM users WHERE email = :email`,
            { replacements: { email } }
        );

        if (exists[0].length > 0) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await sequelize.query(
            `INSERT INTO users (name, email, password) VALUES (:name, :email, :password)`,
            {
                replacements: { name, email, password: hashedPassword },
            }
        );

        const id = await sequelize.query(
            `SELECT userid FROM users WHERE email = :email`,
            { replacements: { email } }
        );

        const token = createToken(id[0][0].id);

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error registering user" });
    }
};

export const fetchInfo = async (req, res) => {
    try {
      const { email } = req.query;
  
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
  
      const [result] = await sequelize.query(
        `SELECT userid, name FROM users WHERE email = :email`,
        { replacements: { email } }
      );
  
      if (result.length > 0) {
        return res.status(200).json({ userid: result[0].userid, name: result[0].name });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  

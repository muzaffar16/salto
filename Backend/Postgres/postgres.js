import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// const sequelize = new Sequelize('World', 'postgres', '@Li12345', {
//   host: 'localhost',
//   dialect: 'postgres',
// });
// console.log(process.env.URI)
// const sequelize = new Sequelize(process.env.URI, {
 
//   dialect: 'postgres',
// });

dotenv.config();

const sequelize = new Sequelize(process.env.URI, {
  dialect: "postgres",
  pool: {
    max: 5,
    idle: 30000,
    acquire:60000,
  },
});



const connection = async () => {
  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');


    // Sync the database (you can remove this if it's already done)
    await sequelize.sync();
    console.log('Database synced');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { sequelize, connection };

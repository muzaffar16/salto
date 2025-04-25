import { DataTypes } from 'sequelize';
import sequelize from './sequelize'; // Import the sequelize instance


// Define the Food model
const Food = sequelize.define('Food', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {  // Assuming `age` is a column in your table
      type: DataTypes.INTEGER,
    }
  }, {
    tableName: 'food', // Table name in PostgreSQL
    timestamps: false,
  });

  export default Food;

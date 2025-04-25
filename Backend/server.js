import express from "express";
import { connection } from "./Postgres/postgres.js";
import foodRouter from "./routes/foodRoute.js";  // Importing routes
import customerRouter from "./routes/customerRoute.js";
import orderRouter from "./routes/orderRoute.js";
import cors from "cors"
import 'dotenv/config'


// model use nhi ho raha kahi per

const app = express();
const port = 3000;

// middleware
app.use(express.json()); // Middleware to parse JSON bodies

// app.use(router);
app.use(cors());


//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads')); //display image in frontend using this api : http://localhost:3000/images/image_name in upload folder

app.use("/api/customer",customerRouter);
app.use("/api/orders",orderRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
    
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


connection();  // Initialize database connection

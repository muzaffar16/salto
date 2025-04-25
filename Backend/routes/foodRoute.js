import express from "express";
// foodRoute.js
import { addFood, listFood,removeFood,listCategories,getPopularProducts, getRecommendFood} from "../controller/foodController.js"; 

import multer from "multer";   // Used to handle image uploads

const foodRouter = express.Router();

// Set up image storage configuration
const storage = multer.diskStorage({ 
  destination: "uploads",  // Folder to store the uploaded files
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);  // Naming convention for the file
  }
});

const upload = multer({ storage: storage });  // Initialize multer with the storage configuration

// Route for adding food with image upload
foodRouter.post("/add", upload.single("image"), addFood);  // `image` is the field name in the form

//get food using category
foodRouter.get("/list", listFood);

//delete food
foodRouter.post("/remove", removeFood);

//get all categories
foodRouter.get("/categories",listCategories);

foodRouter.get("/popularFood",getPopularProducts);

foodRouter.post("/recommandFood",getRecommendFood)

export default foodRouter;

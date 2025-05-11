import express from "express";
import {
  addFood,
  listFood,
  removeFood,
  listCategories,
  getPopularProducts,
  getRecommendFood,
} from "../controller/foodController.js";

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js"; // Cloudinary config

const foodRouter = express.Router();

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "restaurant_items",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// Initialize multer with cloudinary storage
const upload = multer({ storage });

// Route for adding food with Cloudinary image upload
foodRouter.post("/add", upload.single("image"), addFood);

// Get food by category
foodRouter.get("/list", listFood);

// Delete food
foodRouter.post("/remove", removeFood);

// Get all categories
foodRouter.get("/categories", listCategories);

// Popular food
foodRouter.get("/popularFood", getPopularProducts);

// Recommendation
foodRouter.post("/recommandFood", getRecommendFood);

export default foodRouter;

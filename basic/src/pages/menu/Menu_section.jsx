import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { Link } from "react-router-dom";
import { Index } from "./index";
// import burgerMenu from "./burgerMenu.json";
import { toast } from 'react-toastify';
// import.meta.env.backend_url
function Menu_section() {
  // const order=useContext(orderContext);
  // const url = "http://localhost:3000"; // Backend endpoint
  const [menu, setMenu] = useState({});
  const [categories, setCategories] = useState([]);

  // Fetch all categories and menus
  const fetchCategoriesAndMenus = async () => {
    try {
      const categoriesResponse = await axios.get(`${import.meta.env.backend_url}/api/food/categories`);
      console.log(categoriesResponse.data);

      if (categoriesResponse.data && categoriesResponse.data.length > 0) {
        setCategories(categoriesResponse.data);

        // Fetch menu for each category
        const menus = {};

        for (const category of categoriesResponse.data) {
          console.log(category.categoryname);

          try {
            const response = await axios.get(`${import.meta.env.backend_url}/api/food/list?categoryname=${category.categoryname}`);
            // Store the response data in the menus object with the category name as the key
            menus[category.categoryname] = response.data || [];
            
          } catch (error) {
            console.error(`Error fetching data for category ${category.categoryname}:`, error);
            menus[category.categoryname] = []; // In case of an error, set an empty array for this category
          }
        }

        // After the loop, you can set the menus state (or do other actions with the menus object)
        setMenu(menus);
        console.log(menus); // This will now contain the data for each category
      } else {
        toast.error("No categories found");
      }
    } catch (error) {
      console.error("Error fetching categories and menus:", error);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchCategoriesAndMenus();
  }, []);

  return (
    <>
      <section className='menuSection'>
        <div className="main_heading">
          <h3>Check Out</h3>
          <h1>Our Menu</h1>
        </div>
      </section>

      {/* Render categories and their menu */}
      {categories.length > 0 && categories.map((category) => (
        <div key={category.categoryname}>
          <Index
            Data={menu[category.categoryname] || []} // Ensure there's always a fallback (empty array)
            Title={category.categoryname}
            Description={`A variety of ${category.categoryname}`}
          />
          <div className="divider"></div>
        </div>
      ))}
    </>
  );
}

export default Menu_section;

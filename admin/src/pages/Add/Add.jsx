import React, { useState } from 'react';
import "./Add.css";
import { assets } from "@/assets/asset";
import axios from 'axios';
import { toast } from 'react-toastify';

function Add({ url }) {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        productname: "",
        price: "",
        categoryname: "Pizza",
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateInputs = () => {
        const nameRegex = /^[A-Za-z][A-Za-z0-9 ]*$/;
        if (!nameRegex.test(data.productname.trim())) {
            toast.error("Product name must start with a letter and contain only letters and numbers.");
            return false;
        }

        const price = parseFloat(data.price);
        if (isNaN(price) || price <= 0) {
            toast.error("Price must be a positive number.");
            return false;
        }

        if (!image) {
            toast.error("Please upload an image.");
            return false;
        }

        return true;
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!validateInputs()) return;

        const formData = new FormData();
        formData.append("productname", data.productname.trim());
        formData.append("price", parseFloat(data.price));
        formData.append("categoryname", data.categoryname);
        formData.append("image", image);

        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            if (response.status === 200) {
                setData({
                    productname: "",
                    price: "",
                    categoryname: "Pizza",
                });
                setImage(null);
                toast.success(response.data.message);
            }
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error("Failed to add product.");
        }
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img
                            src={image ? URL.createObjectURL(image) : assets.upload_area}
                            alt="Preview"
                        />
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id='image'
                        hidden
                        required
                    />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.productname}
                        type="text"
                        name='productname'
                        placeholder='e.g., Chicken Tikka'
                        required
                    />
                </div>
                <div className="add-category-price">
                    <div className="add-product-category flex-col">
                        <p>Product Category</p>
                        <select
                            onChange={onChangeHandler}
                            value={data.categoryname}
                            name="categoryname"
                            required
                        >
                            <option value="Pizza">Pizza</option>
                            <option value="Burger">Burger</option>
                            <option value="BBQ">BBQ</option>
                            <option value="Rappa">Rappa</option>
                            <option value="Chips">Chips</option>
                            <option value="Other AD">Other AD</option>
                            <option value="Beuerrages">Beuerrages</option>
                        </select>
                    </div>
                    <div className="add-product-price flex-col">
                        <p>Price</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type="number"
                            name='price'
                            placeholder='e.g., 200'
                            required
                            min="1"
                            step="any"
                        />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    );
}

export default Add;

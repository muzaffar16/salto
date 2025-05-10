import React, { useState } from 'react';
import "@/Add.css";
import { assets } from "@/assets/asset";
import axios from 'axios';
import { toast } from 'react-toastify';
 

function Add({url}) {
    // const url = "http://localhost:3000"; 

    const [image, setImage] = useState(null); // Image state
    const [data, setData] = useState({
        productname: "",
        price: 0,
        categoryname: "Pizza",
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("productname", data.productname);
        formData.append("price", Number(data.price));
        formData.append("categoryname", data.categoryname);
        formData.append("image", image);

        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            if (response.status === 200) {
                setData({
                    productname: "",
                    price: 0,
                    categoryname: "Pizza",
                });
                setImage(null); // Reset image preview
                toast.success(response.data.message)
            }
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error(response.data.message)
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
                        placeholder='Type here'
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
                            placeholder='Rs20'
                            required
                        />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    );
}

export default Add;

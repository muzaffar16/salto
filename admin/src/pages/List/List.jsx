import React, { useState } from 'react'
import "./List.css"
import axios from "axios"
import { toast } from 'react-toastify';
import { useEffect } from 'react';

function List({url}) {
  
  const [list, setList] = useState([]);

  const fetchList = async () => {

    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data); // Debug response
    if (response.data && response.data.length > 0) {
      setList(response.data); // Directly set the data
    } else {
      toast.error("No data found");
    }
  };

  const removeFood =async(foodid)=>{
    //  console.log(foodid);
     const response = await axios.post(`${url}/api/food/remove`,{productid:foodid})
     await fetchList();
     if(response.data){
      toast.success("Food removed successfully");
     }else{
      toast.error("Failed to remove food");
     }
  }

  useEffect(() => {
    fetchList();
  }, [])
  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
          {list.map((item,index)=>{
              return(
                <div key={item.productid} className="list-item">
          <img
            src={`${item.producturl}`}
            alt={item.productname}
            className="list-image"
          />
          {/* <div className="list-details"> */}
          <div>
             <h3>{item.productname}</h3>
          </div>
          <div>
          <p>{item.categoryname}</p>
          </div>
          <div>
          <p>{item.price}</p>
          </div>
          <div>
          <p onClick={()=>removeFood(item.productid)} className='cursor'>X</p>
          </div>
           
           
            
            
          {/* </div> */}
        </div>
              )
          })}
      </div>
    </div>
  )
}

export default List

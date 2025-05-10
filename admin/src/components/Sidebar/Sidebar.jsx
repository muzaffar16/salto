import React from 'react'
import { assets } from '@/assets/asset'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
function sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
          <NavLink to="/add" className="sidebar-option">
             <img src={assets.add_icon} alt="" />
             <p>Add Items</p>
          </NavLink>
          <NavLink to="/list" className="sidebar-option">
             <img src={assets.order_icon} alt="" />
             <p>List Items</p>
          </NavLink>
          <NavLink to="/orders" className="sidebar-option">
             <img src={assets.order_icon} alt="" />
             <p>Order</p>
          </NavLink>
        </div>
    </div>
  )
}

export default sidebar

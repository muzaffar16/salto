import React from 'react'
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import {Routes,Route} from 'react-router-dom' ;

import Add from './pages/Add/Add';
import List from './pages/List/List';
import Order from './pages/Orders/Order';

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const url = import.meta.env.VITE_backend_url; // Backend endpoint

  return (
    <div>
      <ToastContainer/>
       <Navbar/>
       <hr />
       <div className="app-content">
        <Sidebar/>
        <div className="content">
        <Routes>
           <Route path="/add" element={<Add url={url}/>}/>
           <Route path="/list" element={<List url={url}/>}/>
           <Route path="/orders" element={<Order url={url}/>}/>
        </Routes>
        </div>
       </div>
    </div>
  )
}

export default App

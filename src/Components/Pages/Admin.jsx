import React from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import AddProduct from "../AddProduct/AddProduct";
import ListProduct from "../ListProduct/ListProduct";

export default function App() {
  return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-grow p-6 bg-gray-100">
          <Routes>
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/list-product" element={<ListProduct />} />
          </Routes>
        </div>
      </div>
  );
}

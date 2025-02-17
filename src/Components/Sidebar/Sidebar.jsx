import React from "react";
import { Link, NavLink } from "react-router-dom";
import add_product_item from "../../assets/Product_Cart.svg";
import list_product_item from "../../assets/Product_list_icon.svg";

export default function Sidebar() {
  return (
    <div className="flex flex-col pt-[30px] w-[250px] h-full bg-white shadow-md">
      <NavLink to="/add-product" style={{ textDecoration: "none" }}>
        <div className="w-[220px] flex items-center mx-auto justify-center py-4 rounded-md bg-[#f6f6f6] gap-3 cursor-pointer hover:bg-gray-200">
          <img src={add_product_item} alt="Add Product" className="w-[25px]" />
          <p className="font-medium text-gray-700">Add Product</p>
        </div>
      </NavLink>

      <Link to="/list-product" style={{ textDecoration: "none" }}>
        <div className="w-[220px] flex items-center my-[20px] mx-auto justify-center py-4 rounded-md bg-[#f6f6f6] gap-3 cursor-pointer hover:bg-gray-200">
          <img
            src={list_product_item}
            alt="Product List"
            className="w-[25px]"
          />
          <p className="font-medium text-gray-700">Product List</p>
        </div>
      </Link>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

export default function ListProduct() {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const url = `${import.meta.env.VITE_APP_BACKEND_URL}/all-products`;
      const response = await axios.get(url, { withCredentials: true });

      console.log(response.data);

      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else if (response.data && Array.isArray(response.data.products)) {
        setProducts(response.data.products);
      } else {
        console.log(response.data);
        setProducts([]);
      }
    } catch (err) {
      console.log(err);
      setProducts([]);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const url = `${import.meta.env.VITE_APP_BACKEND_URL}/remove-product/${id}`;
      const response = await axios.delete(url, { withCredentials: true });

      if (response.data.success) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              Product
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              Title
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              Old Price
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              New Price
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              Category
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              Remove
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img src={row.image} alt={row.name} width="50" height="50" />
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.old_price}</TableCell>
              <TableCell align="left">{row.new_price}</TableCell>
              <TableCell align="left">{row.category}</TableCell>
              <TableCell
                align="left"
                sx={{ color: "#ff4d4d", cursor: "pointer", fontSize: "20px" }}
                onClick={() => deleteProduct(row.id)}
              >
                <MdDelete />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

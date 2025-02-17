import React, { useState } from "react";
import upload_area from "../../assets/upload_area.svg";
import { toast } from "react-hot-toast";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const addProduct = async () => {
    if (!title || !oldPrice || !newPrice || !category || !image) {
      toast.error("All fields are required");
      return;
    }

    if (isNaN(oldPrice) || isNaN(newPrice) || Number(oldPrice) <= 0 || Number(newPrice) <= 0) {
      toast.error("Prices must be valid positive numbers");
      return;
    }

    if (Number(newPrice) >= Number(oldPrice)) {
      toast.error("New price must be less than the old price");
      return;
    }

    try {
      let formData = new FormData();
      formData.append("product", image);

      const uploadResponse = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadResponse.json();

      if (uploadData.success) {
        const productDetails = {
          name: title,
          image: uploadData.image_url,
          category,
          old_price: oldPrice,
          new_price: newPrice,
        };

        const addResponse = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/add-product`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productDetails),
        });
        const addData = await addResponse.json();

        if (addData.success) {
          setTitle("");
          setNewPrice("");
          setOldPrice("");
          setCategory("");
          setImage(null);
          setImageUrl("");
          toast.success("Product added successfully");
        } else {
          toast.error("Failed to add product");
        }
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col p-8 w-full max-w-[800px] bg-white shadow-2xl rounded-lg mt-2">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
      
      <input
        type="text"
        placeholder="Product Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border border-gray-300 rounded-sm mb-4 w-full"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Old Price"
          value={oldPrice}
          onChange={(e) => setOldPrice(e.target.value)}
          className="p-2 border border-gray-300 rounded-sm w-full"
        />
        <input
          type="number"
          placeholder="New Price"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          className="p-2 border border-gray-300 rounded-sm w-full"
        />
      </div>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 border border-gray-300 rounded-sm mb-4 w-full mt-4"
      >
        <option value="">Select Category...</option>
        <option value="women">Women</option>
        <option value="men">Men</option>
        <option value="kid">Kid</option>
      </select>

      <div className="flex flex-col items-center w-full border border-gray-300 p-4 rounded-lg mb-4">
        <label htmlFor="file-input" className="cursor-pointer">
          {imageUrl ? (
            <img
              src={imageUrl}
              className="w-32 h-32 object-cover rounded-sm"
              alt="Uploaded"
            />
          ) : (
            <img src={upload_area} className="w-32 h-32" alt="Upload" />
          )}
        </label>
        <input
          type="file"
          id="file-input"
          className="hidden"
          onChange={handleImageUpload}
        />
        <p className="text-sm text-gray-500 mt-2">Click to upload an image</p>
      </div>

      <button
        onClick={addProduct}
        className="bg-[#6079ff] py-2 px-4 text-white rounded-md hover:bg-[#5068e0] transition w-full"
      >
        ADD PRODUCT
      </button>
    </div>
  );
}

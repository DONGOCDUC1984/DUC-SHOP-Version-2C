import React, { useState } from "react";
import FormData from "form-data";
import Axios from "axios";

function CreateProduct({ products }) {
  const [file, setFile] = useState(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productType, setProductType] = useState("");

  function createproduct(e) {
    e.preventDefault();
    var formData = new FormData();

    var details = JSON.stringify({
      name: productName,
      price: productPrice,
      type: productType,
    });
    formData.append("image", file);
    formData.append("document", details);
    Axios.post(
      "http://localhost:5000/products/createproduct",
      formData,
      { withCredentials: true },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then((res) => {
        products.push(res.data);
        setFile(null);
        setProductName("");
        setProductPrice(0);
        setProductType("");
        alert("Successfully Uploaded");
      })
      .catch((error) => {
        console.log(error);

        alert("Wrong ");
      });
  }

  return (
    <div>
      <h3>CREATE PRODUCT</h3>

      <form className="mt-1" onSubmit={createproduct}>
        <br />
        <label> Name: </label>
        <br />
        <input
          type="text"
          placeholder="Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <br />
        <label> Price: </label>
        <br />
        <input
          type="number"
          placeholder="Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          required
        />
        <br />
        <label> Type: </label>
        <br />
        <select
          required
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
        >
          <option value="None"> Choose a type: </option>
          <option value="Fruit And Vegetable"> Fruit And Vegetable </option>
          <option value="Bread And Cake"> Bread And Cake </option>
          <option value="Milk"> Milk </option>
        </select>
        <br />
        <label> Image: </label>
        <br />
        <input
          type="file"
          required
          accept="image/*"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <br />
        <button className="mt-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;

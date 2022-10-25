import React from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  var navigate = useNavigate();

  return (
    <div>
      <h3>ADMINISTRATION PAGE </h3>
      <button
        onClick={() => {
          navigate("/createproduct");
        }}
      >
        Change to Create Product page
      </button>
      <br /> <br />
      <button
        onClick={() => {
          navigate("/orders");
        }}
      >
        Change to Orders page
      </button>
      <br /> <br />
      <button
        onClick={() => {
          navigate("/users");
        }}
      >
        Change to Users page
      </button>
    </div>
  );
}

export default Admin;

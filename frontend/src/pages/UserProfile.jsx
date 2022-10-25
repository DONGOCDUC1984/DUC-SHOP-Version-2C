import React, { useState, useEffect } from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";

function UserProfile({ user, userOrders, setUserOrders }) {
  const [newUserName, setNewUserName] = useState("");
  const [show1, setShow1] = useState(false);
  useEffect(() => {
    function userorders() {
      Axios.get("http://localhost:5000/orders/userorders", {
        withCredentials: true,
      })
        .then((res) => {
          setUserOrders(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    userorders();
  }, []);

  function handleUpdateUserName(_id) {
    Axios.put(
      `http://localhost:5000/updateusername/${_id}`,
      {
        name: newUserName,
      },
      { withCredentials: true }
    )
      .then(() => {
        setNewUserName("");
        user.name = newUserName;
        alert("Successfully Updated User's Name");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteOrder(_id) {
    Axios.delete(`http://localhost:5000/orders/${_id}`, {
      withCredentials: true,
    })
      .then(() => {
        setUserOrders(
          userOrders.filter((val) => {
            return val._id !== _id;
          })
        );
        alert("Deleted Order Successfully. ");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  var displayUserOrders = userOrders.map((userOrder) => {
    var userOrderProducts = userOrder.new_Order_Products.map((item) => {
      return (
        <div key={item.product_id}>
          <p> Product's ID : {item.product_id} </p>
          <p> Product's name : {item.product_name} </p>
          <p> Product's price : {item.product_price} $ </p>
          <p> Product's quantity: {item.product_quantity} </p>
          <p>.................................</p>
        </div>
      );
    });
    return (
      <div key={userOrder._id}>
        <p>Order's _ID: {userOrder._id} </p>
        <p>Tel: {userOrder.tel} </p>
        <p>Address: {userOrder.address} </p>
        <p>Date: {userOrder.date} </p>
        <p>
          {" "}
          <b> Products: </b>{" "}
        </p>

        {userOrderProducts}
        <p>Total price: {userOrder.total_price} $ </p>
        <button
          onClick={() => {
            deleteOrder(userOrder._id);
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} /> Delete Order
        </button>
        <hr />
      </div>
    );
  });

  return (
    <div className="container mt-1">
      <br />
      <h3>
        <FontAwesomeIcon icon={faUserCircle} /> About User
      </h3>
      <p>_ID: {user._id} </p>
      <p>
        Name: {user.name}{" "}
        <button
          onClick={() => {
            setShow1(!show1);
          }}
        >
          <FontAwesomeIcon icon={faPen} /> Edit Name
        </button>{" "}
      </p>

      {show1 && (
        <form
          className="mt-1"
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateUserName(user._id);
          }}
        >
          <input
            type="text"
            placeholder="New Name"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            required
          />
          <br />

          <button className="mt-3" type="submit">
            {" "}
            <FontAwesomeIcon icon={faPen} /> Update Name
          </button>
        </form>
      )}

      <p>Email: {user.email} </p>
      <hr />

      <h3>{userOrders.length} orders of the user </h3>
      {displayUserOrders}
    </div>
  );
}

export default UserProfile;

import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Orders() {
  const [pageNumber, setPageNumber] = useState(0);
  const [orders, setOrders] = useState([]);
  const ordersPerPage = 1;
  const pagesVisited = pageNumber * ordersPerPage;

  useEffect(() => {
    function getallorders() {
      Axios.get("http://localhost:5000/orders", { withCredentials: true })
        .then((res) => {
          setOrders(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getallorders();
  }, []);

  function deleteOrder(_id) {
    Axios.delete(`http://localhost:5000/orders/${_id}`, {
      withCredentials: true,
    })
      .then(() => {
        setOrders(
          orders.filter((val) => {
            return val._id !== _id;
          })
        );
        alert("Deleted Order Successfully. ");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const displayOrders = orders
    .slice(pagesVisited, pagesVisited + ordersPerPage)
    .map((order) => {
      var orderProducts = order.new_Order_Products.map((item) => {
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
        <div key={order._id}>
          <p>Order's _ID: {order._id} </p>
          <p>Email: {order.user_email} </p>
          <p>Tel: {order.tel} </p>
          <p>Address: {order.address} </p>
          <p>Date: {order.date} </p>
          <p>
            {" "}
            <b> Products: </b>{" "}
          </p>

          {orderProducts}
          <p>Total price: {order.total_price} $ </p>
          <button
            onClick={() => {
              deleteOrder(order._id);
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} /> Delete Order
          </button>
          <hr />
        </div>
      );
    });
  const pageCount = Math.ceil(orders.length / ordersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div>
      <h3> {orders.length} ORDERS: </h3>
      {displayOrders}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
}

export default Orders;

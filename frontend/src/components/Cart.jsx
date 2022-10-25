import React, { useState, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Offcanvas } from "react-bootstrap";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart, show, setShow, products, setNewOrder, user }) {
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");
  var navigate = useNavigate();

  function removefromcart(x) {
    var cart2 = cart.filter((item) => {
      return item.id !== x.id;
    });
    products.map((product) => {
      if (product.id === x.id) {
        product.cart = false;
      }
      return product;
    });
    setCart(cart2);
  }
  function increase(x) {
    var cart2 = cart.map((item) => {
      if (item.id === x.id) {
        x.quantity += 1;
      }
      return item;
    });
    setCart(cart2);
  }
  function decrease(x) {
    var cart2 = cart.map((item) => {
      if (item.id === x.id && x.quantity >= 2) {
        x.quantity -= 1;
      }
      return item;
    });
    setCart(cart2);
  }
  function total() {
    var sum = 0;
    cart.map((item) => {
      return (sum += item.quantity * item.price);
    });
    return sum;
  }

  function handleOrder(e) {
    e.preventDefault();
    var new_Order_Products = cart.map((x) => {
      return {
        product_id: x.id,
        product_name: x.name,
        product_price: x.price,
        product_quantity: x.quantity,
      };
    });

    var y = {
      user_email: user.email,
      tel: tel,
      address: address,
      date: new Date(),
      new_Order_Products: new_Order_Products,
      total_price: total(),
    };
    setNewOrder((z) => ({ ...z, ...y }));

    setTel("");
    setAddress("");
    Axios.post("http://localhost:5000/orders", y, {
      withCredentials: true,
    })
      .then(() => {
        alert("Ordered Successfully.");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <React.Fragment>
      <Offcanvas
        style={{ width: "500px" }}
        show={show}
        onHide={() => setShow(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h3>
              {" "}
              <FontAwesomeIcon icon={faCartShopping} /> Your Cart{" "}
            </h3>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <table className="table table-hover bg-warning text-center mt-1  ">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{index + 1} </td>
                    <td>
                      {" "}
                      <img
                        src={item.url}
                        alt=""
                        style={{ width: "4rem", height: "3rem" }}
                      />
                    </td>
                    <td>{item.name} </td>
                    <td>{item.price} $</td>
                    <td>
                      <button
                        onClick={() => decrease(item)}
                        className="btn btn-primary btn-sm"
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        onClick={() => increase(item)}
                        className="btn btn-primary btn-sm"
                      >
                        +
                      </button>{" "}
                    </td>
                    <td>
                      <button
                        onClick={() => removefromcart(item)}
                        className="btn btn-danger   "
                      >
                        {" "}
                        <FontAwesomeIcon icon={faTrashCan} /> Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h3 className="text-center rounded bg-warning">TOTAL: {total()} $</h3>
          {user ? (
            <div>
              <form className="mt-3" onSubmit={handleOrder}>
                <input
                  type="text"
                  placeholder="Tel "
                  value={tel}
                  onChange={(event) => setTel(event.target.value)}
                  required
                />
                <br />
                <input
                  className="mt-3"
                  type="text"
                  placeholder="Address "
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  required
                />
                <br />
                <button className="btn btn-outline-info mt-3" type="submit">
                  <FontAwesomeIcon icon={faCartShopping} /> Order
                </button>
              </form>
            </div>
          ) : (
            <div>
              <p> Register or login to be able to order. </p>
              <p> Hãy đăng ký hoặc đăng nhập để có thể đặt hàng. </p>
              <button
                onClick={() => {
                  navigate("/login");
                  setShow(false);
                }}
              >
                Login
              </button>{" "}
              <button
                onClick={() => {
                  navigate("/register");
                  setShow(false);
                }}
              >
                Register
              </button>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      <div className="d-flex justify-content-end fixed-bottom ">
        <button
          className="btn btn-primary rounded-pill"
          onClick={() => {
            setShow(true);
          }}
        >
          <FontAwesomeIcon icon={faCartShopping} />{" "}
          <span className="badge bg-danger">{cart.length}</span> Show cart
        </button>
      </div>
    </React.Fragment>
  );
}

export default memo(Cart);

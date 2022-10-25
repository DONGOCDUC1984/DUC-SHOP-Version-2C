import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Axios from "axios";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NoMatchPage from "./pages/NoMatchPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import Admin from "./pages/Admin";
import CreateProduct from "./pages/CreateProduct";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import FruitAndVegetable from "./pages/FruitAndVegetable";
import BreadAndCake from "./pages/BreadAndCake";
import Milk from "./pages/Milk";

import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  var [cart, setCart] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );
  var [products, setProducts] = useState([]);
  const [newOrder, setNewOrder] = useState({});
  const [userOrders, setUserOrders] = useState([]);
  var [show, setShow] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [name, setName] = useState("");
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [password2, setPassword2] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [searchWord, setSearchWord] = useState("");

  function login(email, password) {
    Axios.post(
      "http://localhost:5000/login",
      {
        email: email,
        password: password,
      },
      { withCredentials: true }
    )
      .then((res) => {
        setUser(res.data);
        setEmail("");
        setPassword("");
        setLoginError(false);
        alert("Successfully Logged In");
      })
      .catch((error) => {
        console.log(error);
        setLoginError(true);
        alert("Wrong email or wrong password");
      });
  }

  function logout() {
    Axios.post("http://localhost:5000/logout", {}, { withCredentials: true })
      .then(() => {
        setUser(null);
        setSearchWord("");
        setCart([]);
        setLoginError(false);
        setRegisterError(false);
        localStorage.clear();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleLogout(e) {
    e.preventDefault();
    logout();
  }

  function register(name, email, password) {
    Axios.post(
      "http://localhost:5000/register",
      {
        name: name,
        email: email,
        password: password,
      },
      { withCredentials: true }
    )
      .then((res) => {
        setUser(res.data);
        setName("");
        setEmail("");
        setPassword("");
        setPassword2("");
        setRegisterError(false);
        alert("Successfully Registered");
      })
      .catch((error) => {
        console.log(error);
        setRegisterError(true);
        alert(
          "Email already existed.Change email.\n (Đã có email này rồi.Hãy thay email khác.) "
        );
      });
  }

  function reset(e) {
    e.preventDefault();
    setName("");
    setEmail("");
    setPassword("");
    setPassword2("");
    setLoginError(false);
    setRegisterError(false);
  }

  useEffect(() => {
    function getProducts() {
      Axios.get("http://localhost:5000/products", { withCredentials: true })
        .then((res) => {
          setProducts(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getProducts();
  }, []);

  function addtocart(x) {
    var cart2 = [...cart];
    cart2.push(x);
    products.map((product) => {
      if (product.id === x.id) {
        product.cart = true;
      }
      return product;
    });
    setCart(cart2);
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="container mt-2">
      <BrowserRouter>
        <NavBar
          setShow={setShow}
          cart={cart}
          user={user}
          handleLogout={handleLogout}
        />
        <br /> <br /> <br /> <br />
        <Header searchWord={searchWord} setSearchWord={setSearchWord} />
        <div className="container-fluid">
          {user ? (
            <div>
              <p> Logged in/Registered by {user.email} </p>
            </div>
          ) : (
            <div>
              <p>Not logged in/registered yet </p>
            </div>
          )}
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  user={user}
                  searchWord={searchWord}
                  products={products}
                  setProducts={setProducts}
                  addtocart={addtocart}
                />
              }
            />

            <Route
              path="/fruitandvegetable"
              element={
                <FruitAndVegetable
                  user={user}
                  searchWord={searchWord}
                  products={products}
                  setProducts={setProducts}
                  addtocart={addtocart}
                />
              }
            />
            <Route
              path="/breadandcake"
              element={
                <BreadAndCake
                  user={user}
                  searchWord={searchWord}
                  products={products}
                  setProducts={setProducts}
                  addtocart={addtocart}
                />
              }
            />
            <Route
              path="/milk"
              element={
                <Milk
                  user={user}
                  searchWord={searchWord}
                  products={products}
                  setProducts={setProducts}
                  addtocart={addtocart}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/login"
              element={
                <Login
                  login={login}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  reset={reset}
                  loginError={loginError}
                  user={user}
                />
              }
            />
            <Route
              path="/register"
              element={
                <Register
                  register={register}
                  name={name}
                  setName={setName}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  password2={password2}
                  setPassword2={setPassword2}
                  reset={reset}
                  registerError={registerError}
                  user={user}
                />
              }
            />
            {user && (
              <Route
                path="/userprofile"
                element={
                  <UserProfile
                    user={user}
                    userOrders={userOrders}
                    setUserOrders={setUserOrders}
                  />
                }
              />
            )}
            {user && user.isAdmin && (
              <>
                <Route path="/admin" element={<Admin />} />
                <Route
                  path="/createproduct"
                  element={<CreateProduct products={products} />}
                />
                <Route path="/orders" element={<Orders />} />
                <Route path="/users" element={<Users />} />
              </>
            )}

            <Route path="*" element={<NoMatchPage />} />
          </Routes>
        </div>
        <Cart
          cart={cart}
          setCart={setCart}
          show={show}
          setShow={setShow}
          products={products}
          setNewOrder={setNewOrder}
          user={user}
        />
        <Footer />
      </BrowserRouter>
      <br /> <br />
    </div>
  );
}

export default App;

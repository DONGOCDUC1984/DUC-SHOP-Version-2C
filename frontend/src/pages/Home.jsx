import React, { useState, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import "../style/Home.css";
import Axios from "axios";

function Home({ user, searchWord, products, setProducts, addtocart }) {
  const [pageNumber, setPageNumber] = useState(0);

  const productsPerPage = 10;
  const pagesVisited = pageNumber * productsPerPage;

  function deleteproduct(_id) {
    Axios.delete(`http://localhost:5000/products/deleteproduct/${_id}`, {
      withCredentials: true,
    })
      .then(() => {
        setProducts(
          products.filter((val) => {
            return val._id !== _id;
          })
        );
        alert("Deleted Product Successfully. ");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const displayProducts = products
    .filter((product) => {
      return product.name.toLowerCase().includes(searchWord);
    })
    .slice(pagesVisited, pagesVisited + productsPerPage)
    .map((product) => {
      return (
        <div
          className="col-sm-2 mt-3"
          key={product._id}
          style={{ width: "15rem" }}
        >
          <div className="card">
            <img
              className="card-img-top img-fluid"
              alt=""
              src={product.url}
              style={{ height: "10rem" }}
            />
            <div className="card-body">
              <h4 className="card-title">{product.name} </h4>
              <p className="card-text">ID: {product.id} </p>
              <p className="card-text">Price: {product.price} $ </p>
            </div>
          </div>
          {product.cart === false && (
            <button
              className="btn btn-outline-info mt-1"
              onClick={() => addtocart(product)}
            >
              <FontAwesomeIcon icon={faCartPlus} /> Add to cart
            </button>
          )}
          {product.cart === true && (
            <button className="btn btn-outline-success ">Added</button>
          )}

          {user && user.isAdmin && (
            <button
              onClick={() => deleteproduct(product._id)}
              className="btn btn-danger mt-1"
            >
              {" "}
              <FontAwesomeIcon icon={faTrashCan} /> Delete Product
            </button>
          )}
        </div>
      );
    });
  const pageCount = Math.ceil(products.length / productsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div className="container mt-1">
      <h3> All Products </h3>
      <div className="row mx-auto">
        {displayProducts}

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
      <div>
        {/*At the bottom,there should be at leat 3 <br /> s or 3 lines 
      more.Otherwise,when I click the bottom of the buttons of pagination,
      they will not work.
        */}
      </div>
      <br />
    </div>
  );
}

export default memo(Home);

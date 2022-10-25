import React from "react";
import shop1 from "../images/shop1.png";
import "../style/Header.css";
import { Bounce } from "react-awesome-reveal";

function Header({ searchWord, setSearchWord }) {
  return (
    <div className="container-fluid">
      <Bounce>
        <div className="Header d-flex justify-content-start ">
          <img src={shop1} alt="shop1" className="logoshop1"></img>
          <h3>DUC SHOP</h3>

          <input
            className="mx-auto w-25"
            id="HeaderInput"
            type="text"
            value={searchWord}
            placeholder="Search..."
            onChange={(e) => setSearchWord(e.target.value)}
          ></input>
        </div>
        <p> DO NGOC DUC created this website. </p>
        <p> ĐỖ NGỌC ĐỨC đã làm ra trang web này. </p>
      </Bounce>
    </div>
  );
}

export default Header;

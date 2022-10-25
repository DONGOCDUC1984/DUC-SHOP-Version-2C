import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Axios from "axios";
function Users() {
  const [pageNumber, setPageNumber] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  useEffect(() => {
    function getallusers() {
      Axios.get("http://localhost:5000/getallusers", {
        withCredentials: true,
      })
        .then((res) => {
          setAllUsers(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getallusers();
  }, []);

  const displayAllUsers = allUsers

    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((person) => {
      return (
        <div className="container mt-1" key={person._id}>
          <br />

          <p>_ID: {person._id} </p>
          <p>Name: {person.name} </p>
          <p>Email: {person.email} </p>
          <p>isAdmin: {person.isAdmin.toString()} </p>
          <hr />
        </div>
      );
    });
  const pageCount = Math.ceil(allUsers.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div>
      <h3>{allUsers.length} USERS: </h3>
      {displayAllUsers}
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

export default Users;

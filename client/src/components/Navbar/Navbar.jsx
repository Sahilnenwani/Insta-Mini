import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import M from "materialize-css";
const Navbar = () => {
  const searchModal = useRef(null);
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);

  const renderList = () => {
    if (state) {
      return (
        <div>
        <nav>
        <div>
        <Link to={"/"} data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></Link>
        <ul className="right hide-on-med-and-down">
        <li key="1">
          <i
            data-target="modal1"
            className="material-icons modal-trigger"
            style={{ color: "black", cursor: "pointer" }}
          >
            search
          </i>
        </li>
        <li key="2">
          <Link to="/profile">Profile</Link>
        </li>
        <li key="3">
          <Link to="/createpost">Create post</Link>
        </li>
        <li key="4">
          <Link to="/myfollowingpost">My Following Posts</Link>
        </li>
        <li key="5">
          <button
            className="btn #c62828 red darken-3"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/signin");
            }}
          >
            LOGOUT
          </button>
        </li>


      </ul>
      </div>
     </nav>
        <ul className="sidenav" id="mobile-demo">
        <li key="1">
          <i
            data-target="modal1"
            className="material-icons modal-trigger"
            style={{ color: "black", cursor: "pointer" }}
          >
            search
          </i>
        </li>
        <li key="2">
          <Link to="/profile">Profile</Link>
        </li>
        <li key="3">
          <Link to="/createpost">Create post</Link>
        </li>
        <li key="4">
          <Link to="/myfollowingpost">My Following Posts</Link>
        </li>
        <li key="5">
          <button
            className="btn #c62828 red darken-3"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/signin");
            }}
          >
            LOGOUT
          </button>
        </li>
        </ul>
        </div>
      )
    } else {
      return (
        <ul className="right">
        <li key="6">
          <Link to="/signin">Signin</Link>
        </li>
        <li key="7">
          <Link to="/signup">Signup</Link>
        </li>
        </ul>
      )
    }
  };

  const FetchUsers = (query) => {
    setSearch(query);
    fetch("/search-users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((results) => setUserDetails(results.user));
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={state ? "/" : "/signin"} className="brand-logo">
          Instamini
        </Link>
       
        <ul id="mobile-demo" >
          {renderList()}
         </ul>
      </div>

      <div
        id="modal1"
        className="modal"
        ref={searchModal}
        style={{ color: "black" }}
      >
        <div className="modal-content">
          <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e) => FetchUsers(e.target.value)}
          />

          <ul className="right hide-on-med-and-down" id="mobile-demo">
            {userDetails.map((item) => {
              return (
                <Link
                  to={
                    item._id !== state._id ? "/profile/" + item._id : "/profile"
                  }
                  onClick={() => {
                    M.Modal.getInstance(searchModal.current).close();
                    setSearch("");
                  }}
                >
                  <li>{item.email}</li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="modal-footer">
          <button
            className="modal-close waves-effect waves-green btn-flat"
            onClick={() => setSearch("")}
          >
            Close
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

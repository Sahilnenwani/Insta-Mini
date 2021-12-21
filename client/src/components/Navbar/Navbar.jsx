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

{/* 

<nav className="navbar navbar-expand-lg navbar-light bg-light">
<Link to={state ? "/" : "/signin"} className="navbar-brand" style={{marginTop:"-10px", fontSize:"30px"}}>Instamini</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="navbar-collapse" id="navbarSupportedContent" >
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
      <Link to="/profile" className="nav-link">Profile</Link>
      </li>
      <li className="nav-item">
      <Link to="/createpost" className="nav-link">Create post</Link>
      </li>
      <li className="nav-item">
      <Link to="/myfollowingpost" className="nav-link">My Following Posts</Link>
      </li>  
    </ul>
    <form className="form-inline my-2 my-lg-0">
    <li key="1">
          <i
            data-target="modal1"
            className="material-icons modal-trigger my-2 my-sm-0"
            style={{ color: "black", cursor: "pointer" }}
          >
            search
          </i>
        </li>
    <button
            className="btn #c62828 red darken-3 my-2 my-sm-0"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/signin");
            }}
          >
            LOGOUT
          </button>
      {/* <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
    {/* </form>
  </div>
</nav>      */}
  

  <nav className="bg-white" style={{backgroundColor:"white !important", marginLeft:"250px"}}> 
    <div>
      {/* <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">JavaScript</a></li>
      </ul> */}
    </div>
    <div class="nav-content">
      <ul class="tabs tabs-transparent">
        <li class="tab"><Link to="/profile">Profile</Link></li>
        <li class="tab"><Link to="/createpost">Create post</Link></li>
        <li class="tab"><Link to="/myfollowingpost">My Following Posts</Link></li>
        <li class="tab">
          <i
            data-target="modal1"
            className="material-icons modal-trigger my-2 my-sm-0"
            style={{ color: "black", cursor: "pointer" }}
          >
            search
          </i>
        </li>
        <li class="tab"><a href="#test4"><li key="5">
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
        </li></a></li>
      </ul>
    </div>
  </nav>

 

{/* 
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
        
        </li>
        <li key="3">
         
        </li>
        <li key="4">
          
        </li>
        


      </ul>
      </div>
     </nav> */}
        {/* <ul className="sidenav" id="mobile-demo">
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
        </ul> */}
        </div>
      )
    } else {
      return (
       < div >
        {/* <div className="brand-logo">
        <Link to={state ? "/" : "/signin"} className="brand-logo">
          Instamini
        </Link>
        </div> */}
        <ul className="right">
        <li key="6">
          <Link to="/signin">Signin</Link>
        </li>
        <li key="7">
          <Link to="/signup">Signup</Link>
        </li>
        </ul>
        </div>
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
    <nav style={{marginBottom:"60px"}}>
     < div className="nav-wrapper bg-white" style={{backgroundColor:"white !important"}}>
        <div className="brand-logo">
        <Link to={state ? "/" : "/signin"} className="brand-logo">
          Instamini
        </Link>
        </div>       
         {renderList()}
        
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

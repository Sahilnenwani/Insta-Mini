import React, { useEffect, createContext, useReducer, useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import Home from "./components/Screen/Home/Home";
import Profile from "./components/Screen/Profile/Profile";
import Signin from "./components/Screen/Signin/Signin";
import Signup from "./components/Screen/Signup/Signup";
import Createpost from "./components/Screen/Createpost/Createpost";
import UserProfile from "./components/Screen/UserProfile/UserProfile";
import { reducer, initialstate } from "./Reducers/UserReducer/UserReducer";
import SubscribesUserPost from "./components/Screen/SubscribesUserPost/SubscribesUserPost";
import ResetPassword from "./components/Screen/Resetpassword/ResetPassword";
import NewPassword from "./components/Screen/NewPassword/NewPassword";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(typeof(user),user)
    if (user) {
      dispatch({ type: "USER", payload: user });
      // history.push('/')
    } else {
      if (!history.location.pathname.startsWith("/reset")) {
        history.push("/signin");
      }
    }
  }, []);

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/Signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/createpost" component={Createpost} />
      <Route path="/profile/:userid" component={UserProfile} />
      <Route path="/myfollowingpost" component={SubscribesUserPost} />
      <Route path="/reset" exact component={ResetPassword} />
      <Route path="/reset/:token" component={NewPassword} />
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialstate);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />

        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;

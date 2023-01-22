import { createContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from "./components/login/login";
import Home from "./pages/home";
import PrivateRoute from "./routes/privateRoute/privateRoute";
import RoommateFindAd from "./components/roommateFindAd/roommateFindAd";
import RoomFindAd from "./components/roomFindAd/roomFindAd";
import jwtDecode from "jwt-decode";
import UserRedirect from "./components/login/userRedirect";
import DashboardLayout from "./components/Dashboard/dashboardLayout/dashboardLayout";
import AddListing from "./components/Dashboard/roomHolder/adsListing/adsListing";
import AdsListing from "./components/Dashboard/roomHolder/adsListing/adsListing";
import EditRoom from "./components/HOC/EditRoom";
import TanentAds from "./components/Dashboard/tanent/postAds/tanentAds";
import Rooms from "./pages/rooms";
import SingleRooms from "./pages/singleRooms";
import Roommates from "./pages/roommates";
import Roommate from "./pages/roommate";
import UserProfile from "./components/Dashboard/dashboardLayout/userProfrile";
import EditUserProfile from "./components/Dashboard/dashboardLayout/editUserProfile";
import axios from "axios";

import './App.css'
import RoomAdd from "./components/roommateFindAd/roomAdd";
import AddForm from "./components/roommateFindAd/addForm";
import Signup from "./components/login/Signup";
export const LoginContext = createContext();
export const UserActionContext = createContext();
export const SwitchUserContext = createContext();
export const UserDataContext = createContext();

function App() {

  const [loggedInUser, SetLoggedInUser] = useState({});
  const [userAction, setUserAction] = useState({});
  const [user, setUser] = useState({ tanent: false,})
  const [userData, setUserData] = useState({
    name: null,
    email: null,
    uid: null,
    isProfiled: false
  })
  const isLoggedIn = () => {
    const token = sessionStorage.getItem('token');
    if (!token) return false;

    const decodedToken = jwtDecode(token);
    console.log(decodedToken)
    SetLoggedInUser(decodedToken)
    const currentTime = new Date().getTime() / 1000;
    if (currentTime >= decodedToken.exp) {
      sessionStorage.removeItem('token')
    }
    return decodedToken.exp > currentTime;
  }

  useEffect(() => {
    isLoggedIn();
  }, [])

  return (
    <LoginContext.Provider value={[loggedInUser, SetLoggedInUser]}>
      <UserActionContext.Provider value={[userAction, setUserAction]}>
        <SwitchUserContext.Provider value={[user, setUser]}>
            <Router>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/rooms">
                  <Rooms />
                </Route>
                <PrivateRoute exact path="/user">
                  <UserProfile />
                </PrivateRoute>
                <Route exact path="/edit-user">
                  <EditUserProfile />
                </Route>
                <Route exact path="/roommates">
                  <Roommates />
                </Route>
                <Route exact path="/single-room/:_id">
                  <SingleRooms />
                </Route>
                <Route exact path="/roommate/:_id">
                  <Roommate />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/signup">
                  <Signup />
                </Route>
                {/* <Route exact path="/roommateFind">
                  <RoommateFindAd />
                </Route> */}
            
                {/* <PrivateRoute exact path="/roomFind">
                  <RoomFindAd />
                </PrivateRoute> */}
                <PrivateRoute exact path="/tanentAds">
                  <TanentAds />
                </PrivateRoute>
                <PrivateRoute exact path="/dashboard">
                  <DashboardLayout>
                    <AdsListing />
                  </DashboardLayout>
                </PrivateRoute>
                <PrivateRoute exact path="/add">
                  <DashboardLayout>
                    <AddForm />
                  </DashboardLayout>
                </PrivateRoute>
                <Route exact path="/roomAdd">
                  <DashboardLayout>
                    <RoommateFindAd />
                  </DashboardLayout>
                </Route>
                {/* <Route exact path="/dashboard">
                  <DashboardLayout>
                    <AdsListing />
                  </DashboardLayout>
                </Route> */}
                <Route exact path="/edit/:_id">
                  <EditRoom />
                </Route>
                <Route exact path="/userType">
                  <UserRedirect />
                </Route>
              </Switch>
            </Router>
        </SwitchUserContext.Provider>
      </UserActionContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;

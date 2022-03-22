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
export const LoginContext = createContext();
export const UserActionContext = createContext();


function App() {

  const [loggedInUser, SetLoggedInUser] = useState({});
  const [userAction, setUserAction] = useState([{
    user: '',
    newUser: false,
    roommate: false,
  }]);
  const isLoggedIn = () => {
    const token = sessionStorage.getItem('token');
    if (!token) return false;

    const decodedToken = jwtDecode(token);
    SetLoggedInUser(decodedToken);
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
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/roommateFind">
              <RoommateFindAd />
            </Route>
            <Route exact path="/roomFind">
              <RoomFindAd />
            </Route>
            <Route exact path="/dashboard">
              <DashboardLayout>
                <AdsListing />
              </DashboardLayout>
            </Route>
            <Route exact path="/edit">
              <EditRoom />
            </Route>
            <Route exact path="/userType">
              <UserRedirect />
            </Route>
          </Switch>
        </Router>
      </UserActionContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;

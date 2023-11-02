import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Geocode from "react-geocode";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import Login from "./components/pages/Login";
import CreateAccount from "./components/pages/CreateAccount";
import ConfirmEmail from "./components/pages/ConfirmEmail";
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetPassword from "./components/pages/ResetPassword";
import VerifyEmail from "./components/pages/VerifyEmail";
import PasswordUpdated from "./components/pages/PasswordUpdated";
import ErrorPage from "./components/pages/ErrorPage";
import Home from "./components/pages/Home";
import PopupModal from "./components/utility/PopupModal";

function App() {
  const [user, setUser] = useState("");
  const [userLocationLat, setuserLocationLat] = useState("");
  const [userLocationLng, setuserLocationLng] = useState("");
  const [userLocation, setuserLocation] = useState([]);
  const jwtToken = Cookies.get("jwt");
  if (jwtToken) {
    var decoded = jwt_decode(jwtToken);
  }
  useEffect(() => {
    setUser(decoded);
  }, [jwtToken]);

  Geocode.setApiKey(process.env.REACT_APP_GOOGLEAPIKEY);

  function logout() {
    setUser("");
    Cookies.remove("jwt");
  }
  const isMobileNavigation = useMediaQuery({
    query: "(max-width: 1102px ",
  });
  return (
    <div className="App">
      <PopupModal />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isMobileNavigation={isMobileNavigation}
                logout={logout}
                user={user}
                userLocationLng={userLocationLng}
                userLocationLat={userLocationLat}
                userLocation={userLocation}
              />
            }
          />
          <Route path="/Login" element={<Login />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/ConfirmEmail" element={<ConfirmEmail />} />
          <Route path="/VerifyEmail/:id/:token" element={<VerifyEmail />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ResetPassword/:id/:token" element={<ResetPassword />} />
          <Route path="/PasswordUpdated" element={<PasswordUpdated />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

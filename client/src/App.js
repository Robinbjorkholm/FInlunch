import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import Login from "./components/pages/Login";
import CreateAccount from "./components/pages/CreateAccount";
import ConfirmEmail from "./components/pages/ConfirmEmail";
import VerifyEmail from "./components/pages/VerifyEmail";
import Home from "./components/pages/Home";
import PopupModal from "./components/utility/PopupModal";
import Geocode from "react-geocode";

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

  return (
    <div className="App">
      <PopupModal />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
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
          <Route
            path="/VerifyEmail/:id/:token"
            element={<VerifyEmail  />}
          />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Geocode from "react-geocode";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import Login from "./components/pages/Login";
import CreateAccount from "./components/pages/CreateAccount";
import ConfirmEmail from "./components/pages/ConfirmEmail";
import SendForgotPasswordEmail from "./components/pages/SendForgotPasswordEmail";
import ResetPassword from "./components/pages/ResetPassword";
import VerifyEmail from "./components/pages/VerifyEmail";
import PasswordUpdated from "./components/pages/PasswordUpdated";
import ErrorPage from "./components/pages/ErrorPage";
import Home from "./components/pages/Home";
import PopupModal from "./components/utility/PopupModal";
import PopupModalClosed from "./components/utility/PopupModalClosed";

import EmailSent from "./components/pages/EmailSent";

function App() {
  const [user, setUser] = useState("");
  const [userLocationLat, setuserLocationLat] = useState("");
  const [userLocationLng, setuserLocationLng] = useState("");
  const [closeModal, setcloseModal] = useState(false);
  const [closeModalClosed, setcloseModalClosed] = useState(false);
  const popupCookie = Cookies.get("popupmodalcookie");
  const popupClosedCookie = Cookies.get("popupclosedcookie");
  const jwtToken = Cookies.get("jwt");
  if (jwtToken) {
    var decoded = jwt_decode(jwtToken);
  }

  useEffect(() => {
    setUser(decoded);
    setcloseModal(popupCookie);
    setcloseModalClosed(popupClosedCookie);
    /* if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setuserLocationLat(latitude);
          setuserLocationLng(longitude);
        },
        (error) => {
          console.error("There was a problem getting users location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
    Geocode.setApiKey(process.env.REACT_APP_GOOGLEAPIKEY);*/
  }, [jwtToken]);

  function closePopupModal() {
    Cookies.set("popupmodalcookie", true, { expires: 10 });
    setcloseModal(Cookies.get("popupmodalcookie"));
  }
  function closePopupClosed() {
    Cookies.set("popupclosedcookie", true, { expires: 10 });
    setcloseModalClosed(Cookies.get("popupclosedcookie"));
  }

  function logout() {
    setUser("");
    Cookies.remove("jwt");
  }
  const isMobileNavigation = useMediaQuery({
    query: "(max-width: 1102px ",
  });

  return (
    <div className="App">
      {!closeModalClosed && (
        <PopupModalClosed closePopupClosed={closePopupClosed} />
      )}
      {!closeModal && <PopupModal closePopupModal={closePopupModal} />}
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
              />
            }
          />
          <Route path="/Login" element={<Login />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/ConfirmEmail" element={<ConfirmEmail />} />
          <Route path="/VerifyEmail/:id/:token" element={<VerifyEmail />} />
          <Route
            path="/SendForgotPasswordEmail"
            element={<SendForgotPasswordEmail />}
          />
          <Route path="/ResetPassword/:id/:token" element={<ResetPassword />} />
          <Route path="/PasswordUpdated" element={<PasswordUpdated />} />
          <Route path="/EmailSent" element={<EmailSent />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

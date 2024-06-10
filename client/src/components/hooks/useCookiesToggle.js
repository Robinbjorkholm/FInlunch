import Cookies from "js-cookie";

function useCookieToggle(cookieName, setCookie,toggle) {
  function toggleCookie() {
    Cookies.set(cookieName, true, { expires: 10 });
    setCookie(Cookies.get(cookieName));
    toggle(Cookies.get(cookieName))
  }
  return toggleCookie;
}

export default useCookieToggle;

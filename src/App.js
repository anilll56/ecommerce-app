import RoutePage from "./route/RoutePage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setBasket } from "./redux/UserSlice";
import { setAuthenticated } from "./redux/UserSlice";
import { ToastContainer } from "react-toastify";

import "./reset.css";
import "./App.css";

import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getBasketItems, getUserInfo } from "./api/HandleApi";
import { GetFavorites } from "./api/HandleApi";
import { setFavorites } from "./redux/UserSlice";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.user.authenticated);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const ignoredRoutes = ["/login", "/signup", "/home", "/product"];

    if (ignoredRoutes.includes(window.location.pathname)) return;

    if (token) {
      getUserInfo()
        .then((res) => {
          if (res) {
            const user = res;
            dispatch(setUser({ user }));
            dispatch(setAuthenticated(true));
          }
        })
        .catch((err) => {
          console.error("UserInfo alınırken hata oluştu:", err);
          //navigate("/login");
        });
      GetFavorites().then((res) => {
        if (res) {
          dispatch(setFavorites(res));
        }
        getBasketItems().then((res) => {
          if (res) {
            dispatch(setBasket(res));
          }
        });
      });
    } else {
      dispatch(setUser({ user: null }));
      dispatch(setAuthenticated(false));
      //navigate("/login");
    }
  }, [authenticated]);
  return (
    <>
      <RoutePage />
      <div className="toast">
        <ToastContainer />
      </div>
    </>
  );
}

export default App;

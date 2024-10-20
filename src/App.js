import RoutePage from "./route/RoutePage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setMyJobs } from "./redux/UserSlice";
import { setAuthenticated } from "./redux/UserSlice";
import { ToastContainer } from "react-toastify";

import "./reset.css";
import "./App.css";

import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getUserInfo } from "./api/HandleApi";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const user = localStorage.getItem("user");
  //const userEmail = JSON.parse(user)?.email;
  //const userRole = JSON.parse(user)?.role;
  const authenticated = useSelector((state) => state.user.authenticated);
  console.log(authenticated, "authenticated");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const ignoredRoutes = ["/login", "/signup"];

    if (ignoredRoutes.includes(window.location.pathname)) return;

    if (token) {
      getUserInfo()
        .then((res) => {
          if (res) {
            const user = res;
            dispatch(setUser({ user }));
            dispatch(setAuthenticated(true));
            navigate("/home");
          } else {
            navigate("/login");
          }
        })
        .catch((err) => {
          console.error("UserInfo alınırken hata oluştu:", err);
          navigate("/login");
        });
    } else {
      dispatch(setUser({ user: null }));
      dispatch(setAuthenticated(false));
      navigate("/login");
    }
  }, [authenticated]);
  return (
    <div className="App">
      <div className="container">
        <RoutePage />
      </div>
      <div className="toast">
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;

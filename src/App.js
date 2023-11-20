import "./App.css";
import RoutePage from "./route/RoutePage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setMyJobs } from "./redux/UserSlice";
import { setAuthenticated } from "./redux/UserSlice";
import { ToastContainer } from "react-toastify";

import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  const userEmail = JSON.parse(user)?.email;
  const userRole = JSON.parse(user)?.role;
  const authenticated = useSelector((state) => state.user.authenticated);
  console.log(authenticated, "authenticated");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/home");
      dispatch(setUser({ user: user }));
      dispatch(setAuthenticated(true));
    } else {
      dispatch(setUser({ user: null }));
      console.log("kullanıcı yok");
      dispatch(setAuthenticated(false));
      navigate("/login");
    }
  }, [authenticated, userRole, userEmail, dispatch]);
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

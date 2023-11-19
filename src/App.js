import "./App.css";
import RoutePage from "./route/RoutePage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setMyJobs } from "./redux/UserSlice";
import { setAuthenticated } from "./redux/UserSlice"; // 'path/to/redux' kısmı dosyanızın yerini belirtmelidir

import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  const userEmail = JSON.parse(user)?.email;
  const userRole = JSON.parse(user)?.role;
  const authenticated = useSelector((state) => state.user.authenticated);
  console.log(authenticated, "authenticated");
  const fetchJobs = async () => {
    try {
      if (userRole === "freelancer") {
        // const response = await getTheFreelancerJobByEmail(userEmail);
        // console.log(response, "response.data");
        // localStorage.setItem("Myjobs", JSON.stringify(response.data));
      } else if (userRole === "client") {
        // const response = await getTheClientJobByEmail(userEmail);
        // localStorage.setItem("Myjobs", JSON.stringify(response.data));
        // dispatch(setMyJobs(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    fetchJobs();
    if (user) {
      // getClientByEmail(user.email).then((res) => {
      // localStorage.setItem("user", JSON.stringify(res));
      // });
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
    </div>
  );
}

export default App;

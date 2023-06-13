import Cookies from "js-cookie";
import { Redirect, Route } from "react-router-dom";
import DiBuyContext from "../../context/DiBuyContext";
import { useEffect } from "react";
const ProtectedRoute = (props) => {
  useEffect(() => {
    <DiBuyContext.Consumer>
      {(value) => {
        const { currentRoute, setCurrentRoute } = value;
        if (props.path !== currentRoute) {
          setCurrentRoute(props.path);
        }
      }}
    </DiBuyContext.Consumer>;
  }, []);

  if (Cookies.get("jwtToken") === undefined) {
    return <Redirect to="/user/login" />;
  }

  return <Route {...props} />;
};

export default ProtectedRoute;

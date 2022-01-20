import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import authSelectors from "../redux/auth/authSelectors";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggegIn);
  return isLoggedIn ? children : <Navigate to="/signin" />;
};
export default PrivateRoute;

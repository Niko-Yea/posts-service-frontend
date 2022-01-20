import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import authSelectors from "../redux/auth/authSelectors";

const PublicRoute = ({
  component: Component,
  restricted = false,
  redirectTo = "/",
  children,
}) => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggegIn);
  const shouldRedirect = isLoggedIn && restricted;
  return shouldRedirect ? <Navigate to={redirectTo} /> : children;
};

export default PublicRoute;

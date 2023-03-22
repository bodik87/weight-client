import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { selectCurrentState } from "../redux/userSlice";

const useAuth = () => {
  const { token } = useSelector(selectCurrentState);

  if (token) {
    const decoded = jwtDecode(token);
    const { username } = decoded.UserInfo;
    return { username };
  }
  return { username: "" };
};
export default useAuth;

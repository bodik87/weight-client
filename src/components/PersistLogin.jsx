import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentState } from "../redux/userSlice";
import { useRefreshMutation } from "../redux/apis/usersActionsApi";
import { Outlet, Link } from "react-router-dom";
import usePersist from "../hooks/usePersist";
import { AUTH } from "../assets/CONSTANTS";
import Skeleton from "./UI/Skeleton";

const PersistLogin = () => {
  const [persist] = usePersist();
  const { token } = useSelector(selectCurrentState);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      console.log("verifying refresh token");
      try {
        //const response =
        await refresh();
        //const { accessToken } = response.data
        setTrueSuccess(true);
      } catch (err) {
        console.error(err);
      }
    };

    if (!token && persist) verifyRefreshToken();

    // eslint-disable-next-line
  }, []);

  let content;
  if (!persist) {
    // persist: no
    console.log("no persist");
    content = <Outlet />;
  } else if (isLoading) {
    //persist: yes, token: no
    console.log("loading");
    content = <Skeleton />;
  } else if (isError) {
    //persist: yes, token: no
    console.log("error");
    content = (
      <p className="errmsg">
        {/* {`${error?.data?.message} - `} */}
        <Link to="/login" className="text-red-600">
          {AUTH}
        </Link>
        .
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    console.log("token and uninit");
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};
export default PersistLogin;

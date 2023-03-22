import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../redux/apis/usersActionsApi";
import usePersist from "../hooks/usePersist";
import { setCredentials } from "../redux/userSlice";
import Skeleton from "../components/UI/Skeleton";
import {
  CANCEL_STEP,
  LOGIN,
  NOT_LOGIN,
  PASSWORD,
  REGISTER,
  TRUST_DIVICE,
  UNAUTH,
  USERNAME,
} from "../assets/CONSTANTS";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("Bogdan");
  const [password, setPassword] = useState("12345");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist(true);

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { userData, accessToken } = await login({
        username,
        password,
      }).unwrap();
      dispatch(setCredentials({ userData, accessToken }));
      setUsername("");
      setPassword("");
      navigate("/userpage");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg(UNAUTH);
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  const errClass = errMsg ? "errmsg mt-4 text-red-600" : "offscreen";

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  if (isLoading) return <Skeleton />;

  return (
    <section className="max-w-sm w-full mx-auto mt-10 flex flex-col items-center justify-center">
      <h1 className="title">{LOGIN}</h1>
      <p ref={errRef} className={errClass} aria-live="assertive">
        {errMsg}
      </p>

      <form className="w-full" onSubmit={handleSubmit}>
        <label htmlFor="username" className="label mt-4">
          {USERNAME}
        </label>
        <input
          className="input"
          type="text"
          id="username"
          ref={userRef}
          value={username}
          onChange={handleUserInput}
          autoComplete="off"
          required
        />

        <label htmlFor="password" className="label mt-4">
          {PASSWORD}
        </label>
        <input
          className="input mb-4"
          type="password"
          id="password"
          onChange={handlePwdInput}
          value={password}
          required
        />

        <label
          htmlFor="persist"
          className="text flex items-center gap-2 select-none"
        >
          <input
            type="checkbox"
            className="w-4 h-4"
            id="persist"
            onChange={handleToggle}
            checked={persist}
          />
          {TRUST_DIVICE}
        </label>

        <button className="btn mt-4">{LOGIN}</button>
      </form>

      <div className="mt-8 w-full flex flex-col gap-2">
        <p className="text">
          {NOT_LOGIN}
          <Link
            className="text flex items-center text-blue-600 font-semibold"
            to="/register"
          >
            {REGISTER}
          </Link>
        </p>
        <Link className="mt-4 text flex items-center font-semibold" to="/">
          {CANCEL_STEP}
        </Link>
      </div>
    </section>
  );
}

import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAddNewUserMutation } from "../redux/apis/usersActionsApi";
import Skeleton from "../components/UI/Skeleton";
import {
  CANCEL_STEP,
  LOGIN,
  NOT_REGISTER,
  PASSWORD,
  REGISTER,
  REGISTERED,
  USERNAME,
} from "../assets/CONSTANTS";

export default function RegisterPage() {
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("Bogdan");
  const [password, setPassword] = useState("12345");
  const [errMsg, setErrMsg] = useState("");

  const [register, { isLoading }] = useAddNewUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ username, password }).unwrap();
      setUsername("");
      setPassword("");
      navigate("/userpage");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else if (err.status === 409) {
        setErrMsg(REGISTERED);
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);

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
      <h1 className="title">{REGISTER}</h1>
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
        <button type="submit" className="btn mt-4">
          {REGISTER}
        </button>
      </form>

      <div className="mt-8 w-full flex flex-col gap-2">
        <p className="text">
          {NOT_REGISTER}
          <Link
            className="text flex items-center text-blue-600 font-semibold"
            to="/login"
          >
            {LOGIN}
          </Link>
        </p>
        <Link className="mt-4 text flex items-center font-semibold" to="/">
          {CANCEL_STEP}
        </Link>
      </div>
    </section>
  );
}

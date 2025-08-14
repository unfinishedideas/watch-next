import "./Form.css";
import { useUser } from "../hooks/UserHooks.ts";
import { useState } from "react";
import { useNavigate } from "react-router";
import { LoginUser } from "../api/UserApi.ts";
import User from "../classes/User.ts";
import FormErrorMessage from "./FormErrorMessage.tsx";

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [formData, setFormData] = useState({
    nameInput: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function AttemptLogin(event) {
    event.preventDefault();
    setNameError("");
    setPasswordError("");
    try {
      let res: object = await LoginUser(formData.nameInput, formData.password);
      const loggedInUser: User = new User(
        res.id,
        res.username,
        res.email,
        res.deleted
      );
      setUser(loggedInUser);
      await navigate("/");
    } catch (err: Error) {
      if (err.message === "user not found") {
        setNameError("User not found");
      } else if (err.message === "incorrect password") {
        setPasswordError("Incorrect password");
      } else if (err.message === "user is deleted") {
        setErrMsg("Cannot log in, user is deleted");
      } else {
        console.log(err);
        setErrMsg("Something went wrong, please try again.");
      }
    }
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <form className="form-style" onSubmit={AttemptLogin}>
        <div className="field-container">
          <label>Username or Email Address</label>
          <br />
          <input
            className="text-input"
            placeholder="Username or Email"
            type="text"
            id="nameInput"
            name="nameInput"
            value={formData.nameInput}
            onChange={handleChange}
            required
          />
          <FormErrorMessage message={nameError} />
        </div>
        <div className="field-container">
          <label>Password</label>
          <br />
          <input
            className="text-input"
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <FormErrorMessage message={passwordError} />
        </div>
        <button className="submit-btn" type="submit">
          Login
        </button>
      </form>
      {errMsg && <p className="error-text">{errMsg}</p>}
    </div>
  );
};

export default LoginForm;

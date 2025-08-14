//import "./Form.css";
//import { useUser } from "../hooks/UserHooks.ts";
import { useState } from "react";
//import { useNavigate } from "react-router";
//import { RegisterUser } from "../api/UserApi.ts";
//import User, { UserRegister } from "../classes/User.ts";
//import FormErrorMessage from "./FormErrorMessage.tsx";

interface SignupFormData {
    emailInput: string;
    usernameInput: string;
    passwordInput: string;
}

const UserSignupForm: React.FC = () => {
  //const navigate = useNavigate();
  const whitespaceRegex = /\s/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // TODO: Create regex for passwords and usernames to prevent bad characters
  // TODO: Change to an onSubmit form with event.preventDefault() to prevent wiping the data each attempt

  //const { user, setUser } = useUser();
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [formData, setFormData] = useState<SignupFormData>({
    emailInput: "",
    usernameInput: "",
    passwordInput: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function AttemptUserRegistration() {
    //event.preventDefault();
    console.log(formData.emailInput)
    console.log(formData.usernameInput)
    console.log(formData.passwordInput)
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setErrMsg("");
    const emailValid = CheckEmailValidity(formData.emailInput);
    const usernameValid = CheckUsernameValidity(formData.usernameInput);
    const passwordValid = CheckPasswordValidity(formData.passwordInput);
    if (!emailValid || !usernameValid || !passwordValid) {
      return;
    }
    /*
    try {
      const newUser: UserRegister = new UserRegister(
        formData.usernameInput,
        formData.emailInput,
        formData.passwordInput
      );
      const res: object = await RegisterUser(newUser);
      const loggedInUser: User = new User(
        res.id,
        res.username,
        res.email,
        res.deleted,
        res.created_at
      );
      if (loggedInUser instanceof User) {
        setUser(loggedInUser);
        await navigate("/");
      } else {
        setErrMsg("Try logging in");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        switch (err.message) {
          case "email already registered.":
            setEmailError("Email already registered");
            break;
          case "username already registered.":
            setUsernameError("Username already registered");
            break;
          default:
            setErrMsg("Something went wrong, please try again");
        }
      } else {
        console.error("UserSignup: An unknown error occurred");
        setErrMsg("Something went wrong, please try again");
      }
    }
    */
  }

  function CheckEmailValidity(email: string): boolean {
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid Email address");
      return false;
    }
    return true;
  }

  function CheckUsernameValidity(username: string): boolean {
    if (username.length <= 3 || whitespaceRegex.test(username)) {
      setUsernameError("Please enter a valid Username");
      return false;
    }
    return true;
  }

  function CheckPasswordValidity(password: string): boolean {
    if (password.length <= 3 || whitespaceRegex.test(password)) {
      setPasswordError("Please enter a valid password");
      return false;
    }
    return true;
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={AttemptUserRegistration}>
        <label className="floating-label">
          <input
            type="text"
            className="input input-md"
            placeholder="Email"
            id="emailInput"
            name="emailInput"
            value={formData.emailInput}
            onChange={handleChange}
            required
          />
          <span>Email</span>
        </label>
        <br />
        <p className="text-sm error-content">{emailError}</p>
        <p className="text-sm error-content">Just testing this DELETE ME!</p>

        <label className="floating-label">
          <input
            type="password"
            className="input input-md"
            placeholder="Password"
            id="passwordInput"
            name="passwordInput"
            value={formData.passwordInput}
            onChange={handleChange}
            required
          />
          <span>Password</span>
        </label>
        <p className="text-sm error-content">{passwordError}</p>
        <p className="text-sm">
          Password should be at least 15 characters OR at least 8 characters
          including a number and a lowercase letter.
        </p>

        <label className="floating-label">
          <input
            type="text"
            className="input input-md"
            placeholder="Username"
            id="usernameInput"
            name="usernameInput"
            value={formData.usernameInput}
            onChange={handleChange}
            required
          />
          <span>Username</span>
        </label>
        <p className="text-sm error-content">{usernameError}</p>
        <p className="text-sm">
          Username may only contain alphanumeric characters or single hyphens,
          and cannot begin or end with a hyphen.
        </p>

        <button type="submit">
          Sign Up
        </button>
      </form>
      <p className="text-sm error-content">{errMsg}</p>
    </div>
  );
};

export default UserSignupForm;

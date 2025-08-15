import { useUser } from "../hooks/UserHooks.ts";
import { useState } from "react";
import { useNavigate } from "react-router";
import { RegisterUser } from "../api/UserApi.ts";
import User from "../classes/User.ts";
import FormErrorText from "./FormErrorText.tsx";

interface SignupFormData {
  emailInput: string;
  usernameInput: string;
  passwordInput: string;
}

const UserSignupForm: React.FC = () => {
  const navigate = useNavigate();
  const whitespaceRegex = /\s/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // TODO: Create regex for passwords and usernames to prevent bad characters
  // TODO: Change to an onSubmit form with event.preventDefault() to prevent wiping the data each attempt

  const { setUser } = useUser();
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

  async function AttemptUserRegistration(event: React.SyntheticEvent) {
    event.preventDefault();
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
    try {
      const res: User = await RegisterUser(
        formData.emailInput,
        formData.passwordInput,
        formData.usernameInput
      );
      const loggedInUser: User = new User(res);
      setUser(loggedInUser);
      await navigate("/welcome");
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
    <div className="flex min-h-full flex-col justify-center px-6 py-10 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl/9 font-bold tracking-tight text-white">
          Sign up for movie night!
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="" onSubmit={AttemptUserRegistration}>
          <label className="label w-full">Email</label>
          <input
            type="text"
            className="input input-md w-full"
            placeholder="Email"
            id="emailInput"
            name="emailInput"
            value={formData.emailInput}
            onChange={handleChange}
            required
          />
          <FormErrorText message={emailError} />

          <label className="label w-full mt-1">Password</label>
          <input
            type="password"
            className="input input-md w-full"
            placeholder="Password"
            id="passwordInput"
            name="passwordInput"
            value={formData.passwordInput}
            onChange={handleChange}
            required
          />
          <FormErrorText message={passwordError} />
          <p className="text-sm mb-2">
            Password should be at least 15 characters OR at least 8 characters
            including a number and a lowercase letter.
          </p>

          <label className="label w-full mt-1">Username</label>
          <input
            type="text"
            className="input input-md w-full"
            placeholder="Username"
            id="usernameInput"
            name="usernameInput"
            value={formData.usernameInput}
            onChange={handleChange}
            required
          />
          <FormErrorText message={usernameError} />
          <p className="text-sm">
            Username may only contain alphanumeric characters or single hyphens,
            and cannot begin or end with a hyphen.
          </p>

          <br />

          <FormErrorText message={errMsg} />
          <br />
          <button className="w-full btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserSignupForm;

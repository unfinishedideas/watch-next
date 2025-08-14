import { useUser } from "../hooks/UserHooks.ts";
import { useState } from "react";
import { useNavigate } from "react-router";
import { LoginUser } from "../api/UserApi.ts";
import User, { type UserData } from "../classes/User.ts";
import FormErrorText from "./FormErrorText.tsx";

interface LoginFormData {
  nameInput: string;
  passwordInput: string;
}

const UserLoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [formData, setFormData] = useState<LoginFormData>({
    nameInput: "",
    passwordInput: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function AttemptLogin(event: React.SyntheticEvent) {
    event.preventDefault();
    setNameError("");
    setPasswordError("");
    setErrMsg("");
    try {
      const res: UserData = await LoginUser(
        formData.nameInput,
        formData.passwordInput
      );
      const loggedInUser: User = new User(res);
      setUser(loggedInUser);
      await navigate("/welcome");
    } catch (err: unknown) {
      if (err instanceof Error) {
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
      } else {
        console.log(err);
        setErrMsg("Something went wrong, please try again.");
      }
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="" onSubmit={AttemptLogin}>
          <label className="label w-full">Username or Email</label>
          <input
            type="text"
            className="input input-md w-full"
            placeholder="Username or Email"
            id="nameInput"
            name="nameInput"
            value={formData.nameInput}
            onChange={handleChange}
            required
          />
          <FormErrorText message={nameError} />

          <label className="label w-full">Password</label>
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

export default UserLoginForm;

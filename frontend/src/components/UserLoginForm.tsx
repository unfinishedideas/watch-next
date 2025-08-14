//import { useUser } from "../hooks/UserHooks.ts";
import { useState } from "react";
//import { useNavigate } from "react-router";
//import { LoginUser } from "../api/UserApi.ts";
//import User from "../classes/User.ts";
import FormErrorText from "./FormErrorText.tsx";

interface LoginFormData {
  nameInput: string;
  passwordInput: string;
}

const UserLoginForm: React.FC = () => {
  //const navigate = useNavigate();
  //const { user, setUser } = useUser();
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
    setErrMsg("Here's a random error why not!");
    setNameError("Username not found");
    setPasswordError("Password incorrect");
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
    <div>
      <form onSubmit={AttemptLogin}>
        <label className="label">Username or Email</label>
        <input
          type="text"
          className="input input-md"
          placeholder="Username or Email"
          id="nameInput"
          name="nameInput"
          value={formData.nameInput}
          onChange={handleChange}
          required
        />
        <FormErrorText message={nameError} />

        <label className="label">Password</label>
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
        <FormErrorText message={passwordError} />
        <br/>
        <FormErrorText message={errMsg} />
        <br/>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserLoginForm;

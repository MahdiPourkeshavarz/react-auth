import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../services/auth-service";
import { useState } from "react";
import { LOGIN_URL, REGISTER_URL } from "../constants/url";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const phone = e.target["phone"].value;
    const password = e.target["password"].value;
    console.log(phone, password);
    try {
      let url = "";
      if (mode === "login") {
        url = LOGIN_URL;
      } else {
        url = REGISTER_URL;
      }
      const response = await axiosInstance.post(url, {
        phone: phone,
        password: password,
      });
      const token = response.data.access;
      const refreshToken = response.data.refresh;
      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <>
      <div>
        AuthPage
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="phone">phone</label>
          <input name="phone" type="number" />
          <label htmlFor="password">password</label>
          <input name="password" type="text" />
          <button type="submit">Submit</button>
        </form>
        <label htmlFor="auth">login</label>
        <input
          onClick={() => setMode("login")}
          type="checkbox"
          name="auth"
          id="login"
        />
        <label htmlFor="auth">signup</label>
        <input
          onClick={() => setMode("signup")}
          type="checkbox"
          name="auth"
          id="signup"
        />
      </div>
    </>
  );
}

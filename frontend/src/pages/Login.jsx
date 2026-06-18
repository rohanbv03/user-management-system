import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async e => {

    e.preventDefault();

    try {

      const res =
        await api.post(
          "/login",
          form
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/profile");

    } catch (err) {

      alert(
        err.response?.data?.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={e =>
          setForm({
            ...form,
            email: e.target.value
          })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e =>
          setForm({
            ...form,
            password: e.target.value
          })
        }
      />

      <button>
        Login
      </button>

    </form>
  );
}

export default Login;
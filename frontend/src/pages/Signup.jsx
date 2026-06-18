import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api";

function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async e => {

    e.preventDefault();

    try {

      await api.post(
        "/signup",
        form
      );

      alert("Signup Successful");

      navigate("/login");

    } catch (err) {

      alert(
        err.response?.data?.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>

      <input
        placeholder="Name"
        onChange={e =>
          setForm({
            ...form,
            name: e.target.value
          })
        }
      />

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
        Signup
      </button>
    </form>
  );
}

export default Signup;
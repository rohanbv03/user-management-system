import { useEffect, useState } from "react";
import api from "../api";

function Profile() {

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    const fetchProfile =
      async () => {

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await api.get(
          "/profile",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setUser(res.data);
    };

    fetchProfile();

  }, []);

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    window.location.href =
      "/login";
  };

  if (!user)
    return <h2>Loading...</h2>;

  return (
    <div>
      <h1>
        Welcome {user.name}
      </h1>

      <p>{user.email}</p>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
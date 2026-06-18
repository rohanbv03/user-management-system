import { useEffect, useState } from "react";
import api from "../api";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      const res = await api.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    };

    fetchProfile();
  }, []);

  if (!user)
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center text-white">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center px-4">

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 w-full max-w-md">

        <div className="flex flex-col items-center">

          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-white text-3xl font-bold mt-4">
            {user.name}
          </h1>

          <p className="text-slate-400">
            {user.email}
          </p>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="w-full mt-8 bg-red-600 hover:bg-red-700 transition py-3 rounded-xl text-white"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Profile;
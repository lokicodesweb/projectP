import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./logincomp.css";
import { auth } from "../../firebase/setup";
import { ToastContainer, toast } from "react-toastify";

function Loginbox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log("User created:", user);

      console.log("User logged in and data saved to Firestore");
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/home");
    } catch (error) {
      console.error("Error during sign-in:", error);
      toast.error("Login failed. Please check your credentials.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const navigate = useNavigate();

  return (
    <div>
      <div className="input-container">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </div>
      <div className="button-container">
        <button
          type="submit"
          className="continue-button"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Loginbox;

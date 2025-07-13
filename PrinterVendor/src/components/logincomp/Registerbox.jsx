import React, { useState } from "react";
import "./logincomp.css";
import { auth, db } from "../../firebase/setup";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Loginbox from "./loginbox";
import { ToastContainer, toast } from "react-toastify";

import { doc, setDoc } from "firebase/firestore";

function Registerbox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uname, setUname] = useState("");
  const [Log, toLog] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log("User created:", user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: email,
          uname: uname,
          password: password,
        });
        console.log("User data saved to Firestore");
        toLog(false);
        toast.success("Registration successful!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      toast.error("Registration failed. Please try again.", {
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
  return (
    <>
      <form onSubmit={handleLogin}>
        {Log ? (
          <>
            <div className="input-container">
              <h1>Create An Account</h1>
              <input
                type="Username"
                value={uname}
                onChange={(e) => setUname(e.target.value)}
                placeholder="Username"
                required
              />
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
              <button type="submit" className="continue-button">
                Register
              </button>
            </div>
            <div
              style={{
                position: "relative",
                bottom: "15px",
                left: "10px",
                textAlign: "center",
              }}
            >
              Already have an account?{" "}
              <button
                type="button"
                style={{
                  background: "none",
                  border: "none",
                  color: "#195dc4",
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
                onClick={() => toLog(false)}
              >
                Login here
              </button>
            </div>
          </>
        ) : (
          <Loginbox />
        )}
      </form>
      <ToastContainer />
    </>
  );
}

export default Registerbox;

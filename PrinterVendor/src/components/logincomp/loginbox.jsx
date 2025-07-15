import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./logincomp.css";
import { auth } from "../../firebase/setup";
import { ToastContainer, toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/setup";

function Loginbox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      //transfer uname for display purpose

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);

      let uname = "";
      if (docSnap.exists()) {
        uname = docSnap.data().uname;
      }

      console.log("Username from Firestore:", uname);

      toast.success("Login successful!");

      navigate("/home", { state: { uname } });
    } catch (error) {
      console.error("Error during sign-in:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className="w-full max-w-[300px] relative  top-[90px] right-[0px] bottom-[30px] mx-bottom-[24px">
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
      <div className="button-container relative top-[50px]">
        <button
          type="submit"
          className="continue-button relative top-[50px]"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Loginbox;

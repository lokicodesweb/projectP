import React, { useState } from "react";
import "./css/login.css";
import { auth, db } from "../firebase/setup";
import { setDoc, doc } from "firebase/firestore";
import { signInWithPhoneNumber } from "firebase/auth";
import { RecaptchaVerifier } from "firebase/auth";
import OtpInput from "react-otp-input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [step, setStep] = useState("phone");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
            callback: () => {
              console.log("Recaptcha verified");
            },
          }
        );
      }
      const result = await signInWithPhoneNumber(
        auth,
        `+${mobile}`,
        window.recaptchaVerifier
      );
      setConfirmationResult(result);
      setStep("otp");
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      if (confirmationResult) {
        const res = await confirmationResult.confirm(otp);
        alert("Logged in with: " + res.user.phoneNumber);
        navigate("/preview");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className={`signup-container`}>
      {step === "phone" ? (
        <>
          <h1 className="word">Enter mobile number</h1>
          <form className="form" onSubmit={handleLogin}>
            <div className="input-container">
              <PhoneInput
                country={"in"}
                value={mobile}
                onChange={setMobile}
                placeholder="Mobile Number"
              />
            </div>
            <div id="recaptcha-container"></div>
            <div className="button-container">
              <button type="submit" className="continue-button">
                Send Otp
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <form className="form" onSubmit={handleVerifyOtp}>
            <div id="recaptcha-container"></div>
            <h1 className="word">Enter OTP</h1>

            <div>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  width: "3.8rem",
                  height: "3.8rem",
                  margin: "0 0.5rem",
                  fontSize: "2.5rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  textAlign: "center",
                  background: "#fff",
                  position: "relative",
                  top: "100px",
                }}
                containerStyle={{
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              />
            </div>
            <div className="button-container">
              <button type="submit" className="continue-button">
                Verify OTP
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;

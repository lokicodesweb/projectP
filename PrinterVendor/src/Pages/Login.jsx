import React, { useState, useRef } from "react";
import "./css/login.css";
import PhoneInput from "react-phone-input-2";
import auth from "../firebase/setup";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export const Login = ({}) => {
  const [mobile, setMobile] = useState("");
  const recaptchaRef = useRef(null);

  React.useEffect(() => {
    if (!recaptchaRef.current) {
      recaptchaRef.current = new RecaptchaVerifier("recaptcha", {}, auth);
      recaptchaRef.current.render();
    }
  }, []);

  const sendOtp = async () => {
    try {
      const confirmation = await signInWithPhoneNumber(
        auth,
        mobile,
        recaptchaRef.current
      );
      console.log(confirmation);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="signupcontainer">
      <h1 className="word">Enter Mobile Number</h1>
      <PhoneInput
        country={"in"}
        value={mobile}
        onChange={(mobile) => setMobile("+" + mobile)}
      />
      <div id="recaptcha" style={{ margin: "16px 0" }}></div>
      <div className="button-container"></div>
      <button onClick={sendOtp}>Send OTP</button>
      <button>verify otp</button>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { Link } from "react-router-dom";
import "./css/Walkthrough.css";
export const Walkthrough = () => {
  const [step, setStep] = useState(0);
  const next = () => setStep(step + 1);

  const Card1 = ({ onNext }) => (
    <div className="cards">
      <h2>Mobile Number Login</h2>
      <video
        className="gif"
        src="src/assets/login.mp4"
        autoPlay
        muted
        loop
      ></video>
      <p>Use your mobile number to login </p>
      <img src="src/assets/arrow.png" alt="Next" onClick={onNext} />
    </div>
  );

  const Card2 = ({ onNext }) => (
    <div className="cards">
      <h2>Home Page</h2>
      <video
        className="gif"
        src="src/assets/dragdrop.mp4"
        autoPlay
        muted
        loop
      ></video>
      <p>Upload your documents (PDF/DOCX)</p>
      <img src="src/assets/arrow.png" alt="Next" onClick={onNext} />
    </div>
  );

  const Card3 = ({ onNext }) => (
    <div className="cards">
      <h2>Preview</h2>
      <video
        className="gif"
        src="src/assets/login.mp4"
        autoPlay
        muted
        loop
      ></video>
      <p>Customize how you want it to be printed</p>
      <img src="src/assets/arrow.png" alt="Next" onClick={onNext} />
    </div>
  );

  const Card4 = () => (
    <div className="cards">
      <h2>Payment</h2>
      <video
        className="gif"
        src="src/assets/pay.mp4"
        autoPlay
        muted
        loop
      ></video>
      <p>Pay and get your unique code for printing</p>
    </div>
  );

  let currentCard;
  if (step === 0) currentCard = <Card1 onNext={next} />;
  else if (step === 1) currentCard = <Card2 onNext={next} />;
  else if (step === 2) currentCard = <Card3 onNext={next} />;
  else if (step === 3) currentCard = <Card4 />;

  return (
    <div className="walkthrough">
      <h1 className="title">Printer Vending Machine</h1>
      <div className="cards-container">{currentCard}</div>
      {step === 3 && (
        <Link className="start" to="/login">
          <button>Get Started</button>
        </Link>
      )}
    </div>
  );
};

export default Walkthrough;

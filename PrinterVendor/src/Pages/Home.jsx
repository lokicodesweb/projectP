import { Link } from "react-router-dom";
import Outerbox from "../components/Homecomp/Outerbox";
import Uploadbox from "../components/Homecomp/Uploadbox";
import Filestatusbox from "../components/Homecomp/Filestatusbox";
import "./css/Homepage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import auth from "../firebase/setup";
import { onAuthStateChanged } from "firebase/auth";

export function Home() {
  const [file, setFile] = useState([]);
  const [Continue, canContinue] = useState(false);

  useEffect(() => {
    if (file.length > 0) {
      canContinue(true);
    }
  }, [file]);

  function getExtension(file) {
    const parts = file.name.split(".");
    if (parts.length > 1) {
      return "." + parts.pop();
    }
    return "";
  }
  const location = useLocation();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-[100vh] min-w-[100vw] bg-gradient-to-br from-[#195dc4] to-[#4f8cff] flex items-center justify-center">
      <div className="flex flex-col items-center bg-[white] rounded-[18px] shadow-[0_8px_32px_0_rgba(31,38,135,0.12)] max-w-[596px] w-full h-[584px] overflow-hidden">
        <h1 className="text-2xl font-bold text-[#1E3A8A] mb-2">
          Add and Upload your Files
        </h1>
        <h2 className="text-lg font-medium text-gray-700 mb-4">
          Welcome {location.state?.uname || "User"}
        </h2>
        <Outerbox setFileforbox={setFile} />

        {file.length > 0 && (
          <section
            className="flex flex-col gap-[5px]  w-full max-w-[400px] relative bottom-[20px] right-[12px] "
            aria-label="Uploaded files"
          >
            {file.map((file) => (
              <Filestatusbox
                key={`${file.name}-${Date.now()}-${Math.random()}`}
                fileName={file.name.slice(0, 6) + getExtension(file)}
                filestatus={file.status}
                uploadInfo={file.size}
                onRemove={() => {
                  setFile((prev) => prev.filter((f) => f.id !== file.id));
                }}
              />
            ))}
          </section>
        )}

        <Uploadbox setFileforbox={file} Continue={Continue} />
      </div>
    </div>
  );
}

export default Home;

import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Preview from "./Pages/Preview";
import Walkthrough from "./Pages/Walkthrough";
import Pay from "./Pages/Pay";
import Loader from "./Loaderanimation";

const App = () => {
  const [Loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {Loading ? (
        <Loader />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Walkthrough />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/pay" element={<Pay />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;

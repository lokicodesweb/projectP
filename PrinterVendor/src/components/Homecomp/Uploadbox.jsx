import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export const UploadButton = ({ setFileforbox, Continue }) => {
  const navigate = useNavigate();
  const [loading, isLoading] = useState(false);

  const sumbitFile = async (e) => {
    e.preventDefault();
    isLoading(true);

    const formdata = new FormData();
    setFileforbox.forEach((file) => {
      formdata.append("files", file.file);
    });

    axios
      .post("https://projectp-ibon.onrender.com/upload", formdata)
      .then((res) => {
        if (res) {
          navigate("/preview");
        }
      })
      .catch((er) => console.log(er));

    return;
  };
  const LoadingSpinner = () => (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  );

  return (
    <div className="button-container relative ">
      <button
        onClick={sumbitFile}
        className="continue-button relative  right-[1px]"
        disabled={!Continue}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <LoadingSpinner /> Uploading...
          </span>
        ) : (
          "Upload"
        )}
      </button>
    </div>
  );
};
export default UploadButton;

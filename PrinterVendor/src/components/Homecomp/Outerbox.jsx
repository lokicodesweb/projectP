import React, { useCallback, useState } from "react";
import { auth } from "../../firebase/setup";

const FileUploadArea = ({ setFileforbox, status }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  function getExtension(filename) {
    return filename.split(".").pop();
  }
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);

    const newFilesraw = Array.from(e.dataTransfer.files);
    const newFiles = Array.from(newFilesraw).filter((file) => {
      const ext = getExtension(file.name).toLowerCase();
      return (
        ext === "pdf" ||
        ext === "docx" ||
        ext === "doc" ||
        ext === "jpg" ||
        ext === "jpeg "
      );
    });

    console.log(newFiles.length);

    setFileforbox((prevfile) => {
      const spaceLeft = 3 - prevfile.length;

      if (spaceLeft <= 0) {
        alert("Maximum of 3 files already added.");
        return prevfile;
      }

      const filesToAdd = newFiles.slice(0, spaceLeft);

      if (filesToAdd.length < newFiles.length) {
        alert("Some files were ignored. Maximum of 3 allowed.");
      }

      return [...prevfile, ...filesToAdd];
    });
  }, []);

  return (
    <section className="w-full max-w-[311px] top-[6px] relative">
      <div
        className={`w-full h-[250px]   flex items-center justify-center mb-[41px] rounded-[10px] border-dashed max-md:h-[350px] max-sm:h-[300px] transition-colors
  ${isDragOver ? "border-[#3B82F6] bg-blue-50" : "border-[#494949]"}
`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex w-[303px] h-[300px] absolute top-[23px] flex-col items-center gap-[43px] max-md:w-[280px] max-md:gap-[35px] max-sm:w-[250px] max-sm:gap-[30px]">
          <div>
            <svg
              width="111"
              height="110"
              viewBox="0 0 111 110"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="upload-icon"
              style={{ width: "110px", height: "110px" }}
            >
              <path
                d="M73.8333 73.3333L55.5 55M55.5 55L37.1667 73.3333M55.5 55V96.25M93.9542 84.2875C98.4245 81.8504 101.956 77.994 103.991 73.327C106.026 68.66 106.449 63.4481 105.193 58.514C103.938 53.5798 101.074 49.2044 97.0556 46.0783C93.0368 42.9522 88.0915 41.2534 83 41.25H77.225C75.8377 35.884 73.252 30.9024 69.6623 26.6795C66.0725 22.4567 61.5722 19.1026 56.4996 16.8694C51.427 14.6363 45.9142 13.5821 40.3755 13.7861C34.8369 13.9902 29.4166 15.4472 24.5221 18.0476C19.6276 20.6481 15.3863 24.3242 12.117 28.7997C8.84777 33.2753 6.63566 38.4337 5.64699 43.8872C4.65832 49.3407 4.91882 54.9474 6.4089 60.2858C7.89897 65.6241 10.5799 70.5552 14.25 74.7083"
                stroke="#1E1E1E"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="text-black text-center text-base font-bold max-md:text-[15px] max-sm:text-sm">
              Drag or Drop file(s) here
            </div>
            <div className="text-black text-center text-xs font-normal max-sm:text-[11px]">
              or
            </div>
            <label className="flex justify-center items-center gap-2.5 cursor-pointer bg-black px-[31px] py-[5px] rounded-[5px] max-sm:px-6 max-sm:py-2">
              <input
                type="file"
                multiple
                onChange={(e) => {
                  const newFilesraw = Array.from(e.target.files);
                  const newFiles = newFilesraw.filter((file) => {
                    const ext = getExtension(file.name).toLowerCase();
                    return (
                      ext === "pdf" ||
                      ext === "docx" ||
                      ext === "doc" ||
                      ext === "jpg" ||
                      ext === "jpeg "
                    );
                  });

                  setFileforbox((prevfile) => {
                    const spaceLeft = 3 - prevfile.length;
                    const filesToAdd = newFiles.slice(0, spaceLeft);

                    const filesWithStatus = filesToAdd.map((file) => ({
                      file,
                      name: file.name,
                      size: file.size,
                      status: "success",
                    }));

                    if (filesToAdd.length < newFiles.length) {
                      alert("Some files were ignored. Maximum of 3 allowed.");
                    }
                    return [...prevfile, ...filesWithStatus];
                  });
                }}
                className="hidden"
                accept=".psd,.doc,.docx,.svg,.pdf,.jpg,.jpeg,.png"
              />
              <span className="text-white text-sm font-normal leading-[20.3px] max-sm:text-[13px] underline">
                Browse file(s)
              </span>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FileUploadArea;

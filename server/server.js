const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");

const { exec } = require("child_process");

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/fileraw");
  },
  filename: function (req, file, cb) {
    return cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.array("files"), (req, res) => {
  console.log("File received:", req.files);

  exec("python ./docpdfconv.py", (error, stdout, stderr) => {
    if (error) {
      console.error(`Python script error: ${error.message}`);
      return res.status(500).json({ error: "Conversion failed." });
    }
    if (stderr) {
      console.error(`Python script stderr: ${stderr}`);
    }
    console.log(`Python converting ${stdout}`);
    res.send("Files uploaded and converted!");
  });
});

app.get("/preview", (req, res) => {
  const isReady = true;
  res.send(isReady);
});
app.listen(5000, "0.0.0.0", () => {
  console.log("Server is running on port 5000");
});

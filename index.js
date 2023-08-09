const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
dotenv.config({ path: path.resolve(__dirname, ".env") });

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const newsAxiosInstance = app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is successfully running on port ${PORT}`);
  } else {
    console.log("Error occurred", error);
  }
});

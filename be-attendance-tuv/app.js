if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// const http = require("http");
// const hostname = "192.168.68.104";
const express = require("express");
const app = express();
const port = 4000;
const routes = require("./routes");
const errorHandle = require("./middlewares/errorHandler");

const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

app.use(errorHandle);

// app.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});

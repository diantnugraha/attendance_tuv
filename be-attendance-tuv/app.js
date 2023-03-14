if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const routes = require("./routes");
const errorHandle = require("./middlewares/errorHandler");

app.use("/", routes);
app.use(errorHandle);

app.listen(port, () => {
  console.log(`Server attendances listening on port ${port}`);
});

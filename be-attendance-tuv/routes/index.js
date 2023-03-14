const router = require("express").Router();
const routerUser = require("../routes/routerUser");

router.get("/", (req, res) => {
  res.send("Welcome to Attendances Server");
});
router.use("/users", routerUser);

module.exports = router;

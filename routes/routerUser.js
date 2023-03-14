const ControllerUser = require("../controllers/controllerUsers");
const ControllerAttendance = require("../controllers/controllerAttendances");
const { authenticationUser } = require("../middlewares/authentification");
const router = require("express").Router();

router.get("/all", ControllerUser.getAllData);
router.post("/register", ControllerUser.registerUser);
router.post("/login", ControllerUser.loginUser);
router.post(
  "/attendance-in",
  authenticationUser,
  ControllerAttendance.userCheckIn
);
router.patch(
  "/attendance-out/:id",
  authenticationUser,
  ControllerAttendance.userCheckOut
);

module.exports = router;

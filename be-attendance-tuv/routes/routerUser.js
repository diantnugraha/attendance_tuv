const ControllerUser = require("../controllers/controllerUsers");
const ControllerAttendance = require("../controllers/controllerAttendances");
const { authenticationUser } = require("../middlewares/authentification");
const router = require("express").Router();

router.post("/register", ControllerUser.registerUser);
router.get("/all", ControllerUser.getAllData);
router.post("/login", ControllerUser.loginUser);
router.get(
  "/attendance",
  authenticationUser,
  ControllerAttendance.currentAttendance
);
router.get("/logs", authenticationUser, ControllerAttendance.logAttendance)
router.get("/:id", authenticationUser, ControllerUser.getDetailUsers);
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

const express = require("express");
const router = express.Router();

const adminController = require("../controller/admin");
const userController = require("../controller/user");
const centerController = require("../controller/center");

router.get("/test", (req, res) => {
  res.send("API working");
});

//admin
router.post("/add_admin", adminController.createAdmin);
router.post("/admin_login", adminController.loginAdmin);

//user
router.post("/user_signup", userController.createUser);
router.post("/user_login", userController.loginUser);

//center
router.post("/addCenter", centerController.createCenter);
router.post("/removeCenter", centerController.removeCenter);
router.post("/viewCenter", centerController.viewCenters);

module.exports = router;

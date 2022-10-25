var express = require("express");
var router = express.Router();
var {
  getallusers,
  aboutuser,
  register,
  login,
  updateusername,
  createadmin,
  logout,
} = require("../controllers/userController");
var { authenticate, checkAdmin } = require("../middleware/util");

router.get("/getallusers", authenticate, checkAdmin, getallusers);
router.get("/aboutuser", authenticate, aboutuser);
router.post("/register", register);
router.post("/login", login);
router.put("/updateusername/:_id", authenticate, updateusername);
router.post("/createadmin", createadmin);
router.post("/logout", logout);

module.exports = router;

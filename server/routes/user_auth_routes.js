const express = require("express");
const router = express.Router();
const { tokenCheck, isAdmin } = require("../middlewares/auth");
const { login, addUser,updateUser } = require("../controllers/auth_controller");
router.post("/login", login);
router.post("/addUser", tokenCheck, isAdmin, addUser);
router.put("/updateUser", tokenCheck, isAdmin, updateUser);

module.exports = router;

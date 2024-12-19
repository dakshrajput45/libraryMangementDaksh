const express = require("express");
const router = express.Router();
const {
	addMembership,
	updateMembership,
	getAllMembership,
} = require("../controllers/membership_controller");
const { tokenCheck, isAdmin } = require("../middlewares/auth");

router.post("/addMembership", tokenCheck, isAdmin, addMembership);
router.put("/updateMembership", tokenCheck, isAdmin, updateMembership);
router.get("/getAllMembership", getAllMembership);

module.exports = router;

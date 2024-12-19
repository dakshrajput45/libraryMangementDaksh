const express = require("express");
const router = express.Router();
const {
	addItem,
	updateItem,
	getAllItemByType,
} = require("../controllers/item_controller");
const { tokenCheck, isAdmin } = require("../middlewares/auth");

router.post("/addItem", tokenCheck, isAdmin, addItem);
router.put("/updateItem", tokenCheck, isAdmin, updateItem);
router.get("/getAllItemByType", getAllItemByType);

module.exports = router;

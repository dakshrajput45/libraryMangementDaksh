const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middlewares/auth");
const {addItem,updateItem,getAllItemByType} = require("../controllers/item_controller");


router.post("/addItem", addItem);
router.put("/updateItem", updateItem);
router.get("/getAllItemByType", getAllItemByType);

module.exports = router;

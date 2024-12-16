const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middlewares/auth");
const {addMembership,updateMembership,getAllMembership} = require("../controllers/membership_controller");


router.post("/addMembership", addMembership);
router.put("/updateMembership", updateMembership);
router.get("/getAllMembership", getAllMembership);

module.exports = router;

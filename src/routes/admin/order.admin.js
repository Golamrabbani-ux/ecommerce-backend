const express = require("express");
const { requireSignin } = require("../../common-middlwear");
const { updateOrder, getAllorder } = require("../../controller/admin/order.admin");
const router = express.Router();

router.post(`/order/update`, requireSignin, updateOrder);
router.get(`/allorder`,requireSignin, getAllorder);

module.exports = router;
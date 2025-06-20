const express = require("express");
const viewController = require("../controllers/viewController");

const router = express.Router();

router.get("/", viewController.getOverview);
router.get("/tour", viewController.getTour);
router.get("/tour/:slug", viewController.getTour);

module.exports = router;

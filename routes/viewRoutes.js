const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.isLoggedIn);

router.get("/", authController.isLoggedIn, viewController.getOverview);
// router.get("/tour", authController.isLoggedIn, viewController.getTour);
router.get("/tour/:slug", authController.isLoggedIn, viewController.getTour);

// Login route
router.get("/login", authController.isLoggedIn, viewController.getLoginForm);

router.get("/me", authController.protect, viewController.getAccount);

router.post('/submit-user-data', authController.protect, viewController.updateUserData);


module.exports = router;

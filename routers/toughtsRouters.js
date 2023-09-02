const express = require("express");
const router = express.Router();
const ToughtsController = require("../controllers/ToughtsController");

const checkAuth = require("../helpers/auth").checkAuth;

router.get('/add', checkAuth, ToughtsController.createToughts);
router.post('/add', checkAuth, ToughtsController.createToughtsSave);
router.get('/profile', checkAuth, ToughtsController.profile);
router.get("/", ToughtsController.showToughts);

module.exports = router;

const express = require("express");
const router = express.Router();
const ToughtsController = require("../controllers/ToughtsController");

const checkAuth = require("../helpers/auth").checkAuth;

router.get('/add', checkAuth, ToughtsController.createToughts);
router.post('/add', checkAuth, ToughtsController.createToughtsSave);
router.get('/edit/:id', checkAuth, ToughtsController.updateToughts);
router.post('/edit', checkAuth, ToughtsController.updateToughtsSave);
router.get('/profile', checkAuth, ToughtsController.profile);
router.post('/remove', checkAuth, ToughtsController.removeToughts)
router.get("/", ToughtsController.showToughts);

module.exports = router;

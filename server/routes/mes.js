const express = require("express");
const router = express.Router();

const controlers = require("../controlers/mes");

router.put("/login/:machine", controlers.connect);
router.put("/loginQ/:machine", controlers.connectQuality);
router.put("/logout/:machine", controlers.disconnect);
router.get("/checkuser/:machine", controlers.checkUser);
router.get("/navbar/:machine", controlers.navbar);
router.get("/resultat/:machine", controlers.resultatInstantanee);
router.get("/historique/:machine", controlers.historique);
router.put("/savearret/:machine/:datte", controlers.saveArret);
router.post("/savedechet/:machine", controlers.saveDechet);
router.put("/validerdechet/:machine/:datte", controlers.validerDechet);
router.delete("/deletedechet/:machine/:datte", controlers.deleteDechet);
router.post("/savenonconforme/:machine", controlers.saveNonConforme);
module.exports = router;

const express = require("express");
const router = express.Router();

const controlers = require("../controlers/mes");

router.get("/checkuser/:machine", controlers.checkUser);
router.get("/navbar/:machine", controlers.navbar);
router.get("/resultat/:machine", controlers.resultatInstantanee);
router.get("/historique/:machine", controlers.historique);
router.put("/login/:machine", controlers.connect);
router.put("/loginQ/:machine", controlers.connectQuality);
router.put("/logout/:machine", controlers.disconnect);
router.put("/savearret/:machine/:datte", controlers.saveArret);
router.put("/validerdechet/:machine/:datte", controlers.validerDechet);
router.put("/validernc/:machine/:datte", controlers.validerNC);
router.post("/savenonconforme/:machine", controlers.saveNonConforme);
router.post("/savedechet/:machine", controlers.saveDechet);
router.delete("/deletedechet/:machine/:datte", controlers.deleteDechet);

module.exports = router;

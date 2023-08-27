import * as express from "express";
import tcgController from "../controllers/tcg.controller";
const router = express.Router();

router.get("/get-rarities/:tcg", tcgController.getRariritiesByTCG);
router.post("/update-wixoss-cards", tcgController.updateWixossCards);
router.post("/scrappe-wixoss-rarities", tcgController.updateWixossRarities);
router.post(
  "/scrappe-shadowverse-rarities",
  tcgController.updateShadowverseRarities
);
router.post("/update-shadowverse-cards", tcgController.updateShadowverseCards);
router.get(
  "/get-cards/:page/:size/:team?/:rarity?/:selectedClass?/:types?/:tcg?",
  tcgController.getCards
);
router.put(
  "/update-price-cards/:rarity/:buyPrice/:sellPrice/:category/:stock",
  tcgController.updateCardsPrices
);
router.put("/update-tcg-card", tcgController.updateSingleCard);

export default router;

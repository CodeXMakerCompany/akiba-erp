import * as express from "express";
import {
  create,
  update,
  getByName,
} from "../controllers/template/template.controller";
const router = express.Router();

router.get("/get/:name", getByName);
router.post("/create", create);
router.put("/update", update);

export default router;

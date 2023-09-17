import * as express from "express";
import { getbyId, login, register } from "../controllers/user/user.controller";

const router = express.Router();

router.post("/getbyId/:id", getbyId);
router.post("/login", login);
router.post("/register", register);

export default router;

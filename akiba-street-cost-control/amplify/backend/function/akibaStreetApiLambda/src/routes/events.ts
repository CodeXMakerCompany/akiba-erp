import * as express from "express";
import EventController from "../controllers/event.controller";

const router = express.Router();

router.get("/all", EventController.getEvents);
router.post("/create", EventController.createEvent);

export default router;

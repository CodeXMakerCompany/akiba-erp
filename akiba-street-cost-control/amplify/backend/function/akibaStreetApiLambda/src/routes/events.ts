import * as express from "express";
import EventController from "../controllers/event.controller";
import EventModel from "../models/event";

const router = express.Router();

router.get("/all", EventController.getEvents);
router.post("/create", EventController.createEvent);

export default router;

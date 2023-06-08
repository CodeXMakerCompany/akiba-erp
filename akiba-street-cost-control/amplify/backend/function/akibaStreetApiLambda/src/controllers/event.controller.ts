import { NextFunction, Request, Response } from "express";
import Event from "../models/event";

const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, start } = req.body;

    const newEvent = await Event.create({
      name: title,
      created_at: start,
    });
    return res.status(200).send({
      status: "success",
      message: "Created Event",
      createdItem: newEvent,
    });
  } catch (error) {
    return res.status(412).send({
      status: "error",
      message: "Error creating Event",
      error: error,
    });
  }
};

const getEvents = async (req: Request, res: Response, next: NextFunction) => {
  const results = await Event.find({});

  try {
    return res.status(200).send({
      status: "success",
      model: "Events",
      events: results,
    });
  } catch (error) {
    return res.status(412).send({
      status: "error",
      model: "Events",
      error: error,
    });
  }
};

export default { getEvents, createEvent };

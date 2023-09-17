import { Request, Response, NextFunction, Router } from "express";
import { EmailService } from "../services";

const router = Router();

router.get("/test", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await EmailService.newOrderEmail({
      orderId: "testing-order010101",
      email: "codexmaker12@gmail.com",
      amount: "3000",
      currency: "MXN",
      products: [],
    });
    return res.status(200).send({
      status: "success",
      model: "Email sent",
    });
  } catch (error) {
    return res.status(412).send({
      status: "error",
      model: "Email error",
      error: error,
    });
  }
});

export default router;

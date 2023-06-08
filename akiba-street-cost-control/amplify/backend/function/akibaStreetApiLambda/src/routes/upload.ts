import * as express from "express";
import * as multer from "multer";
import UploadController from "../controllers/upload.controller";
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();

router.post("/", upload.single("image"), UploadController.uploadData);

export default router;

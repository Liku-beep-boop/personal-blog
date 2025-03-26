import express from "express";
import blogController from "../controller/blogController.js";

const router = express.Router();

router.get("/home", blogController.home);
router.get("/blog/:id", blogController.getBlogById);

export default router;
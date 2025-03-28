import express from "express";
import blogController from "../controller/blogController.js";

const router = express.Router();

router.get("/home", blogController.home);
router.get("/blog/:id", blogController.getBlogById);

router.get("/admin", blogController.getDashboard)
router.get("/edit/:id")
router.put("/edit/:id")
router.get("/new", blogController.getNewBlog)
router.post("/new", blogController.newBlog)

export default router;
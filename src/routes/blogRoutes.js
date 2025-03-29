import express from "express";
import blogController from "../controller/blogController.js";
import { BlockList } from "net";


const router = express.Router();

router.get("/", blogController.home);
router.get("/blog/:id", blogController.getBlogById);

router.get("/admin", blogController.getDashboard)

router.get("/new", blogController.getNewBlog)
router.post("/new", blogController.newBlog)

router.get("/edit/:id", blogController.getEditBlog)
router.put("/edit/:id", blogController.editBlog)

router.delete("/delete/:id", blogController.destroyBlog)

export default router;
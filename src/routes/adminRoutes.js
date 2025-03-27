import express from "express";
import adminController from "../controller/adminController.js";

const router = express.Router();

router.get("/login", adminController.login);
router.post("/login", adminController.auth);

router.get("/register", adminController.register);
router.post("/register", adminController.create);

router.get("/logout", adminController.logout);

export default router;
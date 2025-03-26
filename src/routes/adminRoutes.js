import express from "express";
import adminController from "../controller/adminController.js";

const router = express.Router();

router.get("/login", adminController.login);
router.post("/login", adminController.auth);
router.post("/register", adminController.registerUser);
router.get("/register", adminController.register);
router.get("/logout", adminController.logout);

export default router;
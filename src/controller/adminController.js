import adminService from "../service/adminService.js";
import bodyParser from "body-parser";

const adminController = {
    login: async (req, res) => {
        res.render("admin/login");
    },
    register: async (req, res) => {
        res.render("admin/register");
    },
    registerUser: async (req, res) => {
        const user = req.body;
        const newAdmin = adminService.register(user);
        console.log(newAdmin)
        if (newAdmin) {
            res.redirect("/admin/login");
        } else {
            res.render("admin/register", { error: "Registration failed" });
        }
    },
    auth: (req, res) => {
        const user = req.body;
        const admin = adminService.auth(user);
        if (admin) {
            req.session.admin = admin;
            res.render("admin/dashboard", { admin });
        } else {
            res.render("admin/login", { error: "Invalid username or password" });
        }
    },
    logout: (req, res) => {
        adminService.logout(req, res);
    },
}
export default adminController;
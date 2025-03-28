import adminService from "../service/adminService.js";
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const adminController = {
    login: async (req, res) => {
        const token = req.cookies.access_token
        if(!token){
            return res.render("admin/adminLogin");
        } return res.redirect("/admin")
        
    },
    auth: async (req, res) => {
        const user = req.body;
        try {
            const admin = adminService.login(user);

            const token = jwt.sign({ 
                id: admin._id, 
                username: admin.username 
                }, 
                process.env.SECRET_JWT_KEY,
                {
                    expiresIn: '1h'
                }
            )

            if (admin) {
                res
                    .cookie('access_token', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV == 'production',
                        sameSite: 'strict',
                        maxAge: 1000 * 60 * 60
                    })
                    .redirect("/admin");
            } else {
                res.render("admin/adminLogin", { error: "Invalid username or password" });
            }
        } catch (error) {
            res.status(401).send(error.message)
        }
    },
    register: async (req, res) => {
        res.render("admin/adminRegister");
    },
    create: async (req, res) => {
        try {

            const user = { 
                username: req.body.username, 
                password: req.body.password
            };

            const newAdmin = adminService.create(user);

            if (newAdmin) {
                res.redirect("/home");
            } else {
                res.render("admin/adminregister", { error: "Registration failed" });
            }

        } catch (error) {
            res.status(401).send(error.message)
        }
    },
    logout: (req, res) => {
        adminService.logout(req, res);
    },
    
}
export default adminController;
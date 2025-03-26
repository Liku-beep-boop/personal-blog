import fs from 'fs';
import bcrypt from 'bcryptjs';
import { get } from 'http';
import { log } from 'console';

const adminService = {
    register: (user) => {
        const { username, password } = user;
        const hashedPassword = bcrypt.hashSync(password, 8);
        const adminData = JSON.parse(fs.readFileSync('./src/data/users.json', 'utf-8'));
        const newAdmin = { username, password: hashedPassword };
        adminData.push(newAdmin);
        fs.writeFileSync('./src/data/users.json', JSON.stringify(adminData), 'utf-8');
        return newAdmin;
    },
    auth: (user) => {
        const { username, password } = user;
        const adminData = JSON.parse(fs.readFileSync('./src/data/users.json', 'utf-8'));
        const admin = adminData.find(admin => admin.username === username);
        console.log(admin)
        if (!admin) {
            return false;
        }
        const isPasswordValid = bcrypt.compareSync(password, admin.password);
        console.log(isPasswordValid)
        return isPasswordValid ? admin : false;
    },
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return console.log(err);
            }
            res.redirect('/admin/login');
        });
    },
};
export default adminService;
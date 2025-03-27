import fs from 'fs';
import crypto from 'crypto'
import bcrypt from 'bcryptjs';
import { Validation } from '../middleware/user-validation.js';


const adminService = {
    create: (user) => {
        const { username, password } = user;

        Validation.username(username)
        Validation.password(password)

        const id = crypto.randomUUID()
        const hashedPassword = bcrypt.hashSync(password, 8);

        const newAdmin = {
            _id: id,
            username, 
            password: hashedPassword 
        };

        const adminData = JSON.parse(fs.readFileSync('./src/data/users.json', 'utf-8'));

        adminData.push(newAdmin);
        fs.writeFileSync('./src/data/users.json', JSON.stringify(adminData), 'utf-8');
        return id;
    },
    login: (user) => {
        const { username, password } = user;

        const adminData = JSON.parse(fs.readFileSync('./src/data/users.json', 'utf-8'));
        const admin = adminData.find(admin => admin.username === username);

        if (!admin) {
            return false;
        }

        const isPasswordValid = bcrypt.compareSync(password, admin.password);
        return isPasswordValid ? admin : false;
    },
    logout: (req, res) => {
        res
            .clearCookie('access_token')
            .redirect('/admin/login')
    },
};
export default adminService;
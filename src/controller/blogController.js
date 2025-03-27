import blogService from "../service/blogService.js";
import jwt from 'jsonwebtoken'

const blogController = {
    getAllBlogs: async (req, res) => {
        const blogs = blogService.getAllBlogs();
        if (!blogs) {
            return res.status(404).json({ message: "No blogs found" });
        }
        res.status(200).json(blogs);
    },
    home: async (req, res) => {
        try {
            const blogs = await blogService.getAllBlogs();
            if (!blogs) {
                return res.status(404).json({ message: "No blogs found" });
            }
            res.render("home", { articles:blogs });
        } catch (error) {
            
        }
    },
    getBlogById: async (req, res) => {
        const id = req.params.id;
        const blog = await blogService.getBlogById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.render("article", { article: blog });
    },
    getDashboard: async(req, res) =>{
        const token = req.cookies.access_token
        if(!token){
            return res.status(403).send('Access not authorized')
        }   
        
        try {
            const data = jwt.verify(token, process.env.SECRET_JWT_KEY)
            res.render('admin/dashboard', {data})
        } catch (error) {
            return res.status(401).send('Access not authorized')
        }
    }
}
export default blogController;
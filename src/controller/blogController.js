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
            res.render("home", { articles: blogs });
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
    getDashboard: async (req, res) => {
        const token = req.cookies.access_token
        if (!token) {
            return res.status(403).send('Access not authorized')
        }

        const blogs = await blogService.getAllBlogs();
        try {
            const data = jwt.verify(token, process.env.SECRET_JWT_KEY)
            res.render('admin/dashboard', { data, articles: blogs })
        } catch (error) {
            return res.status(401).send('Access not authorized')
        }
    },
    getNewBlog: async (req, res) => {
        const token = req.cookies.access_token
        if (!token) {
            return res.status(403).send('Access not authorized')
        }
        res.render("newBlog");
    },
    newBlog: async (req, res) => {
        const token = req.cookies.access_token
        if (!token) {
            return res.status(403).send('Access not authorized')
        }
        const blogs = blogService.getAllBlogs();
        const Blog = req.body
        const newBLog = await blogService.newBlog(Blog)
        return res.redirect('/blog/' + newBLog.id)
    },
    getEditBlog: async (req, res) => {
        const token = req.cookies.access_token
        if (!token) {
            return res.status(403).send('Access not authorized')
        }
        const id = req.params.id;
        const blog = await blogService.getBlogById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.render("editBlog", { article: blog });
    },
    editBlog: (req, res) => {
        const token = req.cookies.access_token
        if (!token) {
            return res.status(403).send('Access not authorized')
        }
        try {
            const id = req.params.id;
            const existingBlog = blogService.getBlogById(id);
            if (!existingBlog) {
                return res.status(404).json({ message: "Blog not found" });
            }

            const { title, content } = req.body;
            const updatedBlog = blogService.edit(id, { title, content });

            if (updatedBlog) {
                res.redirect('/admin/');
            } else {
                res.status(500).json({ message: "Error updating the blog" });
            }
        } catch (error) {
            return res.status(401).send('Access not authorized')
        }
    },
    destroyBlog: async (req, res) => {
        const token = req.cookies.access_token
        if (!token) {
            return res.status(403).send('Access not authorized')
        }
        try {
            const id = req.params.id;
            const deletedBlog = blogService.delete(id);
            if (!deletedBlog) {
                return res.status(404).json({ message: "Blog not found" });
            }

            res.redirect('/admin/');  
        } catch (error) {
            return res.status(500).json({ message: "Error deleting the blog" });
        }
    }
}
export default blogController;
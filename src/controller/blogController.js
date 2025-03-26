import blogService from "../service/blogService.js";

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
}
export default blogController;
import fs from 'fs';
import { get } from 'http';
import bcrypt from 'bcryptjs';

const readData = () => {
  try {
    const data = fs.readFileSync("src/data/blogs.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
}

const blogService = {
  getAllBlogs: () => {
    const blogs = readData();
    return blogs;
  },
  getBlogById: (id) => {
    const blogs = readData();
    const blog = blogs.find((blog) => blog.id == id);
    if (!blog) return null;
    return blog;
  },
  newBlog: async (blog) =>{
    const blogs = readData();
    const id = blogs.length > 0 ? Math.max(...blogs.map(blog => blog.id)) + 1 : 1;
    const newBlog = {
      id: id,
      title: blog.title,
      content: blog.content,
      created_at: new Date()
    }
    blogs.push(newBlog);
    fs.writeFileSync("src/data/blogs.json", JSON.stringify(blogs), 'utf-8');
    return newBlog;
  }
}

export default blogService;
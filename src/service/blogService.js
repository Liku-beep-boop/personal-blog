import fs from 'fs';
import { get } from 'http';

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
}

export default blogService;
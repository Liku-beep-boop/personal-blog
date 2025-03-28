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

const writeData = (blogs) => {
  try {
    fs.writeFileSync("src/data/blogs.json", JSON.stringify(blogs, null, 2), 'utf-8');
  } catch (error) {
    console.error("Error writing file:", error);
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
  newBlog: async (blog) => {
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
  },
  edit: (id, updatedBlog) => {
    const blogs = readData();
    const index = blogs.findIndex((blog) => blog.id == id);
    if (index === -1) return null;

    blogs[index] = { ...blogs[index], ...updatedBlog, updated_at: new Date() };
    writeData(blogs);
    return blogs[index];
  },
  delete: (id) => {
    const blogs = readData();
    const index = blogs.findIndex((blog) => blog.id == id);
    if (index === -1) return null;

    const deletedBlog = blogs.splice(index, 1)[0];
    writeData(blogs);
    return deletedBlog;
  }
}

export default blogService;
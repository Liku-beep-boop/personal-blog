import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import blogRoutes from './src/routes/blogRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import session from 'express-session';
import methodOverride from "method-override";
import dotenv from "dotenv";
import bodyparser from "body-parser";
dotenv.config();

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src/views'));
/* app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
  })
); */

const PORT = process.env.PORT || 3000;

//  routes
app.use('/', blogRoutes);
app.use('/admin', adminRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
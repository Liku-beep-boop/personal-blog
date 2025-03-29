# Personal Blog

This is a personal blog project based on the guide from [roadmap.sh](https://roadmap.sh/projects/personal-blog). It uses Node.js and Express as the backend framework, along with other tools for authentication management and dynamic views.
[Deploy](https://personal-blog-k4rp.onrender.com)

## Technologies and Dependencies

- **Node.js**: JavaScript runtime environment.
- **Express**: Framework for building web applications.
- **EJS**: Template engine for rendering dynamic views.
- **bcryptjs**: For password encryption.
- **jsonwebtoken**: For token-based authentication.
- **dotenv**: For managing environment variables.
- **method-override**: For supporting HTTP methods like PUT and DELETE.

## Installation

1. Clone this repository:
   ```sh
   git clone https://github.com/Liku-beep-boop/personal-blog.git 
   ```
2. Navigate to the project directory:
   ```sh
   cd personal-blog
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file in the project root and define the necessary variables, for example:
   ```env
   PORT=3000
   SECRET_KEY=your_secret_key
   ```

## Usage

1. Start the server:
   ```sh
   npm start
   ```
2. Access the application in your browser:
   ```sh
   http://localhost:3000
   ```

## Features

- Create, edit, and delete blog posts.
- Authentication system with JSON Web Tokens (JWT).
- Dynamic interface using EJS.
- Support for extended HTTP methods (PUT and DELETE).


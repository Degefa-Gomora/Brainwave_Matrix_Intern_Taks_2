-----

# E-Blog App

E-Blog is a simple and intuitive web application for creating, sharing, and discovering blog posts. It provides a clean interface for users to express their ideas and connect with others.

## Features

  * **Interactive Banner Video:** The homepage features a dynamic video banner that plays based on user mouse movement, creating an engaging and modern first impression.
  * **User Authentication:** Secure sign-up and log-in functionality for personalized user accounts.
  * **Create Posts:** Write and publish new blog posts with a title, content, and optional images.
  * **Read & Discover:** Browse a feed of recent blog posts from other users.
  * **User Profiles:** View a user's profile to see all their published posts.
  * **Edit & Delete:** Users can easily update or remove their own posts.
  * **Search Functionality:** Find specific posts or users using a search bar.
  * **Password Reset:** Add a "forgot password" feature with email verification for better account security.
  * **Pagination and Infinite Scrolling:** For better performance and user experience, instead of loading all posts at once, you could add pagination or infinite scrolling to the main feed.
  * **Categories and Tags:** Add a tagging and categorization system to organize posts. This makes content easier to find and allows users to browse by specific topics. .
  * **Rich Text Editor:** Upgrade the post creation page to include a more advanced editor. This could offer features like embedded videos, code blocks, tables, and better image handling, giving authors more creative control.
  * **Image Optimization:** Implement a process to compress and optimize images as they are uploaded. This will improve site performance and load times.
  * **Comments and Replies:** Enable users to leave comments on posts and reply to other comments. This would foster a sense of community and direct engagement with content.
  * **Likes and Reactions:** Implement a system for users to 'like' or react to posts and comments. This provides quick feedback and helps popular content stand out.
  * **Bookmarks/Saved Posts:** Give users the ability to save posts they want to read later. This is great for managing content and returning to interesting articles.

## Technologies Used

  * **Frontend:**
      * **HTML5, CSS3, JavaScript:** Core web technologies for structure, styling, and interactivity.
      * **React:** A JavaScript library for building the user interface.
      * **React Router:** Used for handling navigation and routing within the single-page application.
      * **Axios:** A promise-based HTTP client for making API requests to the backend.
  * **Backend:**
      * **Node.js:** A JavaScript runtime for the server-side logic.
      * **Express:** A web application framework for building REST APIs.
      * **MongoDB:** A NoSQL database for storing user and post data.
      * **Multer:** Node.js middleware used for handling multipart/form-data, which is essential for file uploads (e.g., images for blog posts).
      * **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js, which simplifies database interactions.
      * **Bcrypt:** A library used to hash user passwords, ensuring they are stored securely.
  * **Other:**
      * **JWT (JSON Web Tokens):** For secure user authentication.
      * **RESTful API:** For communication between the frontend and backend.

## Installation

### Prerequisites

  * **Node.js:** Make sure you have Node.js and npm installed on your system.
  * **MongoDB:** You'll need a running MongoDB instance. You can set up a local one or use a cloud service like MongoDB Atlas.

### Steps

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/eblog-app.git
    cd eblog-app
    ```

2.  **Install frontend dependencies:**

    ```bash
    cd frontend
    npm install
    ```

3.  **Install backend dependencies:**

    ```bash
    cd ../backend
    npm install
    ```

4.  **Configure environment variables:**

      * Create a `.env` file in the `backend` directory.
      * Add the following variables, replacing the placeholder values:
        ```
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=a_strong_secret_key
        PORT=5000
        ```

5.  **Run the application:**

      * Start the backend server:
        ```bash
        cd backend
        npm start
        ```
      * In a new terminal, start the frontend development server:
        ```bash
        cd frontend
        npm start
        ```

The application should now be running on `http://localhost:3000`.

## API Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/auth/register` | `POST` | Registers a new user. |
| `/api/auth/login` | `POST` | Logs in a user. |
| `/api/posts` | `GET` | Retrieves all blog posts. |
| `/api/posts` | `POST` | Creates a new blog post. |
| `/api/posts/:id` | `GET` | Retrieves a single post by ID. |
| `/api/posts/:id` | `PUT` | Updates a post. |
| `/api/posts/:id` | `DELETE` | Deletes a post. |
| `/api/users/:id` | `GET` | Retrieves a user's profile. |

## Contributing

We welcome contributions\! If you'd like to improve the E-Blog app, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'feat: add amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

-----


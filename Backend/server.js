// const express = require("express")
// const dotenv = require("dotenv")
// const cors = require("cors")
// const path = require("path")

// const IndexRoute = require("./Routers/index")
// const connectDatabase = require("./Helpers/database/connectDatabase")
// const customErrorHandler = require("./Middlewares/Errors/customErrorHandler")

// dotenv.config({
//     path:  './Config/config.env'
// })

// connectDatabase()

// const app = express() ;

// app.use(express.json())
// app.use(cors())

// app.use("/",IndexRoute)

// app.use(customErrorHandler)

// const PORT = process.env.PORT || 5000 ;

// app.use(express.static(path.join(__dirname , "public") ))

// const server = app.listen(PORT,()=>{

//     console.log(`Server running on port  ${PORT} : ${process.env.NODE_ENV}`)

// })

// process.on("unhandledRejection",(err , promise) =>{
//     console.log(`Logged Error : ${err}`)

//     server.close(()=>process.exit(1))
// })




// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const path = require("path");

// const IndexRoute = require("./Routers/index");
// const connectDatabase = require("./Helpers/database/connectDatabase");
// const customErrorHandler = require("./Middlewares/Errors/customErrorHandler");

// dotenv.config({
//   path: "./Config/config.env",
// });

// // Connect to database
// connectDatabase();

// const app = express();

// // Body parser
// app.use(express.json());

// // CORS setup - allow your frontend domain
// const allowedOrigins = ["https://eblog.degefagomora.com", "http://localhost:3000"];
// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//   })
// );

// // API Routes
// app.use("/api", IndexRoute); // optional: prefix API routes with /api

// // Serve static React build
// app.use(express.static(path.join(__dirname, "client/build")));

// // Serve React for any unknown route (React Router)
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build", "index.html"));
// });

// // Custom error handler middleware
// app.use(customErrorHandler);

// const PORT = process.env.PORT || 5000;

// const server = app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT} : ${process.env.NODE_ENV}`);
// });

// // Handle unhandled promise rejections
// process.on("unhandledRejection", (err, promise) => {
//   console.log(`Logged Error : ${err}`);
//   server.close(() => process.exit(1));
// });


const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const IndexRoute = require("./Routers/index");
const connectDatabase = require("./Helpers/database/connectDatabase");
const customErrorHandler = require("./Middlewares/Errors/customErrorHandler");

dotenv.config({
  path: "./Config/config.env",
});

// Connect to database
connectDatabase();

const app = express();

// Body parser
app.use(express.json());

// --- CORS Setup ---
const allowedOrigins = [
  "https://eblog.degefagomora.com",
  "http://localhost:3000",
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin like Postman or mobile apps
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg =
        "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true, // allow cookies/auth headers
};

app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options("*", cors(corsOptions));

// --- API Routes ---
app.use("/api", IndexRoute);

// --- Serve static React build ---
app.use(express.static(path.join(__dirname, "client/build")));

// Serve React app for any unknown route (React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// --- Custom error handler middleware ---
app.use(customErrorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} : ${process.env.NODE_ENV}`);
});

// --- Handle unhandled promise rejections ---
process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error : ${err}`);
  server.close(() => process.exit(1));
});

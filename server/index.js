import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan"
import path from "path";
import { fileURLToPath } from "url";

/* CONFIGURATIONS */

// Get the filename and dirname using Node.js ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from a .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware
// Parse incoming JSON requests
app.use(express.json());

// Enhance your app security with HTTP headers
app.use(helmet());

app.use(helmet.crossOriginResourcePolicy({ policy : "cross-origin"}));




// Use Morgan middleware for logging HTTP requests in 'common' format
app.use(morgan("common"));

// Use bodyParser middleware to parse incoming JSON requests with specified limits
app.use(bodyParser.json({ limit: "30mb", extended: true }));

// Use bodyParser middleware to parse incoming URL-encoded requests with specified limits
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// CORS (Cross-Origin Resource Sharing) middleware for handling Cross-Origin requests
app.use(cors());

// Serve static files from the 'public/assets' directory under the '/assets' route
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

// /* FILE STORAGE - file upload storage location */


// // Multer disk storage configuration
const storage = multer.diskStorage({
    // Set the destination for storing uploaded files
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    // Set the filename for storing uploaded files
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Multer setup - using previously defined disk storage
const upload = multer({ storage });

/* MOONGOOSE SETUP */

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URL, {
   // useNewUrlParser: true,
    //useUnifiedTopology: true,
})
    .then(() => {
        // If the connection is successful, set up the Express app to listen on a specified port
        const PORT = process.env.PORT || 6001;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        // If there's an error connecting to MongoDB, log the error
        console.log(`${error} did not connect`);
    });


























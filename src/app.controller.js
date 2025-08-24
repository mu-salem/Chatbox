
import connectDB from "./DB/connection.js";
import globalErrorHandler from "./utils/error handling/globalErrorHandler.js";
import notFoundHandler from "./utils/error handling/notFoundHandler.js";
import morgan from "morgan";

const bootstrap = async (app, express) => {
  // Connect to database
  await connectDB();
  app.use(express.json());

  // Use Morgan middleware for logging HTTP requests in the "dev" format
  app.use(morgan("dev"));

  // Serve static files from the "uploads" directory when accessing the "/uploads" route
  app.use("/uploads", express.static("uploads"));

  // Routes


  // Handle all undefined routes with a custom "not found" handler
  app.all("*", notFoundHandler);

  // Use a global error handler for centralized error management
  app.use(globalErrorHandler);
};

export default bootstrap;
    

import connectDB from "./DB/connection.js";
import globalErrorHandler from "./utils/error handling/globalErrorHandler.js";
import notFoundHandler from "./utils/error handling/notFoundHandler.js";
import authRouter from "./modules/auth/auth.controller.js";
import userRouter from "./modules/user/user.controller.js";
import chatRouter from "./modules/chat/chat.controller.js";
import groupRouter from "./modules/group/group.controller.js";
import messageRouter from "./modules/message/message.controller.js";
import storyRouter from "./modules/story/story.controller.js";
import mediaRouter from "./modules/media/media.controller.js";
import notificationRouter from "./modules/notification/notification.controller.js";
import callRouter from "./modules/Call/call.controller.js";
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
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/chats", chatRouter);
  app.use("/groups", groupRouter);
  app.use("/messages", messageRouter);
  app.use("/stories", storyRouter);
  app.use("/media", mediaRouter);
  app.use("/notifications", notificationRouter);
  app.use("/calls", callRouter);

  // Handle all undefined routes with a custom "not found" handler
  app.all("*", notFoundHandler);

  // Use a global error handler for centralized error management
  app.use(globalErrorHandler);
};

export default bootstrap;
    
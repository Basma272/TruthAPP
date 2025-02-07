import connectDB from "./DB/connection.js";
import authcontroller from "./modules/auth/auth.controller.js";
import profilecontrolle from "./modules/users/user.controller.js";
import { GlopalErrorHanling } from "./utils/errorHandling.js";
import messageControle from "./modules/message/message.control.js"

const bootstrap = (app, express) => {
    // Middleware to parse JSON requests
    app.use(express.json());

    // Default route
    app.get("/", (req, res, next) => {
        res.send("Hello World");
    });

    // Routes
    app.use("/auth", authcontroller);
    app.use("/user", profilecontrolle);
    app.use("/message", messageControle);


    // Global error handling middleware
    app.use(GlopalErrorHanling);

    // Handle unknown routes
    app.all("*", (req, res, next) => {
        return res.status(404).json({ message: "page not found" });
    });

    // Connect to the database
    connectDB();
};

export default bootstrap;
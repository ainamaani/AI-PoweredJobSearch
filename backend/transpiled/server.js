"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JobRoutes_1 = __importDefault(require("./routes/JobRoutes"));
const ProfileRoutes_1 = __importDefault(require("./routes/ProfileRoutes"));
const ApplicationRoutes_1 = __importDefault(require("./routes/ApplicationRoutes"));
// set up an express application
const app = (0, express_1.default)();
//middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.use((req, res, next) => {
    console.log(req.body, req.path, req.method);
    next();
});
// Check if dbURI is defined in the environment variables
const dbURI = process.env.dbURI;
if (!dbURI) {
    console.error("Database URI is not set. Please check your environment variables.");
    process.exit(1); // Exit the process, indicating an error
}
//routes
app.use('/api/jobs', JobRoutes_1.default);
app.use('/api/profiles', ProfileRoutes_1.default);
app.use('/api/applications', ApplicationRoutes_1.default);
// connect to the database
mongoose_1.default.connect(dbURI)
    .then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Connected to the database...");
    });
})
    .catch((error) => {
    console.log(error);
});

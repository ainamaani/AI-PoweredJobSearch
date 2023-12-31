import mongoose from "mongoose";
import dotenv from "dotenv";

export default (app: { listen: (arg0: string | undefined, arg1: () => void) => void; }) => {
    dotenv.config();

    // Check if dbURI is defined in the environment variables
    const { dbURI } = process.env;

    if (!dbURI) {
        console.error("Database URI is not set. Please check your environment variables.");
        process.exit(1); // Exit the process, indicating an error
    }

    // connect to the database
    mongoose.connect(dbURI)
        .then(() => {
            app.listen(process.env.PORT, () => {
                console.log("Connected to the database...");
            })
        })
        .catch((error: any) => {
            console.log(error)
        });
};
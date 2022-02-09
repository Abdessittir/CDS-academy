import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import DB from "./models/index.js";
import authRouter from "./routes/auth.routes.js";
import classRouter from "./routes/class.routes.js";
import teacherRouter from "./routes/teacher.routes.js";
import fileRouter from "./routes/file.routes.js";
import cors from "cors"

const APP = express();

const options = {
    "Access-Control-Allow-Origin": 'https://localhost:3000',
}
APP.use(cors(options));
APP.use(express.json());
APP.use(cookieParser());
APP.use(bodyParser.urlencoded({ extended: true }));
APP.use(bodyParser.json());

dotenv.config();

// connection to the DB
DB.mongoose.connect(process.env.CONNECTION_URL)
.then(() => {
    console.log("Connected to the DB seccussfully!!");
})
.catch(err => {
    console.log("Error while connecting to the db", err);
    process.exit();
});

APP.use("/api", authRouter);
APP.use("/api", teacherRouter);
APP.use("/api", classRouter);
APP.use("/files", fileRouter);

const port = process.env.PORT ?? 8080;
APP.listen(port , () => {
    console.log("server listening on port ", port);
});
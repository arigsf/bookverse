import express, { Express } from "express";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import UserRouter from "../src/domains/User/router/router";
import cookieParser from "cookie-parser";

dotenv.config();

export const app: Express = express();

const options: CorsOptions = {
    credentials: true,
    origin: process.env.APP_URL,
};

app.use(cors(options));
app.use(express.json());
app.use(cookieParser());
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use("/api/user", UserRouter);
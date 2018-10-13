import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { QueryRoutes, TableRoutes } from "./routes";
import { Connect } from "./models";

import { PortNumber, Cors } from "./config";

Connect();

const app: express.Application = express();

app.use(bodyParser.json());

if(Cors.enabled) {
    app.use(cors());
} else if (Cors.whitelist) {
    const whitelist: string[] = Cors.whitelist || [];
    const corsOptions = {
        origin: (origin: string, callback: Function) => {
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        }
    };
}

app.use("/table/", TableRoutes);
app.use("/query/", QueryRoutes);

app.listen(PortNumber, () => console.log(PortNumber));
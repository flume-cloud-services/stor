import express from "express";
import bodyParser from "body-parser";

import { QueryRoutes, TableRoutes } from "./routes";
import { Connect } from "./models";

import { PortNumber } from "./config";

Connect();

const app: express.Application = express();

app.use(bodyParser.json())

app.use("/table/", TableRoutes);
app.use("/query/", QueryRoutes);

app.listen(PortNumber, () => console.log(PortNumber))
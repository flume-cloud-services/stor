import express from "express";
import bodyParser from "body-parser";

import { DatabaseController, QueryController } from "./controllers";
import { Connect } from "./models";

import { PortNumber } from "./config";

Connect();

const app: express.Application = express();

app.use(bodyParser.json())

app.use("/database", DatabaseController);
app.use("/query/", QueryController);

app.listen(PortNumber, () => console.log(PortNumber))
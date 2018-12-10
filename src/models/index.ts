import { connect } from "mongoose";
import { MongoError } from "mongodb";

import { MongoUri } from "../config";

const connection :VoidFunction = () => {
    connect(MongoUri, { useNewUrlParser: true }, (err :MongoError) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Connected to mongodb");
        }
    });
};

export const Connect :VoidFunction = connection;

export * from "./table.model";
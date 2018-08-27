import { Schema, Model, model } from "mongoose";

const TableSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
});

const TableModel: Model<any> = model("table", TableSchema);

export const Table: Model<any> = TableModel;

export interface ITable {
    name: string;
    content: string;
    password: string;
    save: Function;
}
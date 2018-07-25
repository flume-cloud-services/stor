import { Schema, Model, model } from "mongoose";

const DatabaseSchema :Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    }
});

DatabaseSchema.methods.TableWhere = () => {
    //
};

const DatabaseModel :Model<any> = model("database", DatabaseSchema);

export const Database :Model<any> = DatabaseModel;

export interface IDatabase {
    name :string,
    content :string,
    password :string,
    save: Function
}
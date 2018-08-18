import { IRoute, Router, Handler } from "express";
import { Table, ITable } from "../models";
import { AuthToken } from "../config";
import * as crypto from "crypto";
import { Request, Response, NextFunction } from "express-serve-static-core";

const router :Router = Router();

const tablePost :Handler = (req :Request, res :Response, next :NextFunction) => {
    if (req.get("Authorization") == AuthToken ) {
        if (req.body.name && req.body.content) {
            Table.find({name: req.body.name}, (err: any, raw: any[]) => {
                if (raw[0]) {
                    res.send("Database already exists");
                } else {
                    if (req.body.password) {
                        console.log("ping");
                        let database :ITable = new Table();
                        database.name = req.body.name;
                        database.content = JSON.stringify(req.body.content);
                        database.password = crypto.createHash("sha256").update(req.body.password).digest("base64");
                        database.save()
                        res.send(database.name + " created with " + database.content)
                    } else {
                        let database :ITable = new Table();
                        database.name = req.body.name;
                        database.content = JSON.stringify(req.body.content);
                        database.save();
                        res.send(database.name + " created with " + database.content)
                    }
                }
            });
        } else {
            res.send("Not enough parameters (name, content, ?password");
        }
    } else {
        res.send("Wrong Authorization token");
    }
};

const tableByNameGet :Handler = (req :Request, res :Response, next :NextFunction) => {
    if (req.get("Authorization") == AuthToken ) {
        Table.find({name: req.params.name}, (err: any, raw: any[]) => {
            if (raw[0]) {
                if (raw[0].password != null) {
                    if (req.get("Password")) {
                        const password :string = req.get("Password") || "";
                        if (raw[0].password == crypto.createHash("sha256").update(password).digest("base64")) {
                            res.send(raw[0]);
                        }
                    } else {
                        res.send("You have to give a password in the header (\"Password:<yourpassword>\")");
                    }
                } else {
                    res.send(raw[0]);
                }
            } else {
                res.send("Database doesn't exits");
            }
        });
    } else {
        res.send("Wrong Authorization token");
    }
};

export const tablePostFunc :Handler = tablePost;
export const tableByNameGetFunc :Handler = tableByNameGet;
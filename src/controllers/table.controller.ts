import { IRoute, Router, Handler } from "express";
import { Table, ITable } from "../models";
import { AuthToken } from "../config";
import * as crypto from "crypto";
import { Request, Response, NextFunction } from "express-serve-static-core";

const router :Router = Router();

const tablePost :Handler = (req :Request, res :Response, next :NextFunction) => {
    if (req.get("Authentification") == AuthToken ) {
        if (req.body.name && req.body.content) {
            Table.find({name: req.body.name}, (err: any, Mres: any[]) => {
                if (Mres[0]) {
                    res.send("Database already exists");
                } else {
                    if (req.body.password) {
                        let database :ITable = new Table();
                        database.name = req.body.name;
                        database.content = req.body.content;
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
    }
};

const tableByNameGet :Handler = (req :Request, res :Response, next :NextFunction) => {
    if (req.get("Authentification") == AuthToken ) {
        Table.find({name: req.params.name}, (err: any, Mres: any[]) => {
            if (Mres[0]) {
                if (Mres[0].password != null) {
                    if (req.get("Password")) {
                        const password :string = req.get("Password") || "";
                        if (Mres[0].password == crypto.createHash("sha256").update(password).digest("base64")) {
                            res.send(Mres[0]);
                        }
                    } else {
                        res.send("You have to give a password in the header (\"Password:<yourpassword>\")");
                    }
                } else {
                    res.send(Mres[0]);
                }
            } else {
                res.send("Database doesn't exits");
            }
        });
    } else {
        res.send("Wrong Authentification token");
    }
};

export const tablePostFunc :Handler = tablePost;
export const tableByNameGetFunc :Handler = tableByNameGet;
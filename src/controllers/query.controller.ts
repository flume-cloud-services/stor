import { Router, IRoute, Handler } from "express";
import { Table } from "../models";
import { AuthToken } from "../config";
import * as crypto from "crypto";
import { NextFunction } from "connect";
import { Request, Response } from "express-serve-static-core";
import { Error } from "mongoose";

const router :Router = Router();


const selectAll :Handler = (req :Request, res :Response, next :NextFunction) => {
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

const whereGet :Handler = (req :Request, res :Response, next :NextFunction) => {
    if (req.get("Authentification") == AuthToken ) {
        Table.find({name: req.params.name}, (err :any, Mres :any[]) => {
            if (Mres[0]) {
                let state :number = 0;
                const content :any[] = JSON.parse(Mres[0].content);
                content.forEach((element: any) => {
                    if (element[req.params.obj] == req.params.is) {
                        res.send(element);
                        state = 1;
                    }
                });
                if (state != 1) {
                    res.send("No results found");
                }
            } else {
                res.send("Database doesn't exist");
            }
        });
    } else {
        res.send("Wrong Authentification token");
    }
};

const wherePut :Handler = (req :Request, res :Response, next :NextFunction) => {
    if (req.get("Authentification") == AuthToken) {
        Table.find({name: req.params.name}, (err :any, Mres :any[]) => {
            if (Mres[0]) {
                let state :number = 0;
                const content :any[] = JSON.parse(Mres[0].content);
                content.forEach((element :any) => {
                    if (element[req.params.obj] == req.params.is) {
                        element[req.params.obj] = req.body.content;
                        Table.update({name: req.params.name}, {content: JSON.stringify(content)}, (err :Error, raw :any) => {
                            if (err) throw err;
                            res.send(raw);
                        });
                        state = 1;
                    }
                });
                if (state != 1) {
                    res.send("No results found");
                }
            } else {
                res.send("Database doesn't exist");
            }
        });
    } else {
        res.send("Wrong Authentification Token");
    }
};

const whereDelete :Handler = (req :Request, res :Response, next :NextFunction) => {
    if (req.get("Authentification") == AuthToken) {
        Table.find({name: req.params.name}, (err :any, Mres :any[]) => {
            if (Mres[0]) {
                let state :number = 0;
                const content :any[] = JSON.parse(Mres[0].content);
                content.forEach((element :any) => {
                    if (element[req.params.obj] == req.params.is) {
                        content.splice(element);
                        Table.update({name: req.params.name}, {content: JSON.stringify(content)}, (err :Error, raw :any) => {
                            if (err) throw err;
                            res.send(raw);
                        });
                        state = 1;
                    }
                });
                if (state != 1) {
                    res.send("No results found");
                }
            } else {
                res.send("Database doesn't exist");
            }
        });
    } else {
        res.send("Wrong Authentification Token");
    }
};

export const selectAllFunc :Handler = selectAll;
export const whereGetFunc :Handler = whereGet;
export const wherePutFunc :Handler = wherePut;
export const whereDeleteFunc :Handler = whereDelete;
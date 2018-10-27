import { Router, IRoute, Handler } from "express";
import { Table } from "../models";
import { AuthToken } from "../config";
import * as crypto from "crypto";
import { NextFunction } from "connect";
import { Request, Response } from "express-serve-static-core";
import { Error } from "mongoose";

const router: Router = Router();

/**
 * @function selectAll - Select all handler 
 * @param req 
 * @param res 
 * @param next 
 */
const selectAll: Handler = (req: Request, res: Response, next: NextFunction) => {
    if (req.get("Authorization") == AuthToken ) {
        Table.find({name: req.params.name}, (err: any, raw: any[]) => {
            if (raw[0]) {
                if (raw[0].password != null) {
                    if (req.get("Password")) {
                        const password: string = req.get("Password") || "";
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

/**
 * @function whereGet - Get where handler
 * @param req 
 * @param res 
 * @param next 
 */
const whereGet: Handler = (req: Request, res: Response, next: NextFunction) => {
    if (req.get("Authorization") == AuthToken ) {
        Table.find({name: req.params.name}, (err: any, raw: any[]) => {
            if (raw[0]) {
                let state: number = 0;
                const content: any[] = JSON.parse(raw[0].content);
                const elements: any[] = [];
                content.forEach((element: any) => {
                    if (element[req.params.obj] == req.params.is) {
                        elements.push(element);
                        state = 1;
                    }
                });
                res.send(elements);
                if (state != 1) {
                    res.send("No results found");
                }
            } else {
                res.send("Database doesn't exist");
            }
        });
    } else {
        res.send("Wrong Authorization token");
    }
};

/**
 * @function wherePut - Put where handler
 * @param req 
 * @param res 
 * @param next 
 */
const wherePut: Handler = (req: Request, res: Response, next: NextFunction) => {
    if (req.get("Authorization") == AuthToken) {
        Table.find({name: req.params.name}, (err: any, raw: any[]) => {
            if (raw[0]) {
                let state: number = 0;
                const content: any[] = JSON.parse(raw[0].content);
                content.forEach((element: any) => {
                    if (element[req.params.obj] == req.params.is) {
                        element[req.params.obj] = req.body.content;
                        Table.update({name: req.params.name}, {content: JSON.stringify(content)}, (err: Error, raw: any) => {
                            if (err) { throw err; }
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
        res.send("Wrong Authorization Token");
    }
};

/**
 * @function whereDelete - Delete where Handler
 * @param req 
 * @param res 
 * @param next 
 */
const whereDelete: Handler = (req: Request, res: Response, next: NextFunction) => {
    if (req.get("Authorization") == AuthToken) {
        Table.find({name: req.params.name}, (err: any, raw: any[]) => {
            if (raw[0]) {
                let state: number = 0;
                const content: any[] = JSON.parse(raw[0].content);
                content.forEach((element: any) => {
                    if (element[req.params.obj] == req.params.is) {
                        content.splice(element);
                        Table.update({name: req.params.name}, {content: JSON.stringify(content)}, (err: Error, raw: any) => {
                            if (err) { throw err; }
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
        res.send("Wrong Authorization Token");
    }
};

/**
 * @function create - 'Create' handler
 * @param req 
 * @param res 
 * @param next 
 */
const create: Handler = (req: Request, res: Response, next: NextFunction) => {
    if (req.get("Authorization") == AuthToken) {
        Table.find({name: req.params.name}, (err: any, raw: any[]) => {
            if (raw[0]) {
                const content: any[] = JSON.parse(raw[0].content);
                content.push(req.body.content);
                Table.update({name: req.params.name}, {content: JSON.stringify(content)}, (err: Error, raw2: any) => {
                    if (err) { throw err; }
                    res.send(raw2);
                });
            } else {
                res.send("Database doesn't exist");
            }
        });
    } else {
        res.send("Wrong Authorization Token");
    }
};

export const selectAllFunc: Handler = selectAll;
export const whereGetFunc: Handler = whereGet;
export const wherePutFunc: Handler = wherePut;
export const whereDeleteFunc: Handler = whereDelete;
export const createFunc: Handler = create;

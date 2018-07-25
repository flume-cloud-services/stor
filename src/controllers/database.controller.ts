import { IRoute, Router } from "express";
import { Database, IDatabase } from "../models";
import * as crypto from "crypto";

const router :Router = Router();

const database :IRoute = router.route("/");
database.post((req, res, next) => {
    if (req.body.name && req.body.content) {
        Database.find({name: req.body.name}, (err: any, Mres: any[]) => {
            if (Mres[0]) {
                res.send("Database already exists");
            } else {
                if (req.body.password) {
                    let database :IDatabase = new Database();
                    database.name = req.body.name;
                    database.content = req.body.content;
                    database.password = crypto.createHash("sha256").update(req.body.password).digest("base64");
                    database.save()
                    res.send(database.name + " created with " + database.content)
                } else {
                    let database :IDatabase = new Database();
                    database.name = req.body.name;
                    database.content = req.body.content;
                    database.save();
                    res.send(database.name + " created with " + database.content)
                }
            }
        });
    } else {
        res.send("Not enough parameters (name, content, ?password");
    }
});

const databaseByName :IRoute = router.route("/:name/");
databaseByName.get((req, res, next) => {
    Database.find({name: req.params.name}, (err: any, Mres: any[]) => {
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
});

export const DatabaseController: Router = router;
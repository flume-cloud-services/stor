import { Router, IRoute } from "express";
import { Database } from "../models";
import { AuthToken } from "../config";
import * as crypto from "crypto";

const router :Router = Router();

const selectAll :IRoute = router.route("/all/:name/")
selectAll.get((req, res, next) => {
    if (req.get("Authentification") == AuthToken ) {
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
    } else {
        res.send("Wrong Authentification token");
    }
});

const where :IRoute = router.route("/:name/where/:obj/is/:is/");
where.get((req, res, next) => {
    if (req.get("Authentification") == AuthToken ) {
        Database.find({name: req.params.name}, (err :any, Mres :any[]) => {
            if (Mres[0]) {
                let state :number = 0;
                const content :any[] = JSON.parse(Mres[0].content);
                content.forEach(element => {
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
});

export const QueryController :Router = router;
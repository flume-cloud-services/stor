import { Router, IRoute } from "express";
import { tablePostFunc, tableByNameGetFunc } from "../controllers";

const router: Router = Router();

const table: IRoute = router.route("/");
table.post(tablePostFunc);

const tableByName: IRoute = router.route("/:name/");
tableByName.get(tableByNameGetFunc);

export const TableRoutes: Router = router;
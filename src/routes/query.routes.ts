import { Router, IRoute } from "express";
import { selectAllFunc, whereGetFunc, wherePutFunc } from "../controllers";

const router :Router = Router();

const selectAll :IRoute = router.route("/all/:name/");
selectAll.get(selectAllFunc);

const where :IRoute = router.route("/:name/where/:obj/is/:is/");
where.get(whereGetFunc);
where.put(wherePutFunc);

export const QueryRoutes :Router = router;
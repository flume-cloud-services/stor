import { Router, IRoute } from "express";
import { selectAllFunc, whereGetFunc, wherePutFunc, whereDeleteFunc, createFunc } from "../controllers";

const router: Router = Router();

const create: IRoute = router.route("/:name/create/");
create.post(createFunc);

const selectAll: IRoute = router.route("/:name/all/");
selectAll.get(selectAllFunc);

const where: IRoute = router.route("/:name/where/:obj/is/:is/");
where.get(whereGetFunc);
where.put(wherePutFunc);
where.delete(whereDeleteFunc);

export const QueryRoutes: Router = router;
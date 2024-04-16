import { Router } from "express";

const appRouter = Router();

appRouter.get("/test", (req, res) => {
  res.send("you found the test route");
});

appRouter.use("*", (req, res) => {
  res.send("app route not defined");
});

export default appRouter;

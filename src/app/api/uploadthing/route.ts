import { createRouteHandler } from "uploadthing/next";
import { fileRouter } from "./core";

export const { POST, GET } = createRouteHandler({
  router: fileRouter,
});

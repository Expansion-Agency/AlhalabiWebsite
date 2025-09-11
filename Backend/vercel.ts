import serverlessExpress from "@vendia/serverless-express";
import { ExpressAdapter } from "@nestjs/platform-express";
import * as express from "express";
import { createNestServer } from "./src/main";

let server: any;

export default async function handler(req, res) {
  if (!server) {
    const app = express();
    const adapter = new ExpressAdapter(app);
    const nestApp = await createNestServer(adapter);
    await nestApp.init();
    server = serverlessExpress({ app });
  }
  return server(req, res);
}
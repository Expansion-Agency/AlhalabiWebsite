import express from 'express';
import { config } from 'dotenv';
import  path from "path";
import cors from "cors";
import { logger } from "./src/utils/index.js";
import { ErrorHandlerClass } from "./src/utils/index.js";
import { globalResponse } from "./src/middlewares/index.js";
import database from './database/databaseConnection.js';
//import * as router from "./src/modules/index.js";

if(process.env.NODE_ENV === 'dev'){
    config({path: path.resolve('config/.dev.env')});
    logger.info("dev env loaded")
}
else if(process.env.NODE_ENV === 'prod'){
    config({path: path.resolve("config/.prod.env")});
    logger.info("prod env loaded");
}


const app = express()
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
// app.use("/user", router.userRouter);
// app.use("/categories", router.categoriesRouter);
// app.use("/products", router.productsRouter);
// app.use("/reviews", router.reviewsRouter);



app.use((req, res, next) => {
    return next(new ErrorHandlerClass(`Invalid URL : ${req.originalUrl}`,404,"Error in URL in index.js"))
})

app.use(globalResponse);

app.get('/', (req, res) => res.send('server running!'))

app.listen(port, () => logger.info(`server running on port ${port}`))
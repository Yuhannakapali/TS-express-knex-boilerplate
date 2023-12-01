import { Request, Response } from "express";

import express from "express";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
import {router} from './routes/index.router';
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(router)

const port = 3000
app.get("/", (_: Request, res: Response) => {
    res.send("This is hello from me!!");
})

app.listen(port, () => {
    console.log(`Server has been started at the port ${port}`);
})
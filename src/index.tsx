import express, { type Request, type Response } from "express";
import cors from "cors";
import authRouter from "../src/controllers/auth.controllers.ts";
import createTables from "./database/db.create.ts";
import createUsers from "./database/db.user.create.ts"

const app = express();

const PORT = process.env.PORT || 3000;

createTables;
createUsers;

app.use(cors())
app.use(express.json());
app.use('/api', authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Node.js + typescript API");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
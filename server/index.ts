// server/index.ts or src/server.ts
import express, { type Request, type Response } from "express";
import cors from "cors";
import path from "path";
import authRouter from "../src/controllers/auth.controllers.ts";
import initializeDatabase from "../src/database/db.create.ts";
import insertUsers from "../src/database/db.user.create.ts";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
}

app.use('/api', authRouter);

app.get("/api/health", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Node.js + TypeScript API", status: "healthy" });
});

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

async function startServer() {
  try {

    console.log('Initializing database...');
    initializeDatabase;
    insertUsers;
    console.log('Database initialized successfully');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
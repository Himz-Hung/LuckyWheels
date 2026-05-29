import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server running at port 3000");
});
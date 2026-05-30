import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import luckyItemRoute from "./routes/luckyItemRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/lucky-item",luckyItemRoute);

app.listen(3000, () => {
  console.log("Server running at port 3000");
});

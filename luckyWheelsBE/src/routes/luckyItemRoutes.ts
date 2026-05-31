// routes/luckyItemRoute.ts

import express from "express";

import {
  claimLuckyItem,
  createLuckyItem,
  getLuckyItems,
  spinLuckyItem,
} from "../controllers/luckyItemController";

const router = express.Router();

router.post("/create", createLuckyItem);
router.get("/", getLuckyItems);
router.post("/claim", claimLuckyItem);
router.post("/spin", spinLuckyItem);
export default router;

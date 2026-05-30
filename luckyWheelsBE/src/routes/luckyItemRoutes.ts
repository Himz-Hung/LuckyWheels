// routes/luckyItemRoute.ts

import express from "express";

import {
    claimLuckyItem,
  createLuckyItem,
  getLuckyItems,
} from "../controllers/luckyItemController";

const router = express.Router();

router.post("/create", createLuckyItem);
router.get("/", getLuckyItems);
router.post("/claim", claimLuckyItem);

export default router;

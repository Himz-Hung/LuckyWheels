// controllers/luckyItemController.ts

import { Request, Response } from "express";

import {
    claimLuckyItemService,
  createLuckyItemService,
  getLuckyItemsService,
} from "../services/luckyItemService";

export const createLuckyItem = async (req: Request, res: Response) => {
  try {
    const {
      id,
      wheelId,
      name,
      quantity,
      probability,
      cooldownSpin,
      img,
      isActive,
    } = req.body;

    if (!id || !wheelId || !name) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const result = await createLuckyItemService({
      id,
      wheelId,
      name,
      quantity,
      probability,
      cooldownSpin,
      img,
      isActive,
    });

    return res.status(201).json({
      message: "Lucky item created successfully",
      data: result.data(),
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const getLuckyItems = async (req: Request, res: Response) => {
  try {
    const items = await getLuckyItemsService();

    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const claimLuckyItem = async (req: Request, res: Response) => {
  try {
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({
        message: "itemId is required",
      });
    }

    const result = await claimLuckyItemService(itemId);

    return res.status(200).json({
      message: "Item claimed successfully",
      ...result,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

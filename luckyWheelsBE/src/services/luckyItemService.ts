// services/luckyItemService.ts

import { db } from "../config/firebase";
import { CreateLuckyItemDto } from "../dtos/createLuckyItemDto";

export const createLuckyItemService = async (data: CreateLuckyItemDto) => {
  const docRef = db.collection("LuckyItem").doc(data.id);

  await docRef.set({
    wheelId: data.wheelId,
    name: data.name,
    quantity: data.quantity,
    probability: data.probability,
    cooldownSpin: data.cooldownSpin,
    img: data.img ?? "none",
    isActive: data.isActive ?? true,
    createdAt: new Date(),
  });

  return docRef.get();
};
export const getLuckyItemsService = async () => {
  const snapshot = await db
    .collection("LuckyItem")
    .where("isActive", "==", true)
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};
export const claimLuckyItemService = async (itemId: string) => {
  const docRef = db.collection("LuckyItem").doc(itemId);

  const doc = await docRef.get();

  if (!doc.exists) {
    throw new Error("Item not found");
  }

  const data = doc.data();

  const quantity = data?.quantity ?? 0;

  if (quantity <= 0) {
    await docRef.delete();

    throw new Error("Item out of stock");
  }

  const newQuantity = quantity - 1;

  if (newQuantity <= 0) {
    await docRef.delete();

    return {
      deleted: true,
      quantity: 0,
    };
  }

  await docRef.update({
    quantity: newQuantity,
  });

  return {
    deleted: false,
    quantity: newQuantity,
  };
};
export const spinLuckyItemService = async () => {
  return db.runTransaction(async transaction => {
    const snapshot = await db
      .collection("LuckyItem")
      .where("isActive", "==", true)
      .get();

    const items = snapshot.docs
      .map(doc => ({
        id: doc.id,
        ...(doc.data() as {
          quantity: number;
          [key: string]: any;
        }),
      }))
      .filter(item => item.quantity > 0);

    if (items.length === 0) {
      throw new Error("Không còn phần thưởng nào");
    }

    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    const random = Math.random() * totalQuantity;

    let cumulative = 0;

    let reward: any = null;

    for (const item of items) {
      cumulative += item.quantity;

      if (random < cumulative) {
        reward = item;
        break;
      }
    }

    if (!reward) {
      reward = items[items.length - 1];
    }

    const rewardRef = db.collection("LuckyItem").doc(reward.id);

    const rewardDoc = await transaction.get(rewardRef);

    if (!rewardDoc.exists) {
      throw new Error("Phần thưởng không tồn tại");
    }

    const quantity = rewardDoc.data()?.quantity ?? 0;

    if (quantity <= 0) {
      throw new Error("Phần thưởng vừa hết");
    }

    const newQuantity = quantity - 1;

    if (newQuantity <= 0) {
      transaction.delete(rewardRef);
    } else {
      transaction.update(rewardRef, {
        quantity: newQuantity,
      });
    }

    return {
      reward: {
        ...reward,
        quantity: newQuantity,
      },
      deleted: newQuantity <= 0,
      quantity: newQuantity,
    };
  });
};

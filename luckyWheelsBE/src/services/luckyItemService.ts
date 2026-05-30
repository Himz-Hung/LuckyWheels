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

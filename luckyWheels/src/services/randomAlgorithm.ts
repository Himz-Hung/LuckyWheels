import type { DataItem } from "../models/wheelItemsModel";

export default function randomWheels(items: DataItem[]): DataItem | null {
  const availableItems = items.filter(item => item.quantity > 0);

  if (availableItems.length === 0) {
    return null;
  }

  const totalQuantity = availableItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const randomNumber = Math.random() * totalQuantity;

  let cumulative = 0;

  for (const item of availableItems) {
    cumulative += item.quantity;

    if (randomNumber < cumulative) {
      return item;
    }
  }

  return availableItems[availableItems.length - 1];
}

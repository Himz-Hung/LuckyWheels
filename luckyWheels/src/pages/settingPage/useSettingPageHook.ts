import { useState } from "react";

export interface LuckyItemForm {
  name: string;
  quantity: number;
  probability: number;
  cooldownSpin: number;
  img: string;
}

export interface WheelForm {
  name: string;
  type: string;
  isActive: boolean;
  startAt: string;
  endAt: string;
}

function useSettingPageHook() {
  const [wheel, setWheel] = useState<WheelForm>({
    name: "",
    type: "",
    isActive: true,
    startAt: "",
    endAt: "",
  });

  const [items, setItems] = useState<LuckyItemForm[]>([
    {
      name: "",
      quantity: 1,
      probability: 0,
      cooldownSpin: 0,
      img: "",
    },
  ]);

  const handleWheelChange = (key: keyof WheelForm, value: string | boolean) => {
    setWheel(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleItemChange = (
    index: number,
    key: keyof LuckyItemForm,
    value: string | number | null
  ) => {
    const newItems = [...items];

    newItems[index] = {
      ...newItems[index],
      [key]: typeof value === "number" ? value : value ?? "",
    };

    setItems(newItems);
  };

  const addItem = () => {
    setItems(prev => [
      ...prev,
      {
        name: "",
        quantity: 1,
        probability: 0,
        cooldownSpin: 0,
        img: "",
      },
    ]);
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    console.log("WHEEL:", wheel);
    console.log("ITEMS:", items);

    // TODO: call API create wheel
  };

  return {
    state: {
      wheel,
      items,
    },
    handler: {
      handleWheelChange,
      handleItemChange,
      addItem,
      removeItem,
      handleSubmit,
    },
  };
}

export default useSettingPageHook;

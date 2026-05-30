import { useEffect, useState } from "react";

import axios from "axios";

import type { DataItem } from "../../models/wheelItemsModel";
import randomWheels from "../../services/randomAlgorithm";

const SPIN_DURATION = 5000;

export default function useWheelPageHook() {
  const [items, setItems] = useState<DataItem[]>([]);

  const [rotation, setRotation] = useState(0);

  const [winner, setWinner] = useState<DataItem | null>(null);

  const [openPopup, setOpenPopup] = useState(false);

  const [isSpinning, setIsSpinning] = useState(false);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/lucky-item"
        );
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  const claimReward = async (itemId: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/lucky-item/claim",
        {
          itemId,
        }
      );

      const result = response.data;

      if (result.deleted) {
        setItems(prev => prev.filter(item => item.id !== itemId));
      } else {
        setItems(prev =>
          prev.map(item =>
            item.id === itemId
              ? {
                  ...item,
                  quantity: result.quantity,
                }
              : item
          )
        );
      }

      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data?.message ?? "Phần thưởng đã hết");
      } else {
        setMessage("Đã xảy ra lỗi không xác định");
      }

      setItems(prev => prev.filter(item => item.id !== itemId));

      return false;
    }
  };

  const spin = async () => {
    if (isSpinning) return;

    if (items.length === 0) {
      setMessage("Không còn phần thưởng nào");
      return;
    }

    const result = randomWheels(items);

    if (!result) {
      setMessage("Không còn phần thưởng nào");
      return;
    }

    const winnerIndex = items.findIndex(item => item.id === result.id);

    if (winnerIndex === -1) return;

    setIsSpinning(true);
    setOpenPopup(false);

    const slice = 360 / items.length;

    const margin = slice * 0.15;

    const randomInsideSlice = margin + Math.random() * (slice - margin * 2);

    const targetSliceAngle = winnerIndex * slice + randomInsideSlice;

    const stopAngle = (360 - targetSliceAngle) % 360;

    const currentRotation = ((rotation % 360) + 360) % 360;

    const rounds = Math.floor(Math.random() * 5) + 8;

    const wobble = (Math.random() - 0.5) * 1.5;

    const deltaRotation =
      ((stopAngle - currentRotation + 360) % 360) + rounds * 360;

    const nextRotation = rotation + deltaRotation + wobble;

    setRotation(nextRotation);

    setTimeout(async () => {
      const success = await claimReward(String(result.id));

      if (!success) {
        setIsSpinning(false);
        return;
      }

      setWinner(result);

      setMessage(`Chúc mừng bạn nhận được ${result.name}`);

      setOpenPopup(true);
      setIsSpinning(false);
    }, SPIN_DURATION);
  };

  return {
    state: {
      items,
      rotation,
      winner,
      openPopup,
      isSpinning,
      message,
    },

    handler: {
      spin,
      setOpenPopup,
    },
  };
}

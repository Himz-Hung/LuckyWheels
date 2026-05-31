import { useEffect, useState } from "react";

import axios from "axios";

import type { DataItem } from "../../models/wheelItemsModel";
// import randomWheels from "../../services/randomAlgorithm";

const SPIN_DURATION = 5000;

export default function useWheelPageHook() {
  const [items, setItems] = useState<DataItem[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [rotation, setRotation] = useState(0);

  const [winner, setWinner] = useState<DataItem | null>(null);

  const [openPopup, setOpenPopup] = useState(false);

  const [isSpinning, setIsSpinning] = useState(false);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/lucky-item`);
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, [apiUrl]);
  const refreshItems = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/lucky-item`);

      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  // const claimReward = async (itemId: string) => {
  //   try {
  //     const response = await axios.post(`${apiUrl}/api/lucky-item/claim`, {
  //       itemId,
  //     });

  //     const result = response.data;

  //     if (result.deleted) {
  //       setItems(prev => prev.filter(item => item.id !== itemId));
  //     } else {
  //       setItems(prev =>
  //         prev.map(item =>
  //           item.id === itemId
  //             ? {
  //                 ...item,
  //                 quantity: result.quantity,
  //               }
  //             : item
  //         )
  //       );
  //     }

  //     return true;
  //   } catch (error: unknown) {
  //     if (axios.isAxiosError(error) && error.response) {
  //       setMessage(error.response.data?.message ?? "Phần thưởng đã hết");
  //     } else {
  //       setMessage("Đã xảy ra lỗi không xác định");
  //     }

  //     setItems(prev => prev.filter(item => item.id !== itemId));

  //     return false;
  //   }
  // };

  const spin = async () => {
    if (isSpinning) return;

    if (items.length === 0) {
      setMessage("Không còn phần thưởng nào");
      return;
    }

    setIsSpinning(true);

    try {
      const response = await axios.post(`${apiUrl}/api/lucky-item/spin`);

      const result = response.data.reward;

      const winnerIndex = items.findIndex(item => item.id === result.id);

      if (winnerIndex === -1) {
        await refreshItems();

        setMessage("Dữ liệu vòng quay đã thay đổi, vui lòng quay lại.");

        setIsSpinning(false);

        return;
      }

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
        setWinner(result);

        setMessage(`Chúc mừng bạn nhận được ${result.name}`);

        setOpenPopup(true);

        try {
          await refreshItems();
        } catch (error) {
          console.error(error);
        }

        setIsSpinning(false);
      }, SPIN_DURATION);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message ?? "Không thể quay");
      }

      setIsSpinning(false);
    }
  };
  const splitText = (text: string, maxLength = 10) => {
    const words = text.split(" ");
    const lines: string[] = [];

    let currentLine = "";

    words.forEach(word => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;

      if (testLine.length > maxLength) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
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
      splitText,
      spin,
      setOpenPopup,
    },
  };
}

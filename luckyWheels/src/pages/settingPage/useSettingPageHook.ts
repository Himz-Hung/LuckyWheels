
function useSettingPageHook() {
  interface DataItem {
    id: number;
    name: string;
    quant: number;
    rate: number;
  }

  const data: DataItem[] = [
    { name: "chuột", quant: 10, rate: 70, id: 1 },
    { name: "phím", quant: 5, rate: 20, id: 2 },
    { name: "màn hình", quant: 3, rate: 5, id: 3 },
    { name: "pc", quant: 2, rate: 3, id: 4 },
    { name: "vàng", quant: 1, rate: 2, id: 5 },
  ];
  const randomWheels = (mainData: DataItem[]): void => {
    // 1. Tạo và trộn pool số từ 1-100
    const pool: number[] = Array.from({ length: 100 }, (_, i) => i + 1);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // 2. Phân phối số cho từng vật phẩm
    const randomArray = mainData.map(e => ({
      randomNumber: pool.splice(0, e.rate),
      key: e.id,
    }));

    // 3. Quay số trúng thưởng (từ 1 đến 100)
    const winNumber = Math.floor(Math.random() * 100) + 1;
    console.log(`Số win: ${winNumber}`);

    // 4. TỐI ƯU: Tìm item trong randomArray chứa số winNumber trước
    const winningTicket = randomArray.find(item =>
      item.randomNumber.includes(winNumber)
    );

    // 5. Tìm đối tượng trúng thưởng từ data gốc dựa vào key thu được
    const winner = winningTicket
      ? mainData.find(e => e.id === winningTicket.key)
      : undefined;

    console.log("Vật phẩm trúng thưởng:", winner);
  };
  const state = { data };

  const handler = { randomWheels };

  return { state, handler };
}

export default useSettingPageHook;

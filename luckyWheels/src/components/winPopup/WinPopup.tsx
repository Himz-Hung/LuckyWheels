import { Modal, Typography, Image, Button } from "antd";
import type { DataItem } from "../../models/wheelItemsModel";

const { Title, Text } = Typography;

interface Props {
  open: boolean;
  winner: DataItem | null;
  onClose: () => void;
}

export default function WinPopup({ open, winner, onClose }: Props) {
  return (
    <Modal
      open={open}
      centered
      footer={null}
      onCancel={onClose}
      // Đã sửa thành styles.body để tránh lỗi TypeScript của Antd
      styles={{
        body: {
          borderRadius: "20px",
          padding: "10px 4px", // Điều chỉnh lại padding một chút cho cân đối với body
          background: "linear-gradient(to bottom, #ffffff, #fcf8f2)",
        }
      }}
      width={400}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          paddingTop: "20px" // Thêm padding ở đây để tạo khoảng trống đẹp mắt
        }}
      >
        {/* Tiêu đề Chúc mừng rực rỡ */}
        <Title 
          level={2} 
          style={{ 
            color: "#ff4d4f", 
            marginTop: 0, 
            marginBottom: "20px",
            fontFamily: "sans-serif",
            fontWeight: 800
          }}
        >
          🎉 CHÚC MỪNG! 🎉
        </Title>

        <Text type="secondary" style={{ fontSize: "14px", marginBottom: "15px" }}>
          Bạn đã trúng giải thưởng dưới đây:
        </Text>

        {/* Khung chứa ảnh quà tặng cao cấp */}
        <div
          style={{
            background: "#fff",
            padding: "16px",
            borderRadius: "50%",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            border: "4px solid #ffd666",
            marginBottom: "20px",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            width: "160px",
            height: "160px"
          }}
        >
          <Image
            width={110}
            height={110}
            src={winner?.img}
            preview={false}
            style={{ objectFit: "contain", borderRadius: "12px" }}
          />
        </div>

        {/* Tên phần quà */}
        <Title level={3} style={{ margin: "0 0 10px 0", color: "#262626", fontWeight: 700 }}>
          {winner?.name}
        </Title>

        {/* Badge hiển thị số lượng */}
        {/* <div
          style={{
            background: "#fff1f0",
            border: "1px solid #ffa39e",
            color: "#cf1322",
            padding: "6px 16px",
            borderRadius: "20px",
            fontWeight: "600",
            fontSize: "14px",
            marginBottom: "25px",
          }}
        >
          Số lượng: {winner?.quantity}
        </div> */}

        {/* Nút xác nhận nhận quà */}
        <Button
          type="primary"
          onClick={onClose}
          style={{
            width: "100%",
            height: "44px",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            background: "linear-gradient(90deg, #ff4d4f, #ff7875)",
            border: "none",
            boxShadow: "0 4px 12px rgba(255, 77, 79, 0.3)"
          }}
        >
          Tuyệt vời, nhận ngay!
        </Button>
      </div>
    </Modal>
  );
}
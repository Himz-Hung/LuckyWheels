import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Typography } from "antd";
import useLoginPageHook from "./useLoginPageHook";

const { Title, Text } = Typography;

export default function LoginPage() {
  // Lấy thêm biến loading từ hook ra
  const { form, loading, handleSubmit } = useLoginPageHook();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #111827 50%, #020617 100%)",
        padding: 24,
      }}
    >
      <Card
        bordered={false}
        style={{
          width: 420,
          background: "#1e293b",
          borderRadius: 24,
          boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
        }}
        styles={{
          body: { padding: 40 },
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              width: 70,
              height: 70,
              margin: "0 auto 20px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              color: "#fff",
            }}
          >
            <UserOutlined />
          </div>

          <Title level={2} style={{ color: "#fff", marginBottom: 8 }}>
            Welcome Back
          </Title>

          <Text style={{ color: "#94a3b8" }}>Sign in to continue</Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
          disabled={loading} // Vô hiệu hóa toàn bộ form khi đang gọi API
        >
          {/* USERNAME FIELD */}
          <Form.Item
            label={<span style={{ color: "#e2e8f0" }}>Username</span>}
            name="username"
            rules={[
              { required: true, message: "Username không được để trống!" },
              { min: 4, message: "Username phải từ 4 ký tự trở lên!" },
              { pattern: /^\S*$/, message: "Username không được chứa khoảng trắng!" }
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined style={{ color: "#64748b" }} />}
              placeholder="Enter username"
              style={{
                height: 50,
                background: "#334155",
                border: "1px solid #475569",
                color: "#fff",
                borderRadius: 12,
              }}
            />
          </Form.Item>

          {/* PASSWORD FIELD */}
          <Form.Item
            label={<span style={{ color: "#e2e8f0" }}>Password</span>}
            name="password"
            rules={[
              { required: true, message: "Mật khẩu không được để trống!" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" }
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined style={{ color: "#64748b" }} />}
              placeholder="Enter password"
              style={{
                height: 50,
                background: "#334155",
                border: "1px solid #475569",
                color: "#fff",
                borderRadius: 12,
              }}
            />
          </Form.Item>

          {/* BUTTON LOGIN */}
          <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              block
              loading={loading} // Hiện icon xoay xoay khi loading = true
              style={{
                height: 50,
                borderRadius: 12,
                border: "none",
                fontWeight: 600,
                background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
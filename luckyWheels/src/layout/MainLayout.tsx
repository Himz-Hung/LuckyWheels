import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, ConfigProvider, Layout, Menu, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const currentTheme = useMemo(
    () => (isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm),
    [isDarkMode]
  );

  return (
    <ConfigProvider
      theme={{
        algorithm: currentTheme,
      }}
    >
      <LayoutContent isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </ConfigProvider>
  );
}

interface LayoutContentProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function LayoutContent({ isDarkMode, setIsDarkMode }: LayoutContentProps) {
  const location = useLocation();
  const pathname = location.pathname.length > 1 ? location.pathname.replace('/', '/ ') : "/ Home";
  const {
    token: { colorBgContainer, colorText, borderRadiusLG },
  } = theme.useToken();

  const items = Array.from({ length: 3 }).map((_, index) => ({
    key: String(index + 1),
    label: `nav ${index + 1}`,
  }));

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: colorBgContainer,
          paddingInline: 24,
          borderBottom: "1px solid rgba(128,128,128,0.2)",
        }}
      >
        <div
          style={{
            color: colorText,
            fontSize: 20,
            fontWeight: 700,
            marginRight: 24,
            whiteSpace: "nowrap",
          }}
        >
          My App
        </div>

        <Menu
          theme={isDarkMode ? "dark" : "light"}
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
            background: "transparent",
            borderBottom: "none",
          }}
        />

        <Button
          type="text"
          onClick={() => setIsDarkMode(prev => !prev)}
          icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
        />
      </Header>

      <Content
        style={{
          flex: 1,
          padding: "24px 48px",
        }}
      >
        <Breadcrumb
          style={{
            marginBottom: 16,
          }}
          items={[
            {
              title: pathname || "Home",
            },
          ]}
        />

        <div
          style={{
            minHeight: "calc(100vh - 250px)",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>

      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
}

import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Layout, Menu, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  // const location = useLocation();
  // const pathname =
  //   location.pathname.length > 1
  //     ? location.pathname.replace("/", "/ ")
  //     : "/ Home";
  const headerBg =
    "https://nhathuocthich24h.com/Images/Nhathuocthich24h/header_desktop_background.png";
  const logo =
    "https://nhathuocthich24h.com/Images/Nhathuocthich24h/logo_xoa_nen_pc.png";
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // const items = [
  //   // {
  //   //   key: "/",
  //   //   label: "Home",
  //   // },
  //   {
  //     key: "/wheel",
  //     label: "Wheel",
  //   },
  // ];

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
          height: 72,

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          paddingInline: 24,

          backgroundImage: `
      linear-gradient(
        rgba(0,0,0,.45),
        rgba(0,0,0,.45)
      ),
      url(${headerBg})
    `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",

          borderBottom: "1px solid rgba(255,255,255,.12)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            minWidth: 0,
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{
              width: 100,
              height: 100,
              objectFit: "contain",
            }}
          />

          <span
            style={{
              color: "#FFEA00",
              fontSize: 20,
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            Lucky Wheels
          </span>
        </div>

        {/* Menu */}
        <Menu
          theme="dark"
          mode="horizontal"
          // items={items}
          onClick={e => navigate(e.key)}
          style={{
            flex: 1,
            justifyContent: "center",
            background: "transparent",
            borderBottom: "none",
            marginInline: 24,
          }}
        />

        {/* Theme */}
        <Button
          type="text"
          onClick={() => setIsDarkMode(prev => !prev)}
          icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
          style={{
            color: "#fff",
            fontSize: 18,
          }}
        />
      </Header>

      <Content
        style={{
          flex: 1,
          padding: "24px 48px",
        }}
      >
        {/* <Breadcrumb
          style={{
            marginBottom: 16,
          }}
          items={[
            {
              title: pathname || "Home",
            },
          ]}
        /> */}

        <div
          style={{
            minHeight: "calc(100vh - 250px)",
            padding: 0,
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
          background: "#1C4686",
        }}
      >
        Himz prod ©{new Date().getFullYear()} - Developed by Himz
      </Footer>
    </Layout>
  );
}

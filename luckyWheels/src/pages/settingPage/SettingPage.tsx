import {
  Button,
  Card,
  DatePicker,
  Input,
  InputNumber,
  Switch,
  Typography,
} from "antd";

import useSettingPageHook from "./useSettingPageHook";

const { Title } = Typography;

export default function SettingPage() {
  const { state, handler } = useSettingPageHook();

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Create Lucky Wheel</Title>

      {/* WHEEL INFO */}
      <Card title="Wheel Info" style={{ marginBottom: 16 }}>
        <Input
          placeholder="Wheel name"
          value={state.wheel.name}
          onChange={e => handler.handleWheelChange("name", e.target.value)}
          style={{ marginBottom: 8 }}
        />

        <Input
          placeholder="Type"
          value={state.wheel.type}
          onChange={e => handler.handleWheelChange("type", e.target.value)}
          style={{ marginBottom: 8 }}
        />

        <div style={{ marginBottom: 8 }}>
          Active:{" "}
          <Switch
            checked={state.wheel.isActive}
            onChange={v => handler.handleWheelChange("isActive", v)}
          />
        </div>

        <DatePicker
          showTime
          placeholder="Start At"
          onChange={(_, dateString) =>
            handler.handleWheelChange(
              "startAt",
              Array.isArray(dateString) ? dateString[0] : dateString
            )
          }
        />

        <DatePicker
          showTime
          placeholder="End At"
          onChange={(_, dateString) =>
            handler.handleWheelChange(
              "endAt",
              Array.isArray(dateString) ? dateString[0] : dateString
            )
          }
        />
      </Card>

      {/* ITEMS */}
      <Card title="Lucky Items" style={{ marginBottom: 16 }}>
        {state.items.map((item, index) => (
          <Card key={index} size="small" style={{ marginBottom: 12 }}>
            <Input
              placeholder="Item name"
              value={item.name}
              onChange={e =>
                handler.handleItemChange(index, "name", e.target.value)
              }
              style={{ marginBottom: 6 }}
            />

            <InputNumber
              placeholder="Quantity"
              value={item.quantity}
              onChange={v =>
                handler.handleItemChange(index, "quantity", v ?? 0)
              }
              style={{ marginRight: 8 }}
            />

            <InputNumber
              placeholder="Probability"
              value={item.probability}
              onChange={v =>
                handler.handleItemChange(index, "quantity", v ?? 0)
              }
              style={{ marginRight: 8 }}
            />

            <InputNumber
              placeholder="Cooldown"
              value={item.cooldownSpin}
              onChange={v =>
                handler.handleItemChange(index, "quantity", v ?? 0)
              }
              style={{ marginRight: 8 }}
            />

            <Input
              placeholder="Image URL"
              value={item.img}
              onChange={e =>
                handler.handleItemChange(index, "img", e.target.value)
              }
              style={{ marginTop: 6 }}
            />

            <Button
              danger
              style={{ marginTop: 8 }}
              onClick={() => handler.removeItem(index)}
            >
              Remove
            </Button>
          </Card>
        ))}

        <Button type="dashed" onClick={handler.addItem} block>
          + Add Item
        </Button>
      </Card>

      <Button type="primary" size="large" onClick={handler.handleSubmit}>
        Create Wheel
      </Button>
    </div>
  );
}

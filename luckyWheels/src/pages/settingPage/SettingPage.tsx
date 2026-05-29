import { Button } from "antd";
import useSettingPageHook from "./useSettingPageHook";

export default function SettingPage() {
  const { state, handler } = useSettingPageHook();

  return (
    <Button
      type="primary"
      onClick={() => {
        handler.randomWheels(state.data);
      }}
    >
      Roll
    </Button>
  );
}

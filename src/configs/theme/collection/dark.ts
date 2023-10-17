import { ThemeConfig, theme } from "antd";

const { defaultAlgorithm, darkAlgorithm } = theme;

const instance: ThemeConfig = {
  algorithm: [defaultAlgorithm, darkAlgorithm],
  token: {
    colorBgLayout: "#22272e",
    colorPrimary: "#316dca",
    colorBgBase: "#2d333b",
    colorBorder: "#464e58",
    colorSuccess: "#9be9a8",
    colorError: "#ce504a",
  },
  components: {
    Button: {
      boxShadow: "none",
    },
    Layout: {
      headerBg: "#2d333b",
      triggerBg: "#464e58",
      siderBg: "#2d333b"

    },
    InputNumber: {
      colorBgContainer: "#1c2128",
    },
    Card: {
      colorBgLayout: "#282828",
    },
    Input: {
      colorBgContainer: "#1c2128",
    },
    Select: {
      colorBgContainer: "#1c2128",
    },
    DatePicker: {
      colorBgContainer: "#1c2128",
    },
    Slider: {
      colorFill: "#fff",
      // colorFillTertiary: "#999999",
      colorPrimaryBorderHover: "#fff",
      colorPrimaryBorder: "#c7c7c7"
    },
  },
};

export default instance;

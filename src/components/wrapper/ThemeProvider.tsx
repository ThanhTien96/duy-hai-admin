import { useAppSelector } from "store";
import { useMemo, useRef } from "react";
import { themes } from "configs";
import { Global } from "@emotion/react";
import { App, ConfigProvider } from "antd";
export interface ThemeProviderProps {
  children?: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const {
    selected: selectedThemeKey,
    colorPrimary,
    ...resProps
  } = useAppSelector((state) => state.app.theme);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  const selectedTheme = useMemo(
    () => ({
      ...themes[selectedThemeKey],
      token: {
        ...themes[selectedThemeKey].token,
        colorPrimary,
      },
    }),
    [selectedThemeKey, colorPrimary]
  );

  return (
    <>
      <Global
        styles={{
          ".ant-layout-sider-trigger": {
            backgroundColor:
              selectedTheme && selectedTheme.components?.Layout?.triggerBg,
          },
          ".ant-tree .ant-tree-switcher-leaf-line:before": {
            borderInlineEnd: `2px solid ${
              colorPrimary ? colorPrimary : "#15c6dd"
            }`,
            bottom: "-34px",
          },
          // custom tree line
          ".ant-tree .ant-tree-switcher-leaf-line:after": {
            borderBottom: `2px solid ${
              colorPrimary ? colorPrimary : "#15c6dd"
            }`,
            height: "30px",
          },
        }}
      />
      <ConfigProvider
        {...resProps}
        theme={selectedTheme}
        getPopupContainer={() => modalContainerRef.current as HTMLElement}
      >
        <App>{children}</App>
      </ConfigProvider>
    </>
  );
};

export default ThemeProvider;

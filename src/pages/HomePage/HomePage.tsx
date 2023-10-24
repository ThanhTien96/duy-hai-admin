import { PlainLayout } from "components/layouts/ChildLayout/PlainLayout";
import { ColumnChart, PieChart, TinyChart, WatchTable } from "./partials";
import {
  Button,
  Calendar,
  Card,
  Col,
  Row,
  Segmented,
  Tooltip,
  Typography,
} from "antd";
import {
  ReloadOutlined,
  ExpandOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { COPY_RIGHT, STATUS_CODE } from "constants";
import { AuthService } from "services";
import { setAlert } from "store/app/alert";
import { STORE_STATUS } from "constants/apiMessage";
import { useState, useCallback } from "react";
import { useAppDispatch } from "store";
import { CopyFilled } from "@ant-design/icons";

const { Text } = Typography;

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isCoppy, setIsCoppy] = useState<boolean>(false);
  // handle get token
  const handleGetToken = useCallback(
    async () => {
      try {
        const res = await AuthService.getToken();
        if (res.status === STATUS_CODE.success) {
          // copy value
          await navigator.clipboard.writeText(res.data.token);
          setIsCoppy(true);
          setTimeout(() => setIsCoppy(false), 1000);
        }
      } catch (err: Error | any) {
        dispatch(
          setAlert({ message: "Coppy faild", status: STORE_STATUS.success })
        );
      }
    },
    [],
  )
  ;
  return (
    <PlainLayout
      headerprops={{
        title: "Dashboard",
        extra: [
          <Tooltip
          key={'nonti-copied'}
            title={
              <div className="flex items-center gap-2">
                <CopyFilled />
                <Text>Copied</Text>
              </div>
            }
            trigger="click"
            open={isCoppy}
          >
            <Button onClick={handleGetToken}>Lấy Token</Button>
          </Tooltip>,
          <Button type="text" key="reload-btn" icon={<ReloadOutlined />} />,
          <Button type="text" key="expand-btn" icon={<ExpandOutlined />} />,
        ],
      }}
      footerprops={{
        children: COPY_RIGHT,
        className: "text-center",
      }}
      className="bg-inherit"
    >
      {/* tiny chart */}
      <Row gutter={[8, 8]}>
        <Col span={6}>
          <Card size="small" className="h-[200px] border-none">
            <TinyChart />
          </Card>
        </Col>

        <Col span={6}>
          <Card size="small" className="h-[200px] border-none">
            <TinyChart />
          </Card>
        </Col>

        <Col span={6}>
          <Card size="small" className="h-[200px] border-none">
            <TinyChart />
          </Card>
        </Col>

        <Col span={6}>
          <Card size="small" className="h-[200px] border-none">
            <TinyChart />
          </Card>
        </Col>
      </Row>

      {/* total bottom left */}
      <Row gutter={[16, 16]} className="mt-4">
        {/* pie chart and calendar */}
        <Col span={8}>
          <Row gutter={[8, 16]}>
            <Col span={24}>
              <Card
                size="small"
                title="Summary"
                className="h-[300px] border-none"
                extra={[
                  <Button
                    key={"action-button"}
                    icon={<EllipsisOutlined />}
                    type="text"
                    size="small"
                  />,
                ]}
              >
                <PieChart />
              </Card>
            </Col>

            {/* calendar */}
            <Col span={24}>
              <Calendar fullscreen={false} />
            </Col>
          </Row>
        </Col>
        {/* column chart */}
        <Col span={16}>
          <Row gutter={[8, 16]}>
            {/* chart */}
            <Col span={24}>
              <Card
                size="small"
                title="Chart Tracking"
                className="h-[350px] border-none"
                extra={[
                  <Segmented
                    key={"segmented-1"}
                    size="small"
                    options={["Daily", "Weekly", "Monthly"]}
                    onResize={undefined}
                    onResizeCapture={undefined}
                  />,
                ]}
              >
                <ColumnChart />
              </Card>
            </Col>
            {/* table */}
            <Col span={24}>
              <Card
                size="small"
                title="Watch list"
                className="h-[270px] border-none"
                extra={[
                  <Button
                    key={"action-button"}
                    icon={<EllipsisOutlined />}
                    type="text"
                    size="small"
                  />,
                ]}
              >
                <WatchTable />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </PlainLayout>
  );
};

export default HomePage;

import { Badge, Button } from "antd";
import { BellOutlined } from "@ant-design/icons";

const NotificationButton = () => {
  return (
    <Badge color="red" style={{color: "#fff", fontWeight: "bold"}} count={5}>
      <Button
        type="text"
        shape="circle"
        className="h-[32px]"
        icon={<BellOutlined />}
      />
    </Badge>
  );
};

export default NotificationButton;

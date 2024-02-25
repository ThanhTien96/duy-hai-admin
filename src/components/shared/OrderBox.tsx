import { Typography } from "antd";
import clsx from "clsx";

const { Text } = Typography;

interface IOrderBoxProps {
  icon: React.ReactNode | string;
  title: string;
  result: number;
}

const OrderBox = ({ icon, title, result }: Partial<IOrderBoxProps>) => {
  return (
    <div className={clsx(" gap-2 border border-solid items-center rounded-md shadow-md border-gray-300 p-4 flex h-[120px]")}>
      {icon}
      <div className="flex flex-col justify-between">
        <Text className="text-[16px] font-semibold opacity-70 capitalize">{title}</Text>
        <Text className="text-[24px] font-bold">{result}</Text>
      </div>
    </div>
  );
};

export default OrderBox;

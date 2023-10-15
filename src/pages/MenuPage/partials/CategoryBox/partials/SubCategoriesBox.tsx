import { Empty, Image, Popconfirm, Space, Tooltip, Tree, Typography } from "antd";
import { ISubCategoriesFormBE } from "types/Menu";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { EMPTY_IMAGE } from "constants";
import { truncateText } from "utils/truncateText";

const { Text } = Typography;

type SubCategoriesBoxProps = {
  itemsList?: ISubCategoriesFormBE[];
  onUpdate?: (id: string) => void;
  onDelete?: (id: string) => void;
};

const SubCategoriesBox = ({
  itemsList,
  onUpdate,
  onDelete,
}: SubCategoriesBoxProps) => {
  return (
    <>
      {itemsList ? (
        <Tree
          className="w-full cursor-default"
          selectable={false}
          showLine
          treeData={itemsList.map((ele: ISubCategoriesFormBE) => ({
            key: ele.maDanhMucNho,
            title: (
              <Space
                className="w-[320px] p-2 flex items-center justify-between border border-solid border-gray-400 my-2 gap-8 rounded-md"
                size="large"
                direction="horizontal"
              >
                <Space direction="horizontal">
                  <Image
                    preview={false}
                    className="bg-gray-300"
                    width={20}
                    height={20}
                    src={ele.icon ?? EMPTY_IMAGE}
                    alt="icon"
                  />
                  <Tooltip title={ele.tenDanhMucNho}>
                    <Text className="capitalize text-[14px] font-semibold">
                      {truncateText(ele.tenDanhMucNho, 24)}
                    </Text>
                  </Tooltip>
                </Space>
                <Space>
                  <EditFilled
                    onClick={() => onUpdate && onUpdate(ele.maDanhMucNho)}
                    className="hover:text-green-500"
                  />

                  <Popconfirm
                    title="Xác Nhận Xoá"
                    description={`Bạn Muốn xoá danh mục ${ele.tenDanhMucNho}?`}
                    onConfirm={() => onDelete && onDelete(ele.maDanhMucNho)}
                    okText="Có"
                    cancelText="Không"
                  >
                    <DeleteFilled
                      className="hover:text-red-500"
                    />
                  </Popconfirm>
                </Space>
              </Space>
            ),
          }))}
        />
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </>
  );
};

export default SubCategoriesBox;

import { Breadcrumb, Card, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { PlainLayout } from "components/layouts/ChildLayout/PlainLayout";
import { COPY_RIGHT, STATUS_CODE, pagePaths } from "constants";
import React, {useEffect, useState} from "react";
import { HomeOutlined } from "@ant-design/icons";
import { useLocation } from "react-router";
import { ProductForm } from "../partials";
import { CategoriesService } from "services/categoriesRequester";
import { ISubCategoriesFormBE } from "types/Menu";
const { Text } = Typography;

const AddProductPage: React.FC = () => {
  const location = useLocation();
  const [subCategoriesList, setSubCategoriesList] = useState<ISubCategoriesFormBE[]>([])
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchAllSubCategries = async (signal?:AbortSignal) => {
      try {
        const res = await CategoriesService.getAllSubCategories(signal);
        if(res.status === STATUS_CODE.success) {
          setSubCategoriesList(res.data.data)
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchAllSubCategries(signal)
  
    return () => {
      controller.abort();
    }
  }, [])
  


  return (
    <PlainLayout
      headerprops={{ title: "Thêm Sản Phẩm" }}
      footerprops={{
        children: COPY_RIGHT,
        className: "text-center",
      }}
      className="bg-inherit h-auto"
    >
      <Content className="px-8">
        <Breadcrumb
          className="mb-4"
          items={[
            {
              href: "/",
              title: <HomeOutlined />,
            },
            {
              href: `/${pagePaths.product}`,
              title: pagePaths.product,
            },
            {
              title: (
                <Text>
                  {
                    location.pathname.split("/")[
                      location.pathname.split("/").length - 1
                    ]
                  }
                </Text>
              ),
            },
          ]}
        />
        <Card className="rounded-none">
          <ProductForm subCategories={subCategoriesList} />
        </Card>
      </Content>
    </PlainLayout>
  );
};

export default AddProductPage;

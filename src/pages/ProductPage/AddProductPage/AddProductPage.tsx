import { Breadcrumb, Card, Col, Row, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { PlainLayout } from "components/layouts/ChildLayout/PlainLayout";
import { COPY_RIGHT, pagePaths } from "constants";
import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { useLocation } from "react-router";
import { useSearchParams } from "react-router-dom";
import { ProductForm } from "../partials";
const { Text } = Typography;

const AddProductPage: React.FC = () => {
  const location = useLocation();
  const searParam = useSearchParams();

  return (
    <PlainLayout
      headerprops={{ title: "Add Product" }}
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
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <ProductForm />
            </Col>
          </Row>
        </Card>
      </Content>
    </PlainLayout>
  );
};

export default AddProductPage;

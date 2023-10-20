import { Breadcrumb, Col, Row, Typography } from "antd";
import { PlainLayout } from "components/layouts/ChildLayout/PlainLayout";
import { COPY_RIGHT, STATUS_CODE, pagePaths } from "constants";
import React, { useEffect, useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import { useAppDispatch } from "store";
import { IProductFromBE } from "types/Product";
import { setAlert } from "store/app/alert";
import { MESSAGE_TEXT, STORE_STATUS } from "constants/apiMessage";
import { setProductLoading } from "store/common/product/product";
import { ProductService } from "services/productRequester";
import { DetailContent, DetailItem } from "./partials";
import { Content } from "antd/es/layout/layout";
const { Text } = Typography;

const ProductDetail: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [prodDetail, setProdDetail] = useState<IProductFromBE>();

  useEffect(() => {
    const controller = new AbortController();

    const fetchProductDetail = async () => {
      dispatch(setProductLoading(true));
      try {
        if (params.id) {
          const res = await ProductService.getProductDetail(
            params.id,
            controller.signal
          );
          if (res.status === STATUS_CODE.success) {
            setProdDetail(res.data.data);
            console.log(res.data.data);
          }
        }
      } catch (err: Error | any) {
        dispatch(
          setAlert({
            message: MESSAGE_TEXT.getDetailFaild,
            status: STORE_STATUS.error,
          })
        );
      } finally {
        dispatch(setProductLoading(false));
      }
    };
    fetchProductDetail();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <PlainLayout
      headerprops={{ title: "Chi Tiết Sản Phẩm" }}
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
              title: <Text>{pagePaths.productDetail}</Text>,
            },
          ]}
        />
        <Row gutter={[64, 64]}>
          {/* left */}
          <Col span={24} xxl={12}>
            <DetailItem media={prodDetail?.hinhAnh} />
          </Col>
          {/* right */}
          <Col span={24} xxl={12}>
            <DetailContent markdownContent={prodDetail?.moTa} />
          </Col>
        </Row>
      </Content>
    </PlainLayout>
  );
};

export default ProductDetail;

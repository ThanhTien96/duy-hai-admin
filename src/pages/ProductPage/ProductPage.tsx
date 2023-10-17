import { Breadcrumb, Button, Col, Flex, Row, Space, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { PlainLayout } from "components/layouts/ChildLayout/PlainLayout";
import { COPY_RIGHT, EMPTY_IMAGE } from "constants";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { thunkFetchProductPagination } from "store/common/product/productAsyncThunk";
import { ProductCart } from "./partials";
import { IProductFromBE } from "types/Product";
import {
  HomeOutlined,
} from '@ant-design/icons'
import { useLocation } from "react-router";
import { setProductLoading } from "store/common/product/product";

const {Text} = Typography;

const ProductPage: React.FC = () => {
  const location = useLocation();
  
  const dispatch = useAppDispatch();
  const { loading, productList, pagination } = useAppSelector(
    (state) => state.common.product
  );

  useEffect(() => {
    dispatch(thunkFetchProductPagination({ page: 1, perPage: 8 }));
  }, []);

  return (
    <PlainLayout
      headerprops={{ title: "Product page" }}
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
              title: <Text>{location.pathname.replace("/", "")}</Text>,
            }
          ]}
        />
        <Row gutter={[24, 32]}>
          {productList && productList?.length > 0 &&
            productList.map((prod: IProductFromBE, index: number) => {
              return (
                <Col key={index} span={6}>
                  <ProductCart
                    img={prod && prod?.hinhAnh?.length > 0 ? prod?.hinhAnh[0].hinhAnh : EMPTY_IMAGE}
                    title={prod.tenSanPham}
                    description={prod.moTaNgan}
                    originalPrice={prod.giaGoc}
                    overwritePrice={prod.giaGiam}
                    quantity={prod.tongSoLuong}
                    loading={loading}
                  />
                </Col>
              );
            })}
        </Row>
        <div className="mt-8 text-center">
          <Button onClick={() => {
            if(pagination && pagination.currentPage <= pagination.totalPages) {
              console.log("☣️ >>> pagination.currentPage <= pagination.totalPages: ", pagination.currentPage <= pagination.totalPages)
              dispatch(thunkFetchProductPagination({page: pagination?.currentPage + 1, perPage: 8}))
            }
          }} type="primary" loading={loading}>Xem Thêm</Button>
        </div>
      </Content>
    </PlainLayout>
  );
};

export default ProductPage;

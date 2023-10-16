import { Col, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import { PlainLayout } from "components/layouts/ChildLayout/PlainLayout";
import { COPY_RIGHT } from "constants";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { thunkFetchProductPagination } from "store/common/product/productAsyncThunk";
import { ProductCart } from "./partials";
import { IProductFromBE } from "types/Product";

const ProductPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, productList } = useAppSelector(
    (state) => state.common.product
  );

  useEffect(() => {
    dispatch(thunkFetchProductPagination({ page: 1, perPage: 10 }));
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
        <Row gutter={[24, 32]}>
          {productList && productList.data &&
            productList.data.map((prod: IProductFromBE) => {
              return (
                <Col key={prod.maSanPham} span={6}>
                  <ProductCart img={prod.hinhAnh[0].hinhAnh} title={prod.tenSanPham} description={prod.moTaNgan} originalPrice={prod.giaGoc} overwritePrice={prod.giaGiam} loading={loading} />
                </Col>
              );
            })}
        </Row>
      </Content>
    </PlainLayout>
  );
};

export default ProductPage;

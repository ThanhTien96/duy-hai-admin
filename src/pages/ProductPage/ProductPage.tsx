import { Breadcrumb, Button, Col, Row, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { PlainLayout } from "components/layouts/ChildLayout/PlainLayout";
import { COPY_RIGHT, EMPTY_IMAGE, STATUS_CODE } from "constants";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { thunkFetchProductPagination } from "store/common/product/productAsyncThunk";
import { ProductCart } from "./partials";
import { IProductFromBE } from "types/Product";
import { HomeOutlined } from "@ant-design/icons";
import { useLocation } from "react-router";
import { setAlert } from "store/app/alert";
import { MESSAGE_TEXT, STORE_STATUS } from "constants/apiMessage";
import { setProductLoading } from "store/common/product/product";
import { ProductService } from "services/productRequester";

const { Text } = Typography;

const ProductPage: React.FC = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState<number>(2);
  const dispatch = useAppDispatch();
  const { loading, productList, pagination } = useAppSelector(
    (state) => state.common.product
  );

  useEffect(() => {
    // Create an AbortController and its signal
    const abortController = new AbortController();
    const signal = abortController.signal;
    const fetProductPagination = async () => {
      try {
        await dispatch(
          thunkFetchProductPagination({ page: 1, perPage: 8, signal })
        );
      } catch (err: Error | any) {
        dispatch(
          setAlert({
            message: MESSAGE_TEXT.getDetailFaild,
            status: STORE_STATUS.error,
          })
        );
      }
    };
    fetProductPagination();

    return () => {
      abortController.abort();
    };
  }, []);

  const handleDeleteProduct = useCallback(async (id: string) => {
    dispatch(setProductLoading(true));
    try {
      const res = await ProductService.deleteProduct(id);
      if(res.status === STATUS_CODE.success) {
        dispatch(setAlert({message: MESSAGE_TEXT.deleteSuccess, status: STORE_STATUS.success}));
        dispatch(thunkFetchProductPagination({page: 1, perPage: 8}))
      }
    } catch (err: Error | any) {
      dispatch(setAlert({message: MESSAGE_TEXT.deleteFaild, status: STORE_STATUS.error}));
    } finally {
      dispatch(setProductLoading(false))
    }
  }, [])

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
            },
          ]}
        />
        <Row gutter={[24, 32]}>
          {productList &&
            productList?.length > 0 &&
            productList.map((prod: IProductFromBE, index: number) => {
              return (
                <Col key={index} span={6}>
                  <ProductCart
                    onDelete={() => handleDeleteProduct(prod.maSanPham)}
                    id={prod.maSanPham}
                    img={
                      prod && prod?.hinhAnh?.length > 0
                        ? prod?.hinhAnh[0].hinhAnh
                        : EMPTY_IMAGE
                    }
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
          <Button
            onClick={async () => {
              if (pagination && currentPage < pagination?.totalPages + 1) {
                if (currentPage <= pagination.totalPages) {
                  await dispatch(
                    thunkFetchProductPagination({
                      page: currentPage,
                      perPage: 8,
                    })
                  );
                  setCurrentPage(currentPage + 1);
                }
              }
            }}
            type="primary"
            loading={loading}
          >
            Xem Thêm
          </Button>
        </div>
      </Content>
    </PlainLayout>
  );
};

export default ProductPage;

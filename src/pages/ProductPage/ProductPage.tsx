import {
  Col,
  Empty,
  Pagination,
  Row,
  Spin,
  Typography,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { PlainLayout } from "components/layouts/ChildLayout/PlainLayout";
import { COPY_RIGHT, EMPTY_IMAGE, PAGE_SIZE, STATUS_CODE } from "constants";
import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { thunkFetchProductPagination } from "store/common/product/productAsyncThunk";
import { ProductCart } from "./partials";
import { IProductFromBE, IProductPayloadType } from "types/Product";
import { HomeOutlined } from "@ant-design/icons";
import { useLocation } from "react-router";
import { setAlert } from "store/app/alert";
import { MESSAGE_TEXT, STORE_STATUS } from "constants/apiMessage";
import { setProductLoading } from "store/common/product/product";
import { ProductService } from "services";
import useHelmet from "hooks/useHelmet";

const { Text } = Typography;

const ProductPage: React.FC = () => {
  useHelmet({ title: "App - Sản Phẩm" });
  const location = useLocation();
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
        await dispatch(thunkFetchProductPagination({ page: 1, signal }));
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

  /**** ACTION HANDLER *****/

  // handle delete product
  const handleDeleteProduct = useCallback(async (id: string) => {
    dispatch(setProductLoading(true));
    try {
      const res = await ProductService.deleteProduct(id);
      if (res.status === STATUS_CODE.success) {
        dispatch(
          setAlert({
            message: MESSAGE_TEXT.deleteSuccess,
            status: STORE_STATUS.success,
          })
        );
        dispatch(thunkFetchProductPagination({ page: 1 }));
      }
    } catch (err: Error | any) {
      dispatch(
        setAlert({
          message: MESSAGE_TEXT.deleteFaild,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      dispatch(setProductLoading(false));
    }
  }, []);

  // handle update hot product
  const handleUpdateFiled = async (
    id: string,
    data: Partial<IProductPayloadType>
  ) => {
    dispatch(setProductLoading(true));
    try {
      const res = await ProductService.updateFieldProduct(id, data);
      if (res.status === STATUS_CODE.success) {
        dispatch(
          setAlert({ message: res.data.message, status: STORE_STATUS.success })
        );
        dispatch(thunkFetchProductPagination({ page: 1 }));
      }
    } catch (err: Error | any) {
      console.log(err);
      dispatch(
        setAlert({
          message: err.response.data.message ?? MESSAGE_TEXT.updateFaild,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      dispatch(setProductLoading(false));
    }
  };

  return (
    <PlainLayout
      headerprops={{
        breadcrumb: {
          items: [
            {
              href: "/",
              title: <HomeOutlined />,
            },
            {
              title: <Text>{location.pathname.replace("/", "")}</Text>,
            },
          ],
        },
        title: "Trang Sản Phẩm",
      }}
      footerprops={{
        children: COPY_RIGHT,
        className: "text-center",
      }}
      className="bg-inherit h-auto"
    >
      <Content className="px-8">
        <Spin spinning={loading}>
          {productList && productList.length > 0 ? (
            <Row gutter={[24, 32]}>
              {productList &&
                productList?.length > 0 &&
                productList.map((prod: IProductFromBE, index: number) => {
                  return (
                    <Col key={index} span={6}>
                      <ProductCart
                        onUpdate={handleUpdateFiled}
                        onDelete={() => handleDeleteProduct(prod.maSanPham)}
                        id={prod.maSanPham}
                        img={
                          prod && prod?.hinhAnh?.length > 0
                            ? prod?.hinhAnh.find((ele) => ele.hinhChinh)
                                ?.hinhAnh
                            : EMPTY_IMAGE
                        }
                        isHot={prod.hot}
                        isSEO={prod.seo}
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
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
          {productList && productList.length > 0 && (
            <div className="mt-8 text-center">
              <Pagination
                onChange={(page) => {
                  dispatch(thunkFetchProductPagination({ page }));
                }}
                pageSize={PAGE_SIZE.product}
                defaultCurrent={pagination?.currentPage}
                total={pagination?.total}
              />
            </div>
          )}
        </Spin>
      </Content>
    </PlainLayout>
  );
};

export default ProductPage;

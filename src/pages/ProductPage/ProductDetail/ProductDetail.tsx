import { Breadcrumb, Col, Row, Spin, Typography } from "antd";
import { PlainLayout } from "components/layouts/ChildLayout/PlainLayout";
import { COPY_RIGHT, STATUS_CODE, pagePaths } from "constants";
import React, { useEffect} from "react";
import { HomeOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "store";
import { setAlert } from "store/app/alert";
import { MESSAGE_TEXT, STORE_STATUS } from "constants/apiMessage";
import { ProductService } from "services/productRequester";
import { DetailContent, DetailItem } from "./partials";
import { Content } from "antd/es/layout/layout";
import useHelmet from "hooks/useHelmet";
import { thunkFetchProductDetail } from "store/common/product/productAsyncThunk";
import { setProductLoading } from "store/common/product/product";
const { Text } = Typography;

const ProductDetail: React.FC = () => {
  useHelmet({ title: "App - Chi Tiết Sản Phẩm" });
  const params = useParams();
  const dispatch = useAppDispatch();
  const {productDetail, loading} = useAppSelector(state => state.common.product)

  // side effects
  useEffect(() => {
   params.id && dispatch(thunkFetchProductDetail(params.id))
  }, []);

   /**** ACTION HANDLER *****/
  // action upload image
  const hadleAddMedia = async (files: FileList) => {
    dispatch(setProductLoading(true))

    const formData = new FormData();
    if (files && files.length > 0) {
      formData.append("hinhAnh", files[0]);
    }
    try {
      if (productDetail) {
        const res = await ProductService.addImageToProduct(
          productDetail.maSanPham,
          formData
        );

        if (res.status === STATUS_CODE.success) {
          dispatch(
            setAlert({
              message: res.data.message ?? MESSAGE_TEXT.createSuccess,
              status: STORE_STATUS.success,
            })
          );
          params.id && dispatch(thunkFetchProductDetail(params.id))
        }
      }
    } catch (err: Error | any) {
      dispatch(
        setAlert({
          message: err.response.data.message ?? MESSAGE_TEXT.createFaild,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      dispatch(setProductLoading(false))
    }
  };

  

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
        <Spin spinning={loading}>
          <Row gutter={[64, 64]}>
            {/* left */}
            <Col span={24} xl={12}>
              <DetailItem
                onUpload={(files) => hadleAddMedia(files)}
                markdownContent={productDetail?.moTa}
                media={productDetail?.hinhAnh}
              />
            </Col>
            {/* right */}
            <Col span={24} xl={12}>
              <DetailContent data={productDetail} />
            </Col>
          </Row>
        </Spin>
      </Content>
    </PlainLayout>
  );
};

export default ProductDetail;

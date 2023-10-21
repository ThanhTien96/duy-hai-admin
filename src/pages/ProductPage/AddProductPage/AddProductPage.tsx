import { Breadcrumb, Card, Spin, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { PlainLayout } from "components/layouts/ChildLayout/PlainLayout";
import { COPY_RIGHT, STATUS_CODE, pagePaths } from "constants";
import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router";
import { ProductForm } from "../partials";
import { TProductFormValue } from "../partials/ProductForm";
import { useAppDispatch, useAppSelector } from "store";
import { setAlert } from "store/app/alert";
import { MESSAGE_TEXT, STORE_STATUS } from "constants/apiMessage";
import { setProductLoading } from "store/common/product/product";
import { ProductService } from "services/productRequester";
import { thunkFetchProductPagination } from "store/common/product/productAsyncThunk";
import useHelmet from "hooks/useHelmet";
const { Text } = Typography;

const AddProductPage: React.FC = () => {
  useHelmet({title: "App - Thêm Sản Phẩm"})
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //  store 
  const {loading} = useAppSelector((state) => state.common.product);
  const {subCategoriesList} = useAppSelector((state) => state.common.menu);
 

  /****** ACTION HANDLER ******/
  // handle create product
  const handlCreateProduct = async (values: TProductFormValue) => {
    dispatch(setProductLoading(true));
    const formData = new FormData();
    formData.append("tenSanPham", values.tenSanPham);
    formData.append("giaGoc", String(values.giaGoc));
    values.giaGiam > 0 && formData.append("giaGiam", String(values.giaGiam));
    values.tongSoLuong > 0 && formData.append("tongSoLuong", String(values.tongSoLuong));
    formData.append("moTa", values.moTa);
    formData.append("moTaNgan", values.moTaNgan);
    formData.append("maDanhMucNho", values.maDanhMucNho);
    formData.append("seoTitle", values.seoTitle);
    formData.append("seoDetail", values.seoDetail);
    formData.append("youtubeVideo", values.youtubeVideo);

    if (values.hinhAnh) {
      values.hinhAnh?.forEach((ele: any) => {
        formData.append("hinhAnh", ele.originFileObj);
      });
    }
    try {
      const res = await ProductService.postProduct(formData);

      if (res.status === STATUS_CODE.success) {
        dispatch(
          setAlert({
            message: MESSAGE_TEXT.createSuccess,
            status: STORE_STATUS.success,
          })
        );
        dispatch(thunkFetchProductPagination({ page: 1}));
        navigate(`/${pagePaths.product}`);
      }
    } catch (err: Error | any) {
      dispatch(
        setAlert({
          message: err.response.data.message ?? MESSAGE_TEXT.createFaild,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      dispatch(setProductLoading(false));
    }
  };

  return (
    <PlainLayout
      headerprops={{ title: "Thêm Sản Phẩm" }}
      footerprops={{
        children: COPY_RIGHT,
        className: "text-center",
      }}
      className="bg-inherit h-auto"
    >
      <Spin spinning={loading}>
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
            <ProductForm
              getFormValue={(value) => handlCreateProduct(value)}
              subCategories={subCategoriesList}
            />
          </Card>
        </Content>
      </Spin>
    </PlainLayout>
  );
};

export default AddProductPage;

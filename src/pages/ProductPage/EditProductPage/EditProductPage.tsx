import { Breadcrumb, Card, Spin, Typography } from "antd";
import { ProductForm } from "../partials";
import { Content } from "antd/es/layout/layout";
import { PlainLayout } from "components/layouts/ChildLayout/PlainLayout";
import { COPY_RIGHT, STATUS_CODE, pagePaths } from "constants";
import {  useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "store";
import { HomeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { IProductFromBE } from "types/Product";
import { ProductService } from "services";
import { setProductLoading } from "store/common/product/product";
import { setAlert } from "store/app/alert";
import { MESSAGE_TEXT, STORE_STATUS } from "constants/apiMessage";
import { TProductFormValue } from "../partials/ProductForm";
import useHelmet from "hooks/useHelmet";

const { Text } = Typography;

const EditProductPage: React.FC = () => {
  useHelmet({title: "App - Cập Nhật Sản Phẩm"})
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // store
  const { loading } = useAppSelector((state) => state.common.product);
  const { subCategoriesList } = useAppSelector((state) => state.common.menu);
  const controller = new AbortController();

  // detail product state
  const [detailProduct, setDetailProdcut] = useState<IProductFromBE>();

  /***** ACTION HANDLER *****/
  useEffect(() => {
    const controller = new AbortController();
    const fetchDetailProduct = async (id: string, signal?: AbortSignal) => {
      dispatch(setProductLoading(true));
      try {
        const res = await ProductService.getProductDetail(id, signal);
        if (res.status === STATUS_CODE.success) {
          setDetailProdcut(res.data.data);
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

    params.id && fetchDetailProduct(params.id, controller.signal);
    return () => {
      controller.abort();
    };
  }, []);

  /********** ACTION HANDLER *********/
  const handleUpdateProduct = async (values: TProductFormValue) => {
    const formData = new FormData();
    formData.append("tenSanPham", values.tenSanPham);
    formData.append("giaGoc", String(values.giaGoc));
    values.giaGiam > 0 && formData.append("giaGiam", String(values.giaGiam));
    values.tongSoLuong > 0 &&
      formData.append("tongSoLuong", String(values.tongSoLuong));
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

    dispatch(setProductLoading(true));
    try {
      if (detailProduct) {
        const res = await ProductService.updateProduct(
          detailProduct?.maSanPham,
          formData,
          controller.signal
        );
        if (res.status === STATUS_CODE.success) {
          dispatch(
            setAlert({
              message: MESSAGE_TEXT.updateSuccess,
              status: STORE_STATUS.success,
            })
          );
          navigate(`/${pagePaths.product}`);
        }
      }
    } catch (err: Error | any) {
      dispatch(
        setAlert({
          message: MESSAGE_TEXT.updateFaild,
          status: STORE_STATUS.error,
        })
      );
    } finally {
      dispatch(setProductLoading(false));
    }
  };

  return (
    <PlainLayout
      headerprops={{ title: "" }}
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
                title: <Text>{pagePaths.updateProduct}</Text>,
              },
            ]}
          />
          <Card className="rounded-none">
            <ProductForm
              defaultValue={detailProduct}
              getFormValue={(value) => handleUpdateProduct(value)}
              subCategories={subCategoriesList}
            />
          </Card>
        </Content>
      </Spin>
    </PlainLayout>
  );
};

export default EditProductPage;

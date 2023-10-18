import { Breadcrumb, Card, Spin, Typography } from "antd";
import { ProductForm } from "../partials";
import { Content } from "antd/es/layout/layout";
import { PlainLayout } from "components/layouts/ChildLayout/PlainLayout";
import { COPY_RIGHT, STATUS_CODE, pagePaths } from "constants";
import { useLocation, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "store";
import { HomeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { IProductFromBE } from "types/Product";
import { ProductService } from "services/productRequester";
import { setProductLoading } from "store/common/product/product";
import { setAlert } from "store/app/alert";
import { MESSAGE_TEXT, STORE_STATUS } from "constants/apiMessage";

const { Text } = Typography;

const EditProductPage: React.FC = () => {
  const location = useLocation();
  const params = useParams();
  const dispatch = useAppDispatch();
  console.log("☣️ >>> location: ", params);
  // store
  const { loading } = useAppSelector((state) => state.common.product);
  const { subCategoriesList } = useAppSelector((state) => state.common.menu);
  // detail product state
  const [detailProduct, setDetailProdcut] = useState<IProductFromBE>();

  /***** ACTION HANDLER *****/
  useEffect(() => {
    const controller = new AbortController();
    const fetchDetailProduct = async (id: string, signal?: AbortSignal) => {
      dispatch(setProductLoading(true));
      try {
        const res = await ProductService.getDetailProduct(id, signal);
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
              getFormValue={(value) => console.log(value)}
              subCategories={subCategoriesList}
            />
          </Card>
        </Content>
      </Spin>
    </PlainLayout>
  );
};

export default EditProductPage;

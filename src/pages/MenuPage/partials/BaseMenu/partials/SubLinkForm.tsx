import { Button, Form, Input, Select } from "antd";
import { Content } from "antd/es/layout/layout";
import { useFormik } from "formik";
import { TNavLinkFromBE, TSubNavLinkFromBE } from "types/Menu";
import {useEffect, useState} from 'react'
import MenuService from "services/menuRequester";
import { useAppDispatch } from "store";
import { setAlert } from "store/app/alert";
import { STATUS_CODE } from "constants";
import * as yup from 'yup';

export type TSubLinkValue = {
    tenSubLink: string;
    url: string;
    maNavLink: string;
}

export interface ISubLinkFormProps {
  defaultValue?: TSubNavLinkFromBE;
  getForm: (value: TSubLinkValue) => void;
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  
const SubLinkForm = ({defaultValue, getForm}: ISubLinkFormProps) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
        tenSubLink:defaultValue ? defaultValue.tenSubLink : "",
      url: defaultValue ? defaultValue.url : "",
      maNavLink: defaultValue ? defaultValue.maNavLink : "",
    },
    validationSchema: yup.object({
        tenSubLink: yup.string().required("*Tên sub menu bắt buộc nhập"),
        url: yup
        .string()
        .matches(/^\/.*/, "Vui lòng bắt đầu bằng dấu gạch chéo ngược (/)")
        .required("*url bắt buộc"),
        maNavLink: yup.string().required("*Mã link menu bắt buộc chọn")
    }) ,
    onSubmit: (value: TSubLinkValue) => {
      getForm && getForm(value);
    },
  });
  const dispatch = useAppDispatch();
  const [navLinkList, setNavLinkList] = useState<TNavLinkFromBE[]>([])

  useEffect(() => {
    const controller = new AbortController();
    const fetchNavLink = async (signal?: AbortSignal) => {
        try {
            const res = await MenuService.fetchAllNavLink(signal);
            if(res.status === STATUS_CODE.success) {
                setNavLinkList(res.data.data)
            }
        } catch (err) {
            dispatch(setAlert({message: "Lấy danh sách menu link thất bại!!!", status: "error"}))
        }
    }

    fetchNavLink(controller.signal)
  
    return () => {
        fetchNavLink(controller.signal)
    }
  }, [])
  

  return (
    <Content>
      <Form
        onReset={() => formik.resetForm}
        className="pt-2"
        {...layout}
        onSubmitCapture={formik.handleSubmit}
      >
        <Form.Item label="Tên Thẻ Menu" required>
          <Input
            value={formik.values.tenSubLink}
            onChange={formik.handleChange}
            name="tenSubLink"
            placeholder="Nhập tên menu"
          />
          {formik.errors.tenSubLink && formik.touched.tenSubLink && (
            <p className="text-red-500">{formik.errors.tenSubLink}</p>
          )}
        </Form.Item>
        <Form.Item label="link" required>
          <Input
            value={formik.values.url}
            onChange={formik.handleChange}
            name="url"
            placeholder="Nhập link bắt đầu dấu /"
          />
          {formik.errors.url && formik.touched.url && (
            <p className="text-red-500">{formik.errors.url}</p>
          )}
        </Form.Item>
        <Form.Item label="Chọn Menu Link" required>
          <Select
            value={
              formik.values.maNavLink.length > 0 ? formik.values.maNavLink : undefined
            }
            onChange={(e) => formik.setFieldValue("maNavLink", e)}
            placeholder="Chọn menu"
            options={
                navLinkList && navLinkList.length > 0 ? navLinkList.map((ele: TNavLinkFromBE) => ({
                    label: ele.tenNavLink,
                    value: ele.maNavLink
                })) : []}
          />
          {formik.errors.maNavLink && formik.touched.maNavLink && (
            <p className="text-red-500">{formik.errors.maNavLink}</p>
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button htmlType="submit" type="primary">
            {defaultValue ? "Cập Nhật Sub Menu" : "Thêm Sub Menu"}
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default SubLinkForm;

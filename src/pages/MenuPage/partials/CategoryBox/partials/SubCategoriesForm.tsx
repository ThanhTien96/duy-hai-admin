import { Button, Form, Image, Input, Select } from "antd";
import { EMPTY_IMAGE } from "constants";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { IMainCategoriesFromBE, ISubCategoriesFormBE } from "types/Menu";
import * as yup from 'yup';

export type TSubCategoriesFormValue = {
  tenDanhMucNho: string;
  icon: string;
  maDanhMucChinh: string
}

type SubCategoriesFormProps = {
  getForm: (value: TSubCategoriesFormValue) => void;
  defaultValue?: ISubCategoriesFormBE;
  mainCategoriesList?: IMainCategoriesFromBE[];
  resetForm?: boolean;
  selectedMainCategories?: IMainCategoriesFromBE;
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const SubCategoriesForm = ({getForm, defaultValue, mainCategoriesList, resetForm = false, selectedMainCategories}: SubCategoriesFormProps) => {

  const [imgSrc, setImgSrc] = useState<string | ArrayBuffer | null>(defaultValue ? defaultValue?.icon : null)
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tenDanhMucNho: defaultValue ? defaultValue.tenDanhMucNho : "",
      icon: defaultValue ? defaultValue.icon : "",
      maDanhMucChinh: defaultValue ? defaultValue.maDanhMucChinh : selectedMainCategories ? selectedMainCategories.maDanhMucChinh : "",
    }, 
    validationSchema: yup.object({
      tenDanhMucNho: yup.string().required("*Tên danh mục nhỏ buộc nhập!"),
      maDanhMucChinh: yup.string().required("*Chọn danh mục lớn!"),
      icon: yup.string().required("*Icon buộc nhập!"),
    }) ,
    onSubmit: (value: TSubCategoriesFormValue) => {
      getForm(value);
      formik.resetForm();
    }
  })

  useEffect(() => {
    if(resetForm) {
      formik.resetForm()
      setImgSrc(null)
    }
  },[resetForm]);

  return (
    <Form
    {...layout}
    onSubmitCapture={formik.handleSubmit}
    >
      <Form.Item required label="Tên Danh Mục Nhỏ">
        <Input value={formik.values.tenDanhMucNho} placeholder="Nhập tên danh mục nhỏ" name="tenDanhMucNho" onChange={formik.handleChange} />
        {formik.errors.tenDanhMucNho && formik.touched.tenDanhMucNho && (<p className="text-red-500">{formik.errors.tenDanhMucNho}</p>)}
      </Form.Item>

      <Form.Item required label="Danh Mục Lớn">
        <Select 
        value={formik.values.maDanhMucChinh.length > 0 ? formik.values.maDanhMucChinh : undefined}
        placeholder="Chọn danh mục lớn"
        onChange={(e) => formik.setFieldValue("maDanhMucChinh", e)}
          options={mainCategoriesList && mainCategoriesList.map((ele: IMainCategoriesFromBE) => ({
            label: ele.tenDanhMuc,
            value: ele.maDanhMucChinh,
          }))}
        />
        {formik.errors.maDanhMucChinh && formik.touched.maDanhMucChinh && (<p className="text-red-500">{formik.errors.maDanhMucChinh}</p>)}
      </Form.Item>

      <Form.Item required label="Icon">
        {imgSrc && (
          <div className="mb-4">
            <Image
            className="bg-gray-300"
              preview={false}
              width={40}
              height={40}
              src={imgSrc?.toString() ?? EMPTY_IMAGE}
              alt="..."
            />
          </div>
        )}
        <input
          type="file"
          onChange={(e) => {
            const selectedFile = e.target.files && e.target.files[0];
            if (selectedFile) {
              const reader = new FileReader();
              reader.onload = (event) => {
                const base64Data = event.target && event.target.result;
                setImgSrc(base64Data);
                formik.setFieldValue("icon", base64Data);
              };

              reader.readAsDataURL(selectedFile);
            }
          }}
          accept="image/png, image/jpg, image/jpeg"
        />
        {formik.errors.icon && formik.touched.icon && (
          <p className="text-red-500">{formik.errors.icon}</p>
        )}
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button htmlType="submit" type="primary">
          {defaultValue ? "Cập Nhật" : "Thêm"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SubCategoriesForm;

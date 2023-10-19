import { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

export type TUploadProps = UploadProps["fileList"];

type TUploadImageProps = {
    filesQuantity?: number;
    getfiles?: (files: TUploadProps) => void;
    resetFile?: boolean;
}


const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  }); 

const UploadImage = ({filesQuantity = 1, getfiles, resetFile}: TUploadImageProps) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

  
    const handleCancel = () => setPreviewOpen(false);
  
    const handlePreview = async (file: UploadFile) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as RcFile);
      }
  
      setPreviewImage(file.url || (file.preview as string));
      setPreviewOpen(true);
      setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };
  
    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
      setFileList(newFileList); 
        getfiles &&  getfiles(newFileList);
    }

    useEffect(() => {
      if(resetFile === true) {
        setFileList([])
      }
    }, [resetFile])
    
  
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          multiple={filesQuantity > 1 ? true : false}
        >
          {fileList.length >= filesQuantity ? null : uploadButton}
        </Upload>
        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
}

export default UploadImage
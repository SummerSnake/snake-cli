import React, { useState } from 'react';
import { Upload, Modal, Icon } from 'antd';

interface InitProp {
  uploadCall: any;
}
function UploadImg(props: InitProp) {
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);

  const [previewImage, setPreviewImage] = useState<string>('');

  const [fileList, setFileList] = useState([]);

  /**
   * @desc 预览图片
   * @param { object } file 图片路径
   */
  function handlePreview(file) {
    const imgUrl = file.url || file.thumbUrl;
    setPreviewImage(imgUrl);
    setPreviewVisible(true);
  }

  /**
   * @desc 取消预览图片
   */
  function handleCancel() {
    setPreviewVisible(false);
  }

  /**
   * @desc 上传图片
   * @param { array } fileList 上传图片列表
   */
  function handleChange({ fileList }) {
    let imgUrl = '';
    fileList.forEach(file => {
      if (typeof file.response !== 'undefined') {
        imgUrl = `${imgUrl + file.response.data}#`;
      } else {
        imgUrl = `${imgUrl + file.name}#`;
      }
    });
    props.uploadCall(imgUrl);
    setFileList(fileList);
  }

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <div className="clearfix">
      <Upload
        action=""
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= props.limitNum ? null : uploadButton}
      </Upload>
      <Modal maskClosable={false} visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
}

export default UploadImg;

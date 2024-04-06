import React, { FC } from "react";
import PreviewWrapper from "@/components/PreviewWrapper";
import { Input, Select, Checkbox, Button, Flex } from "antd";
import { useDispatch } from "react-redux";
import { 
  setProjectDataTitle,
  setProjectDataDescription,
  setProjectDataFlipType,
  setProjectDataSlideNumber,
  setProjectDataStatus
} from "@/redux/editor/actions";

interface PreviewDataType {
  title: string
  description: string
  flipType: number
  slideNumber: boolean
  status: number
}

interface PreviewType {
  pageData: PreviewDataType
  pageId: string
  closePreview: Function
  publishFn: Function
  saveFn: Function
}

const Preview: FC<PreviewType> = ({
  pageData,
  pageId,
  closePreview,
  publishFn,
  saveFn
}) => {
  const dispatch = useDispatch();
  const onChangeTitle = (title: string) => dispatch(setProjectDataTitle(title));
  const onChangeDescription = (desc: string) => dispatch(setProjectDataDescription(desc));
  const onChangeFlipType = (fileType: number) => dispatch(setProjectDataFlipType(fileType));
  const onChangeSlideNumber = (slideNumber: boolean) => dispatch(setProjectDataSlideNumber(slideNumber));
  const onChangeStatus = (status: number) => dispatch(setProjectDataStatus(status))

  return (
    <PreviewWrapper pageId={pageId} closePreview={closePreview}>
      <p className="page-title paddingL30">页面基础设置</p>
      <div className="preview-info-wrapper">
        <div className="page-info">

          <div className="page-title-des">
            <div className="info-form-wrapper">
              <div className="info-form-l">标题：</div>
              <div className="info-form-r">
                <Input value={pageData.title} style={{ width: '80%' }} onChange={(e) => onChangeTitle(e.currentTarget.value)}/>
              </div>
            </div>
            <div className="info-form-wrapper">
              <div className="info-form-l">描述：</div>
              <div className="info-form-r">
                <Input.TextArea value={pageData.description} style={{ width: '80%' }} onChange={(e) => onChangeDescription(e.currentTarget.value)} />
              </div>
            </div>
          </div>
        </div>

        {/* 翻页方式 */}

        <div className="info-form-wrapper">
          <div className="info-form-l com-width">翻页方式：</div>
          <div className="info-form-r">
            <Select
              value={pageData.flipType}
              style={{ width: 200, height: 42 }}
              onChange={(value) => onChangeFlipType(value)}
              options={[
                { value: 0, label: '上下翻页' },
                { value: 1, label: '左右翻页' },
                { value: 2, label: '翻书效果' },
              ]}
            />
          </div>
        </div>

        <div className="info-form-wrapper">
          <div className="info-form-l com-width"></div>
          <div className="info-form-r">
            <Checkbox checked={pageData.slideNumber} onChange={(e) => onChangeSlideNumber(e.target.checked)}>显示页码</Checkbox>
          </div>
        </div>

        {/* 作品访问状态 */}
        <div className="info-form-wrapper">
          <div className="info-form-l com-width">作品访问状态：</div>
          <div className="info-form-r">
            <Select
              value={pageData.status}
              style={{ width: 200, height: 42 }}
              onChange={(value) => onChangeStatus(value)}
              options={[
                { value: 1, label: '允许访问' },
                { value: 0, label: '不允许访问' }
              ]}
            />
          </div>
        </div>

        <div className="foot-btn-wrapper">
          <Flex gap="small" wrap="wrap">
            <Button type="primary" onClick={() => publishFn()}>保存并发布</Button>
            <Button onClick={() => saveFn()} >保 存</Button>
            <Button onClick={() => closePreview()}>取 消</Button>
          </Flex>
        </div>
      </div>
    </PreviewWrapper>
  )
}

export default Preview;
import * as React from 'react'
// import { RouteComponentProps } from 'react-router'
import { Form, Input, Upload, Icon, DatePicker } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import styles from './ActivityCreate.module.scss'
import MyEditor from '../../components/MyEditor'

interface ActivityCreateProps extends FormComponentProps {

}

const Dragger = Upload.Dragger
const FormItem = Form.Item
class ActivityCreate extends React.Component<ActivityCreateProps, any> {
  public render() {
    const { getFieldDecorator } = this.props.form
    const CoverDecorator = getFieldDecorator('coverUrl', {
      rules: [{
        required: true,
        message: '请上传封面头图'
      }]
    })
    const startTimeDecorator = getFieldDecorator('startTime', {
      rules: [{
        required: true,
        message: '请选择活动开始时间'
      }]
    })
    const endTimeDecorator = getFieldDecorator('endTime', {})
    const locationDecorator = getFieldDecorator('location', {})
    const joinTypeDecorator = getFieldDecorator('joinType', {
      rules: [{
        required: true,
        message: '请选择活动加入方式'
      }]
    })
    const descriptionDecorator = getFieldDecorator('description', {})
    return (
      <div className={styles.container}>
        <Form>
          <FormItem label="上传封面图片">
            {CoverDecorator(
              <Dragger>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">点击或拖拽文件到这里进行上传</p>
                <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
              </Dragger>
            )}
          </FormItem>
          <FormItem>
            {/* {startTimeDecorator()} */}
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default ActivityCreate
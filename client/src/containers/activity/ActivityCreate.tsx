import * as React from 'react'
// import { RouteComponentProps } from 'react-router'
import { Form, Input, Upload, Icon, DatePicker, Radio, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import styles from './ActivityCreate.module.scss'
import MyEditor from '../../components/MyEditor'

interface ActivityCreateProps extends FormComponentProps {

}

const Dragger = Upload.Dragger
const FormItem = Form.Item
const RadioGroup = Radio.Group
class ActivityCreate extends React.Component<ActivityCreateProps, any> {

  handleCreate = () => {
    const { validateFields } = this.props.form
    validateFields((err, value) => {
      if (err) {
        return
      }
      // 创建发布
    })
  }

  public render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    const coverDecorator = getFieldDecorator('coverUrl', {
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

    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    }
    const descriptionDecorator = getFieldDecorator('description', {})
    return (
      <div className={styles.container}>
        <Form>
          <FormItem {...formItemLayout} label="上传封面图片">
            {coverDecorator(
              <Dragger>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">点击或拖拽文件到这里进行上传</p>
                <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
              </Dragger>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="开始时间">
            {startTimeDecorator(
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="请选择开始时间"
                disabledDate={(startValue) => {
                  const endValue = getFieldValue('endTime')
                  if (!startValue || !endValue) {
                    return false;
                  }
                  return startValue.valueOf() > endValue.valueOf();
                }}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="结束时间">
            {endTimeDecorator(
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="请选择结束时间"
                disabledDate={(endValue) => {
                  const startValue = getFieldValue('startTime')
                  if (!endValue || !startValue) {
                    return false;
                  }
                  return endValue.valueOf() <= startValue.valueOf();
                }}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="活动地点">
            {locationDecorator(
              <Input placeholder="请选择活动地点" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="加入方式">
            {joinTypeDecorator(
              <RadioGroup>
                <Radio value="0">直接加入</Radio>
                <Radio value="1">需我审批</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="活动介绍">
            {descriptionDecorator(
              <Input.TextArea placeholder="请输入活动介绍" autosize={{ minRows: 4, maxRows: 10 }}/>
            )}
          </FormItem>
          <FormItem className={styles.btnGroup}>
            <Button type="default">取消编辑</Button>
            <Button type="primary" onClick={() => this.handleCreate}>立即创建</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Form.create()(ActivityCreate)
import * as React from 'react'
import { connect } from 'react-redux'
// import { RouteComponentProps } from 'react-router'
import { Form, Input, Upload, Icon, DatePicker, Radio, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import styles from './ActivityCreate.module.scss'
import MyEditor from '../../components/MyEditor'
import API, { serverOrigin } from '../../utils/API'
import messageHandler from '../../utils/messageHandler'
import moment from 'moment'
import { fromJS } from 'immutable'
interface ActivityCreateProps extends FormComponentProps {
  user: any, // redux
}

const Dragger = Upload.Dragger
const FormItem = Form.Item
const RadioGroup = Radio.Group
class ActivityCreate extends React.Component<ActivityCreateProps, any> {
  state = {
    coverUrl: ''
  }

  handleUploadFile = (options) => {
    const { file } = options
    let formData = new FormData()
    console.log(options)
    formData.append('file', file)
    fetch(serverOrigin + '/file/upload', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    }).then((res) => res.json()).then((json) => {
      if (json.code === 0) {
        this.setState({
          coverUrl: serverOrigin + '/' + json.data
        })
      }
    })
    // API.query('/file/upload', {
    //   options: {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'multipart/form-data; boundary=2333'
    //     },
    //     body: formData
    //   }
    // }).then((json) => {
    //   if (json.code === 0) {
    //     this.setState({
    //       coverUrl: serverOrigin + '/' + json.data
    //     })
    //   }
    // })
  }

  handleCreate = () => {
    const { validateFields } = this.props.form
    const { user } = this.props
    console.log(user.toJS())
    validateFields((err, value) => {
      if (err) {
        return
      }
      // 创建发布
      API.query('/activity/check', {
        options: {
          method: 'POST',
          body: JSON.stringify({
            ...value,
            coverUrl: this.state.coverUrl,
            endTime: moment(value.endTime).valueOf(),
            startTime: moment(value.startTime).valueOf(),
            createId: user && user.get('id')
          })
        }
      }).then(messageHandler).then((json) => {
        if (json.code === 0) {
          
        }
      })
    })
  }

  public render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    const { coverUrl } = this.state
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
    const coverTmp = coverUrl.split('/')
    return (
      <div className={styles.container}>
        <Form>
          <FormItem {...formItemLayout} label="上传封面图片">
            {coverDecorator(
              <Dragger
                accept="image/*"
                customRequest={this.handleUploadFile}
                fileList={coverUrl ? [{
                  name: coverTmp[coverTmp.length - 1],
                  uid: 'uid',
                  status: 'done',
                  url: coverUrl,
                  size: 0,
                  type: 'image'
                }] : []}
                onRemove={(file) => {
                  console.log(file)
                  this.setState({
                    coverUrl: ''
                  })
                  return true
                }}
                // action={(file) => {
                //   const formData = new FormData()
                //   formData.append('file', file.response);
                //   (window as any).f = file
                //   return API.query('/file/upload', {
                //     options: {
                //       method: 'POST',
                //       body: formData,
                //     },
                //   }).then((json) => {
                //     if (json.code === 0) {
                //       this.setState({
                //         coverUrl: serverOrigin + '/' + json.data
                //       })
                //     }
                //   })
                // }}
              >
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">点击或拖拽文件到这里进行上传</p>
                {/* <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p> */}
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
            <Button type="primary" onClick={() => this.handleCreate()}>立即创建</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: fromJS(state).get('user')
  }
}

export default connect(mapStateToProps)(Form.create()(ActivityCreate))
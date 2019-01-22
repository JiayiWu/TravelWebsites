import * as React from 'react'
import { Modal, Form, Input, Upload, Button, Icon } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import styles from './JoinModal.module.scss'
import API, { serverOrigin } from '../../../utils/API'
import { ActivityItemProps } from '../ActivityHomepage'
import messageHandler from '../../../utils/messageHandler';

interface JoinModalProps extends FormComponentProps {
  onCancel: () => void,
  onOk: () => void,
  activity: ActivityItemProps | null,
}

const FormItem = Form.Item

class JoinModal extends React.Component<JoinModalProps, any> {
  state = {
    attachmentUrl: ''
  }
  handleUploadFile = (options) => {
    const { file } = options
    let formData = new FormData()
    formData.append('file', file)
    fetch(serverOrigin + '/file/upload', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    }).then((res) => res.json()).then((json) => {
      if (json.code === 0) {
        this.setState({
          attachmentUrl: serverOrigin + '/' + json.data
        })
      }
    })
  }
  handleOk = () => {
    const { validateFields } = this.props.form
    const { activity } = this.props
    validateFields((err, value) => {
      if (err) {
        return
      }
      API.query('/activity/attend', {
        options: {
          method: 'POST',
          body: JSON.stringify({
            context: value.context,
            attachmentUrl: this.state.attachmentUrl,
            userId: localStorage.getItem('userid'),
            activityId: activity && activity.id
          })
        }
      }).then(messageHandler).then((json) => {
        if (json.code === 0) {
          this.props.onOk()
        }
      })
    })
  }

  handleCancel = () => {
    this.props.onCancel()
  }
  public render() {
    const { getFieldDecorator } = this.props.form
    const { activity } = this.props
    const { attachmentUrl } = this.state
    const formItemLayout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 16
      }
    }
    const urlTmp = attachmentUrl.split('/')
    return (
      <Modal
        visible
        title="申请加入"
        wrapClassName={styles.joinModal}
        onOk={() => this.handleOk()}
        onCancel={() => this.handleCancel()}
      >
        <Form>
          <FormItem {...formItemLayout} label="活动">
            {activity && activity.name}
          </FormItem>
          <FormItem {...formItemLayout} label="申请理由">
            {getFieldDecorator('context', {
              rules: [{
                required: true,
                message: '请输入申请理由'
              }]
            })(
              <Input.TextArea placeholder="请输入申请理由" maxLength={6} minLength={3} />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="附件">
            {getFieldDecorator('attachmentUrl', {})(
              <Upload
                // accept="image/*"
                customRequest={this.handleUploadFile}
                fileList={attachmentUrl ? [{
                  name: urlTmp[urlTmp.length - 1],
                  uid: 'uid',
                  status: 'done',
                  url: attachmentUrl,
                  size: 0,
                  type: 'image'
                }] : []}
                onRemove={(file) => {
                  this.setState({
                    attachmentUrl: ''
                  })
                  return true
                }}
              >
                <Button>
                  <Icon type="upload" /> 点击上传
                </Button>
              </Upload>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(JoinModal)
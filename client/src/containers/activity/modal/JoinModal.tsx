import * as React from 'react'
import { Modal, Form, Input, Upload } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import styles from './JoinModal.module.scss'

interface JoinModalProps extends FormComponentProps {
  onCancel: () => void,
  onOk: () => void,
}

const FormItem = Form.Item

class JoinModal extends React.Component<JoinModalProps, any> {
  handleOk = () => {

  }

  handleCancel = () => {
    this.props.onCancel()
  }
  public render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 16
      }
    }
    return (
      <Modal
        visible
        title="申请加入"
        wrapClassName={styles.joinModal}
        onOk={() => this.handleOk()}
        onCancel={() => this.handleCancel()}
      >
        <Form>
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
              <Upload />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(JoinModal)
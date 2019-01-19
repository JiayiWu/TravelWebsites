import * as React from 'react'
import { Modal, Form } from 'antd'
import styles from './ApplyModal.module.scss'

interface ApplyModalProps {
  type: number,
  onCancel: () => void,
}

export const APPLY_TYPE = {
  PERSON_VERIFY: 2,
  ACT_JOIN: 1,
}

const FormItem = Form.Item

class ApplyModal extends React.Component<ApplyModalProps, any> {
  handleAgree = () => {
    this.props.onCancel()
  }
  handleRefuse = () => {
    this.props.onCancel()
  }
  public render() {
    const { type } = this.props
    const formItemLayout = {
      labelCol: {
        span:  4
      },
      wrapperCol: {
        span: 16
      }
    }
    return (
      <Modal
        visible
        title={type === APPLY_TYPE.ACT_JOIN ? '加入审批' : '身份认证审批'}
        wrapClassName={styles.applyModal}
        okText="同意"
        cancelText="拒绝"
        onOk={() => this.handleAgree()}
        onCancel={() => this.handleRefuse()}
      >
        <Form>
          {type === APPLY_TYPE.ACT_JOIN &&
            <FormItem {...formItemLayout} label="申请加入">
              烎潮音发布夜
            </FormItem>
          }
          
          <FormItem {...formItemLayout} label="申请人">
            张文玘
          </FormItem>
          <FormItem {...formItemLayout} label="申请理由">
            华晨宇华晨宇啊啊啊啊啊
          </FormItem>
          <FormItem {...formItemLayout} label={type === APPLY_TYPE.ACT_JOIN ? "附加信息" : "认证照片"}>
            <div className={styles.attachment}/>
          </FormItem>
        </Form>
        {/* <div className={styles.container}>
          <div className={styles.item}>
            <div className={styles.label}>
              申请加入活动：
            </div>
            <div className={styles.content}>
              烎潮音发布夜
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.label}>
              申请人：
            </div>
            <div className={styles.content}>
              张文玘
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.label}>
              申请理由：
            </div>
            <div className={styles.content}>
              华晨宇华晨宇啊啊啊啊啊
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.label}>
              附加信息：
            </div>
            <div className={styles.content} />
              
          </div>
        </div> */}
      </Modal>
    )
  }
}

export default ApplyModal
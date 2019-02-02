import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import { Modal, Form, Icon, Button, message } from 'antd'
import { serverOrigin } from '../../../utils/API'
import { NOTICE_STATE } from '../NoticeItem'
import { applyJoinAct } from '../../../actions/activity'
import { applyVerify } from '../../../actions/auth'
import styles from './ApplyModal.module.scss'
import messageHandler from '../../../utils/messageHandler'

interface ApplyModalProps {
  type: number,
  item: any,
  onHide?: Function,
  pushURL: Function,
  applyJoinAct: Function, // redux
  applyVerify: Function, // redux
  onCancel: () => void,
}

export const APPLY_TYPE = {
  PERSON_VERIFY: 2,
  ACT_JOIN: 1,
  ACT_CREATE_RESULT: 3,
}

const FormItem = Form.Item

class ApplyModal extends React.Component<ApplyModalProps, any> {
  handleOk = () => {
    const { type, item } = this.props
    if (type === APPLY_TYPE.ACT_CREATE_RESULT) {
      this.props.onCancel()
      if (this.props.onHide) {
        this.props.onHide()
      }
      this.props.pushURL(`/workspace/activity/detail/${item.authActivityInfoVO.id}`)
    } else if (type === APPLY_TYPE.ACT_JOIN) {
      // TODO 同意加入活动审批和身份认证审批
      this.handleJoinAct(1)
    } else if (type === APPLY_TYPE.PERSON_VERIFY) {
      this.handlePersonVerify(1)
    }
  }
  handleClose = () => {
    const { type, item } = this.props
    if (type === APPLY_TYPE.ACT_CREATE_RESULT) {
      this.props.onCancel()
    } else if (type === APPLY_TYPE.ACT_JOIN) {
      this.handleJoinAct(2)
      // TODO 拒绝加入活动审批和身份认证审批
      // this.props.onCancel()
    } else if (type === APPLY_TYPE.PERSON_VERIFY) {
      this.handlePersonVerify(2)
    }
  }
  /**
   * result 1 通过 2 拒绝
   */
  handleJoinAct = (result) => {
    const { item } = this.props
    this.props.applyJoinAct(item.activity.id, item.applyUserInfo.id, result).then(messageHandler).then((json) => {
      if (json.code === 0) {
        message.success(result === 0 ? '已同意' : '已拒绝')
        this.props.onCancel()
      }
    })
  }
  /**
   * state: 1 通过 2 拒绝
   */
  handlePersonVerify = (state) => {
    const { item } = this.props
    this.props.applyVerify(item.applyUserInfo.id, state).then(messageHandler).then((json) => {
      if (json.code === 0) {
        message.success(state === 1 ? '已同意' : '已拒绝')
        this.props.onCancel()
      }
    })
  }
  getModalHeader = (type) => {
    switch(type) {
      case APPLY_TYPE.ACT_JOIN:
        return '加入活动审批'
      case APPLY_TYPE.PERSON_VERIFY:
        return '身份认证审批'
      case APPLY_TYPE.ACT_CREATE_RESULT:
        return '创建活动审批'
    }
  }
  getUserName = (item) => {
    const { type } = this.props
    switch(type) {
      case APPLY_TYPE.ACT_JOIN:
        return item.applyUserInfo.name
      case APPLY_TYPE.ACT_CREATE_RESULT:
        return item.authActivityInfoVO.creator.name
      case APPLY_TYPE.PERSON_VERIFY:
        return item.userInfo.name
      default:
        return item.username
    }
  }
  public render() {
    const { type, item } = this.props
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
        title={this.getModalHeader(type)}
        wrapClassName={styles.applyModal}
        footer={
          <div className={styles.footer}>
            <Button type="default" onClick={() => this.handleClose()}>{type === APPLY_TYPE.ACT_CREATE_RESULT ? '取消' : '拒绝'}</Button>
            <Button type="primary" onClick={() => this.handleOk()}>{type === APPLY_TYPE.ACT_CREATE_RESULT ? '查看详情' : '同意'}</Button>            
          </div>
        }
        // onOk={() => this.handleAgree()}
        onCancel={() => this.props.onCancel()}
      >
        <Form>
          {type === APPLY_TYPE.ACT_JOIN &&
            <FormItem {...formItemLayout} label="申请加入">
              {item.activity.title}
            </FormItem>
          }
          {type === APPLY_TYPE.ACT_CREATE_RESULT &&
            <FormItem {...formItemLayout} label="申请创建">
              {item.title}
            </FormItem>
          }
          
          <FormItem {...formItemLayout} label="申请人">
            {this.getUserName(item)}
          </FormItem>
          <FormItem {...formItemLayout} label="申请时间">
            {moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}
          </FormItem>
          {type !== APPLY_TYPE.ACT_CREATE_RESULT &&
            [
              <FormItem {...formItemLayout} label="申请理由">
                {item.context}
              </FormItem>,
              <FormItem {...formItemLayout} label={type === APPLY_TYPE.ACT_JOIN ? "附加信息" : "认证照片"}>
                {item.attachmentUrl ? 
                  <div className={styles.attachment} style={{ backgroundImage: `url(${serverOrigin}/${item.attachmentUrl})`}}/>
                  :
                  '暂无'
                }
              </FormItem>
            ]
          }
          {(item.state === NOTICE_STATE.SUCCESS || item.state === NOTICE_STATE.FAIL) &&
            <div className={styles.applyInfo}>
              <Icon theme="filled" type="exclamation-circle" />
              {item.state === NOTICE_STATE.SUCCESS ? '已同意' : '已拒绝'}
              <span className={styles.time}>{moment(item.modifyTime).format('YYYY-MM-DD HH:mm:ss')}</span>
            </div>
          }  
        </Form>
      </Modal>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return {
    applyJoinAct: bindActionCreators(applyJoinAct, dispatch),
    applyVerify: bindActionCreators(applyVerify, dispatch),
  }
}
export default connect(() => {}, mapDispatchToProps)(ApplyModal)
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import { pushURL } from '../../actions/route'
import styles from './NoticeItem.module.scss'
// import JoinModal from '../activity/modal/JoinModal'
import ApplyModal, { APPLY_TYPE } from './modal/ApplyModal'
import { ActivityItemProps } from '../activity/ActivityDetail'
import { UserBasicProps } from '../profile/ProfileHomepage'

interface VeirfyItemProps {
  applyTime: string,
  attachmentUrl: string,
  context: string,
  id: number,
  state: number,
  userId: number,
  username: string,
}

interface ApplyCreateItemProps {
  authActivityInfoVO: ActivityItemProps,
  createTime: number,
  id: number,
  modifyTime: number,
  state: number,
}

interface ApplyJoinItemProps {
  activity: ActivityItemProps,
  applyUserInfo: UserBasicProps,
  attachmentUrl: string,
  context: string,
  createTime: number,
  id: number,
  modifyTime: number,
  state: number,
}

interface NoticeItemProps {
  type: number,
  notice: ApplyCreateItemProps | any,
  applyCreateNotice?: ApplyCreateItemProps,
  applyJoinNotice?: ApplyJoinItemProps,
  verifyNotice?: VeirfyItemProps,
  onHide?: () => void,
  pushURL: Function, // redux
}

export const ITEM_TYPE = {
  ACT_CREATE: 3,
  ACT_JOIN: 1,
  PERSON_VERIFY: 2,
  NULL: 0,
}

export const NOTICE_STATE = {
  WAITING: 0, // 待审批
  SUCCESS: 1, // 通过审批
  FAIL: 2, // 拒绝审批
}



class NoticeItem extends React.Component<NoticeItemProps, any> {
  state = {
    showApplyModal: ITEM_TYPE.NULL
  }
  handleNotice = () => {
    const { type, applyCreateNotice } = this.props
    if (type === ITEM_TYPE.ACT_CREATE && applyCreateNotice) {
      if (applyCreateNotice.state === NOTICE_STATE.SUCCESS || applyCreateNotice.state === NOTICE_STATE.FAIL) {
        this.setState({
          showApplyModal: type,
        })
      } else {
        if (this.props.onHide) {
          this.props.onHide()
        }
        this.props.pushURL(`/workspace/activity/detail/apply/${applyCreateNotice.authActivityInfoVO.id}`, { detail: applyCreateNotice.authActivityInfoVO })
      }
      
    } else if (type === ITEM_TYPE.ACT_JOIN) {
      this.setState({
        showApplyModal: type
      })
    } else if (type === ITEM_TYPE.PERSON_VERIFY) {
      this.setState({
        showApplyModal: type,
      })
    }
  }
  getApplyer = () => {
    const { type, notice } = this.props
    if (!notice) {
      return null
    }
    switch(type) {
      case ITEM_TYPE.ACT_CREATE:
        return notice.authActivityInfoVO.creator
      case ITEM_TYPE.PERSON_VERIFY:
        return notice.username
      default:
        return null
    }
  }

  renderTypeInfo = () => {
    const { type, applyCreateNotice, verifyNotice } = this.props
    
    if (type === ITEM_TYPE.ACT_CREATE && applyCreateNotice) {
      return (
        <span className={styles.typeInfo}>
          申请创建活动&nbsp;
          <span className={styles.text}>{applyCreateNotice.authActivityInfoVO.title}</span>
        </span>
      )
    } else if (type === ITEM_TYPE.ACT_JOIN) {
      return (
        <span className={styles.typeInfo}>
          申请加入活动&nbsp;
          <span className={styles.text}>活动名称</span>
        </span>
      )
    } else if (type === ITEM_TYPE.PERSON_VERIFY && verifyNotice) {
      return (
        <span className={styles.typeInfo}>
          申请学生认证&nbsp;
        </span>
      )
    }
  }
  public render() {
    const { type, notice } = this.props
    const { showApplyModal } = this.state
    const applyer = this.getApplyer()
    return (
      <div className={styles.container}>
        <div className={styles.notice}>
          <div className={styles.info}>
            用户&nbsp;
            <span className={styles.text}>{applyer && applyer.name}</span>
            &nbsp;
            {this.renderTypeInfo()}
            <div className={styles.operation} onClick={()=> this.handleNotice()}>查看详情</div>
          </div>
          <div className={styles.time}>
            {moment(notice.createTime).format('YYYY-MM-DD HH:mm:ss')}
          </div>
          {/* <div className={styles.operation} onClick={() => this.handleNotice()}>
            查看详情
          </div> */}
        </div>
        {showApplyModal !== ITEM_TYPE.NULL  &&
          <ApplyModal 
            type={showApplyModal}
            item={notice}
            onHide={this.props.onHide}
            pushURL={this.props.pushURL}
            onCancel={() => this.setState({ showApplyModal: ITEM_TYPE.NULL })}
          />
        }
      </div>
    )
          
    
  }
}

function mapStateToProps(state) {
  return {}
}
function mapDispatchToProps(dispatch) {
  return {
    pushURL: bindActionCreators(pushURL, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoticeItem)
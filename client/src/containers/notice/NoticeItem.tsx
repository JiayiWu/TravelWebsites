import * as React from 'react'
import styles from './NoticeItem.module.scss'
// import JoinModal from '../activity/modal/JoinModal'
import ApplyModal, { APPLY_TYPE } from './modal/ApplyModal'

interface NoticeItemProps {
  type: number,
}

export const ITEM_TYPE = {
  ACT_CREATE: 3,
  ACT_JOIN: 1,
  PERSON_VERIFY: 2,
  NULL: 0,
}



class NoticeItem extends React.Component<NoticeItemProps, any> {
  state = {
    showApplyModal: ITEM_TYPE.NULL
  }
  handleNotice = () => {
    const { type } = this.props
    if (type === ITEM_TYPE.ACT_CREATE) {

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

  renderTypeInfo = () => {
    const { type } = this.props
    if (type === ITEM_TYPE.ACT_CREATE) {
      return (
        <span className={styles.typeInfo}>
          申请创建活动&nbsp;
          <span className={styles.text}>烎潮音发布夜</span>
        </span>
      )
    } else if (type === ITEM_TYPE.ACT_JOIN) {
      return (
        <span className={styles.typeInfo}>
          申请加入活动&nbsp;
          <span className={styles.text}>活动名称</span>
        </span>
      )
    } else if (type === ITEM_TYPE.PERSON_VERIFY) {
      return (
        <span className={styles.typeInfo}>
          申请学生认证&nbsp;
        </span>
      )
    }
  }
  public render() {
    const { type } = this.props
    const { showApplyModal } = this.state
    return (
      <div className={styles.container}>
        <div className={styles.notice}>
          <div className={styles.info}>
            用户&nbsp;
            <span className={styles.text}>张文玘</span>
            &nbsp;
            {this.renderTypeInfo()}
          </div>
          <div className={styles.operation} onClick={() => this.handleNotice()}>
            查看详情
          </div>
        </div>
        {showApplyModal !== ITEM_TYPE.NULL  &&
          <ApplyModal 
            type={showApplyModal}
            onCancel={() => this.setState({ showApplyModal: ITEM_TYPE.NULL })}
          />
        }
      </div>
    )
          
    
  }
}

export default NoticeItem
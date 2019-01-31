import * as React from 'react'
import { fromJS } from 'immutable'
import { connect } from 'react-redux'
import { Tabs } from 'antd'
import API from '../../utils/API'
import styles from './NoticeIndex.module.scss'
import NoticeItem, { ITEM_TYPE } from './NoticeItem'
import { USER_TYPE } from '../profile/ProfileHomepage'

const { TabPane } = Tabs

interface NoticeIndexProps {
  user: any, // redux
}

const TAB_TYPE = {
  NOTICE: "0", // 系统通知
  ACT_APPLY: "1", // 活动审批
  PERSON_APPLY: "2", // 学生认证
}

class NoticeIndex extends React.Component<NoticeIndexProps, any> {
  state = {
    applyNotice: {
      current: 'all',
      all: [],
      waiting: [],
      accept: [],
      reject: [],
    },
    verifyNotice: {
      current: 'all',
      all: [],
      waiting: [],
      accept: [],
      reject: [],
    },
  }
  componentDidMount() {
    this.initialNotice()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.get('id') !== this.props.user.get('id')) {
      this.initialNotice(nextProps)
    }
  }
  initialNotice = (props = this.props) => {
    const { user } = props
    if (user.type === USER_TYPE.ADMIN) {
      this.fetchVerifyNotice(0).then((json) => {
        if (json.code === 0) {
          this.setState({
            verifyNotice: {
              ...this.state.verifyNotice,
              all: json.data,
            }
          })
        }
      })
    }
    this.fetchApplyNotice().then((json) => {
      console.log('fetch apply notice')
      if (json.code === 0) {
        this.setState({
          applyNotice: {
            ...this.state.applyNotice,
            all: json.data,
          }
        })
      }
    })
  }
  fetchVerifyNotice = (lastId, state = 0) => {
    // const { verifyNotice } = this.state
    return API.query('/admin/application/userList', {
      searchParams: {
        lastId,
        state,
        // lastId: verifyNotice.length === 0 ? 0 : verifyNotice[verifyNotice.length - 1].id
      },
      options: {
        method: 'POST'
      }
    })
  }
  fetchApplyNotice = (state = -1) => {
    const { user } = this.props
    return user.get('type') === USER_TYPE.NORMAL ?  API.query(`/activity/application/list/${state}`, {})
      :
      API.query(`/admin/application/list/${state}`, {})
  }
  setNoticeState = (type, state = 'all') => {
    if (type === TAB_TYPE.ACT_APPLY) {
      this.setState({
        applyNotice: {
          ...this.state.applyNotice,
          current: state,
        }
      })
    } else if (type === TAB_TYPE.PERSON_APPLY) {
      this.setState({
        verifyNotice: {
          ...this.state.verifyNotice,
          current: state,
        }
      })
    }
  }
  renderHeader = (type) => {
    const { applyNotice, verifyNotice } = this.state
    let currentState = 'all'
    switch(type) {
      case TAB_TYPE.ACT_APPLY:
        currentState = applyNotice.current
        break
      case TAB_TYPE.PERSON_APPLY:
        currentState = verifyNotice.current
        break
      default:
        return
    }
    return (
      <div className={styles.header}>
        <div className={styles.item} onClick={() => this.setNoticeState(type, 'all')} data-active={'all' === currentState}>所有</div>
        <div className={styles.item} onClick={() => this.setNoticeState(type, 'waiting')} data-active={'waiting' === currentState}>待审批</div>
        <div className={styles.item} onClick={() => this.setNoticeState(type, 'accept')} data-active={'accept' === currentState}>审批通过</div>
        <div className={styles.item} onClick={() => this.setNoticeState(type, 'reject')} data-active={'reject' === currentState}>审批拒绝</div>
      </div>
    )
  }
  public render() {
    const { user } = this.props
    const { applyNotice, verifyNotice } = this.state
    return (
      <div className={styles.container}>
        <Tabs tabPosition="left" style={{ height: '100%' }}>
          {/* <TabPane tab="系统通知" key={TAB_TYPE.NOTICE}>
            {[0, 1, 2].map((notice, index) => {
              return <NoticeItem />
            })}
          </TabPane> */}
          <TabPane tab="活动审批" key={TAB_TYPE.ACT_APPLY} className={styles.tabPane}>
            {this.renderHeader(TAB_TYPE.ACT_APPLY)}
            {applyNotice[applyNotice.current].map((notice, index) => {
              return user.get('type') === USER_TYPE.ADMIN ? (
                <NoticeItem 
                  type={user.get('type') === USER_TYPE.NORMAL ? ITEM_TYPE.ACT_JOIN : ITEM_TYPE.ACT_CREATE} 
                  notice={notice}
                  applyCreateNotice={notice}
                  key={index}
                />
              ) : (
                <NoticeItem
                  type={user.get('type') === USER_TYPE.NORMAL ? ITEM_TYPE.ACT_JOIN : ITEM_TYPE.ACT_CREATE} 
                  notice={notice}
                  applyJoinNotice={notice}
                  key={index}
                />
              )
            })}
            {/* {[0, 1, 2].map((notice, index) => {
              return <NoticeItem type={ITEM_TYPE.ACT_JOIN}/>
            })} */}
          </TabPane>
          <TabPane tab="学生认证" key={TAB_TYPE.PERSON_APPLY} className={styles.tabPane}>
            {this.renderHeader(TAB_TYPE.ACT_APPLY)}
            {verifyNotice[verifyNotice.current].map((notice, index) => {
              return (
                <NoticeItem type={ITEM_TYPE.PERSON_VERIFY} notice={notice}/>
              )
            })}
            {/* {[0, 1, 2].map((notice, index) => {
              return <NoticeItem type={ITEM_TYPE.PERSON_VERIFY}/>
            })} */}
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    user: fromJS(state).get('user')
  }
}
export default connect(mapStateToProps)(NoticeIndex)
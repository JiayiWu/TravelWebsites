import * as React from 'react'
import { fromJS } from 'immutable'
import { connect } from 'react-redux'
import { Tabs } from 'antd'
import API from '../../utils/API'
import styles from './NoticeIndex.module.scss'
import NoticeItem, { ITEM_TYPE } from './NoticeItem'
import { USER_TYPE } from '../profile/ProfileHomepage'
import DynamicScrollPane from '../../components/DynamicScrollPane'
import messageHandler from '../../utils/messageHandler'

const { TabPane } = Tabs

interface NoticeIndexProps {
  user: any, // redux
  hide: () => void,
}

const TAB_TYPE = {
  NOTICE: "0", // 系统通知
  ACT_APPLY: "1", // 活动审批
  PERSON_APPLY: "2", // 学生认证
}

const getStateType = (stateStr) => {
  switch(stateStr) {
    case 'all':
      return -1
    case 'waiting':
      return 0
    case 'accept':
      return 1
    case 'reject':
      return 2
  }
}
class NoticeIndex extends React.Component<NoticeIndexProps, any> {
  state = {
    applyNotice: {
      current: 'all',
      all: [],
      waiting: [],
      accept: [],
      reject: [],
      hasMore: false,
      isLoading: false,
    },
    verifyNotice: {
      current: 'all',
      all: [],
      waiting: [],
      accept: [],
      reject: [],
      hasMore: true,
      isLoading: false,
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
              hasMore: json.data.length !== 0,
              isLoading: false,
            }
          })
        }
      })
    }
    this.fetchApplyNotice(-1, props).then((json) => {
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
  fetchVerifyNotice = (lastId, state = -1) => {
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
  fetchApplyNotice = (state = -1, props = this.props) => {
    const { user } = props
    console.log(user.toJS())
    return user.get('type') === USER_TYPE.NORMAL ?  API.query(`/activity/application/list/${state}`, {})
      :
      API.query(`/admin/application/list/${state}`, {})
  }
  // handleLoadMoreAct = () => {
  //   const { applyNotice } = this.state
  //   this.setState({
  //     applyNotice: {
  //       ...applyNotice,
  //       isLoading: true,
  //     }
  //   })
  //   this.fetchApplyNotice(getStateType(applyNotice.current)).then(messageHandler).then((json) => {
  //     if (json.code === 0) {
  //       const state = applyNotice.current
  //       let newList = applyNotice
  //       newList[state] = newList[state].concat(json.data)
  //       newList.hasMore = json.data.length !== 0
  //       newList.isLoading = false
  //       this.setState({
  //         applyNotice: newList
  //       })
  //     }
  //   })
  // }
  handleLoadMoreVerify = () => {
    const { verifyNotice } = this.state
    this.setState({
      verifyNotice: {
        ...verifyNotice,
        isLoading: true,
      }
    })
    const state = verifyNotice.current
    this.fetchVerifyNotice(verifyNotice[state].length > 0 ? verifyNotice[state][verifyNotice[state].length - 1].id : 0, getStateType(state)).then(messageHandler).then((json) => {
      if (json.code === 0) {
        const state = verifyNotice.current
        let newList = verifyNotice
        newList[state] = newList[state].concat(json.data)
        newList.hasMore = json.data.length !== 0
        newList.isLoading = false
        this.setState({
          verifyNotice: newList
        })
      }
    })
  }
  setNoticeState = (type, state = 'all') => {
    const { applyNotice, verifyNotice } = this.state
    if (type === TAB_TYPE.ACT_APPLY) {
      // this.setState({
      //   applyNotice: {
      //     ...this.state.applyNotice,
      //     current: state,
      //   }
      // })

      this.fetchApplyNotice(getStateType(state)).then(messageHandler).then((json) => {
        if (json.code === 0) {
          let newList = applyNotice
          newList[state] = json.data
          newList.current = state
          this.setState({
            applyNotice: newList
          })
        }
      })
    } else if (type === TAB_TYPE.PERSON_APPLY) {
      const list = verifyNotice[state]
      this.fetchVerifyNotice(list.length > 0 ? list[list.length - 1].id : 0, getStateType(state)).then(messageHandler).then((json) => {
        if (json.code === 0) {
          let newList = verifyNotice
          newList[state] = verifyNotice[state].concat(json.data)
          newList.current = state
          this.setState({
            verifyNotice: newList,
          })
        }
      })
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
          
          <TabPane tab="活动审批" key={TAB_TYPE.ACT_APPLY} >
            <DynamicScrollPane
              isLoading={applyNotice.isLoading}
              loadMore={()=> {}}
              wrapClassName={styles.tabPane}
              hasMore={applyNotice.hasMore}
            >
            {this.renderHeader(TAB_TYPE.ACT_APPLY)}
            {applyNotice[applyNotice.current].map((notice, index) => {
              return user.get('type') === USER_TYPE.ADMIN ? (
                <NoticeItem 
                  type={user.get('type') === USER_TYPE.NORMAL ? ITEM_TYPE.ACT_JOIN : ITEM_TYPE.ACT_CREATE} 
                  notice={notice}
                  applyCreateNotice={notice}
                  key={index}
                  onHide={this.props.hide}
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
            </DynamicScrollPane>
              
              {/* {[0, 1, 2].map((notice, index) => {
                return <NoticeItem type={ITEM_TYPE.ACT_JOIN}/>
              })} */}
          </TabPane>
          
          
          {user.get('type') === USER_TYPE.ADMIN &&
            <TabPane tab="学生认证" key={TAB_TYPE.PERSON_APPLY}>
              <DynamicScrollPane
                isLoading={verifyNotice.isLoading}
                loadMore={this.handleLoadMoreVerify}
                wrapClassName={styles.tabPane}
                hasMore={verifyNotice.hasMore}
              >
                {this.renderHeader(TAB_TYPE.PERSON_APPLY)}
                {verifyNotice[verifyNotice.current].map((notice, index) => {
                  return (
                    <NoticeItem 
                      type={ITEM_TYPE.PERSON_VERIFY} 
                      notice={notice}
                      verifyNotice={notice}
                    />
                  )
                })}
              </DynamicScrollPane>
              
              {/* {[0, 1, 2].map((notice, index) => {
                return <NoticeItem type={ITEM_TYPE.PERSON_VERIFY}/>
              })} */}
            </TabPane>
          }
          
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
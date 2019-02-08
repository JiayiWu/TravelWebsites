import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux' 
import { Icon, message } from 'antd'
import styles from './ActivityDetail.module.scss'
import API from '../../utils/API'
import messageHandler from '../../utils/messageHandler'
import DefaultCover from '../../utils/image/ActivityCover.jpg'
// import Logo from '@utils/image/activity/a1.jpg'
// import COVER from '@utils/image/activity/a2.jpg'
// import CREATOR from '@utils/image/activity/a4.jpg'

import ActivityDetailContent from './components/ActivityDetailContent'
import { UserBasicProps, USER_TYPE } from '../profile/ProfileHomepage'
import { fromJS } from 'immutable';

import { attendAct, quitAct, applyAct, cancelAct, endAct } from '../../actions/activity'
import { pushURL } from '../../actions/route'
import JoinModal from './modal/JoinModal';

export interface ActivityItemProps {
  coverUrl: string,
  creator: UserBasicProps,
  description: string,
  endTime: number,
  id: number,
  joinType: string | number,
  location: string,
  startTime: number,
  attendList?: Array<UserBasicProps>,
  title: string,
  state: number,
  type: number,
}

interface ActivityDetailProps {
  user: any, // redux
  attendAct: Function, // redux
  quitAct: Function, // redux
  applyAct: Function, // redux
  pushURL: Function, // redux
  cancelAct: Function, // redux
  endAct: Function, // redux
  route: any, // redux
}

const APPLY_TYPE = {
  AGREE: 1,
  REFUSE: 2,
}

export const ACTIVITY_STATE = {
  NEW: 0, // 审批中
  VALID: 1, // 通过审批
  INVALID: 2, // 未通过审批
  DELETE: 3, // 已取消
  END: 4, // 已结束
}

// const USER = {
//   id: 0,
//   logoUrl: Logo,
//   mail: '12345@qq.com',
//   mobile: '18260068636',
//   name: '张文玘',
//   type: 0
// }

// const DETAIL = {
//   attendList: [USER, USER],
//   coverUrl: COVER,
//   creator: {...USER, logoUrl: CREATOR},
//   description: '独家！#烎潮音发布夜# 活捉一只新鲜的彩排花！认真又努力的。华晨宇 会给我们带来什么样的惊喜呢！搓手期待华语乐坛新生代领军人物@华晨宇yu ！明天直播见',
//   endTime: new Date().getTime(),
//   id: 0,
//   joinType: 0,
//   location: '南京',
//   startTime: new Date().getTime(),
//   title: '烎潮音发布夜烎潮音发布夜烎潮音发布夜烎潮音发布夜烎潮音发布夜烎潮音发布夜'
// }

class ActivityDetail extends React.Component<RouteComponentProps & ActivityDetailProps, { detail: ActivityItemProps | null, showJoinModal: boolean }> {

  state : { detail: ActivityItemProps | null, showJoinModal: boolean } = {
    detail: null,
    showJoinModal: false,
  }
  
  componentDidMount() {
    const { route, match } = this.props
    // console.log(route)
    if (match.path.indexOf('apply') >= 0) {
      if (route.getIn(['state', 'detail'])) {
        this.setState({
          detail: route.getIn(['state', 'detail']).toJS()
        })
      } else {
        this.fetchActivityDetail()
      }
    } else {
      this.fetchActivityDetail()
    }
  }
  componentWillReceiveProps(nextProps) {
    // TODO 之后加上id之后需要判断两次id是否相同，是否需要重新获取
    if (nextProps.match.path.indexOf('apply') && nextProps.route.getIn(['state', 'detail'])) {
      this.setState({
        detail: nextProps.route.getIn(['state', 'detail']).toJS()
      })
    } else {
      this.fetchActivityDetail(nextProps)
    }
  }

  fetchActivityDetail = (props = this.props) => {
    const { match } = props
    const params = match.params as any
    API.query(`/activity/info/${params.id}`, {}).then((messageHandler)).then((json) => {
      if (json.code === 0) {
        this.setState({
          detail: json.data
        })
      }
    })
  }

  handleAttendAct = () => {
    const { detail } = this.state
    const { user } = this.props
    if (!detail) {
      return
    }
    if (detail.joinType === 1) {
      this.setState({
        showJoinModal: true
      })
    } else {
      this.props.attendAct({ activityId: detail.id, userId: user.id }).then((json) => {
        if (json.code === 0) {
          this.fetchActivityDetail()
        }
      })

    }
  }

  fetchAttendAct = (options) => {
    
  }

  handleQuitAct = () => {
    const { detail } = this.state
    const { user } = this.props
    if (!detail) {
      return
    }
    this.props.quitAct(detail.id, user.get('id')).then((json) => {
      if (json.code === 0) {
        this.fetchActivityDetail()
      }
    })
  }

  handleApplyAct = (type) => {
    const { detail } = this.state
    if (!detail) {
      return 
    }
    this.props.applyAct(detail.id, type).then(messageHandler).then((json) => {
      if (json.code === 0) {
        message.success(type === APPLY_TYPE.AGREE ? '同意' : '拒绝' + '成功')
        this.props.pushURL('/workspace/activity/detail/'+detail.id)
      }
    })
  }

  handleCancelAct = () => {
    const { detail } = this.state
    if (!detail) {
      return
    }
    this.props.cancelAct(detail.id).then(messageHandler).then((json) => {
      if (json.code === 0) {
        message.success('取消活动成功')
        this.props.pushURL('/workspace/activity')
      }
    })
  }

  handleEndAct = () => {
    const { detail } = this.state
    // const { user } = this.props
    if (!detail) {
      return
    } 
    this.props.endAct(detail.id).then(messageHandler).then((json) => {
      if (json.code === 0) {
        message.success('结束活动成功')
        this.props.pushURL('/workspace/activity')
      }
    })
  }

  public render() {
    const { detail } = this.state
    const { user, match } = this.props
    if (!detail) {
      return null
    }
    const isAttender = detail.attendList ? detail.attendList.find((attend) => attend.id === user.get('id')) : false
    // const isCreator = detail.creator.id === user.id
    return detail && (
      <div className={styles.container}>
        <div className={styles.headerContainer} style={{ backgroundImage: `url(${detail.coverUrl || DefaultCover})`}}>
          <h1 className={styles.titleWrapper}>
            <div>
              {detail.title}
            </div>
          </h1>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.centerContainer}>
            <div className={styles.creatorAvatar} style={{ backgroundImage: `url(${detail.creator.logoUrl})`}}/>

            <div className={styles.left}>
              {detail.creator.name}
            </div>
            <div className={styles.right}>
              {user.get('type') === USER_TYPE.ADMIN ? 
                (match.path.indexOf('apply') >= 0 ? 
                  [detail.state !== ACTIVITY_STATE.DELETE && detail.state !== ACTIVITY_STATE.INVALID &&
                    <div className={styles.headerBtn} onClick={() => this.handleApplyAct(APPLY_TYPE.AGREE)}>
                      <Icon type="check-circle" />
                      <br />
                      同意创建
                    </div>,
                    detail.state !== ACTIVITY_STATE.DELETE && detail.state !== ACTIVITY_STATE.INVALID &&
                    <div className={styles.headerBtn} onClick={() => this.handleApplyAct(APPLY_TYPE.REFUSE)}>
                      <Icon type="close-circle" />
                      <br />
                      拒绝创建
                    </div>
                  ]
                  : 
                  <div className={styles.headerBtn} onClick={() => this.handleCancelAct()}>
                    <Icon type="minus-circle" />
                    <br />
                    取消
                  </div>
                ) : 
                isAttender ? 
                <div className={styles.headerBtn} onClick={this.handleQuitAct}>
                  <Icon type="export" />
                  <br />
                  退出
                </div>
                :
                (detail.creator.id === user.get('id') ? 
                  [detail.state !== ACTIVITY_STATE.VALID && detail.state !== ACTIVITY_STATE.INVALID && detail.state !== ACTIVITY_STATE.END && detail.state !== ACTIVITY_STATE.DELETE &&
                  <div className={styles.headerBtn} onClick={() => this.props.pushURL(`/workspace/activity/update/${detail.id}`, {
                    detail: detail
                  })}>
                    <Icon type="edit" />
                    <br />
                    编辑
                  </div>,
                  detail.state !== ACTIVITY_STATE.END && detail.state !== ACTIVITY_STATE.DELETE && detail.state !== ACTIVITY_STATE.INVALID &&
                  <div className={styles.headerBtn} onClick={this.handleCancelAct}>
                    <Icon type="minus-circle" />
                    <br />
                    取消
                  </div>,
                  detail.state !== ACTIVITY_STATE.END && detail.state !== ACTIVITY_STATE.DELETE && detail.state !== ACTIVITY_STATE.INVALID &&
                  <div className={styles.headerBtn} onClick={this.handleEndAct}>
                    <Icon type="poweroff" />
                    <br />
                    结束
                  </div>
                  ]
                  :
                  detail.state !== ACTIVITY_STATE.END && detail.state !== ACTIVITY_STATE.DELETE && detail.state !== ACTIVITY_STATE.INVALID &&
                  <div className={styles.headerBtn} onClick={this.handleAttendAct}>
                    <Icon type="plus-circle" />
                    <br />
                    参加
                  </div>
                )
              }
              
            </div>
          </div>
          
        </div>
        <div style={{ width: 1000, margin: 'auto' }}>
          <ActivityDetailContent detail={detail}/>
        </div>
        {this.state.showJoinModal && 
          <JoinModal 
            activity={detail}
            onOk={() => {
              this.setState({
                showJoinModal: false,
              })
              this.fetchActivityDetail()
            }}
            onCancel={() => this.setState({
              showJoinModal: false,
            })}
          />
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: fromJS(state).get('user'),
    route: fromJS(state).get('route'),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    attendAct: bindActionCreators(attendAct, dispatch),
    quitAct: bindActionCreators(quitAct, dispatch),
    applyAct: bindActionCreators(applyAct, dispatch),
    cancelAct: bindActionCreators(cancelAct, dispatch),
    endAct: bindActionCreators(endAct, dispatch),
    pushURL: bindActionCreators(pushURL, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetail)
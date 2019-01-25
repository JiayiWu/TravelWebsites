import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux' 
import { Icon } from 'antd'
import styles from './ActivityDetail.module.scss'
import API from '../../utils/API'
import messageHandler from '../../utils/messageHandler'
// import Logo from '@utils/image/activity/a1.jpg'
// import COVER from '@utils/image/activity/a2.jpg'
// import CREATOR from '@utils/image/activity/a4.jpg'

import ActivityDetailContent from './components/ActivityDetailContent'
import { UserBasicProps } from '../profile/ProfileHomepage'
import { fromJS } from 'immutable';

import { attendAct, quitAct } from '../../actions/activity'

export interface ActivityItemProps {
  coverUrl: string,
  creator: UserBasicProps,
  description: string,
  endTime: number,
  id: number,
  joinType: string,
  location: string,
  startTime: number,
  attendList?: Array<UserBasicProps>,
  title: string,
}

interface ActivityDetailProps {
  user: any, // redux
  attendAct: Function, // redux
  quitAct: Function, // redux
  route: any, // redux
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

class ActivityDetail extends React.Component<RouteComponentProps & ActivityDetailProps, { detail: ActivityItemProps | null }> {
  state : { detail: ActivityItemProps | null } = {
    detail: null
  }
  
  componentDidMount() {
    const { route } = this.props
    if (route.get('detail')) {
      this.setState({
        detail: route.get('detail')
      })
    } else {
      this.fetchActivityDetail()
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
    this.props.attendAct({ activityId: detail.id, userId: user.id}).then((json) => {
      if (json.code === 0) {
        this.fetchActivityDetail()
      }
    })
  }

  handleQuitAct = () => {
    const { detail } = this.state
    const { user } = this.props
    if (!detail) {
      return
    }
    this.props.quitAct(detail.id, user.id).then((json) => {
      if (json.code === 0) {
        this.fetchActivityDetail()
      }
    })
  }

  public render() {
    const { detail } = this.state
    const { user } = this.props
    if (!detail) {
      return null
    }
    const isAttender = detail.attendList ? detail.attendList.find((attend) => attend.id === user.id) : false
    const isCreator = detail.creator.id === user.id
    return detail && (
      <div className={styles.container}>
        <div className={styles.headerContainer} style={{ backgroundImage: `url(${detail.coverUrl})`}}>
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
              {isAttender ? 
                <div className={styles.headerBtn} onClick={this.handleQuitAct}>
                  <Icon type="export" />
                  <br />
                  退出
                </div>
                :
                (isCreator ? 
                  <div className={styles.headerBtn}>
                    <Icon type="minus-circle" />
                    <br />
                    取消
                  </div>
                  :
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetail)
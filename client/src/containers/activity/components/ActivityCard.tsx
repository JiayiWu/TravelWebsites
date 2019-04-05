import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import { Button, Icon, Tooltip } from 'antd'
import LinesEllipsis from 'react-lines-ellipsis'
import styles from './ActivityCard.module.scss'
import { WEEK_DAYS } from '../../../utils/constants'
import DefaultCover from '../../../utils/image/ActivityCover.jpg'
import API from '../../../utils/API'
import messageHandler from '../../../utils/messageHandler'
import { pushURL } from '../../../actions/route'
import { likeRefer } from '../../../actions/activity'
import { USER_TYPE } from '../../profile/ProfileHomepage'
import { ACTIVITY_STATE } from '../ActivityDetail'
import { JOIN_TYPE } from '../ActivityHomepage'
import { fromJS } from 'immutable';

interface CardProps {
  activity: any,
  user: any, // redux immutable
  pushURL: Function, // redux
  likeRefer: (isLike: boolean, referId: number, type: number) => Promise<any>, // redux
  onRefresh?: () => void
}


class ActivityCard extends React.Component<CardProps, any> {
  constructor(props) {
    super(props)
    this.state = {
      likeCount: this.props.activity.likeCount,
      isLike: this.props.activity.like
    }
  }
  
  jumpToAct = (activity) => {
    this.props.pushURL(`/workspace/activity/detail/${activity.id}`)
  }
  handleLike(e) {
    const { activity } = this.props
    e.stopPropagation()
    this.props.likeRefer(!this.state.isLike, activity.id, 1).then((json) => {
      if (json.code === 0) {
        this.setState({
          likeCount: json.data,
          isLike: !this.state.isLike
        })
        // this.props.onRefresh && this.props.onRefresh()
      }
    })
    // 点赞/取消点赞
  }
  renderState = () => {
    const { activity } = this.props
    let color = '#1890ff', text = '审批中'
    switch(activity.state) {
      case ACTIVITY_STATE.NEW:
        color = '#1890ff'
        text = '审批中'
        break
      case ACTIVITY_STATE.VALID:
        color = '#52c41a'
        text = '审批通过'
        break
      case ACTIVITY_STATE.INVALID:
        color = '#f5222d'
        text = '审批未通过'
        break
      case ACTIVITY_STATE.END:
        color = '#faad14'
        text = '已结束'
        break;
      case ACTIVITY_STATE.DELETE:
        color = 'rgb(190, 200, 200)'
        text = '已取消'
        break
    }
    return (
      <div className={styles.stateWrapper} style={{ backgroundColor: color }}>
        {text}
      </div>
    )
  }
  public render() {
    const { user, activity } = this.props
    const actTime = moment(activity.startTime)
    const isAttender = activity.attendList.find((attend) => attend.id === user.get('id'))
    return (
      <div className={styles.actCard} key={activity.id} onClick={() => this.jumpToAct(activity)}>
        <div style={{ backgroundImage: `url(${activity.coverUrl || DefaultCover})`}} />
        {this.renderState()}
        <div className={styles.right}>
          <div className={styles.titleWrapper}>
            <span className={styles.title}>{activity.title}</span>
            {activity.creator && user && user.get('type') === USER_TYPE.NORMAL && activity.creator.id != user.get('id') ? 
              (isAttender ? 
              <Button type="default" onClick={(e) => {
                e.stopPropagation()
                API.query(`/activity/quit/${activity.id}/user/${user.get('id')}`, {
                  options: {
                    method: 'POST'
                  }
                }).then(messageHandler).then((json) => {
                  if (json.code === 0) {
                    this.props.onRefresh && this.props.onRefresh()
                  }
                })
              }}>退出活动</Button> 
              :
              <Button type="default" onClick={(e) => {
                e.stopPropagation()
                if (activity.joinType === JOIN_TYPE.DIRECT) {
                  API.query('/activity/attend', {
                    options: {
                      method: 'POST',
                      body: JSON.stringify({
                        userId: localStorage.getItem('userid'),
                        activityId: activity.id
                      })
                    }
                  }).then(messageHandler).then((json) => {
                    if (json.code === 0) {
                      this.props.pushURL(`/workspace/activity/detail/${activity.id}`)
                    }
                  })
                } else {
                  this.setState({
                    joinModal: {
                      show: true,
                      joinAct: activity,
                    }
                  })
                }
                
              }}>立即参加</Button>)
              :
              <Button type="default" onClick={() => this.jumpToAct(activity)}>查看详情</Button>
            }
            
          </div>
          <div className={styles.content}>
            <LinesEllipsis
              text={activity.description.replace(/(<[^>]+>)/g, '')}
              basedOn="letters"
              maxLine={2}
              ellipsis='...'
              style={{ "overflow-wrap": "break-word" }}
            />
          </div>
          <div className={styles.infoLine}>
            <div className={styles.infoItem}>
              <Icon type="environment" />
              {activity.location}
            </div>
            <div className={styles.infoItem}>
              <Icon type="team" />
              {activity.attendList.length}人参加
            </div>
            <div className={styles.infoItem}>
              <Icon type="calendar" />
              {actTime.format('YYYY年MM月D日，')}{actTime.format('HH:mm')}
              {/* {actTime.format('YYYY年MM月D日，')}周{WEEK_DAYS[Number(actTime.format('d'))]}，{actTime.format('HH:mm')} */}
            </div>
            <div className={styles.likeBtn}>
              {this.state.likeCount}人点赞
              <Tooltip title={this.state.isLike ? '取消点赞' : '点赞'}>
                <Button type={this.state.isLike ? 'default' : 'primary'} size="small" onClick={(e) => this.handleLike(e)}><Icon type="like" /></Button>
              </Tooltip>
            </div>
          </div>
          
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: fromJS(state).get('user')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pushURL: bindActionCreators(pushURL, dispatch),
    likeRefer: bindActionCreators(likeRefer, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityCard)
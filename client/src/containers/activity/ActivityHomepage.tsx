import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Carousel, Icon, Button } from 'antd'
import LinesEllipsis from 'react-lines-ellipsis'
import moment from 'moment'
import styles from './ActivityHomepage.module.scss'
import API from '../../utils/API'
import messageHandler from '../../utils/messageHandler'
import { UserBasicProps, USER_TYPE } from '../profile/ProfileHomepage'
import { pushURL } from '../../actions/route'
import JoinModal from './modal/JoinModal'
import DefaultCover from '../../utils/image/ActivityCover.jpg'

import DynamicScrollPane from '../../components/DynamicScrollPane'
import { fromJS } from 'immutable';
import ActivityCard from './components/ActivityCard';

interface ActivityHomepageProps {
  user: any, // redux
  pushURL: Function, // redux
}

export interface ActivityItemProps {
  coverUrl: string,
  creator: UserBasicProps,
  description: string,
  endTime: number,
  id: number,
  joinType: string | number,
  location: string,
  startTime: number,
  attendList: Array<UserBasicProps>,
  title: string,
  type: number,
}

export const JOIN_TYPE = {
  DIRECT: 0,
  APPLY: 1,
}

const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六']

class ActivityHomepage extends React.Component<ActivityHomepageProps, any> {
  state = {
    recommendList: [] as Array<ActivityItemProps>,
    activityList: [] as Array<ActivityItemProps>,
    isLoading: false,
    hasMore: true,
    joinModal: {
      show: false,
      joinAct: null,
    }
  }
  componentDidMount() {
    this.fetchActivityList().then((json) => {
      if (json.code === 0) {
        this.setState({
          activityList: json.data,
        })
      }
    })
    this.fetchRecommendList().then((json) => {
      if (json.code === 0) {
        this.setState({
          recommendList: json.data,
        })
      }
    })
  }
  fetchActivityList = () => {
    return API.query('/activity/list', {
      options: {
        method: 'POST',
        body: JSON.stringify({
          lastTimestamp: this.state.activityList.length > 0 ? this.state.activityList[this.state.activityList.length - 1].startTime : 0,
          size: 10,
        })
      }
    }).then(messageHandler)
  }
  fetchRecommendList = () => {
    return API.query('/activity/recommendation/5', {}).then(messageHandler)
  }
  handleLoadMore = () => {
    this.setState({
      isLoading: true,
    })
    this.fetchActivityList().then((json) => {
      if (json.code === 0) {
        
        this.setState({
          activityList: this.state.activityList.concat(json.data),
          isLoading: false,
          hasMore: json.data.length !== 0
        })
      }
    })
  }
  jumpToAct = (activity) => {
    this.props.pushURL(`/workspace/activity/detail/${activity.id}`)
  }
  renderHeader = () => {
    const { recommendList } = this.state
    return (
      <Carousel effect="fade" vertical autoplay>
        {recommendList.map((act, index) => {
          return (
            <div key={index} style={{ height: '382px'}}>
              <div className={styles.item} style={{ backgroundImage: `url(${act.coverUrl || DefaultCover})`}}>
                <div className={styles.time}>
                  <div className={styles.month}>
                    {moment(act.endTime).format('D')}
                  </div>
                  <div>
                    {moment(act.endTime).format('/MMM.YYYY')}
                  </div>
                </div>
                <div className={styles.title}>{act.title}</div>
              </div>
              {/* <img src={act.image} style={{ width: '100%'}}/> */}
              
            </div>
          )
        })}
      </Carousel>
    )
  }
  renderActCard = (act) => {
    const { user } = this.props
    const actTime = moment(act.startTime)
    return (
      <div className={styles.actCard} key={act.id} onClick={() => this.jumpToAct(act)}>
        <div style={{ backgroundImage: `url(${act.coverUrl || DefaultCover})`}} />
        <div className={styles.right}>
          <div className={styles.titleWrapper}>
            <span className={styles.title}>{act.title}</span>
            {act.creator && user && user.get('type') === USER_TYPE.NORMAL && act.creator.id != user.get('id') ? 
              <Button type="default" onClick={(e) => {
                e.stopPropagation()
                if (act.joinType === JOIN_TYPE.DIRECT) {
                  API.query('/activity/attend', {
                    options: {
                      method: 'POST',
                      body: JSON.stringify({
                        userId: localStorage.getItem('userid'),
                        activityId: act.id
                      })
                    }
                  }).then(messageHandler).then((json) => {
                    if (json.code === 0) {
                      this.props.pushURL(`/workspace/activity/detail/${act.id}`)
                    }
                  })
                } else {
                  this.setState({
                    joinModal: {
                      show: true,
                      joinAct: act,
                    }
                  })
                }
                
              }}>立即参加</Button>
              :
              <Button type="default" onClick={() => this.jumpToAct(act)}>查看详情</Button>
            }
            
          </div>
          <div className={styles.infoLine}>
            <div className={styles.infoItem}>
              <Icon type="environment" />
              {act.location}
            </div>
            <div className={styles.infoItem}>
              <Icon type="team" />
              {act.attendList.length}人参加
            </div>
            <div className={styles.inforItem}>
              <Icon type="calendar" />
              {actTime.format('YYYY年MM月D日，')}周{WEEK_DAYS[Number(actTime.format('d'))]}，{actTime.format('HH:mm')}
            </div>
          </div>
          <div className={styles.content}>
            <LinesEllipsis
              text={act.description}
              maxLine={3}
            />
          </div>
        </div>
      </div>
    )
  }
  public render() {
    const { activityList, joinModal, isLoading, hasMore } = this.state
    const { user } = this.props
    return (
      <DynamicScrollPane
        hasMore={hasMore}
        loadMore={this.handleLoadMore}
        isLoading={isLoading}
      >
        <div className={styles.container}>
          <div className={styles.headerWrapper}>
            {this.renderHeader()}
          </div>
          
          <div className={styles.listContainer} >
            <div className={styles.listHeader}>
              <h3>活动列表</h3>
              {user.get('type') === USER_TYPE.NORMAL &&
                <Button type="primary" className={styles.createBtn} onClick={() => this.props.pushURL('/workspace/activity/create')}>创建活动</Button>
              }
            </div>
              {activityList.map((act) => {
                // return this.renderActCard(act)
                return <ActivityCard activity={act} onRefresh={this.fetchActivityList}/>
              })}   
          </div>
          {joinModal.show && joinModal.joinAct &&
            <JoinModal 
              onOk={() => {
                // TODO 刷新列表
                this.setState({
                  joinModal: {
                    show: false,
                    joinAct: null,
                  }
                })
              }}
              activity={joinModal.joinAct}
              onCancel={() => this.setState({
                joinModal: {
                  show: false,
                  joinAct: null,
                }
              })}
            />
          }
        </div>
      </DynamicScrollPane>
      
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
    pushURL: bindActionCreators(pushURL, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityHomepage)
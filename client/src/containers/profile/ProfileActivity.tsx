import * as React from 'react'
import classnames from 'classnames'
import { Button, Tabs } from 'antd'
import styles from './ProfileActivity.module.scss'
import ActivityCard from '../activity/components/ActivityCard'
import { ActivityItemProps } from '../activity/ActivityDetail'
import API from '../../utils/API'
import { ACTIVITY_LIST } from '../../utils/constants'
import messageHandler from '../../utils/messageHandler'


interface ProfileActivityProps {
  user: any,
  urlUserId: string,
}

const TabPane = Tabs.TabPane

const TAB_TYPE = {
  JOIN: "0",
  CREATE: "1",
}

const ACT_TYPE = {
  NULL: 0, // 通用接口
  CREATOR: 1, // 创建者
  ATTENDER: 2, // 参与者
}

class ProfileActivity extends React.Component<ProfileActivityProps, any> {
  state = {
    createList: [] as Array<ActivityItemProps>,
    particiList: [] as Array<ActivityItemProps>,
  }
  componentDidMount() {
    this.fetchActList()
  }
  fetchActList = (props = this.props) => {
    const { user, urlUserId } = props
    API.query(`/activity/list/${urlUserId || user.get('id')}`,{}).then(messageHandler).then((json) => {
      if (json.code === 0) {
        let createList = [] as Array<ActivityItemProps>, particiList = [] as Array<ActivityItemProps>
        json.data.forEach((activity) => {
          if (activity.type === ACT_TYPE.CREATOR) {
            createList.push(activity)
          } else if (activity.type === ACT_TYPE.ATTENDER) {
            particiList.push(activity)
          }
        })
        this.setState({
          createList,
          particiList
        })
      }
    })
  }
  renderActivitys = (list) => {
    return (
      <div>
        {list.map((act) => {
          return (
            <ActivityCard 
              activity={act}
              onRefresh={this.fetchActList}
            />
          )
        })}
      </div>
    )
  }
  public render() {
    const { urlUserId, user } = this.props
    const { createList, particiList } = this.state
    const notMe = urlUserId && (urlUserId != user.get('id'))
    return (
      <div className={styles.container}>
        <div className={classnames(styles.countContainer, styles.cardContainer)}>
          <div className={styles.left}>
            <div className={styles.item}>
              <div>0</div>
              <div className={styles.label}>活动数</div>
            </div>
            <div className={styles.item}>
              <div>0</div>
              <div className={styles.label}>金牌活动</div>
            </div>
            <div className={styles.item}>
              <div>0</div>
              <div className={styles.label}>总参与人数</div>
            </div>
          </div>
          {!notMe && 
            <div className={styles.item}>
              <Button type="primary">创建活动</Button>
            </div>
          }
        </div>
        <div className={classnames(styles.activityContainer, styles.cardContainer)}>
          <Tabs defaultActiveKey={TAB_TYPE.CREATE}>
            <TabPane tab={`${!notMe ? '我' : 'Ta'}参加的`} key={TAB_TYPE.JOIN}>{this.renderActivitys(particiList)}</TabPane>
            <TabPane tab={`${!notMe ? '我' : 'Ta'}创建的`} key={TAB_TYPE.CREATE}>{this.renderActivitys(createList)}</TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default ProfileActivity
import * as React from 'react'
import classnames from 'classnames'
import { Button, Tabs } from 'antd'
import styles from './ProfileActivity.module.scss'
import ActivityCard from '../activity/components/ActivityCard'
import { ACTIVITY_LIST } from '../../utils/constants'

interface ProfileActivtyProps {

}

const TabPane = Tabs.TabPane

const TAB_TYPE = {
  JOIN: "0",
  CREATE: "1",
}


class ProfileActivity extends React.Component {
  renderActivitys = (list) => {
    return (
      <div>
        {list.map((act) => {
          return (
            <ActivityCard activity={act} />
          )
        })}
      </div>
    )
  }
  public render() {
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
          <div className={styles.item}>
            <Button type="primary">创建活动</Button>
          </div>
        </div>
        <div className={classnames(styles.activityContainer, styles.cardContainer)}>
          <Tabs defaultActiveKey={TAB_TYPE.CREATE}>
            <TabPane tab="我参加的" key={TAB_TYPE.JOIN}>{this.renderActivitys(ACTIVITY_LIST)}</TabPane>
            <TabPane tab="我创建的" key={TAB_TYPE.CREATE}>{this.renderActivitys(ACTIVITY_LIST)}</TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default ProfileActivity
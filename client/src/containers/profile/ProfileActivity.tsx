import * as React from 'react'
import { Button, Tabs } from 'antd'
import styles from './ProfileActivity.module.scss'
import { ACTIVITY_LIST } from '@utils/constant.js'

interface ProfileActivtyProps {

}

const TabPane = Tabs.TabPane

const TAB_TYPE = {
  JOIN: "0",
  CREATE: "1",
}


class ProfileActivity extends React.Component {
  renderActivitys = (list) => {

  }
  public render() {
    return (
      <div className={styles.container}>
        <div className={styles.countContainer}>
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
          <div className={styles.right}>
            <Button type="primary">创建活动</Button>
          </div>
        </div>
        <div className={styles.activityContainer}>
          <Tabs>
            <TabPane tab="我参加的" key={TAB_TYPE.JOIN}>{this.renderActivitys()}</TabPane>
            <TabPane tab="我创建的" key={TAB_TYPE.CREATE}></TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default ProfileActivity
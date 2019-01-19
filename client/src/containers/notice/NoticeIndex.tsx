import * as React from 'react'
import { Tabs } from 'antd'
import styles from './NoticeIndex.module.scss'
import NoticeItem, { ITEM_TYPE } from './NoticeItem'

const { TabPane } = Tabs

interface NoticeIndexProps {

}

const TAB_TYPE = {
  NOTICE: "0", // 系统通知
  ACT_APPLY: "1", // 活动审批
  PERSON_APPLY: "2", // 学生认证
}

class NoticeIndex extends React.Component<NoticeIndexProps, any> {
  public render() {
    return (
      <div className={styles.container}>
        <Tabs tabPosition="left">
          {/* <TabPane tab="系统通知" key={TAB_TYPE.NOTICE}>
            {[0, 1, 2].map((notice, index) => {
              return <NoticeItem />
            })}
          </TabPane> */}
          <TabPane tab="活动审批" key={TAB_TYPE.ACT_APPLY} className={styles.tabPane}>
            {[0, 1, 2].map((notice, index) => {
              return <NoticeItem type={ITEM_TYPE.ACT_JOIN}/>
            })}
          </TabPane>
          <TabPane tab="学生认证" key={TAB_TYPE.PERSON_APPLY} className={styles.tabPane}>
            {[0, 1, 2].map((notice, index) => {
              return <NoticeItem type={ITEM_TYPE.PERSON_VERIFY}/>
            })}
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
export default NoticeIndex
import * as React from 'react'
import moment from 'moment'
import { Icon, Tabs } from 'antd'
import styles from './ActivityDetailContent.module.scss'
import { UserBasicProps } from '../../profile/ProfileHomepage'
import { ActivityItemProps } from '../ActivityDetail'
import MyEditor from '../../../components/MyEditor'
import DefaultAvatar from '../../../utils/image/DefaultAvatar.jpg'

interface DetailContentProps {
  detail: ActivityItemProps,
}

const TabPane = Tabs.TabPane

class ActivityDetailCnontent extends React.Component<DetailContentProps, any> {
  private editor: React.RefObject<any>

  constructor(props) {
    super(props)
    this.editor = React.createRef()
  }
  public render() {
    const { detail } = this.props
    return (
      <div className={styles.container}>
        <Tabs>
          <TabPane key="detail" tab="详情" className={styles.tabPane}>
            <div className={styles.card}>
              <div className={styles.item}>
                <Icon type="clock-circle" theme="filled" />
                {moment(detail.startTime).format('YYYY-MM-DD HH:mm')}
                &nbsp;至&nbsp;
                {moment(detail.endTime).format('YYYY-MM-DD HH:mm')}
              </div>
              <div className={styles.item}>
                <Icon type="environment" theme="filled" />
                {detail.location}
              </div>
            </div>
            {/* <div className={styles.content}>{detail.description}</div> */}
            <div className={styles.content}>
              
              <MyEditor ref={this.editor} readOnly defaultValue={detail.description}/>
            </div>
            {/* 评论 */}
          </TabPane>
          {detail.attendList && detail.attendList.length > 0 &&
            <TabPane key="member" tab="成员" className={styles.tabPane}>
              <div className={styles.memberContainer}>
                {detail.attendList.map((attend) => {
                  return (
                    <div className={styles.memberItem}>
                      <img src={attend.logoUrl || DefaultAvatar}/>
                      <div className={styles.infoWrapper}>
                        {attend.name}
                      </div>
                    </div>
                  )
                })}
              </div>
            
            </TabPane>
          }
         
        </Tabs>
        {/* <div className={styles.left}> */}
          
        
      </div>
    )
  }
}

export default ActivityDetailCnontent
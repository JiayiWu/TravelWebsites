import * as React from 'react'
import { Icon } from 'antd'
import styles from './ActivityDetail.module.scss'
import Logo from '@utils/image/activity/a1.jpg'
import COVER from '@utils/image/activity/a2.jpg'
import CREATOR from '@utils/image/activity/a4.jpg'

import ActivityDetailContent from './components/ActivityDetailContent'

interface ActivityDetailProps {

}

const USER = {
  id: 0,
  logoUrl: Logo,
  mail: '12345@qq.com',
  mobile: '18260068636',
  name: '张文玘',
  type: 0
}

const DETAIL = {
  attendList: [USER, USER],
  coverUrl: COVER,
  creator: {...USER, logoUrl: CREATOR},
  description: '独家！#烎潮音发布夜# 活捉一只新鲜的彩排花！认真又努力的。华晨宇 会给我们带来什么样的惊喜呢！搓手期待华语乐坛新生代领军人物@华晨宇yu ！明天直播见',
  endTime: new Date().getTime(),
  id: 0,
  joinType: 0,
  location: '南京',
  startTime: new Date().getTime(),
  title: '烎潮音发布夜烎潮音发布夜烎潮音发布夜烎潮音发布夜烎潮音发布夜烎潮音发布夜'
}

class ActivityDetail extends React.Component<ActivityDetailProps, any> {
  state = {
    detail: DETAIL
  }
  public render() {
    const { detail } = this.state
    return (
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
              <div className={styles.headerBtn}>
                <Icon type="plus-circle" />
                <br />
                参加
              </div>
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

export default ActivityDetail
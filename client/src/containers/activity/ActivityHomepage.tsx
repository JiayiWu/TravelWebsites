import * as React from 'react'
import { Carousel, Icon, Button } from 'antd'
import LinesEllipsis from 'react-lines-ellipsis'
import moment from 'moment'
import styles from './ActivityHomepage.module.scss'
import C1 from '@utils/image/homepage/carousel1.jpg'
import C2 from '@utils/image/homepage/carousel2.jpg'
import C3 from '@utils/image/homepage/carousel3.jpg'
import C4 from '@utils/image/homepage/carousel4.jpg'

import A1 from '@utils/image/activity/a1.jpg'
import A2 from '@utils/image/activity/a2.jpg'
import A3 from '@utils/image/activity/a3.jpg'
import A4 from '@utils/image/activity/a4.jpg'
import A5 from '@utils/image/activity/a5.jpg'

interface ActivityHomepageProps {

}

const CAROUSEL_LIST = [{
  image: C1,
  name: '斗牛',
  time: new Date().getTime()
}, {
  image: C2,
  name: '降临',
  time: new Date().getTime()
}, {
  image: C3,
  name: '王牌对王牌',
  time: new Date().getTime()
}, {
  image: C4,
  name: '癌',
  time: new Date().getTime()
}]

const ACTIVITY_LIST = [{
  id: 0,
  image: A1,
  name: '南京烎潮音发布夜',
  time: new Date().getTime(),
  description: '独家！#烎潮音发布夜# 活捉一只新鲜的彩排花！认真又努力的。华晨宇 会给我们带来什么样的惊喜呢！搓手期待华语乐坛新生代领军人物@华晨宇yu ！明天直播见',
  location: '南京',
  partiCount: 3000,
}, {
  id: 1,
  image: A2,
  name: '南京烎潮音发布夜',
  time: new Date().getTime(),
  description: '独家！#烎潮音发布夜# 活捉一只新鲜的彩排花！认真又努力的。华晨宇 会给我们带来什么样的惊喜呢！搓手期待华语乐坛新生代领军人物@华晨宇yu ！明天直播见',
  location: '南京',
  partiCount: 3000,
}, {
  id: 2,
  image: A3,
  name: '南京烎潮音发布夜',
  time: new Date().getTime(),
  description: '独家！#烎潮音发布夜# 活捉一只新鲜的彩排花！认真又努力的。华晨宇 会给我们带来什么样的惊喜呢！搓手期待华语乐坛新生代领军人物@华晨宇yu ！明天直播见',
  location: '南京',
  partiCount: 3000,
}, {
  id: 3,
  image: A4,
  name: '南京烎潮音发布夜',
  time: new Date().getTime(),
  description: '独家！#烎潮音发布夜# 活捉一只新鲜的彩排花！认真又努力的。华晨宇 会给我们带来什么样的惊喜呢！搓手期待华语乐坛新生代领军人物@华晨宇yu ！明天直播见',
  location: '南京',
  partiCount: 3000,
}, {
  id: 4,
  image: A5,
  name: '南京烎潮音发布夜',
  time: new Date().getTime(),
  description: '独家！#烎潮音发布夜# 活捉一只新鲜的彩排花！认真又努力的。华晨宇 会给我们带来什么样的惊喜呢！搓手期待华语乐坛新生代领军人物@华晨宇yu ！明天直播见',
  location: '南京',
  partiCount: 3000,
}]

const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六']

class ActivityHomepage extends React.Component<ActivityHomepageProps, any> {
  state = {
    recomendList: CAROUSEL_LIST,
    activityList: ACTIVITY_LIST,
  }
  renderHeader = () => {
    const { recomendList } = this.state
    return (
      <Carousel effect="fade" vertical autoplay>
        {recomendList.map((act, index) => {
          return (
            <div key={index}>
              <div className={styles.item} style={{ backgroundImage: `url(${act.image})`}}>
                <div className={styles.time}>
                  <div className={styles.month}>
                    {moment(act.time).format('D')}
                  </div>
                  <div>
                    {moment(act.time).format('/MMM.YYYY')}
                  </div>
                </div>
                <div className={styles.title}>{act.name}</div>
              </div>
              {/* <img src={act.image} style={{ width: '100%'}}/> */}
              
            </div>
          )
        })}
      </Carousel>
    )
  }
  renderActCard = (act) => {
    const actTime = moment(act.time)
    return (
      <div className={styles.actCard} key={act.id}>
        <div style={{ backgroundImage: `url(${act.image})`}} />
        <div className={styles.right}>
          <div className={styles.titleWrapper}>
            <span className={styles.title}>{act.name}</span>
            <Button type="default">立即参加</Button>
          </div>
          <div className={styles.infoLine}>
            <div className={styles.infoItem}>
              <Icon type="environment" />
              {act.location}
            </div>
            <div className={styles.infoItem}>
              <Icon type="team" />
              {act.partiCount}人参加
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
    const { activityList } = this.state
    return (
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          {this.renderHeader()}
        </div>
        <div className={styles.listContainer} >
          <div className={styles.listHeader}>
            <h3>活动列表</h3>
            <Button type="primary" className={styles.createBtn}>创建活动</Button>
          </div>
          {activityList.map((act) => {
            return this.renderActCard(act)
          })}
        </div>
      </div>
    )
  }
}

export default ActivityHomepage
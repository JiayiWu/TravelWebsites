import * as React from 'react'
import moment from 'moment'
import { Button, Icon } from 'antd'
import LinesEllipsis from 'react-lines-ellipsis'
import styles from './ActivityCard.module.scss'
import { WEEK_DAYS } from '../../../utils/constants'

interface CardProps {
  activity: any,
}

class ActivityCard extends React.Component<CardProps, any> {
  public render() {
    const { activity } = this.props
    const actTime = moment(activity.time)
    return (
      <div className={styles.actCard} key={activity.id}>
        <div style={{ backgroundImage: `url(${activity.image})`}} />
        <div className={styles.right}>
          <div className={styles.titleWrapper}>
            <span className={styles.title}>{activity.name}</span>
            <Button type="default">立即参加</Button>
          </div>
          <div className={styles.infoLine}>
            <div className={styles.infoItem}>
              <Icon type="environment" />
              {activity.location}
            </div>
            <div className={styles.infoItem}>
              <Icon type="team" />
              {activity.partiCount}人参加
            </div>
            <div className={styles.inforItem}>
              <Icon type="calendar" />
              {actTime.format('YYYY年MM月D日，')}周{WEEK_DAYS[Number(actTime.format('d'))]}，{actTime.format('HH:mm')}
            </div>
          </div>
          <div className={styles.content}>
            <LinesEllipsis
              text={activity.description}
              maxLine={2}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ActivityCard
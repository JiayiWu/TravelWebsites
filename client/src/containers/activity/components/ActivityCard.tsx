import * as React from 'react'
import moment from 'moment'
import { Button, Icon } from 'antd'
import LinesEllipsis from 'react-lines-ellipsis'
import styles from './ActivityCard.module.scss'
import { WEEK_DAYS } from '@utils/constant.js'

interface CardProps {
  act: any,
}

class ActivityCard extends React.Component<CardProps, any> {
  public render() {
    const { act } = this.props
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
}

export default ActivityCard
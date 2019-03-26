import React from 'react'
import { Button } from 'antd'
import styles from './UserCard.module.scss'

interface UserCardProps {
  userId: number,
  pushURL: (url: string, state?: any) => void,
  refresh?: () => void,
}

class UserCard extends React.Component<UserCardProps, any> {
  handleFollow() {

  }
  render() {
    return (
      <div className={styles.userCard} onClick={() => this.props.pushURL(`/workspace/user/${this.props.userId}`)}>
        <div className={styles.left}>
          <div className={styles.img}></div>
          <div className={styles.infoWrapper}>
            <div className={styles.name}>张耳朵</div>
            <div className={styles.info}>
              <span>活动：1</span>
              <span>粉丝：3</span>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => this.handleFollow()}>关注</Button>
        </div>
      </div>
    )
  }
}

export default UserCard
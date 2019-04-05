import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import { Button, Tooltip } from 'antd'
import { UserBasicProps } from '../containers/profile/ProfileHomepage'
import { follow, unFollow } from '../actions/interaction'
import styles from './UserCard.module.scss'

interface UserCardProps {
  user: UserBasicProps,
  isMe: boolean,
  pushURL: (url: string, state?: any) => void,
  refresh?: () => void,
  follow: Function, // dispatch
  unFollow: Function, // dispatch
}

class UserCard extends React.Component<UserCardProps, any> {
  handleFollow(e) {
    const { user } = this.props
    const promise = user.concerned ? this.props.unFollow(user.id) : this.props.follow(user.id)
    e.stopPropagation()
    promise.then((json) => {
      if (json.code === 0) {
        this.props.refresh && this.props.refresh()
      }
    })
  }
  render() {
    const { user, isMe } = this.props
    return (
      <div className={styles.userCard} onClick={() => this.props.pushURL(isMe ? '/workspace/my' : `/workspace/user/${user.id}`)}>
        <div className={styles.left}>
          <div className={styles.img} style={{ backgroundImage: `url(${user.logoUrl})`}}></div>
          <div className={styles.infoWrapper}>
            <div className={styles.name}>{user.name}</div>
            <div className={styles.info}>
              <span>活动：{user.activityNum}</span>
              <span>粉丝：{user.fansNum}</span>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          {!isMe &&
            <Button type={user.concerned ? 'default' : 'primary'} onClick={(e) => this.handleFollow(e)}>
              {user.concerned ? '取消关注' : '关注'}
            </Button>
          }
          
        </div>
      </div>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return {
    follow: bindActionCreators(follow, dispatch),
    unFollow: bindActionCreators(unFollow, dispatch)
  }
}
export default connect(() => {}, mapDispatchToProps)(UserCard)
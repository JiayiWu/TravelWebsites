import * as React from 'react'
import styles from './ProfileIndex.module.scss'
import HeaderImage from '@utils/image/profile/header.jpeg'
import ProfileHomepage from './ProfileHomepage'
import ProfileActivity from './ProfileActivity'

interface ProfileProps {

}

const CONTENT_TYPE = {
  HOMEPAGE: 0,
  ACTIVITY: 1,
  NEWS: 2,
}

const CONTENT_LIST = ['我的窝', '我的活动', '我的消息']

class ProfileIndex extends React.Component<ProfileProps, any> {
  state = {
    contentType: CONTENT_TYPE.HOMEPAGE
  }
  componentWillMount() {
    console.log('profile render')
  }
  renderMenu = () => {
    const { contentType } = this.state
    return CONTENT_LIST.map((name, index) => {
      return (
        <div
          className={styles.menuItem}
          data-active={contentType === index}
          onClick={() => this.setState({ contentType: index })}
        >
          {name}
        </div>
      )
    })
  }
  public render() {
    const { contentType } = this.state
    return (
      <div className={styles.container}>
        <div className={styles.headerImage} style={{ backgroundImage: `url(${HeaderImage})`}} >
          <div className={styles.headerMenu}>
            <div className={styles.centerWidth}>
              {this.renderMenu()}
            </div>
          </div>
        </div>
        <div className={styles.centerContainer}>
          
          <div className={styles.infoContainer}>
            <div className={styles.userLogo} style={{ backgroundImage: `url(${HeaderImage})`}}/>
            <div className={styles.userName}>张文玘</div>
            <div className={styles.btnGroup}>
              <div className={styles.myBtn}>
                <div>2</div>
                <div>关注</div>
              </div>
              <div className={styles.myBtn}>
                <div>2</div>
                <div>粉丝</div>
              </div>
            </div>
          </div>

          <div className={styles.contentContainer} >
            {contentType === CONTENT_TYPE.HOMEPAGE &&
              <ProfileHomepage />
            }
            {contentType === CONTENT_TYPE.ACTIVITY &&
              <ProfileActivity />
            }
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileIndex
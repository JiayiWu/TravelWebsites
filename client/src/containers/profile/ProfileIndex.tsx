import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import styles from './ProfileIndex.module.scss'
import HeaderImage from '@utils/image/profile/header.jpeg'

interface ProfileProps {

}

class ProfileIndex extends React.Component<ProfileProps, any> {
  state = {
    
  }
  componentWillMount() {
    console.log('profile render')
  }
  public render() {
    return (
      <div className={styles.container}>
        <div className={styles.headerImage} style={{ backgroundImage: `url(${HeaderImage})`}} >
          <div className={styles.headerMenu}>
            <div className={styles.menuItem} data-active={true}>我的窝</div>
            <div className={styles.menuItem}>我的活动</div>
            <div className={styles.menuItem}>我的消息</div>
          </div>
        </div>
        <div className={styles.centerContainer}>
          
          <div className={styles.infoContainer}>
            <div className={styles.userLogo} style={{ backgroundImage: `url(${HeaderImage})`}}/>
            <h1 className={styles.userName}>张文玘</h1>
            <div className={styles.btnGroup}>
              <div className={styles.myBtn}>
                <h1>2</h1>
                <div>关注</div>
              </div>
              <div className={styles.myBtn}>
                <h1>2</h1>
                <div>粉丝</div>
              </div>
            </div>
          </div>

          {/* <Switch>
            <Route />
          </Switch> */}
        </div>
      </div>
    )
  }
}

export default ProfileIndex
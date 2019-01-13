import * as React from 'react'
import Loadable from 'react-loadable'
import { RouteComponentProps } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import styles from './Header.module.scss'
import Logo from '@utils/image/logo.png'

interface HeaderProps {

}

const TYPE = {
  HOMEPAGE: 'homepage',
  NEWS: 'news'
}

const ActivityIndex = Loadable({
  loader: () => import('./activity/ActivityIndex'),
  loading: () => <div>loading...</div>
})

class Header extends React.Component<RouteComponentProps &HeaderProps, any> {
  public render() {
    const { match } = this.props
    const url = match.path
    const type = (url.split('/')[2] || 'homepage').toLowerCase()
    return (
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div className={styles.centerContainer}>
            <div className={styles.left}>
              <div className={styles.logoWrapper}>
                <div className={styles.logo} style={{ backgroundImage: `url(${Logo})`}} />
                活动家
              </div>  
              <div className={styles.menu}>
                <div className={styles.menuItem} data-active={type === TYPE.HOMEPAGE}>
                  首页
                </div>
                <div className={styles.menuItem} data-active={type === TYPE.NEWS}>
                  朋友圈
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.link}>登录</div>
              |
              <div className={styles.link}>注册</div>
            </div>
          </div>
          
        </div>
        {/* <Switch> */}
          <Route path={`${url}`} component={ActivityIndex}/>
        {/* </Switch> */}
      </div>
    )
  }
}

export default Header
import * as React from 'react'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import { bindActionCreators } from 'redux'
import Loadable from 'react-loadable'
import { RouteComponentProps } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { Icon, Popover } from 'antd'
import styles from './Header.module.scss'
import Logo from '@utils/image/logo.png'
import { pushURL } from '../actions/route'
import NoticeIndex from './notice/NoticeIndex'

interface HeaderProps {
  user: any, // redux
  pushURL: Function, // redux
}

const TYPE = {
  HOMEPAGE: 'homepage',
  NEWS: 'news'
}

const ActivityIndex = Loadable({
  loader: () => import('./activity/ActivityIndex'),
  loading: () => <div>loading...</div>
})

const ProfileIndex = Loadable({
  loader: () => import('./profile/ProfileIndex'),
  loading: () => <div>loading...</div>
})

class Header extends React.Component<RouteComponentProps & HeaderProps, any> {
  state = {
    showNoticePanel: false
  }
  public render() {
    const { showNoticePanel } = this.state
    const { match, location, user, pushURL } = this.props
    const url = match.path
    const type = (location.pathname.split('/')[2] || 'homepage').toLowerCase()
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
            {user && user.get('id') ? 
              <div className={styles.right}>
                <Icon type="bell" onClick={() => this.setState({ showNoticePanel: !showNoticePanel })}/>
                <Popover
                  placement="bottom"
                  content="退出登录"
                >
                  <div className={styles.user} style={{ backgroundImage: `url(${Logo}` }}/>
                </Popover>
                
              </div>
              :
              <div className={styles.right}>
                <div className={styles.link} onClick={() => pushURL('/login')}>登录</div>
                |
                <div className={styles.link}>注册</div>
              </div> 
            }
          </div>
          
        </div>
        <div className={styles.content} style={{ overflow: showNoticePanel ? 'hidden' : 'auto', height: showNoticePanel ? 'calc(100% - 58px)' : 'auto'}}>
          <Switch>
            <Route path={`${url}/activity`} component={ActivityIndex}/>
            <Route path={`${url}/my`} component={ProfileIndex} />
          </Switch>
        </div>
        
        <div className={styles.noticePanel} style={{ top: showNoticePanel ? '58px' :'-100%' }}>
          <NoticeIndex />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: fromJS(state).get('user')
    // user: fromJS(state).get('user')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pushURL: bindActionCreators(pushURL, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
import * as React from 'react'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import { bindActionCreators } from 'redux'
import Loadable from 'react-loadable'
import { RouteComponentProps } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { Icon, Popover } from 'antd'
import styles from './Header.module.scss'
import API from '../utils/API'
import messageHandler from '../utils/messageHandler'
import Logo from '@utils/image/logo.png'
import DefaultAvatar from '../utils/image/DefaultAvatar.jpg'
import { pushURL } from '../actions/route'
import { 
  setUserInfo,
  logout, 
} from '../actions/auth'
import NoticeIndex from './notice/NoticeIndex'
import { FORM_TYPE } from './LoginContainer'
import { USER_TYPE } from './profile/ProfileHomepage';

interface HeaderProps {
  user: any, // redux
  pushURL: Function, // redux
  setUserInfo: Function, // redux
  logout: Function, // redux
}

const TYPE = {
  HOMEPAGE: 'activity',
  NEWS: 'news',
  STATISTICS: 'statistics'
}

const ActivityIndex = Loadable({
  loader: () => import('./activity/ActivityIndex'),
  loading: () => <div>loading...</div>
})

const ProfileIndex = Loadable({
  loader: () => import('./profile/ProfileIndex'),
  loading: () => <div>loading...</div>
})

const SearchIndex = Loadable({
  loader: () => import('./search/SearchIndex'),
  loading: () => <div>loading...</div>
})

const FriendsIndex = Loadable({
  loader: () => import('./friends/FriendsIndex'),
  loading: () => <div>loading...</div>
})

const StatisIndex = Loadable({
  loader: () => import('./profile/AdminStatis'),
  loading: () => <div>loading...</div>
})

class Header extends React.Component<RouteComponentProps & HeaderProps, any> {
  state = {
    showNoticePanel: false,
    userId: localStorage.getItem('userid')
  }
  componentDidMount() {
    const { userId } = this.state
    if (userId && userId !== this.props.user.get('id')) {
      API.query('/user/info', {}).then(messageHandler).then((json) => {
        if (json.code === 0) {
          this.props.setUserInfo(json.data)
        } 
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    const userId = localStorage.getItem('userid')
    if (userId && userId !== nextProps.user.get('id')) {
      API.query('/user/info', {}).then(messageHandler).then((json) => {
        if (json.code === 0) {
          this.props.setUserInfo(json.data)
        } 
      })
    }
  }
 
  public render() {
    const { showNoticePanel } = this.state
    const { match, location, user, pushURL, logout } = this.props
    const url = match.path
    const type = (location.pathname.split('/')[2] || 'activity').toLowerCase()
    const userId = localStorage.getItem('userid')
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
                <div className={styles.menuItem} data-active={type === TYPE.HOMEPAGE} onClick={() => this.props.pushURL('/workspace/activity')}>
                  首页
                </div>
                {user.get('type') === USER_TYPE.NORMAL && 
                  <div className={styles.menuItem} data-active={type === TYPE.NEWS} onClick={() => this.props.pushURL('/workspace/news')}>
                    朋友圈
                  </div>
                }
                {user.get('type') === USER_TYPE.ADMIN &&
                  <div className={styles.menuItem} data-active={type === TYPE.STATISTICS} onClick={() => this.props.pushURL('/workspace/statistics')}>
                    网站数据
                  </div>
                }
               
              </div>
            </div>
            {userId && user && user.get('id') ? 
              <div className={styles.right}>
                <Icon type="bell" onClick={() => this.setState({ showNoticePanel: !showNoticePanel })}/>
                <Popover
                  placement="bottom"
                  content={(
                    <div className={styles.logout} onClick={() => logout()}>
                      退出登录
                    </div>
                  )}
                >
                  <div className={styles.user} onClick={() => user.get('type') === USER_TYPE.NORMAL && pushURL('/workspace/my')} style={{ backgroundImage: `url(${user.get('logoUrl') || DefaultAvatar})` }}/>
                </Popover>
                
              </div>
              :
              <div className={styles.right}>
                <div className={styles.link} onClick={() => pushURL('/login', { type: FORM_TYPE.USER_LOGIN })}>登录</div>
                |
                <div className={styles.link} onClick={() => pushURL('/login', { type: FORM_TYPE.REGISTER })}>注册</div>
              </div> 
            }
          </div>
          
        </div>
        <div className={styles.content} style={{ overflowY: showNoticePanel ? 'hidden' : 'auto', height: 'calc(100% - 60px)', overflowX: 'auto'}}>
          <Switch>
            <Route path={`${url}/activity`} component={ActivityIndex}/>
            {user.get('type') === USER_TYPE.NORMAL &&
              <Route path={`${url}/my`} component={ProfileIndex} />
            }
            <Route path={`${url}/user/:userId`} component={ProfileIndex} />
            <Route path={`${url}/search`} component={SearchIndex} />
            {user.get('type') === USER_TYPE.NORMAL &&
              <Route path={`${url}/news`} component={FriendsIndex} />
            }
            <Route path={`${url}/statistics`} component={StatisIndex} />
          </Switch>
        </div>
        
        <div className={styles.noticePanel} style={{ top: showNoticePanel ? '58px' :'-100%' }}>
          <NoticeIndex 
            hide={() => this.setState({ showNoticePanel: false })}
          />
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
    pushURL: bindActionCreators(pushURL, dispatch),
    setUserInfo: bindActionCreators(setUserInfo, dispatch),
    logout: bindActionCreators(logout, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
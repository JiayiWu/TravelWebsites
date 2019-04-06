import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { Icon, Button } from 'antd'
import Immutable, { fromJS } from 'immutable' 
import styles from './ProfileIndex.module.scss'
import HeaderImage from '@utils/image/profile/header.jpeg'
import ProfileHomepage, { USER_TYPE } from './ProfileHomepage'
import ProfileActivity from './ProfileActivity'
import ProfilePasswd from './ProfilePasswd'
import ProfileStatis from './ProfileStatis'
import { setUserInfo, updateBasic, fetchBasicInfo, fetchApplyInfo, updateApply } from '../../actions/auth'
import { follow, unFollow } from '../../actions/interaction'
import oss from '../../utils/file'
import API, { serverOrigin } from '../../utils/API'
import DefaultAvatar from '../../utils/image/DefaultAvatar.jpg'

// import { updateBasic, fetchBasicInfo, fetchApplyInfo } from '../../actions/user'
import messageHandler from '../../utils/messageHandler';
import FriendsIndex from '../friends/FriendsIndex';

interface ProfileProps {
  fetchBasicInfo: Function, // dispatch
  fetchApplyInfo: Function, // dispatch
  updateBasic: Function, // dispatch
  setUserInfo: Function, // dispatch
  updateApply: Function, // dispatch
  follow: Function, // dispatch
  unFollow: Function, // dispatch
  user: any, // redux
}

const CONTENT_TYPE = {
  HOMEPAGE: 0,
  ACTIVITY: 1,
  BLOGS: 2,
  SECURITY: 3,
  STATISTICS: 4,
}

// const GUEST_CONTENT_TYPE = {
//   ACTIVITY: 0,
//   FOLLOEW: 1,
//   FANS: 2,
// }

const CONTENT_LIST = ['我的窝', '我的活动', '我的动态', '账号安全', '我的数据']
// const GUEST_CONTENT_LIST = ['Ta的窝', 'Ta的关注', 'Ta的粉丝']

class ProfileIndex extends React.Component<RouteComponentProps & ProfileProps, any> {
  private uploader: React.RefObject<HTMLInputElement>
  
  constructor(props) {
    super(props)
    this.uploader = React.createRef()
  }
  state = {
    contentType: (this.props.match.params as any).userId ? CONTENT_TYPE.ACTIVITY : CONTENT_TYPE.ACTIVITY,
    user: (this.props.match.params as any).userId ? fromJS({}) : this.props.user
    // basicInfo: null,
    // applyInfo: null,
  }
  componentWillMount() {
    console.log('profile render')
  }
  componentDidMount() {
    this.fetchBasicInfo()
    if (this.props.location.pathname.indexOf('my') >= 0) {
      this.props.fetchApplyInfo()
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!Immutable.is(nextProps.user, this.props.user)) {
      this.setState({
        user: nextProps.user
      })
    } else if (nextProps.location.pathname.indexOf('my') >= 0 && this.props.location.pathname.indexOf('user') >= 0) {
      this.setState({
        user: nextProps.user
      })
    }
    // if (!((nextProps.match.params as any).userId) &&!Immutable.is(nextProps.user, this.props.user)) {
    //   this.setState({
    //     user: nextProps.user
    //   })
    // }

    if (nextProps.location && this.props.location && nextProps.location.pathname !== this.props.location.pathname) {
      this.fetchBasicInfo(nextProps)
    }
    
  }
  onUploadAvatar = () => {
    const files = (this.uploader as any).current.files
    oss.uploadFile(files[0]).then((json) => {
      if (json.code === 0) {
        const logoUrl = serverOrigin + '/' + json.data
        this.props.updateBasic({logoUrl}).then(messageHandler).then((json) => {
          if (json.code === 0) {
            this.props.fetchBasicInfo()
          }
        })
      }
    })
  }
  fetchBasicInfo = (props = this.props) => {
    const { match } = props
    const urlUserId = (match.params as any).userId
    console.log(urlUserId)
    if (urlUserId) {
      // 获取用户信息后setState
      API.query(`/user/homeInfo/${urlUserId}`, {}).then((json) => {
        if (json.code === 0) {
          this.setState({
            user: fromJS(json.data)
          })
        }
      })
    } else {
      this.props.fetchBasicInfo()
    }
  }
  handleFollow = () => {
    const { user } = this.state
    const { follow, unFollow } = this.props
    const promise = user.get('concerned') ? unFollow(user.get('id')) : follow(user.get('id'))
    promise.then((json) => {
      if (json.code === 0) {
        this.fetchBasicInfo()
      }
    })
  }
  renderMenu = () => {
    const { contentType } = this.state
    const { match, user } = this.props
    const urlUser = (match.params as any).userId
    return !urlUser ? CONTENT_LIST.map((name, index) => {
      return (
        <div
          className={styles.menuItem}
          data-active={contentType === index}
          key={index}
          onClick={() => this.setState({ contentType: index })}
        >
          {name}
        </div>
      )
    }) : (
      [<div
        className={styles.menuItem}
        key={CONTENT_TYPE.ACTIVITY.toString()}
        data-active={contentType === CONTENT_TYPE.ACTIVITY}
        onClick={() => this.setState({ contentType: CONTENT_TYPE.ACTIVITY })}
      >
        Ta的窝
      </div>, 
      <div 
        className={styles.menuItem}
        key={CONTENT_TYPE.BLOGS.toString()}
        data-active={contentType === CONTENT_TYPE.BLOGS}
        onClick={() => this.setState({ contentType: CONTENT_TYPE.BLOGS})}
      >
        Ta的动态
      </div>
      ]
    )
    // }) : GUEST_CONTENT_LIST.map((name, index) => {
    //   return (
    //     <div
    //       className={styles.menuItem}
    //       data-active={contentType === index}
    //       key={index}
    //       onClick={() => this.setState({ contentType: index })}
    //     >
    //       {name}
    //     </div>
    //   )
    // })
  }
  public render() {
    const { match } = this.props
    const { user } = this.state
    const { contentType } = this.state;
    (window as any).uploader = this.uploader
    const urlUser = (match.params as any).userId
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
            <div className={styles.userLogo} onClick={() => this.uploader.current ? this.uploader.current.click() : null}  style={{ backgroundImage: `url(${user.get('logoUrl') || DefaultAvatar})`}}>
              {!urlUser && <div className={styles.cover}><Icon type="camera" /></div>}
            </div>
            <div className={styles.userName}>{user.get('name')}</div>
            {/* 当前用户id不是这个页面获取的用户id时 */
              urlUser && (urlUser != this.props.user.get('id') && this.props.user.get('type') !== USER_TYPE.ADMIN) && (
                <div className={styles.follow}>
                  <Button onClick={() => this.handleFollow()} type={user.get('concerned') ? 'default' : 'primary'} size="small">{user.get('concerned') ? '取消关注' : '关注'}</Button>
                </div>
              )
            }
            <div className={styles.btnGroup}>
              <div className={styles.myBtn}>
                <div>{user.get('concernNum') || 0}</div>
                <div>关注</div>
              </div>
              <div className={styles.myBtn}>
                <div>{user.get('fansNum') || 0}</div>
                <div>粉丝</div>
              </div>
            </div>
          </div>

          <div className={styles.contentContainer} >
            {contentType === CONTENT_TYPE.HOMEPAGE &&
              <ProfileHomepage 
                user={user}
                updateBasic={this.props.updateBasic}
                updateApply={this.props.updateApply}
              />
            }
            {contentType === CONTENT_TYPE.ACTIVITY &&
              <ProfileActivity 
                user={this.props.user}
                urlUserId={urlUser}
              />
            }
            {contentType === CONTENT_TYPE.BLOGS &&
              <div style={{ background: 'white', padding: 20 }}>
                <FriendsIndex userId={urlUser || this.props.user.get('id')}/>
              </div>
            }
            {contentType === CONTENT_TYPE.SECURITY &&
               <ProfilePasswd />
            }
            {contentType === CONTENT_TYPE.STATISTICS &&
              <ProfileStatis />

            }
          </div>
        </div>
        <input type="file" ref={this.uploader} onChange={this.onUploadAvatar} style={{ display: 'none'}} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: fromJS(state).get('user')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateBasic: bindActionCreators(updateBasic, dispatch),
    updateApply: bindActionCreators(updateApply, dispatch),
    fetchApplyInfo: bindActionCreators(fetchApplyInfo, dispatch),
    fetchBasicInfo: bindActionCreators(fetchBasicInfo, dispatch),
    setUserInfo: bindActionCreators(setUserInfo, dispatch),
    follow: bindActionCreators(follow, dispatch),
    unFollow: bindActionCreators(unFollow, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileIndex)
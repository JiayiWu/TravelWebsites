import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Icon } from 'antd'
import styles from './ProfileIndex.module.scss'
import HeaderImage from '@utils/image/profile/header.jpeg'
import ProfileHomepage from './ProfileHomepage'
import ProfileActivity from './ProfileActivity'
import ProfilePasswd from './ProfilePasswd'
import { setUserInfo, updateBasic, fetchBasicInfo, fetchApplyInfo, updateApply } from '../../actions/auth'
import oss from '../../utils/file'
import { serverOrigin } from '../../utils/API'
import DefaultAvatar from '../../utils/image/DefaultAvatar.jpg'

// import { updateBasic, fetchBasicInfo, fetchApplyInfo } from '../../actions/user'
import { fromJS } from 'immutable';
import messageHandler from '../../utils/messageHandler';

interface ProfileProps {
  fetchBasicInfo: Function, // dispatch
  fetchApplyInfo: Function, // dispatch
  updateBasic: Function, // dispatch
  setUserInfo: Function, // dispatch
  updateApply: Function, // dispatch
  user: any, // redux
}

const CONTENT_TYPE = {
  HOMEPAGE: 0,
  ACTIVITY: 1,
  SECURITY: 2,
}

const CONTENT_LIST = ['我的窝', '我的活动', '账号安全']

class ProfileIndex extends React.Component<ProfileProps, any> {
  private uploader: React.RefObject<HTMLInputElement>
  
  constructor(props) {
    super(props)
    this.uploader = React.createRef()
  }
  state = {
    contentType: CONTENT_TYPE.HOMEPAGE,
    // basicInfo: null,
    // applyInfo: null,
  }
  componentWillMount() {
    console.log('profile render')
  }
  componentDidMount() {
    const { user } = this.props
    this.props.fetchBasicInfo()
    this.props.fetchApplyInfo()
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
    const { user } = this.props
    const { contentType } = this.state;
    (window as any).uploader = this.uploader
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
              <div className={styles.cover}><Icon type="camera" /></div>
            </div>
            <div className={styles.userName}>{user.get('name')}</div>
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
              <ProfileHomepage 
                user={user}
                updateBasic={this.props.updateBasic}
                updateApply={this.props.updateApply}
              />
            }
            {contentType === CONTENT_TYPE.ACTIVITY &&
              <ProfileActivity 
                user={user}
              />
            }
            {contentType === CONTENT_TYPE.SECURITY &&
              <ProfilePasswd />
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileIndex)
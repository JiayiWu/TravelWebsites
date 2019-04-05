import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Tabs, Input, Button } from 'antd'
import API from '../../utils/API'
import styles from './SearchIndex.module.scss'
import DynamicScrollPane from '../../components/DynamicScrollPane'
import ActivityCard from '../activity/components/ActivityCard'
import {SEARCH_TYPE, SEARCH_TYPES, ActivityItemProps} from '../activity/ActivityHomepage'
import { UserBasicProps } from '../profile/ProfileHomepage'
import UserCard from '../../components/UserCard'
import { fromJS } from 'immutable'
import { pushURL } from '../../actions/route'

interface SearchIndexProps {
  route: any, // redux
  user: any, // redux
  pushURL: (url: string, state?: any) => void, // redux
}


const TabPane = Tabs.TabPane
class SearchIndex extends React.Component<SearchIndexProps, any> {
  state = {
    type: this.props.route.getIn(['state', 'type']) || 0,
    keyword: this.props.route.getIn(['state', 'value']) || '',
    isLoading: false,
    userList: [] as Array<UserBasicProps>,
    actList: [] as Array<ActivityItemProps>
  }
  
  componentDidMount() {
    const { route } = this.props
    const [keyword, type] = [route.getIn(['state', 'value']), route.getIn(['state', 'type'])]
    this.handleSearch({keyword, type})
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     type: this.props.route.getIn(['state', 'type']) || 0,
  //     keywords: this.props.route.getIn(['state', 'value']) || '',

  //   })
  // }

  // static getDerivedStateFromProps(props, prevState) {
  //   return {
  //     ...prevState,
  //     keyword: props.route.getIn(['state', 'value']) || '',
  //     type: props.route.getIn(['state', 'type']) || 0
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    console.log('update', prevState, this.state)
    if (prevState.keyword !== this.state.keyword || prevState.type !== this.state.type) {
      this.handleSearch({keyword: this.state.keyword, type: this.state.type})
    }
  }

  handleSearch(obj: { keyword?: string, type?: string | number }) {
    const { type, keyword } = obj
    const { userList, actList } = this.state
    this.setState({
      isLoading: true,
    })
    
    return type === SEARCH_TYPE.ACT ? API.query('/activity/searchList', {
      searchParams: {
        size: 10,
        keyword,
        lastId: actList.length > 0 ? actList[actList.length - 1].id : 0
      }
    }).then((json) => {
      if (json.code === 0) {
        this.setState({
          actList: actList.concat(json.data),
          isLoading: false,
        })
      }
    }) : API.query('/user/searchList', {
      searchParams: {
        keyword,
        size: 10,
        lastId: userList.length > 0 ? userList[userList.length - 1].id : 0
      }
    }).then((json) => {
      if (json.code === 0) {
        this.setState({
          userList: userList.concat(json.data),
          isLoading: false,
        })
      }
    })
  }

  updateCurrentUser = (userId) => {
    let { userList } = this.state
    const curUserIndex = userList.findIndex((user) => user.id === userId)
    if (curUserIndex >= 0) {
      let curUser = userList[curUserIndex]
      curUser.concerned = !curUser.concerned
      curUser.fansNum = curUser.concerned ? curUser.fansNum + 1 : curUser.fansNum - 1
      // userList[curUserIndex] = curUser
      this.setState({
        userList
      })
    }
  }

  renderAll() {
    const { route } = this.props
    return (
      <div className={styles.allContainer}>
        <div className={styles.header}>
          <h3>活动列表</h3>
          <a onClick={() => this.props.pushURL(route.get('url'), { value: this.state.keyword, type: SEARCH_TYPE.ACT })}>查看更多活动</a>
        </div>
        <div className={styles.listContainer}>
          {this.renderActs()}
        </div>
        <div className={styles.header}>
          <h3>用户列表</h3>
          {this.renderUsers()}
        </div>
      </div>
    )
  }

  renderActs() {
    return (
      <DynamicScrollPane
        hasMore={true}
        isLoading={this.state.isLoading}
        loadMore={() => this.handleSearch({ type: this.state.type, keyword: this.state.keyword })}
      >
        <div className={styles.listContainer}>
          {this.state.actList.map((act, index) => {
            return (
              <ActivityCard 
                activity={act}
              />
            )
          })}
        </div>
      </DynamicScrollPane>
      
    )
  }

  renderUsers() {
    const { userList } = this.state
    return (
      <div className={styles.listContainer}>
        {userList.map((user, index) => {
          return (
            <div key={user.id} className={styles.userCard}>
              <UserCard user={user} pushURL={this.props.pushURL} isMe={this.props.user.get('id') === user.id} refresh={() => this.updateCurrentUser(user.id)}/>
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    const { type, keyword } = this.state
    return (
      <div className={styles.container}>
        <Input.Search
          placeholder="搜索"
          defaultValue={keyword}
          onSearch={(value) => this.setState({
            keyword: value,
            type,
          })}
        />
        <Tabs defaultActiveKey={type.toString()} onChange={(key) => this.handleSearch({keyword: key})}>
          {/* <TabPane tab={SEARCH_TYPES[SEARCH_TYPE.ALL].text} key={SEARCH_TYPE.ALL.toString()}>
            {this.renderAll()}
          </TabPane> */}
          <TabPane tab={SEARCH_TYPES[SEARCH_TYPE.ACT].text} key={SEARCH_TYPE.ACT.toString()}>
            {this.renderActs()}
          </TabPane>
          <TabPane tab={SEARCH_TYPES[SEARCH_TYPE.USER].text} key={SEARCH_TYPE.USER.toString()}>
            {this.renderUsers()}
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    route: fromJS(state).get('route'),
    user: fromJS(state).get('user')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pushURL: bindActionCreators(pushURL, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchIndex)
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Tabs, Input, Button } from 'antd'
import styles from './SearchIndex.module.scss'
import {SEARCH_TYPE, SEARCH_TYPES} from '../activity/ActivityHomepage'
import UserCard from '../../components/UserCard'
import { fromJS } from 'immutable';
import { pushURL } from '../../actions/route'

interface SearchIndexProps {
  route: any, // redux
  pushURL: (url: string, state?: any) => void, // redux
}


const TabPane = Tabs.TabPane
class SearchIndex extends React.Component<SearchIndexProps, any> {
  state = {
    type: this.props.route.getIn(['state', 'type']) || 0,
    keywords: this.props.route.getIn(['state', 'value']) || '',
    userList: [],
    actList: []
  }
  
  componentDidMount() {
    const { route } = this.props
    const [keywords, type] = [route.getIn(['state', 'value']), route.getIn(['state', 'type'])]

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      type: this.props.route.getIn(['state', 'type']) || 0,
      keywords: this.props.route.getIn(['state', 'value']) || '',

    })
  }

  handleSearch(obj: { keyword?: string, type?: string | number }) {

  }

  handleFollow = () => {
    // 调用 关注用户的接口，会传递用户id进来，调完之后刷新list
  }

  renderAll() {
    const { route } = this.props
    return (
      <div className={styles.allContainer}>
        <div className={styles.header}>
          <h3>活动列表</h3>
          <a onClick={() => this.props.pushURL(route.get('url'), { value: this.state.keywords, type: SEARCH_TYPE.ACT })}>查看更多活动</a>
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
      <div className={styles.listContainer}>
        {new Array(3).fill(0).map((act, index) => {
          return (
            <div style={{ display: 'block', width: '100%' }} key={index}>活动项</div>
          )
        })}
      </div>
    )
  }

  renderUsers() {
    return (
      <div className={styles.listContainer}>
        {new Array(3).fill(0).map((act, index) => {
          return (
            <div key={index} className={styles.userCard}>
              <UserCard userId={index} pushURL={this.props.pushURL}/>
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    const { type, keywords } = this.state
    // const { route } = this.props
    // const [keywords, type] = [route.getIn(['state', 'value']), route.getIn(['state', 'type'])]
    return (
      <div className={styles.container}>
        <Input.Search
          placeholder="搜索"
          defaultValue={keywords}
          onSearch={(value) => this.setState({
            keywords: value,
            type,
          })}
        />
        <Tabs defaultActiveKey={type.toString()} onChange={(key) => this.handleSearch({keyword: key})}>
          <TabPane tab={SEARCH_TYPES[SEARCH_TYPE.ALL].text} key={SEARCH_TYPE.ALL.toString()}>
            {this.renderAll()}
          </TabPane>
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
    route: fromJS(state).get('route')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pushURL: bindActionCreators(pushURL, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchIndex)
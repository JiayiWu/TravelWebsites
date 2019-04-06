import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pushURL } from '../../../actions/route'
import styles from './ForwardActCard.module.scss'

class ForwardActCard extends React.Component<{
  simpleDetail: {
    id: number,
    coverUrl: number,
    title: string
  },
  pushURL: Function, // redux
}, any> {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { simpleDetail } = this.props
    return (
      <div className={styles.container} onClick={() => this.props.pushURL(`/workspace/activity/detail/${simpleDetail.id}`)}>
        <div className={styles.cover} style={{ backgroundImage: `url(${simpleDetail.coverUrl})`}}></div>
        <div className={styles.right}>{simpleDetail.title}</div>
      </div>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return {
    pushURL: bindActionCreators(pushURL, dispatch)
  }
}
export default connect(() => ({}), mapDispatchToProps)(ForwardActCard)
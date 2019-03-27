import React from 'react'
import { Anchor } from 'antd'
import styles from './CommentItem.module.scss'
import CommentInput from './CommentInput'

interface CommentItemProps {
  onReply: () => void
}

const Link = Anchor.Link
class CommentItem extends React.Component<CommentItemProps, any> {
  // state = {
  //   showReplyInput: false
  // }
  handleReply = () => {
    // 回调回复函数，在commentinput中填入回复xxx，并自动scroll到commentInput位置
    // this.setState({
    //   showReplyInput: true
    // })
    this.props.onReply()
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.avatar}></div>
        <div className={styles.right}>
          <span className={styles.user}>张耳朵</span>
          :
          <span className={styles.content}>啊啊啊啊啊啊我地妈呀好多我喜欢的电影，而且每一部都特别有意义</span>
        </div>
        <div className={styles.reply} onClick={() => this.handleReply()}>
          回复
        </div>
      </div>
    )
  }
}

export default CommentItem
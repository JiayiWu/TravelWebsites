import React from 'react'
import { Icon } from 'antd'
import styles from './CommentItem.module.scss'
import CommentInput from './CommentInput'

interface CommentItemProps {
  onReply: () => void,
  comment: CommentProps
}

export interface CommentProps {
  commentedUser: string,
  commenter: string,
  content: string,
  createTime: number,
  id: number,
  parentId: number
}

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
    const { comment } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.avatar}></div>
        <div className={styles.right}>
          <span className={styles.user}>{comment.commenter}</span>
          :&nbsp;
          {comment.commentedUser &&
            <span className={styles.user}>@{comment.commentedUser}&nbsp;</span>
          }
          <span className={styles.content}>{comment.content}</span>
        </div>
        <div className={styles.options}>
          <Icon type="delete" />
          <div className={styles.reply} onClick={() => this.handleReply()}>
            回复
          </div>
        </div>
        
      </div>
    )
  }
}

export default CommentItem
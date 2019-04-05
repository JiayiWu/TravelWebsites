import React from 'react'
import { Icon, message } from 'antd'
import API from '../utils/API'
import styles from './CommentItem.module.scss'
import CommentInput from './CommentInput'

interface CommentItemProps {
  onReply: () => void,
  comment: CommentProps,
  onRefresh: () => void
}

export interface CommentProps {
  commentedUser: string,
  commenter: string,
  commenterLogo: string,
  myself: boolean,
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
  handleDelete = () => {
    API.query('/interaction/deleteComment', {
      options: {
        method: 'DELETE'
      },
      searchParams: {
        id: this.props.comment.id
      }
    }).then((json) => {
      if (json.code === 0) {
        message.success('删除评论成功')
        this.props.onRefresh && this.props.onRefresh()
      }
    })
  }
  render() {
    const { comment } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.avatar} style={{ backgroundImage: `url(${comment.commenterLogo})`}}></div>
        <div className={styles.right}>
          <span className={styles.user}>{comment.commenter}</span>
          :&nbsp;
          {comment.commentedUser &&
            <span className={styles.user}>@{comment.commentedUser}&nbsp;</span>
          }
          <span className={styles.content}>{comment.content}</span>
        </div>
        <div className={styles.options}>
          {comment.myself &&
            <Icon type="delete" onClick={() => this.handleDelete()}/>
          }
          <div className={styles.reply} onClick={() => this.handleReply()}>
            回复
          </div>
        </div>
        
      </div>
    )
  }
}

export default CommentItem
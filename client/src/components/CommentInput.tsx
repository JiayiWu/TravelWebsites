import React from 'react'
import { Input, Button } from 'antd'
import styles from './CommentInput.module.scss'


class CommentInput extends React.Component {
  handleReply = () => {
    // 评论 之后刷新去拿新的评论列表
  }
  render() {
    return (
      <div className={styles.inputWrapper}>
        <Input placeholder="发表评论"/>
        <Button type="primary" size="small" onClick={() => this.handleReply()}>回复</Button>
      </div>

    )
  }
}

export default CommentInput
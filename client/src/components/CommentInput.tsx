import React from 'react'
import { Input, Button } from 'antd'
import styles from './CommentInput.module.scss'

interface CommentInputProps {
  value: string,
  onChange: Function,
  onComment: Function,
}

class CommentInput extends React.Component<CommentInputProps, any> {
  handleReply = () => {
    // 评论 之后刷新去拿新的评论列表
    this.props.onComment()
  }
  render() {
    return (
      <div className={styles.inputWrapper}>
        <Input placeholder="发表评论" value={this.props.value} onChange={(e) => this.props.onChange(e.target.value)}/>
        <Button type="primary" size="small" onClick={() => this.handleReply()}>回复</Button>
      </div>

    )
  }
}

export default CommentInput
import * as React from 'react'
import moment from 'moment'
import { Icon, Tabs, message } from 'antd'
import styles from './ActivityDetailContent.module.scss'
import CommentInput from '../../../components/CommentInput'
import CommentItem, { CommentProps } from '../../../components/CommentItem'
import API from '../../../utils/API'
import { ActivityItemProps } from '../ActivityDetail'
import MyEditor from '../../../components/MyEditor'
import DefaultAvatar from '../../../utils/image/DefaultAvatar.jpg'

interface DetailContentProps {
  detail: ActivityItemProps,
}

const TabPane = Tabs.TabPane

class ActivityDetailCnontent extends React.Component<DetailContentProps, any> {
  private editor: React.RefObject<any>
  private commentInput: React.RefObject<HTMLInputElement>

  constructor(props) {
    super(props)
    this.editor = React.createRef()
    this.commentInput = React.createRef()
    this.state = {
      commentList: [] as Array<CommentProps>,
      comment: '',
      curComment: null,
    }
  }
  componentDidMount() {
    this.fetchCommentList()
  }
  fetchCommentList = () => {
    const { detail } = this.props
    API.query('/interaction/allComments', {
      searchParams: {
        referId: detail.id,
        type: 1,
      }
    }).then((json) => {
      if (json.code === 0) {
        this.setState({
          commentList: json.data
        })
      }
    })
  }
  handleComment = () => {
    const { comment, curComment } = this.state
    const { detail } = this.props
    
    API.query('/interaction/comment', {
      options: {
        method: 'POST',
        body: JSON.stringify({
          content: comment.indexOf('：') > 0 ? comment.split('：')[1] : comment,
          parentId: curComment ? curComment.id : 0,
          referId: detail.id,
          type: 1
        })
      }
    }).then((json) => {
      if (json.code === 0) {
        message.success('评论成功')
        this.setState({
          comment: '',
          curComment: null,
        })
        this.fetchCommentList()
      }
    })
  }
  public render() {
    const { detail } = this.props
    const { commentList, comment } = this.state
    return (
      <div className={styles.container}>
        <Tabs>
          <TabPane key="detail" tab="详情" className={styles.tabPane}>
            <div className={styles.card}>
              <div className={styles.item}>
                <Icon type="clock-circle" theme="filled" />
                {moment(detail.startTime).format('YYYY-MM-DD HH:mm')}
                &nbsp;至&nbsp;
                {moment(detail.endTime).format('YYYY-MM-DD HH:mm')}
              </div>
              <div className={styles.item}>
                <Icon type="environment" theme="filled" />
                {detail.location}
              </div>
            </div>
            {/* <div className={styles.content}>{detail.description}</div> */}
            <div className={styles.content}>
              
              <MyEditor ref={this.editor} readOnly defaultValue={detail.description}/>
            </div>
        
            <div className={styles.splitLine}/>
            <div className={styles.commentContainer} ref={this.commentInput}>
              <CommentInput value={comment} onChange={(value) => this.setState({ comment: value, curComment: value.indexOf('：') > 0 ? this.state.curComment : null })} onComment={() => this.handleComment()}/>
              <div className={styles.commentList}>
                {commentList.map((comment, index) => {
                  return (
                    <div className={styles.commentItem} key={comment.id}>
                      <CommentItem
                        comment={comment}
                        onReply={() => { 
                          const commentInput = this.commentInput.current
                          if (commentInput) {
                            commentInput && commentInput.scrollIntoView({
                              block: 'start',
                              behavior: 'smooth'
                            })
                            this.setState({
                              comment: `回复${comment.commenter}：`,
                              curComment: comment,
                            })
                            
                          }
                      
                          
                          
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
            
          </TabPane>
          {detail.attendList && detail.attendList.length > 0 &&
            <TabPane key="member" tab="成员" className={styles.tabPane}>
              <div className={styles.memberContainer}>
                {detail.attendList.map((attend) => {
                  return (
                    <div className={styles.memberItem}>
                      <img src={attend.logoUrl || DefaultAvatar}/>
                      <div className={styles.infoWrapper}>
                        {attend.name}
                      </div>
                    </div>
                  )
                })}
              </div>
            
            </TabPane>
          }
         
        </Tabs>
        {/* <div className={styles.left}> */}
          
        
      </div>
    )
  }
}

export default ActivityDetailCnontent
import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { bindActionCreators } from 'redux'
import { fromJS } from 'immutable'
import { releaseBlog } from '../../actions/interaction'
import { pushURL } from '../../actions/route'
import { Input, Button, Icon, Upload, Popover, Modal, message } from 'antd'
import styles from './FriendsIndex.module.scss'
import API, {serverOrigin } from '../../utils/API'
import ForwardActCard from './components/ForwardActCard'
import ImagesContainer from './components/ImagesContainer';
import moment from 'moment'
// import TextArea from 'antd/lib/input/TextArea';

const MAX_IMAGE = 9
const TextArea = Input.TextArea
interface BlogItemProps {
  content: string,
  createTime: number,
  id: number,
  likeCount: number,
  myself: boolean,
  photos: Array<string>,
  userAvatar: string,
  userId: number,
  userName: string,
}

interface FriendsProps {
  user: any, // redux
  releaseBlog: Function, // redux
  pushURL: Function, // redux
  userId?: number | string
}
class FriendsIndex extends React.Component<RouteComponentProps & FriendsProps, any> {
  private myInput: React.RefObject<any>
  private uploader: React.RefObject<HTMLInputElement>
  constructor(props) {
    super(props)
    this.myInput = React.createRef()
    this.uploader = React.createRef()
  }
  state = {
    imageList: [] as Array<any>,
    previewImage: '',
    previewVisible: false,
    showImageContainer: false,
    blogList: [] as Array<BlogItemProps>
  }
  componentDidMount() {
    this.fetchBlogList()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.userId !== this.props.userId) {
      this.fetchBlogList(true, nextProps)
    }
  }
  handlePublish = () => {
    // const value = this.myInput.current.value
    (window as any).input = this.myInput.current;
    let value = this.myInput.current.textAreaRef.value
    if (value) {
      value = value.replace(/\n/g, '<br />')
      value = value.replace(/\t/g, ' ')
      console.log(value)
    }
    this.props.releaseBlog({
      content: value,
      photos: this.state.imageList.map((image) => image.url).join(',')
    }).then((json) => {
      if (json.code === 0) {
        message.success('发布成功')
        this.myInput.current.textAreaRef.value = ''
        this.setState({
          imageList: []
        })
        this.fetchBlogList(true)
      }
    })
    // 把/n换成<br />后提交后台
  }
  fetchBlogList = (isUpdate = false, props = this.props) => {
    const { blogList } = this.state
    const { location, match, userId } = props
    const promise = !location ? 
    API.query('/blog/getOneUser', {
      searchParams: {
        userId,
        size: 100,
        lastTime: isUpdate ? 0 : (blogList.length > 0 ? blogList[blogList.length - 1].createTime : 0)
      }
    }) : API.query('/blog/myFriendsBlogs', {
      searchParams: {
        size: 100,
        lastTime: isUpdate ? 0 : (blogList.length > 0 ? blogList[blogList.length - 1].createTime : 0)
      }
    })
    return promise.then((json) => {
      if (json.code === 0) {
        this.setState({
          blogList: isUpdate ? json.data : blogList.concat(json.data)
        })
      }
    })
  }
  onUploadImage = (options) => {
    const { file } = options
    let { imageList } = this.state
    let formData = new FormData()
    formData.append('file', file)
    fetch(serverOrigin + '/file/upload', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    }).then((res) => res.json()).then((json) => {
      if (json.code === 0) {
        imageList.push({
          uid: `${imageList.length}`,
          name: file.name,
          status: 'done',
          url: serverOrigin + '/' + json.data
        })
        this.setState({
          imageList
        })
      }
    })
  }
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handlePreviewCancel = () => {
    this.setState({
      previewImage: '',
      previewVisible: false,
    })
  }
  handleChange = (file) => this.setState({ imageList: this.state.imageList.filter((f) => f.url !== file.url) })

  handleDelete = (blogId) => {
    API.query(`/blog/delete/${blogId}`, {
      options: {
        method: 'DELETE'
      },
    }).then((json) => {
      if (json.code === 0) {
        message.success('删除成功')
        this.fetchBlogList(true)
      }
    })
  }

  renderImagePopover = () => {
    const { imageList } = this.state
    const uploadButton = (
      <div style={{ display: 'inline-block' }}>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className={styles.imageContainer}>
        <div className={styles.desc}>共{imageList.length}张, 还能上传{MAX_IMAGE - imageList.length}张</div>
        <Upload
          customRequest={this.onUploadImage}
          // action={`${serverOrigin}+ '/file/upload`}
          listType="picture-card"
          fileList={imageList}
          onPreview={this.handlePreview}
          onRemove={this.handleChange}
          // onChange={this.handleChange}
        >
          {imageList.length < 9 ? uploadButton : null}
        </Upload>
      </div>
    )
  }
  render() {
    const { previewVisible, previewImage, blogList } = this.state
    const { user, userId, location } = this.props
    const popoverTitle = (
      <div className={styles.popoverTitle}>
        <span>本地上传</span>
        <Icon type='close' onClick={() => this.setState({ imageList: [], showImageContainer: false })} />
      </div>
    )
    return (
      <div className={styles.container} >
        <input style={{ display: 'none' }} type="file" ref={this.uploader} onChange={this.onUploadImage}/>
        {(userId === user.get('id') || (location && location.pathname.indexOf('news') >= 0)) &&
          <div className={styles.sendWrapper}>
            <div className={styles.header}>有什么新鲜事想告诉大家</div>
            <div className={styles.input}>
              <TextArea rows={4} ref={this.myInput}/>
            </div>
            <div className={styles.bottom}>
              <div className={styles.left}>
                <Popover
                  content={this.renderImagePopover()}
                  title={popoverTitle}
                  overlayStyle={{ zIndex: 999}}
                  placement="bottom"
                  visible={this.state.showImageContainer}
                >
                  <span className={styles.item} onClick={() => this.setState({ showImageContainer: true })}>
                    <Icon type="picture" />
                    图片
                  </span>
                </Popover>
                
              </div>
              <Button type="primary" onClick={() => this.handlePublish()}>发布</Button>
            </div>
          </div>
        }
        
        <div className={styles.messageList}>
          {blogList.length === 0 ? '暂无动态' :
            blogList.map((blog, index) => {
            let content = blog.content
            const detailStr = 'detailInfo'
            let detailIndex = content.indexOf(detailStr)
            let detail = null
            if (detailIndex >= 0) {
              detail = JSON.parse(content.slice(detailIndex + detailStr.length + 1))
              content = content.slice(0, detailIndex)
            }

            return (
              <div className={styles.messageItem} key={blog.id}>
                <div className={styles.top}>
                  <div className={styles.avatar} style={{ backgroundImage: `url(${blog.userAvatar})`}} onClick={() => this.props.pushURL(this.props.user.get('id') === blog.userId ? '/workspace/my' : `/workspace/user/${blog.userId}`)}></div>
                  <div className={styles.content}>
                    <div className={styles.username}>{blog.userName}</div>
                    <div className={styles.time}>{moment(blog.createTime).format('YYYY年MM月DD日 HH:mm:ss')}</div>
                    <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }}></div>
                    <ImagesContainer images={blog.photos}/>
                    {detail &&
                      <ForwardActCard simpleDetail={detail}/>
                    }
                  </div>
                  {blog.myself && <Icon type="delete" className={styles.deleteIcon} onClick={() => this.handleDelete(blog.id)}/>}
                </div>
                
                <div className={styles.btnGroup}>
                </div>
              </div>
            )
          })}
        </div>
        <Modal visible={previewVisible} footer={null} onCancel={this.handlePreviewCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
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
    releaseBlog: bindActionCreators(releaseBlog, dispatch),
    pushURL: bindActionCreators(pushURL, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsIndex)
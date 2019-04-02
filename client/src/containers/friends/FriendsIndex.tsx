import React from 'react'
import { Input, Button, Icon, Upload, Popover, Modal } from 'antd'
import styles from './FriendsIndex.module.scss'
import { serverOrigin } from '../../utils/API'
import ForwardActCard from './components/ForwardActCard'
import ImagesContainer from './components/ImagesContainer';
// import TextArea from 'antd/lib/input/TextArea';

const MAX_IMAGE = 9
const TextArea = Input.TextArea
class FriendsIndex extends React.Component {
  private myInput: React.RefObject<any>
  private uploader: React.RefObject<HTMLInputElement>
  constructor(props) {
    super(props)
    this.myInput = React.createRef()
    this.uploader = React.createRef()
  }
  state = {
    imageList: [{
      uid: '-1',
      name: 'xxx',
      status: 'done',
      url: ''
    }] as Array<any>,
    previewImage: '',
    previewVisible: false,
    showImageContainer: false,
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
    // 把/n换成<br />后提交后台
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
    const { previewVisible, previewImage } = this.state
    const popoverTitle = (
      <div className={styles.popoverTitle}>
        <span>本地上传</span>
        <Icon type='close' onClick={() => this.setState({ imageList: [], showImageContainer: false })} />
      </div>
    )
    return (
      <div className={styles.container} >
        <input style={{ display: 'none' }} type="file" ref={this.uploader} onChange={this.onUploadImage}/>
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
        <div className={styles.messageList}>
          {new Array(10).fill(0).map((msg, index) => {
            return (
              <div className={styles.messageItem} key={index}>
                <div className={styles.top}>
                  <div className={styles.avatar}></div>
                  <div className={styles.content}>
                    <div className={styles.username}>西红柿蛋花</div>
                    <div className={styles.time}></div>
                    <div className={styles.content}>有毒，打开微博想借鉴一下发微博的界面样式结果<br/>刷了半个小时</div>
                    <ImagesContainer />
                    <ForwardActCard />
                  </div>
                  <Icon type="delete" className={styles.deleteIcon} />
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

export default FriendsIndex
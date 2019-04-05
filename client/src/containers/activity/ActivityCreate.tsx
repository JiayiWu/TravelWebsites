import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import { fromJS } from 'immutable'
import { RouteComponentProps } from 'react-router'
import { Form, Input, Upload, Icon, DatePicker, Radio, Button, message, Checkbox } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import DefaultCoverURL from '../../utils/image/ActivityCover.jpg'
import styles from './ActivityCreate.module.scss'
import MyEditor from '../../components/MyEditor'
import API, { serverOrigin } from '../../utils/API'
import messageHandler from '../../utils/messageHandler'
import { pushURL } from '../../actions/route'

interface ActivityCreateProps extends FormComponentProps {
  user: any, // redux
  route: any, // redux
  pushURL: Function, // redux
}

const Dragger = Upload.Dragger
const FormItem = Form.Item
const RadioGroup = Radio.Group
class ActivityCreate extends React.Component<ActivityCreateProps & RouteComponentProps, any> {
  private editor: React.RefObject<any>

  constructor(props) {
    super(props)
    this.editor = React.createRef()
  }
  state = {
    coverUrl: '',
    updateNews: false,
  }

  componentDidMount() {
    const { route, match } = this.props
    if (match.path.indexOf('update') >= 0) {
      const detail = route.getIn(['state', 'detail'])
      if (!detail) {
        const params = match.params as any
        API.query(`/activity/info/${params.id}`, {}).then((messageHandler)).then((json) => {
          if (json.code === 0) {
            // this.setState({
            //   coverUrl: json.data.coverUrl
            // })
            this.props.pushURL(route.path, { detail: json.data })
          }
        })
      } else {
        this.setState({
          coverUrl: detail.get('coverUrl')
        })
      }
      
    }
  }

  componentWillReceiveProps(nextProps) {
    const { route, match } = nextProps
    if (match.path.indexOf('update') >= 0 && nextProps.route.getIn(['state', 'detail']) && !this.props.route.getIn(['state', 'detail'])) {
      const detail = nextProps.route.getIn(['state', 'detail'])
      this.setState({
        coverUrl: detail.get('coverUrl')
      })
    }
  }

  handleUploadFile = (options) => {
    const { file } = options
    let formData = new FormData()
    formData.append('file', file)
    fetch(serverOrigin + '/file/upload', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    }).then((res) => res.json()).then((json) => {
      if (json.code === 0) {
        this.setState({
          coverUrl: serverOrigin + '/' + json.data
        })
        // const coverUrl = serverOrigin + '/' + json.data
        // const coverTmp = coverUrl.split('/')
        // return [{
        //   name: coverTmp[coverTmp.length - 1],
        //   uid: 'uid',
        //   status: 'done',
        //   url: coverUrl,
        //   size: 0,
        //   type: 'image'
        // }]
      }
    })
    // API.query('/file/upload', {
    //   options: {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'multipart/form-data; boundary=2333'
    //     },
    //     body: formData
    //   }
    // }).then((json) => {
    //   if (json.code === 0) {
    //     this.setState({
    //       coverUrl: serverOrigin + '/' + json.data
    //     })
    //   }
    // })
  }

  handleOk = () => {
    const { validateFields } = this.props.form
    const { user, route } = this.props
    const { updateNews } = this.state
    this.editor.current ? (window as any).editor = (this.editor.current as any).getEditorState() : console.log('no editor')

    validateFields((err, value) => {
      if (err) {
        return
      }
      const detail = route.getIn(['state', 'detail'])
      if (detail) {
        // 编辑活动
        API.query('/activity/update', {
          options: {
            method: 'POST',
            body: JSON.stringify({
              ...detail.toJS(),
              ...value,
              coverUrl: this.state.coverUrl,
              endTime: moment(value.endTime).valueOf(),
              startTime: moment(value.startTime).valueOf(),
              description: this.editor.current ? (this.editor.current as any).getEditorState().toHTML() : ''
            })
          }
        }).then(messageHandler).then((json) => {
          if (json.code === 0) {
            message.success('修改成功')
            this.props.pushURL(`/workspace/activity/detail/${detail.get('id')}`)
          }
        })
      } else {
        // 创建活动
        API.query('/activity/check', {
          options: {
            method: 'POST',
            body: JSON.stringify({
              ...value,
              coverUrl: this.state.coverUrl,
              endTime: moment(value.endTime).valueOf(),
              startTime: moment(value.startTime).valueOf(),
              createId: user && user.get('id'),
              description: this.editor.current ? (this.editor.current as any).getEditorState().toHTML() : ''
            })
          }
        }).then(messageHandler).then((json) => {
          if (json.code === 0) {
            message.info('创建成功，请耐心等待审批')
            this.props.pushURL(`/workspace/activity`)
          }
        })
        
      }
      
    })
  }

  public render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    const { route } = this.props
    const { coverUrl, updateNews } = this.state
    const detail = route.getIn(['state', 'detail'])
    const coverTmp = coverUrl.split('/')
    const coverDecorator = getFieldDecorator('coverUrl', {
      // valuePropName: 'fileList',
      // initialValue: coverUrl ? [{
      //   name: coverTmp[coverTmp.length - 1],
      //   uid: 'uid',
      //   status: 'done',
      //   url: coverUrl,
      //   size: 0,
      //   type: 'image'
      // }] : [],
      // trigger: 'customRequest',
      // normalize: (options) => {
      //   console.log('options', options)
      // },
      // getValueFromEvent: this.handleUploadFile,
      // rules: [{
      //   required: true,
      //   message: '请上传封面头图'
      // }]
    })
    const startTimeDecorator = getFieldDecorator('startTime', {
      initialValue: detail && moment(detail.get('startTime')),
      rules: [{
        required: true,
        message: '请选择活动开始时间'
      }]
    })
    const endTimeDecorator = getFieldDecorator('endTime', {
      initialValue: detail && moment(detail.get('endTime'))
    })
    const locationDecorator = getFieldDecorator('location', {
      initialValue: detail && detail.get('location')
    })
    const joinTypeDecorator = getFieldDecorator('joinType', {
      initialValue: detail && detail.get('joinType').toString(),
      rules: [{
        required: true,
        message: '请选择活动加入方式'
      }]
    })

    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      }
    }
    const descriptionDecorator = getFieldDecorator('description', {
      initialValue: detail && detail.get('description')
    })
    const titleDecorator = getFieldDecorator('title', {
      initialValue: detail && detail.get('title'),
      rules: [{
        required: true,
        message: '请填写活动标题'
      }]
    })
    
    return (
      <div className={styles.container}>
        <Form>
          <FormItem {...formItemLayout} label="标题">
            {titleDecorator(
              <Input placeholder="请填写活动标题"/>
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="上传封面图片">
            {coverDecorator(
              <Dragger
                accept="image/*"
                customRequest={this.handleUploadFile}
                fileList={coverUrl ? [{
                  name: coverTmp[coverTmp.length - 1],
                  uid: 'uid',
                  status: 'done',
                  url: coverUrl,
                  size: 0,
                  type: 'image'
                }] : [{
                  name: 'defaultCover',
                  uid: 'uid',
                  status: 'done',
                  url: DefaultCoverURL,
                  size: 0,
                  type: 'image',
                }]}
                onRemove={(file) => {
                  console.log(file)
                  this.setState({
                    coverUrl: ''
                  })
                  return true
                }}
              >
                {/* {coverUrl ?  */}
                  <div className={styles.imgWrapper} style={{ backgroundImage: `url(${coverUrl || DefaultCoverURL})`}}>
                    <div className={styles.cover}>
                      <Icon type="inbox" /> 
                    </div>
                  </div>
                  {/* // : [
                  //   <p className="ant-upload-drag-icon">
                  //     <Icon type="inbox" />
                  //   </p>,
                  //   <p className="ant-upload-text">点击或拖拽文件到这里进行上传</p>
                  // ]
                // } */}
                
                
                {/* <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p> */}
              </Dragger>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="开始时间">
            {startTimeDecorator(
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="请选择开始时间"
                disabledDate={(startValue) => {
                  const endValue = getFieldValue('endTime')
                  if (!startValue || !endValue) {
                    return false;
                  }
                  return startValue.valueOf() > endValue.valueOf();
                }}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="结束时间">
            {endTimeDecorator(
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="请选择结束时间"
                disabledDate={(endValue) => {
                  const startValue = getFieldValue('startTime')
                  if (!endValue || !startValue) {
                    return false;
                  }
                  return endValue.valueOf() <= startValue.valueOf();
                }}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="活动地点">
            {locationDecorator(
              <Input placeholder="请选择活动地点" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="加入方式">
            {joinTypeDecorator(
              <RadioGroup>
                <Radio value="0">直接加入</Radio>
                <Radio value="1">需我审批</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="活动介绍">
            {descriptionDecorator(
              // <Input.TextArea placeholder="请输入活动介绍" autosize={{ minRows: 4, maxRows: 10 }}/>
              <MyEditor
                ref={this.editor}
                defaultValue={detail && detail.get('description')}
                // onRef={(element) => {
                //   this.editor = element
                // }}
              />
            )}
          </FormItem>
          {!detail &&
            <FormItem className={styles.btnGroup}>
              <Checkbox value={updateNews} onChange={(e) => this.setState({ updateNews: e.target.checked })}>同步发布到朋友圈</Checkbox>
            </FormItem>
          }
          <FormItem className={styles.btnGroup}>
            <Button type="default">取消编辑</Button>
            <Button type="primary" onClick={() => this.handleOk()}>{detail ? '保存修改' : '立即创建'}</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: fromJS(state).get('user'),
    route: fromJS(state).get('route')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pushURL: bindActionCreators(pushURL, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ActivityCreate))
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Icon, Button, Form, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import VerifyImage from '@utils/image/profile/header.jpeg'
import { serverOrigin } from '../../utils/API'
import oss from '../../utils/file'
import styles from './ProfileHomepage.module.scss'

interface HomepageProps extends FormComponentProps {
  user: any,
  updateBasic: Function,
  updateApply: Function,
  uploadFile: Function, // dispatch
}

interface InputProps {
  value: string,
  onChange: (e: any) => void,
  placeholder?: string,
}

export interface UserBasicProps {
  id: number,
  logoUrl: string,
  mail: string,
  mobile: string,
  name: string,
  type: number,
}

const INFO_EDIT_TYPE = {
  BASIC: 0,
  APPLY: 1,
  NONE: -1
}

export const USER_TYPE = {
  NORMAL: 0,
  ADMIN: 1,
}

const FormItem = Form.Item

const BASIC_INFO = {
  phone: '18260068636',
  mail: '592710057@qq.com'
}

class ProfileHomepage extends React.Component<HomepageProps, any> {
  private uploader: React.RefObject<HTMLInputElement>
  
  constructor(props) {
    super(props)
    this.uploader = React.createRef()
  }
  state = {
    editType: INFO_EDIT_TYPE.NONE,
    // basicInfo: BASIC_INFO
    attachmentUrl: this.props.user ? this.props.user.get('attachmentUrl') : ''
  }
  
  onUploadVerifyImage = (props) => {
    const files = (this.uploader as any).current.files
    oss.uploadFile(files[0]).then((json) => {
      if (json.code === 0) {
        this.setState({
          attachmentUrl: serverOrigin + '/' + json.data
        })
      }
    })
   
  }

  handleSaveBasic = () => {
    // TODO 掉修改个人信息的接口
    const { validateFields }  = this.props.form
    validateFields(['mobile', 'mail', 'name'], (err, value) => {
      if (err) {
        return
      }
      this.props.updateBasic(value).then((json) => {
        if (json.code === 0) {
          this.setState({
            editType: INFO_EDIT_TYPE.NONE
          })
        }
      })
      
    })
    
  }

  handleSaveApply = () => {
    // TODO 修改审批认证信息
    const { validateFields } = this.props.form
    const { attachmentUrl } = this.state
    validateFields(['attachmentUrl', 'context'], (err, value) => {
      if (err) {
        return
      }
      this.props.updateApply({...value, attachmentUrl}).then((json) => {
        if (json.code === 0) {
          this.setState({
            editType: INFO_EDIT_TYPE.NONE
          })
        }
      })
    })
    
  }

  /** component: 可编辑时的组件类型
   *  name: 可编辑组件对应的组件form名称
   */
  renderEditArea = ({type, component, name}) => {
    const { editType } = this.state
    const { getFieldValue } = this.props.form
    const value = getFieldValue(name)
    return editType === type ? component : (
      <span>{value}</span>
    )

  }
  public render() {
    const { editType } = this.state
    const { getFieldDecorator } = this.props.form
    const { user } = this.props
    const formItemLayout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14
      }
    }
    return (
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <div className={styles.header}>
            基本信息
            <div className={styles.operation}>
              {editType === INFO_EDIT_TYPE.BASIC ? 
                <Button type="primary" size="small" onClick={() => this.handleSaveBasic()}>保存修改</Button>
                :
                <Icon type="edit" onClick={() => this.setState({ editType: INFO_EDIT_TYPE.BASIC })}/>
              }
            </div>
            
          </div>
          <div className={styles.content}>
            <Form>
              <FormItem {...formItemLayout} label="手机号">
                {
                  getFieldDecorator('mobile', {
                    initialValue: user.get('mobile'),
                  })(
                    this.renderEditArea({
                      type: INFO_EDIT_TYPE.BASIC, 
                      component: <Input placeholder="请输入手机号码"/>, 
                      name: 'mobile'
                    })
                  )
                }
               
              </FormItem>
              <FormItem {...formItemLayout} label="邮箱">
                {
                  getFieldDecorator('mail', {
                    initialValue: user.get('mail')
                  })(
                    this.renderEditArea({
                      type: INFO_EDIT_TYPE.BASIC,
                      component: <Input placeholder="请输入邮箱账号" />,
                      name: 'mail'
                    })
                  )
                }
              </FormItem>
              <FormItem {...formItemLayout} label="用户名">
                {getFieldDecorator('name', {
                  initialValue: user.get('name')
                })(
                  this.renderEditArea({
                    type: INFO_EDIT_TYPE.BASIC,
                    component: <Input placeholder="请输入用户名"/>,
                    name: 'name'
                  })
                )}
              </FormItem>
              
            </Form>
          </div>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.header}>
            认证信息
            <div className={styles.operation}>
              {editType === INFO_EDIT_TYPE.APPLY ? 
                <Button type="primary" size="small" onClick={() => this.handleSaveApply()}>保存修改</Button>
                :
                <Icon type="edit" onClick={() => this.setState({ editType: INFO_EDIT_TYPE.APPLY })}/>
              }
            </div>
            
          </div>
          <div className={styles.content}>
            <Form>
              <FormItem {...formItemLayout} label="学生认证照片">
                {/* <div> */}
                  <div className={styles.imageWrapper} style={{ backgroundImage: `url(${this.state.attachmentUrl})` }}>
                    {editType === INFO_EDIT_TYPE.APPLY &&
                      <div className={styles.uploadField} onClick={() => this.uploader.current ? this.uploader.current.click() : null}/>
                    }
                  </div>
                {/* </div> */}
                
              </FormItem>
              <FormItem {...formItemLayout} label="备注">
                {
                  getFieldDecorator('context', {
                    initialValue: user.get('context'),
                  })(
                    this.renderEditArea({
                      type: INFO_EDIT_TYPE.APPLY,
                      component: <Input.TextArea placeholder="请输入审批备注信息" />,
                      name: 'context'
                    })
                  )
                }
              </FormItem>
            </Form>
          </div>
        </div>

        <input style={{ display: 'none' }} type="file" ref={this.uploader} onChange={this.onUploadVerifyImage} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    // uploadFile: bindActionCreators(uploadFile, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ProfileHomepage))
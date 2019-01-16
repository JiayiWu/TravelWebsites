import * as React from 'react'
import { Icon, Button, Form, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import VerifyImage from '@utils/image/profile/header.jpeg'
import styles from './ProfileHomepage.module.scss'

console.log(VerifyImage)
interface HomepageProps extends FormComponentProps {

}

interface InputProps {
  value: string,
  onChange: (e: any) => void,
  placeholder?: string,
}



const INFO_EDIT_TYPE = {
  BASIC: 0,
  APPLY: 1,
  NONE: -1
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
    basicInfo: BASIC_INFO
  }
  
  onUploadVerifyImage = (props) => {
    console.log(props)
  }

  handleSaveBasic = () => {
    // TODO 掉修改个人信息的接口
    this.setState({
      editType: INFO_EDIT_TYPE.NONE
    })
  }

  handleSaveApply = () => {
    // TODO 修改审批认证信息
    this.setState({
      editType: INFO_EDIT_TYPE.NONE
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
                  getFieldDecorator('phone', {
                    initialValue: '123123123',
                  })(
                    this.renderEditArea({
                      type: INFO_EDIT_TYPE.BASIC, 
                      component: <Input placeholder="请输入手机号码"/>, 
                      name: 'phone'
                    })
                  )
                }
               
              </FormItem>
              <FormItem {...formItemLayout} label="邮箱">
                {
                  getFieldDecorator('mail', {
                    initialValue: '592710057@qq.com'
                  })(
                    this.renderEditArea({
                      type: INFO_EDIT_TYPE.BASIC,
                      component: <Input placeholder="请输入邮箱账号" />,
                      name: 'mail'
                    })
                  )
                }
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
                  <div className={styles.imageWrapper} style={{ backgroundImage: `url(${VerifyImage})` }}>
                    {editType === INFO_EDIT_TYPE.APPLY &&
                      <div className={styles.uploadField} onClick={() => this.uploader.current ? this.uploader.current.click() : null}/>
                    }
                  </div>
                {/* </div> */}
                
              </FormItem>
              <FormItem {...formItemLayout} label="备注">
                {
                  getFieldDecorator('context', {})(
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

        <input style={{ display: 'none' }} type="file" ref={this.uploader} onSelect={this.onUploadVerifyImage} />
      </div>
    )
  }
}

export default Form.create()(ProfileHomepage)
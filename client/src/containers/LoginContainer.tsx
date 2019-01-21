import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Input, Form, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import styles from './LoginContainer.module.scss'
import Background from '@utils/image/background.jpg'
import API from '../utils/API'
import messageHandler from '../utils/messageHandler'
import { setUserInfo } from '../actions/auth'
import { pushURL } from '../actions/route'

interface LoginProps {
  setUserInfo: Function, // redux
  pushURL: Function, // redux
}

const FormItem = Form.Item

const FORM_TYPE = {
  USER_LOGIN: 0,
  ADMIN_LOGIN: 1,
  REGISTER: 2,
}

const FORM_NAMES = ['登录', '管理员登录', '注册']


class LoginContainer extends React.Component<LoginProps & FormComponentProps> {
  state = {
    type: FORM_TYPE.USER_LOGIN,
  }
  handleChangeType = (type) => {
    const { resetFields } = this.props.form
    this.setState({
      type,
    })
    resetFields()
  }
  handleSubmit = () => {
    const { type } = this.state
    const { validateFields } = this.props.form
    const { setUserInfo, pushURL } = this.props
    // if (type === FORM_TYPE.LOGIN) {
      validateFields((err, value) => {
        if (err) {
          return
        }
        if (type === FORM_TYPE.REGISTER) {
          API.query('/account/register', {
            options: {
              method: 'POST',
              body: JSON.stringify({
                ...value
              })
            }
            
          }).then(messageHandler).then((json) => {
            if (json.code === 0) {
              setUserInfo(json.data)
              pushURL('/workspace/activity')
            }
          })
        } else {
          API.query('/account/login', {
            options: {
              method: 'POST',
              body: JSON.stringify({
                ...value,
                type,
              })
            }
          }).then(messageHandler).then((json) => {
            if (json.code === 0) {
              setUserInfo(json.data)
              pushURL('/workspace/activity')
            }
          })
        }
        // TODO 登录
      })
    // } else {
      
    // }
  }
  getRePasswordDecorator = () => {
    const { getFieldDecorator, getFieldValue, validateFields } = this.props.form
    return getFieldDecorator('rePassword', {
      rules: [{
        required: true,
        message: '请重新输入您的密码'
      }, {
        validator: (rule, value, callback) => {
          const passwd = getFieldValue('password')
          if (value !== passwd) {
            callback('两次输入密码不一致')
          } else {
            callback()
          }
        }
      }]
    })
  }
  renderRegister = () => {
    const { getFieldDecorator, getFieldValue } = this.props.form
    return [
      <FormItem key="password">
        {this.getRePasswordDecorator()(<Input placeholder="请重新输入您的密码" type="password"/>)}
      </FormItem>,
      <FormItem key="phone">
        {getFieldDecorator('mobile', {
          rules: [{
            validator: (rules, value, callback) => {
              const mail = getFieldValue('mail')
              if (!value && !mail) {
                callback('请至少填写手机或邮箱中的一种')
              } else {
                callback()
              }
            }
          }]
        })(<Input placeholder="请输入您的手机号码" />)}
      </FormItem>,
      <FormItem key="mail">
        {getFieldDecorator('mail', {
          rules: [{
            validator: (rules, value, callback) => {
              const phone = getFieldDecorator('phone')
              if (!value && !phone) {
                callback('请至少填写手机或邮箱中的一种')
              } else {
                callback()
              }
            }
          }]
        })(<Input placeholder="请输入您的邮箱号" />)}
      </FormItem>,
    ]
  }
  public render() {
    const { type } = this.state
    const { getFieldDecorator, validateFields, getFieldValue } = this.props.form
    const nameDecorator = getFieldDecorator(type === FORM_TYPE.REGISTER ? 'name' : 'username', {
      rules: [{
        required: true,
        message: '请填写用户名'
      }]
    })
    const passwordDecorator = getFieldDecorator('password', {
      rules: [{
        required: true,
        message: '请填写密码'
      }, {
        validator: (rule, value, callback) => {
          if (getFieldValue('rePassword')) {
            validateFields(['rePassword'], { force: true })
          }
          callback()
        }
      }]
    })
    return (
      <div className={styles.container} style={{ backgroundImage: `url(${Background})`}}>
        <div className={styles.card}>
          <h1 className={styles.header}>
            {FORM_NAMES[this.state.type]}
          </h1>
          <Form>
            <FormItem>
              {nameDecorator(<Input placeholder="请填写用户名"/>)}
            </FormItem>
            <FormItem>
              {passwordDecorator(<Input placeholder="请填写密码" type="password"/>)}
            </FormItem>
            {(type === FORM_TYPE.USER_LOGIN || type === FORM_TYPE.ADMIN_LOGIN) &&
              <FormItem className={styles.linkWrapper}>
                {type === FORM_TYPE.USER_LOGIN ? 
                  <div className={styles.link} onClick={() => this.handleChangeType(FORM_TYPE.ADMIN_LOGIN)}>管理员入口</div>
                  :
                  <div className={styles.link} onClick={() => this.handleChangeType(FORM_TYPE.USER_LOGIN)}>普通用户入口</div>
                }
              </FormItem>
            }
            {type === FORM_TYPE.REGISTER && this.renderRegister()}
            <FormItem>
              <Button type="primary" style={{ width: '100%' }} onClick={() => this.handleSubmit()}>{FORM_NAMES[this.state.type]}</Button>
            </FormItem>
          </Form>
        </div>
        {type === FORM_TYPE.REGISTER ? 
          <div className={styles.bottom}>
            已经有账号？
            <div className={styles.link} onClick={() => this.handleChangeType(FORM_TYPE.USER_LOGIN)}>马上登录</div>
          </div>
          :
          <div className={styles.bottom}>
            还没有账号？
            <div className={styles.link} onClick={() => this.handleChangeType(FORM_TYPE.REGISTER)}>马上注册</div>
          </div>
          
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return null
}
function mapDispatchToProps(dispatch) {
  return {
    setUserInfo: bindActionCreators(setUserInfo, dispatch),
    pushURL: bindActionCreators(pushURL, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(LoginContainer))
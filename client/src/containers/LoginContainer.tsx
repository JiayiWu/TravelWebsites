import * as React from 'react'
import { Input, Form, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import styles from './LoginContainer.module.scss'
import Background from '@utils/image/background.jpg'

interface LoginProps {

}

const FormItem = Form.Item

const FORM_TYPE = {
  LOGIN: 0,
  REGISTER: 1,
}

const FORM_NAMES = ['登录', '注册']

class LoginContainer extends React.Component<LoginProps & FormComponentProps> {
  state = {
    type: FORM_TYPE.LOGIN,
  }
  handleChangeType = () => {
    const { resetFields } = this.props.form
    this.setState({
      type: this.state.type === FORM_TYPE.LOGIN ? FORM_TYPE.REGISTER : FORM_TYPE.LOGIN
    })
    resetFields()
  }
  handleSubmit = () => {
    const { type } = this.state
    const { validateFields } = this.props.form
    // if (type === FORM_TYPE.LOGIN) {
      validateFields((err, value) => {
        if (err) {
          return
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
  public render() {
    const { type } = this.state
    const { getFieldDecorator, validateFields, getFieldValue } = this.props.form
    const nameDecorator = getFieldDecorator('username', {
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
            {type === FORM_TYPE.REGISTER &&
              <FormItem>
                {this.getRePasswordDecorator()(<Input placeholder="请重新输入您的密码" type="password"/>)}
              </FormItem>
            }
            <FormItem>
              <Button type="primary" style={{ width: '100%' }} onClick={() => this.handleSubmit}>{FORM_NAMES[this.state.type]}</Button>
            </FormItem>
          </Form>
        </div>
        {type === FORM_TYPE.LOGIN ? 
          <div className={styles.bottom}>
            还没有账号？
            <div className={styles.link} onClick={() => this.handleChangeType()}>马上注册</div>
          </div>
          :
          <div className={styles.bottom}>
            已经有账号？
            <div className={styles.link} onClick={() => this.handleChangeType()}>马上登录</div>
          </div>
        }
      </div>
    )
  }
}

export default Form.create()(LoginContainer)
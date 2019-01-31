import * as React from 'react'
import { Form, Input, Button, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import styles from './ProfilePasswd.module.scss'
import API from '../../utils/API'
import messageHandler from '../../utils/messageHandler'

interface SecurityProps {

}

const FormItem  = Form.Item
class ProfilePasswd extends React.Component<SecurityProps &FormComponentProps, any> {
  handleChange = () => {
    const { validateFields, resetFields } = this.props.form
    validateFields((err, value) => {
      if (err) {
        return
      }
      API.query('/user/changePassword', {
        searchParams: {
          oldPassword: value.passwd,
          newPassword: value.newPasswd,
        },
        options: {
          method: 'POST',
        }
      }).then(messageHandler).then((json) => {
        if (json.code === 0) {
          message.success('修改成功')
          resetFields()
        }
      })
    })
  }
  public render() {
    const { getFieldDecorator, getFieldValue, validateFields } = this.props.form
    const formItemLayout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14
      }
    }
    const passwdDecorator = getFieldDecorator('passwd', {
      rules: [{
        required: true,
        message: '请填写原密码'
      }]
    })
    const newPasswdDecorator = getFieldDecorator('newPasswd', {
      rules: [{
        required: true,
        message: '请填写新的密码'
      }, {
        validator: (rule, value, callback) => {
          if (getFieldValue('newRePasswd')) {
            validateFields(['newRePasswd'], { force: true })
          } else {
            callback()
          }
        }
      }]
    })
    const newRePasswdDecorator = getFieldDecorator('newRePasswd', {
      rules: [{
        required: true,
        message: '请重新填写您的新密码'
      }, {
        validator: (rule, value, callback) => {
          if (getFieldValue('newPasswd') !== value) {
            callback('两次输入的新密码不同')
          } else {
            callback()
          }
        }
      }]
    })
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          密码修改
        </div>
        <Form>
          <FormItem {...formItemLayout} label="原密码">
            {passwdDecorator(<Input type="password" placeholder="请输入您的原密码"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="新密码">
            {newPasswdDecorator(<Input type="password" placeholder="请输入您的新密码"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="密码确认">
            {newRePasswdDecorator(<Input type="password" placeholder="请再次输入您的新密码" />)}
          </FormItem>
          <FormItem>
            <Button type="primary" className={styles.bottomButton} onClick={() => this.handleChange()}>保存修改</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Form.create()(ProfilePasswd)
import * as React from 'react'
import { Icon, Button, Form, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import styles from './ProfileHomepage.module.scss'

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

class ProfileHomepage extends React.Component<HomepageProps, any> {
  state = {
    editType: INFO_EDIT_TYPE.NONE
  }
  /** currentType：该类型下显示input输入框
   *  name: 表单对应字段
   *  options：getFieldDecorator对应的options
   *  component：包裹的子组件
   */
  getDecorator = (currentType, name: string, options) => (component) => {
    const { getFieldDecorator } = this.props.form
    const { editType } = this.state
    return editType === currentType ? getFieldDecorator(name, options)(component) : component
  }
  /** component: 可编辑时的组件类型
   *  props: 可编辑区域的prop
   */
  renderEditArea = (component, props: InputProps) => {
    const { editType } = this.state
    return editType === INFO_EDIT_TYPE.NONE ? (
      <span>{props.value}</span>
    ) : React.cloneElement(component, props)

  }
  public render() {
    const { editType } = this.state
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
              {editType === INFO_EDIT_TYPE.NONE ? 
                <Icon type="edit" />
                :
                <Button type="primary">保存修改</Button>
              }
            </div>
            
          </div>
          <div className={styles.content}>
            <Form>
              <FormItem {...formItemLayout} label="手机号">
                {/* {this.getDecorator(INFO_EDIT_TYPE.BASIC, 'phone', {})(
                  this.renderEditArea(<Input/>, {
                    placeholder: '请输入手机号'
                  })
                )} */}
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

export default Form.create()(ProfileHomepage)
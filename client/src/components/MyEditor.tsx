import * as React from 'react'
import * as ReactDOM from 'react-dom'
import BraftEditor from 'braft-editor'
import MyUploadFn from './MyUploadFn'
import 'braft-editor/dist/index.css'
// import {Editor, EditorState, RichUtils} from 'draft-js'

interface MyEditorProps {
  // onRef: (ref: any) => void
  ref: React.RefObject<any>,
  readOnly?: boolean,
  defaultValue?: string,
  // controls?: Array<string>
}

const defaultControls = [
  'undo', 'redo', 'separator',
  'font-size', 'line-height', 'letter-spacing', 'separator',
  'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
  'superscript', 'subscript', 'remove-styles', 'emoji',  'separator', 'text-indent', 'text-align', 'separator',
  'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
  'link', 'separator', 'hr', 'separator',
  'media', 'separator',
  'clear'
] as Array<any>

class MyEdior extends React.Component<MyEditorProps, any> {
  private isLiving = false
  defaultProps = {
    readOnly: false,
    defaultValue: ''
  }
  state = {
    editorState: BraftEditor.createEditorState(this.props.defaultValue), // 设置编辑器初始内容
    outputHTML: '<p></p>'
  }

  getEditorState = () => {
    return this.state.editorState as any
  }

  componentDidMount () {
    // this.isLiving = true
    // // 3秒后更改编辑器内容
    // setTimeout(this.setEditorContentAsync, 3000)
    // /
  }

  componentWillUnmount () {
    this.isLiving = false
  }

  handleChange = (editorState) => {
    this.setState({
      editorState: editorState,
      outputHTML: editorState.toHTML()
    })
  }

  setEditorContentAsync = () => {
    this.isLiving && this.setState({
      editorState: BraftEditor.createEditorState('<p>你好，<b>世界!</b><p>')
    })
  }

  render () {

    const { editorState, outputHTML } = this.state

    return (
      <div>
        <div className="editor-wrapper" style={{ border: !this.props.readOnly ? '1px solid rgb(217, 217, 217)' : 'none', borderRadius: '5px' }}>
          <BraftEditor
            value={editorState}
            onChange={this.handleChange}
            readOnly={this.props.readOnly}
            controls={this.props.readOnly ? [] : defaultControls}
            media={{
              uploadFn: MyUploadFn
            }}
          />
        </div>
        {/* <h5>输出内容</h5>
        <div className="output-content">{outputHTML}</div> */}
      </div>
    )

  }

}

export default MyEdior
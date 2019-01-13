import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Editor, EditorState, RichUtils} from 'draft-js'

interface MyEditorProps {

}

class MyEdior extends React.Component<MyEditorProps, any> {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
  }
  // state = {
  //   editorState: EditorState.createEmpty()
  // }
  onChange = (editorState) => {
    this.setState({
      editorState
    })
  }
  public render() {
    console.log('render editor');
    (window as any).e = this.state.editorState
    return (
      <Editor editorState={this.state.editorState} onChange={this.onChange} />
    )
  }
}

export default MyEdior
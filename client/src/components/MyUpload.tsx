import * as React from 'react'
import { Upload } from 'antd'

interface MyUploadProps {
  
}

class MyUpload extends React.Component<MyUploadProps, any> {

  public render() {
    return (
      // <Upload
      //   customRequest={this.handleUploadFile}
      //   fileList={coverUrl ? [{
      //     name: coverTmp[coverTmp.length - 1],
      //     uid: 'uid',
      //     status: 'done',
      //     url: coverUrl,
      //     size: 0,
      //     type: 'image'
      //   }] : []}
      //   onRemove={(file) => {
      //     console.log(file)
      //     this.setState({
      //       coverUrl: ''
      //     })
      //     return true
      //   }}
      // >
      //   {React.Children}
      // </Upload>
      null
    )
  }
}

export default MyUpload
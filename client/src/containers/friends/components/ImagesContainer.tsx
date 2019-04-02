import React from 'react'
import { Icon } from 'antd'
import styles from './ImageContainer.module.scss'

class ImagesContainer extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      showBig: false,
      currentPicture: null,
    }
  }

  renderBigMode = () => {
    return (
      <div className={styles.bigImageContainer}>
        <div className={styles.header} onClick={() => this.setState({ showBig: false, currentPicture: null })}><Icon type="to-top" />&nbsp;收起</div>
        <div className={styles.image}></div>
        <div className={styles.gallery}>
          {new Array(6).fill(0).map((image, index) => {
            return (
              <div className={styles.galleryImage} key={index} onClick={(index) => this.setState({ currentPicture: index })}></div>
            )
          })}
        </div>
      </div>
    )
  }

  render() {
    const { showBig, currentPicture } = this.state
    return showBig ? this.renderBigMode() : (
      <div className={styles.imageWrapper}>
        {showBig ? 
          this.renderBigMode()
          :
          new Array(6).fill(0).map((image, index) => {
            return (
              <div className={styles.imageItem} key={index} onClick={(index) => this.setState({ showBig: true, currentPicture: index })}></div>
            )
          })
        }
      </div>
    )
  }
}

export default ImagesContainer
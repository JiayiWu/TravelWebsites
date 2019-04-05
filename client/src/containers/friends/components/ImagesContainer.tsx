import React from 'react'
import { Icon } from 'antd'
import classnames from 'classnames'
import styles from './ImageContainer.module.scss'

class ImagesContainer extends React.Component<{images: Array<string>}, any> {
  constructor(props) {
    super(props)
    this.state = {
      showBig: false,
      currentPicture: null,
    }
  }

  renderBigMode = () => {
    const { currentPicture } = this.state
    return (
      <div className={styles.bigImageContainer}>
        <div className={styles.header} onClick={() => this.setState({ showBig: false, currentPicture: null })}><Icon type="to-top" />&nbsp;收起</div>
        <div>
          <img className={styles.image} src={currentPicture} />
        </div>
        <div className={styles.gallery}>
          {this.props.images.map((image, index) => {
            return (
              <div className={classnames(styles.galleryImage, this.props.images.indexOf(currentPicture) == index ? styles.activeImage : '')} style={{ backgroundImage: `url(${image})`}} key={index} onClick={() => this.setState({ currentPicture: image })}></div>
            )
          })}
        </div>
      </div>
    )
  }

  render() {
    const { images } = this.props
    const { showBig } = this.state
    return showBig ? this.renderBigMode() : (
      <div className={styles.imageWrapper}>
        {showBig ? 
          this.renderBigMode()
          :
          images.map((image, index) => {
            return (
              <div className={styles.imageItem} style={{ backgroundImage: `url(${image})`}} key={index} onClick={() => this.setState({ showBig: true, currentPicture: image })}></div>
            )
          })
        }
      </div>
    )
  }
}

export default ImagesContainer
import React from 'react'
import styles from './ForwardActCard.module.scss'

class ForwardActCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.cover}></div>
        <div className={styles.right}>这是一个活动</div>
      </div>
    )
  }
}
export default ForwardActCard
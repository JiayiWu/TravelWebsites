import * as React from 'react'
import styles from './NoticeItem.module.scss'

interface NoticeItemProps {
  type: number,
}

const ITEM_TYPE = {
  ACT_CREATE: 0,
  ACT_JOIN: 1,
  PERSON_VERIFY: 2,
}

class NoticeItem extends React.Component<NoticeItemProps, any> {
  public render() {
    return (
      <div className={styles.container}>
        
      </div>
    )
  }
}

export default NoticeItem
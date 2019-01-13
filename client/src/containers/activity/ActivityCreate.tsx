import * as React from 'react'
import styles from './ActivityCreate.module.scss'
import MyEditor from '../../components/MyEditor'

interface ActivityCreateProps {

}

class ActivityCreate extends React.Component<ActivityCreateProps, any> {
  public render() {
    return (
      <div className={styles.container}>
        <h1>create</h1>
        <MyEditor />
      </div>
    )
  }
}

export default ActivityCreate
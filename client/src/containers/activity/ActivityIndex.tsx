import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import { RouteComponentProps } from 'react-router'
import styles from './ActivityIndex.module.scss'

const Homepage = Loadable({
  loader: () => import('./ActivityHomepage'),
  loading: () => <div>loading...</div>
})

const Create = Loadable({
  loader: () => import('./ActivityCreate'),
  loading: () => <div>loading...</div>
})

const Detail = Loadable({
  loader: () => import('./ActivityDetail'),
  loading: () => <div>loading...</div>
})

interface ActivityIndexProps extends RouteComponentProps {

}

class ActivityIndex extends React.Component<ActivityIndexProps, any> {
  public render() {
    const { match } = this.props
    return (
      <div style={{ width: '100%', height: 'calc(100% - 60px)', position: 'relative', }}>        
        <Switch>
          <Route exact path={`${match.path}/`} component={Homepage}/>
          <Route path={`${match.path}/create`} component={Create}/>
          <Route path={`${match.path}/detail/:id`} component={Detail} />
          <Route path={`${match.path}/detail/apply`} component={Detail} />
          {/* <Route render={() => <div>no corresponding...</div>} /> */}
        </Switch>
        
        
      </div>
      
    )
  }
}

export default ActivityIndex
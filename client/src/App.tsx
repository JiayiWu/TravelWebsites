import React, { Component } from 'react'
import history from './utils/history'
import { Router, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import styles from './App.module.scss'


const LoginContainer = Loadable({
  loader: () => import('./containers/LoginContainer'),
  loading: () => <div>loading...</div>
})

const HeaderContainer = Loadable({
  loader: () => import('./containers/Header'),
  loading: () => <div>loading...</div>
})

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div style={{ width: '100%', height: '100%', color: '#666' }}>
          <Route path="/login" component={LoginContainer} />
          <Route path="/workspace" component={HeaderContainer} />
        </div>
        
        {/* <div className={styles.app}>
          <header className={styles.header}>
            <img src={logo} className={styles.logo} alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
              
            </p>
            <a
              className={styles.link}
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
          <Button type="primary">确定</Button>
        </div> */}
      </Router>
      
    );
  }
}

export default App;
// import React from "react";
// import Button from 'antd/lib/button';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import styles from './App.scss'

// function BasicExample() {
//   return (
//     <Router>
//       <div className={styles.app}>
//         <ul>
//           <li>
//             <Link to="/">Home</Link><Button type="primary">确定</Button>
//           </li>
//           <li>
//             <Link to="/about">About</Link>
//           </li>
//           <li>
//             <Link to="/topics">Topics</Link>
//           </li>
//         </ul>

//         <hr />

//         <Route exact path="/" component={Home} />
//         <Route path="/about" component={About} />
//         <Route path="/topics" component={Topics} />
//       </div>
//     </Router>
//   );
// }

// function Home() {
//   return (
//     <div>
//       <h2>Home</h2>
//     </div>
//   );
// }

// function About() {
//   return (
//     <div>
//       <h2>About</h2>
//     </div>
//   );
// }

// function Topics({ match }) {
//   return (
//     <div>
//       <h2>Topics</h2>
//       <ul>
//         <li>
//           <Link to={`${match.url}/rendering`}>Rendering with React</Link>
//         </li>
//         <li>
//           <Link to={`${match.url}/components`}>Components</Link>
//         </li>
//         <li>
//           <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
//         </li>
//       </ul>

//       <Route path={`${match.path}/:topicId`} component={Topic} />
//       <Route
//         exact
//         path={match.path}
//         render={() => <h3>Please select a topic.</h3>}
//       />
//     </div>
//   );
// }

// function Topic({ match }) {
//   return (
//     <div>
//       <h3>{match.params.topicId}</h3>
//     </div>
//   );
// }

// export default BasicExample;

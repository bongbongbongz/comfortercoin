import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import auth from './auth';
import './index.css';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

class PageNotFound extends React.Component {
  render() {
    return (
      <div>
        <h1>Page Not Found.</h1>
        <p>Go to <Link to="/">Home Page</Link></p>
      </div>
    )
  }
}

const router = (
<Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} onEnter={requireAuth} />
      <Route path="about" component={About} />
      <Route path="login" component={Login} onEnter={requireAuth2} />
      <Route path="*" component={PageNotFound} />
    </Route>
  </Router>
);

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function requireAuth2(nextState, replace) {
  if (auth.loggedIn()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

ReactDOM.render(
  router,
  document.getElementById('root')
);



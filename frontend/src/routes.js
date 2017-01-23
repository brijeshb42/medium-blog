import {h, Component} from 'preact'
import { Router, Route, browserHistory, Link } from 'react-router';
import { Provider } from 'preact-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import Home from './pages/Home';
import NewArticle from './pages/NewArticle';
import reducers from './store';
import App from './App';

const store = createStore(
  reducers,
  applyMiddleware(thunk),
);

window.store = store;


export default (
  <Provider store={store}>
    {/*<Router>
      {/*<SplitPoint
        path="/"
        load={require('bundle?lazy!./pages/Home')}
        fallbackContent={(<div class="loading" />)}
      />
      <SplitPoint
        path="/article"
        load={require('bundle?lazy!./pages/NewArticle')}
        fallbackContent={(<div class="loading" />)}
      />
      <SplitPoint default load={() => <p>Ola</p>} />}
      <Home path="/" />
      <NewArticle path="/article" />
      <NewArticle path="/article/:articleID" />
    </Router>*/}
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/" component={Home} />
        <Route path="/article" component={NewArticle} />
        <Route path="/article/:articleID" component={NewArticle} />
      </Route>
    </Router>
  </Provider>
);
